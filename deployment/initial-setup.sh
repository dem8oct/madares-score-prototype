#!/bin/bash

# Initial Server Setup Script for Madares Score Prototype on Hetzner VPS
# This script sets up Ubuntu server with required software and security

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/var/www/madares-score-prototype"
REPO_URL="https://github.com/dem8oct/madares-score-prototype.git"
DEPLOY_USER="deploy"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Madares Score - Initial Server Setup${NC}"
echo -e "${GREEN}========================================${NC}\n"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Please run this script as root or with sudo${NC}"
    exit 1
fi

# Function to update system
update_system() {
    echo -e "${YELLOW}Updating system packages...${NC}"
    apt-get update
    apt-get upgrade -y
    echo -e "${GREEN}✓ System updated${NC}\n"
}

# Function to install essential packages
install_essentials() {
    echo -e "${YELLOW}Installing essential packages...${NC}"
    apt-get install -y \
        curl \
        wget \
        git \
        ufw \
        build-essential \
        software-properties-common \
        apt-transport-https \
        ca-certificates \
        gnupg \
        lsb-release \
        zip \
        unzip
    echo -e "${GREEN}✓ Essential packages installed${NC}\n"
}

# Function to setup firewall
setup_firewall() {
    echo -e "${YELLOW}Configuring firewall (UFW)...${NC}"

    # Reset UFW to default
    ufw --force reset

    # Default policies
    ufw default deny incoming
    ufw default allow outgoing

    # Allow SSH (be careful not to lock yourself out!)
    ufw allow 22/tcp

    # Allow HTTP and HTTPS
    ufw allow 80/tcp
    ufw allow 443/tcp

    # Enable firewall
    ufw --force enable

    echo -e "${GREEN}✓ Firewall configured${NC}"
    ufw status
    echo ""
}

# Function to create deploy user
create_deploy_user() {
    echo -e "${YELLOW}Creating deployment user...${NC}"

    # Check if user already exists
    if id "$DEPLOY_USER" &>/dev/null; then
        echo -e "${YELLOW}User $DEPLOY_USER already exists${NC}\n"
        return
    fi

    # Create user
    useradd -m -s /bin/bash $DEPLOY_USER

    # Add to sudo group
    usermod -aG sudo $DEPLOY_USER

    # Allow sudo without password for deployment tasks (optional)
    echo -e "${BLUE}Allow passwordless sudo for deployment user? (y/n)${NC}"
    read -r PASSWORDLESS_SUDO

    if [[ $PASSWORDLESS_SUDO =~ ^[Yy]$ ]]; then
        echo "$DEPLOY_USER ALL=(ALL) NOPASSWD: /usr/sbin/nginx, /bin/systemctl reload nginx, /bin/systemctl restart nginx" >> /etc/sudoers.d/$DEPLOY_USER
        chmod 0440 /etc/sudoers.d/$DEPLOY_USER
    fi

    echo -e "${GREEN}✓ User $DEPLOY_USER created${NC}\n"
    echo -e "${YELLOW}Set password for $DEPLOY_USER:${NC}"
    passwd $DEPLOY_USER
    echo ""
}

# Function to install Node.js
install_nodejs() {
    echo -e "${YELLOW}Installing Node.js 20.x LTS...${NC}"

    # Install NodeSource repository
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

    # Install Node.js
    apt-get install -y nodejs

    # Verify installation
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)

    echo -e "${GREEN}✓ Node.js installed${NC}"
    echo -e "  Node version: $NODE_VERSION"
    echo -e "  NPM version: $NPM_VERSION\n"
}

# Function to install Nginx
install_nginx() {
    echo -e "${YELLOW}Installing Nginx...${NC}"

    apt-get install -y nginx

    # Start and enable Nginx
    systemctl start nginx
    systemctl enable nginx

    # Verify installation
    NGINX_VERSION=$(nginx -v 2>&1 | cut -d'/' -f2)

    echo -e "${GREEN}✓ Nginx installed (version: $NGINX_VERSION)${NC}\n"
}

# Function to clone repository
clone_repository() {
    echo -e "${YELLOW}Cloning application repository...${NC}"

    # Create parent directory
    mkdir -p /var/www

    # Check if directory already exists
    if [ -d "$APP_DIR" ]; then
        echo -e "${YELLOW}Application directory already exists${NC}"
        echo -e "${BLUE}Remove and re-clone? (y/n)${NC}"
        read -r RECLONE

        if [[ $RECLONE =~ ^[Yy]$ ]]; then
            rm -rf $APP_DIR
        else
            echo -e "${YELLOW}Skipping repository clone${NC}\n"
            return
        fi
    fi

    # Clone repository
    git clone $REPO_URL $APP_DIR

    # Set ownership
    chown -R $DEPLOY_USER:$DEPLOY_USER $APP_DIR

    echo -e "${GREEN}✓ Repository cloned to $APP_DIR${NC}\n"
}

# Function to install dependencies
install_dependencies() {
    echo -e "${YELLOW}Installing application dependencies...${NC}"

    cd $APP_DIR

    # Install as deploy user
    sudo -u $DEPLOY_USER npm install

    echo -e "${GREEN}✓ Dependencies installed${NC}\n"
}

# Function to build application
build_application() {
    echo -e "${YELLOW}Building application...${NC}"

    cd $APP_DIR

    # Build as deploy user
    sudo -u $DEPLOY_USER npm run build

    if [ ! -d "$APP_DIR/dist" ]; then
        echo -e "${RED}✗ Build failed - dist directory not found${NC}"
        exit 1
    fi

    echo -e "${GREEN}✓ Application built successfully${NC}\n"
}

# Function to configure Nginx
configure_nginx() {
    echo -e "${YELLOW}Configuring Nginx...${NC}"

    # Copy Nginx configuration
    cp $APP_DIR/deployment/nginx.conf /etc/nginx/sites-available/madares-score

    # Note: Domain replacement will be done by SSL setup script
    echo -e "${YELLOW}Note: Domain configuration will be set during SSL setup${NC}"

    # Remove default site if exists
    if [ -f "/etc/nginx/sites-enabled/default" ]; then
        rm /etc/nginx/sites-enabled/default
    fi

    # Enable site
    ln -sf /etc/nginx/sites-available/madares-score /etc/nginx/sites-enabled/

    # Test configuration
    nginx -t

    if [ $? -eq 0 ]; then
        systemctl reload nginx
        echo -e "${GREEN}✓ Nginx configured${NC}\n"
    else
        echo -e "${RED}✗ Nginx configuration test failed${NC}"
        exit 1
    fi
}

# Function to setup backup directory
setup_backup() {
    echo -e "${YELLOW}Setting up backup directory...${NC}"

    mkdir -p /var/backups/madares-score
    chown -R $DEPLOY_USER:$DEPLOY_USER /var/backups/madares-score

    echo -e "${GREEN}✓ Backup directory created${NC}\n"
}

# Function to make scripts executable
setup_scripts() {
    echo -e "${YELLOW}Making deployment scripts executable...${NC}"

    chmod +x $APP_DIR/deployment/*.sh
    chown $DEPLOY_USER:$DEPLOY_USER $APP_DIR/deployment/*.sh

    echo -e "${GREEN}✓ Scripts configured${NC}\n"
}

# Function to display final instructions
show_final_instructions() {
    SERVER_IP=$(curl -s https://api.ipify.org)

    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Initial Setup Completed!${NC}"
    echo -e "${GREEN}========================================${NC}\n"

    echo -e "${BLUE}Server IP:${NC} $SERVER_IP\n"

    echo -e "${YELLOW}Next Steps:${NC}\n"

    echo -e "1. Configure DNS:"
    echo -e "   - Add A record pointing your domain to: $SERVER_IP"
    echo -e "   - Wait 5-30 minutes for DNS propagation\n"

    echo -e "2. Setup SSL certificate:"
    echo -e "   ${BLUE}sudo $APP_DIR/deployment/setup-ssl.sh${NC}\n"

    echo -e "3. Test your site:"
    echo -e "   Visit https://yourdomain.com\n"

    echo -e "4. For future deployments:"
    echo -e "   Switch to deploy user: ${BLUE}su - $DEPLOY_USER${NC}"
    echo -e "   Run: ${BLUE}$APP_DIR/deployment/deploy.sh${NC}\n"

    echo -e "${GREEN}Installation complete!${NC}\n"
}

# Main function
main() {
    update_system
    install_essentials
    setup_firewall
    create_deploy_user
    install_nodejs
    install_nginx
    clone_repository
    install_dependencies
    build_application
    configure_nginx
    setup_backup
    setup_scripts
    show_final_instructions
}

# Run main function
main
