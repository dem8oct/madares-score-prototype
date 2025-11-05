# Madares Score Prototype - Deployment Guide

Complete guide for deploying the Madares Score Prototype to a Hetzner VPS with custom domain and SSL.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Server Setup](#initial-server-setup)
3. [DNS Configuration](#dns-configuration)
4. [SSL Certificate Setup](#ssl-certificate-setup)
5. [Deployment Process](#deployment-process)
6. [Maintenance](#maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Services

- **Hetzner VPS Account** with an active server
  - Recommended: Ubuntu 22.04 LTS
  - Minimum: 2 GB RAM, 1 vCPU, 20 GB SSD
  - Recommended: 4 GB RAM, 2 vCPU, 40 GB SSD

- **Domain Name** registered and accessible
  - Access to DNS management panel
  - Ability to create A records

- **SSH Access** to your VPS
  - SSH key pair configured (recommended)
  - Root or sudo access

### Local Requirements

- SSH client (Terminal on Mac/Linux, PuTTY on Windows)
- Git (for cloning repository locally, optional)

---

## Initial Server Setup

### Step 1: Connect to Your Server

```bash
# Connect via SSH (replace with your server IP)
ssh root@YOUR_SERVER_IP
```

### Step 2: Download Setup Scripts

Option A: Clone the repository
```bash
git clone https://github.com/dem8oct/madares-score-prototype.git
cd madares-score-prototype
```

Option B: Download scripts directly
```bash
mkdir -p /tmp/madares-deploy
cd /tmp/madares-deploy
wget https://raw.githubusercontent.com/dem8oct/madares-score-prototype/main/deployment/initial-setup.sh
chmod +x initial-setup.sh
```

### Step 3: Run Initial Setup

```bash
# Make script executable (if not already)
chmod +x deployment/initial-setup.sh

# Run the setup script
sudo ./deployment/initial-setup.sh
```

**What this script does:**
- Updates system packages
- Installs Node.js, Nginx, Git, and essential tools
- Configures firewall (UFW) with ports 22, 80, 443
- Creates deployment user
- Clones application repository
- Builds the application
- Configures Nginx
- Sets up backup directories

**Duration:** 10-15 minutes

**Note:** You'll be prompted to:
- Set a password for the deployment user
- Choose whether to allow passwordless sudo (recommended: yes)
- Confirm if you want to re-clone the repository (if it exists)

---

## DNS Configuration

### Step 1: Get Your Server IP

The initial setup script displays your server IP at the end. You can also get it with:

```bash
curl https://api.ipify.org
```

### Step 2: Configure DNS Records

Log into your domain registrar's DNS management panel and add:

**A Record:**
```
Type: A
Name: @ (or leave blank for root domain)
Value: YOUR_SERVER_IP
TTL: 3600 (or automatic)
```

**Optional - WWW subdomain:**
```
Type: A
Name: www
Value: YOUR_SERVER_IP
TTL: 3600
```

Or use CNAME:
```
Type: CNAME
Name: www
Value: yourdomain.com
TTL: 3600
```

### Step 3: Wait for DNS Propagation

DNS changes typically take 5-30 minutes to propagate globally.

**Check DNS propagation:**
```bash
# Check if domain points to your server
dig +short yourdomain.com

# Should return your server IP
```

Online tools:
- https://www.whatsmydns.net/
- https://dnschecker.org/

---

## SSL Certificate Setup

Once DNS is configured and propagated, set up SSL with Let's Encrypt.

### Step 1: Run SSL Setup Script

```bash
# Navigate to application directory
cd /var/www/madares-score-prototype

# Run SSL setup (as root)
sudo ./deployment/setup-ssl.sh
```

### Step 2: Follow Prompts

You'll be asked for:
1. **Domain name** (e.g., `example.com`)
2. **Include www subdomain?** (y/n)
3. **Email address** (for Let's Encrypt notifications)

**What this script does:**
- Verifies DNS configuration
- Installs Certbot
- Updates Nginx configuration with your domain
- Obtains SSL certificate from Let's Encrypt
- Configures automatic renewal
- Redirects HTTP to HTTPS

**Duration:** 5-10 minutes

### Step 3: Verify SSL Installation

Visit your domain:
```
https://yourdomain.com
```

Check certificate details:
```bash
echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates
```

---

## Deployment Process

### Initial Deployment

The initial deployment is completed by the setup scripts. Your application is now live!

### Future Deployments

For updating the application with new code:

#### Option 1: Automated Deployment (Recommended)

```bash
# Switch to deployment user
su - deploy

# Run deployment script
/var/www/madares-score-prototype/deployment/deploy.sh
```

**What the deployment script does:**
1. Creates backup of current build
2. Pulls latest code from GitHub (main branch)
3. Installs dependencies
4. Builds application
5. Reloads Nginx
6. Keeps last 5 backups

**Duration:** 3-5 minutes

#### Option 2: Manual Deployment

```bash
# Switch to deployment user
su - deploy

# Navigate to application directory
cd /var/www/madares-score-prototype

# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build application
npm run build

# Reload Nginx
sudo systemctl reload nginx
```

---

## Maintenance

### SSL Certificate Renewal

Certificates auto-renew via Certbot's systemd timer.

**Check renewal status:**
```bash
sudo certbot certificates
```

**Test renewal:**
```bash
sudo certbot renew --dry-run
```

**Manual renewal (if needed):**
```bash
sudo certbot renew
sudo systemctl reload nginx
```

### Backups

Backups are stored in `/var/backups/madares-score/`

**View backups:**
```bash
ls -lh /var/backups/madares-score/
```

**Restore from backup:**
```bash
# Navigate to app directory
cd /var/www/madares-score-prototype

# Extract backup (replace timestamp)
sudo tar -xzf /var/backups/madares-score/dist_backup_TIMESTAMP.tar.gz

# Reload Nginx
sudo systemctl reload nginx
```

### Logs

**Nginx access logs:**
```bash
sudo tail -f /var/log/nginx/madares-score-access.log
```

**Nginx error logs:**
```bash
sudo tail -f /var/log/nginx/madares-score-error.log
```

**System logs:**
```bash
sudo journalctl -u nginx -f
```

### Updates

**System updates:**
```bash
sudo apt update
sudo apt upgrade -y
```

**Node.js update:**
```bash
# Check current version
node --version

# Update to latest LTS (if needed)
# Follow Node.js documentation
```

---

## Troubleshooting

### Issue: Site not loading

**Check Nginx status:**
```bash
sudo systemctl status nginx
```

**Test Nginx configuration:**
```bash
sudo nginx -t
```

**Restart Nginx:**
```bash
sudo systemctl restart nginx
```

### Issue: SSL certificate errors

**Check certificate:**
```bash
sudo certbot certificates
```

**Renew certificate:**
```bash
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

### Issue: Build fails

**Check Node.js version:**
```bash
node --version  # Should be 18+ or 20+
```

**Clear npm cache and rebuild:**
```bash
cd /var/www/madares-score-prototype
rm -rf node_modules
npm cache clean --force
npm install
npm run build
```

### Issue: DNS not resolving

**Check DNS configuration:**
```bash
dig yourdomain.com
nslookup yourdomain.com
```

**Flush local DNS cache:**
```bash
# On server
sudo systemd-resolve --flush-caches
```

### Issue: Firewall blocking connections

**Check firewall status:**
```bash
sudo ufw status verbose
```

**Ensure required ports are open:**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
```

### Issue: Permission errors

**Fix ownership:**
```bash
sudo chown -R deploy:deploy /var/www/madares-score-prototype
```

### Issue: 502 Bad Gateway

This shouldn't happen for a static site, but if it does:

**Check if Nginx is running:**
```bash
sudo systemctl status nginx
```

**Check Nginx error logs:**
```bash
sudo tail -50 /var/log/nginx/madares-score-error.log
```

**Verify dist directory exists:**
```bash
ls -la /var/www/madares-score-prototype/dist/
```

---

## Security Considerations

### Firewall Rules

Current UFW rules:
- Port 22 (SSH) - Open
- Port 80 (HTTP) - Open (redirects to HTTPS)
- Port 443 (HTTPS) - Open
- All other ports - Blocked

### SSH Security

**Recommended improvements:**

1. **Disable password authentication:**
```bash
sudo nano /etc/ssh/sshd_config
# Set: PasswordAuthentication no
sudo systemctl restart sshd
```

2. **Change SSH port (optional):**
```bash
sudo nano /etc/ssh/sshd_config
# Change: Port 2222
sudo ufw allow 2222/tcp
sudo systemctl restart sshd
```

3. **Use SSH keys only** (already recommended in prerequisites)

### Regular Updates

Set up automatic security updates:
```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

---

## Performance Optimization

### Enable HTTP/2

Already enabled in Nginx configuration via `http2` directive.

### Enable Gzip Compression

Already enabled in Nginx configuration.

### Browser Caching

Already configured in Nginx for static assets (1 year cache).

### Monitoring

**Install monitoring tools (optional):**

```bash
# Install htop for system monitoring
sudo apt install htop

# Install nginx monitoring
sudo apt install nginx-extras
```

---

## Quick Reference Commands

```bash
# View site status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Reload Nginx (no downtime)
sudo systemctl reload nginx

# View access logs
sudo tail -f /var/log/nginx/madares-score-access.log

# View error logs
sudo tail -f /var/log/nginx/madares-score-error.log

# Deploy updates
sudo -u deploy /var/www/madares-score-prototype/deployment/deploy.sh

# Check SSL certificate
sudo certbot certificates

# Test SSL renewal
sudo certbot renew --dry-run

# Check disk space
df -h

# Check server IP
curl https://api.ipify.org
```

---

## Support & Resources

### Documentation
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Hetzner Documentation](https://docs.hetzner.com/)
- [Ubuntu Server Guide](https://ubuntu.com/server/docs)

### Useful Tools
- [SSL Labs Server Test](https://www.ssllabs.com/ssltest/) - Test SSL configuration
- [GTmetrix](https://gtmetrix.com/) - Performance testing
- [DNS Checker](https://dnschecker.org/) - Check DNS propagation

---

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│          User's Browser (HTTPS)              │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│     Let's Encrypt SSL Certificate            │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│     Nginx Web Server (Port 443)              │
│     - HTTP/2 enabled                         │
│     - Gzip compression                       │
│     - Static file caching                    │
│     - SPA routing support                    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│   React App Static Files (dist/)             │
│   /var/www/madares-score-prototype/dist/     │
│   - index.html                               │
│   - assets/ (JS, CSS, images)                │
└─────────────────────────────────────────────┘
```

---

## File Locations

- **Application:** `/var/www/madares-score-prototype/`
- **Built files:** `/var/www/madares-score-prototype/dist/`
- **Nginx config:** `/etc/nginx/sites-available/madares-score`
- **SSL certificates:** `/etc/letsencrypt/live/yourdomain.com/`
- **Backups:** `/var/backups/madares-score/`
- **Access logs:** `/var/log/nginx/madares-score-access.log`
- **Error logs:** `/var/log/nginx/madares-score-error.log`
- **Deployment scripts:** `/var/www/madares-score-prototype/deployment/`

---

## Changelog

- **2025-11-05:** Initial deployment guide created

---

**Deployment guide maintained by:** Madares Score Development Team
**Last updated:** November 5, 2025
