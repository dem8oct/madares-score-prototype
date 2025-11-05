#!/bin/bash

# SSL Certificate Setup Script for Madares Score Prototype
# Uses Let's Encrypt via Certbot

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}SSL Certificate Setup${NC}"
echo -e "${GREEN}========================================${NC}\n"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Please run this script as root or with sudo${NC}"
    exit 1
fi

# Function to prompt for domain
get_domain() {
    echo -e "${BLUE}Enter your domain name (e.g., example.com):${NC}"
    read -r DOMAIN

    if [ -z "$DOMAIN" ]; then
        echo -e "${RED}Domain name cannot be empty${NC}"
        exit 1
    fi

    echo -e "${BLUE}Include www subdomain? (y/n):${NC}"
    read -r INCLUDE_WWW

    if [[ $INCLUDE_WWW =~ ^[Yy]$ ]]; then
        DOMAINS="$DOMAIN,www.$DOMAIN"
    else
        DOMAINS="$DOMAIN"
    fi

    echo -e "\n${YELLOW}Domain(s) to configure: $DOMAINS${NC}\n"
}

# Function to prompt for email
get_email() {
    echo -e "${BLUE}Enter your email address for Let's Encrypt notifications:${NC}"
    read -r EMAIL

    if [ -z "$EMAIL" ]; then
        echo -e "${RED}Email cannot be empty${NC}"
        exit 1
    fi

    echo -e "${YELLOW}Email: $EMAIL${NC}\n"
}

# Function to check DNS
check_dns() {
    echo -e "${YELLOW}Checking DNS configuration...${NC}"

    # Extract first domain
    FIRST_DOMAIN=$(echo $DOMAINS | cut -d',' -f1)

    # Get server IP
    SERVER_IP=$(curl -s https://api.ipify.org)
    echo -e "Server IP: ${BLUE}$SERVER_IP${NC}"

    # Check domain DNS
    DOMAIN_IP=$(dig +short $FIRST_DOMAIN | tail -n1)

    if [ -z "$DOMAIN_IP" ]; then
        echo -e "${RED}✗ DNS not configured for $FIRST_DOMAIN${NC}"
        echo -e "${YELLOW}Please configure your DNS A record to point to: $SERVER_IP${NC}"
        echo -e "${YELLOW}Then wait for DNS propagation (5-30 minutes) before running this script${NC}"
        exit 1
    fi

    if [ "$DOMAIN_IP" != "$SERVER_IP" ]; then
        echo -e "${RED}✗ DNS mismatch!${NC}"
        echo -e "Domain $FIRST_DOMAIN points to: $DOMAIN_IP"
        echo -e "But server IP is: $SERVER_IP"
        echo -e "${YELLOW}Please update your DNS A record and wait for propagation${NC}"
        exit 1
    fi

    echo -e "${GREEN}✓ DNS configured correctly${NC}\n"
}

# Function to install Certbot
install_certbot() {
    echo -e "${YELLOW}Checking Certbot installation...${NC}"

    if command -v certbot &> /dev/null; then
        echo -e "${GREEN}✓ Certbot already installed${NC}\n"
        return
    fi

    echo -e "${YELLOW}Installing Certbot...${NC}"

    # Install snapd if not present
    if ! command -v snap &> /dev/null; then
        apt-get update
        apt-get install -y snapd
        systemctl start snapd
        systemctl enable snapd
    fi

    # Install certbot
    snap install --classic certbot
    ln -sf /snap/bin/certbot /usr/bin/certbot

    echo -e "${GREEN}✓ Certbot installed${NC}\n"
}

# Function to update Nginx config with domain
update_nginx_config() {
    echo -e "${YELLOW}Updating Nginx configuration with domain...${NC}"

    NGINX_CONFIG="/etc/nginx/sites-available/madares-score"
    FIRST_DOMAIN=$(echo $DOMAINS | cut -d',' -f1)

    # Replace YOUR_DOMAIN with actual domain
    sed -i "s/YOUR_DOMAIN/$FIRST_DOMAIN/g" $NGINX_CONFIG

    # Test configuration
    nginx -t

    if [ $? -eq 0 ]; then
        systemctl reload nginx
        echo -e "${GREEN}✓ Nginx configuration updated${NC}\n"
    else
        echo -e "${RED}✗ Nginx configuration test failed${NC}"
        exit 1
    fi
}

# Function to obtain SSL certificate
obtain_certificate() {
    echo -e "${YELLOW}Obtaining SSL certificate from Let's Encrypt...${NC}"
    echo -e "${BLUE}This may take a few minutes...${NC}\n"

    certbot --nginx \
        -d $DOMAINS \
        --non-interactive \
        --agree-tos \
        --email $EMAIL \
        --redirect

    if [ $? -eq 0 ]; then
        echo -e "\n${GREEN}✓ SSL certificate obtained and configured${NC}\n"
    else
        echo -e "\n${RED}✗ Failed to obtain SSL certificate${NC}"
        exit 1
    fi
}

# Function to setup auto-renewal
setup_renewal() {
    echo -e "${YELLOW}Setting up automatic certificate renewal...${NC}"

    # Certbot automatically sets up renewal via systemd timer
    # Let's test the renewal process
    certbot renew --dry-run

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Auto-renewal configured successfully${NC}\n"
    else
        echo -e "${YELLOW}Warning: Renewal test had issues, but certificate is installed${NC}\n"
    fi
}

# Function to verify SSL
verify_ssl() {
    echo -e "${YELLOW}Verifying SSL configuration...${NC}"

    FIRST_DOMAIN=$(echo $DOMAINS | cut -d',' -f1)

    # Test HTTPS
    if curl -s -o /dev/null -w "%{http_code}" https://$FIRST_DOMAIN | grep -q "200\|301\|302"; then
        echo -e "${GREEN}✓ HTTPS is working${NC}"
    else
        echo -e "${YELLOW}Warning: HTTPS test returned unexpected status${NC}"
    fi

    # Check certificate
    echo -e "\n${BLUE}Certificate details:${NC}"
    echo | openssl s_client -servername $FIRST_DOMAIN -connect $FIRST_DOMAIN:443 2>/dev/null | openssl x509 -noout -dates

    echo ""
}

# Main function
main() {
    get_domain
    get_email
    check_dns
    install_certbot
    update_nginx_config
    obtain_certificate
    setup_renewal
    verify_ssl

    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}SSL Setup Completed!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "Your site is now secured with HTTPS"
    echo -e "Certificate will auto-renew before expiration"
    echo -e "\n${BLUE}Visit: https://$FIRST_DOMAIN${NC}\n"
}

# Run main function
main
