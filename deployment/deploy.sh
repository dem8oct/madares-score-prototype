#!/bin/bash

# Deployment script for Madares Score Prototype
# This script pulls latest code, builds, and deploys to production

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/var/www/madares-score-prototype"
REPO_URL="https://github.com/dem8oct/madares-score-prototype.git"
BRANCH="main"
BACKUP_DIR="/var/backups/madares-score"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Madares Score Prototype - Deployment${NC}"
echo -e "${GREEN}========================================${NC}\n"

# Function to create backup
create_backup() {
    echo -e "${YELLOW}Creating backup...${NC}"
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    mkdir -p $BACKUP_DIR

    if [ -d "$APP_DIR/dist" ]; then
        tar -czf "$BACKUP_DIR/dist_backup_$TIMESTAMP.tar.gz" -C "$APP_DIR" dist
        echo -e "${GREEN}✓ Backup created: dist_backup_$TIMESTAMP.tar.gz${NC}\n"
    else
        echo -e "${YELLOW}No previous build to backup${NC}\n"
    fi

    # Keep only last 5 backups
    cd $BACKUP_DIR
    ls -t dist_backup_*.tar.gz | tail -n +6 | xargs -r rm
}

# Function to pull latest code
pull_code() {
    echo -e "${YELLOW}Pulling latest code from $BRANCH branch...${NC}"
    cd $APP_DIR

    # Stash any local changes
    git stash

    # Fetch and pull
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH

    echo -e "${GREEN}✓ Code updated${NC}\n"
}

# Function to install dependencies
install_dependencies() {
    echo -e "${YELLOW}Installing dependencies...${NC}"
    cd $APP_DIR
    npm ci --production=false
    echo -e "${GREEN}✓ Dependencies installed${NC}\n"
}

# Function to build application
build_app() {
    echo -e "${YELLOW}Building application...${NC}"
    cd $APP_DIR
    npm run build

    if [ ! -d "dist" ]; then
        echo -e "${RED}✗ Build failed - dist directory not found${NC}"
        exit 1
    fi

    echo -e "${GREEN}✓ Build completed${NC}\n"
}

# Function to reload nginx
reload_nginx() {
    echo -e "${YELLOW}Testing Nginx configuration...${NC}"
    sudo nginx -t

    if [ $? -eq 0 ]; then
        echo -e "${YELLOW}Reloading Nginx...${NC}"
        sudo systemctl reload nginx
        echo -e "${GREEN}✓ Nginx reloaded${NC}\n"
    else
        echo -e "${RED}✗ Nginx configuration test failed${NC}"
        exit 1
    fi
}

# Main deployment process
main() {
    # Check if running as correct user
    if [ "$EUID" -eq 0 ]; then
        echo -e "${RED}Please do not run this script as root${NC}"
        exit 1
    fi

    # Check if app directory exists
    if [ ! -d "$APP_DIR" ]; then
        echo -e "${RED}Application directory not found: $APP_DIR${NC}"
        echo -e "${YELLOW}Run the initial setup script first${NC}"
        exit 1
    fi

    # Run deployment steps
    create_backup
    pull_code
    install_dependencies
    build_app
    reload_nginx

    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Deployment completed successfully!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "Build time: $(date)"
    echo -e "Git commit: $(cd $APP_DIR && git rev-parse --short HEAD)"
}

# Run main function
main
