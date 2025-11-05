# Deployment Scripts

This folder contains all the scripts and configuration files needed to deploy the Madares Score Prototype to a Hetzner VPS.

## Quick Start

### 1. Initial Server Setup (First Time Only)

```bash
# On your VPS (as root)
git clone https://github.com/dem8oct/madares-score-prototype.git
cd madares-score-prototype
chmod +x deployment/initial-setup.sh
sudo ./deployment/initial-setup.sh
```

### 2. Configure DNS

Point your domain's A record to your server IP address and wait for DNS propagation (5-30 minutes).

### 3. Setup SSL Certificate

```bash
# On your VPS (as root)
cd /var/www/madares-score-prototype
sudo ./deployment/setup-ssl.sh
```

### 4. Deploy Updates (After Initial Setup)

```bash
# On your VPS (as deploy user)
su - deploy
/var/www/madares-score-prototype/deployment/deploy.sh
```

## Files Overview

### Scripts

| File | Description | Run As | When to Use |
|------|-------------|--------|-------------|
| `initial-setup.sh` | Complete server setup | `root` | First time only |
| `setup-ssl.sh` | SSL certificate setup | `root` | After DNS configured |
| `deploy.sh` | Update application | `deploy` | Every deployment |

### Configuration Files

| File | Description | Usage |
|------|-------------|-------|
| `nginx.conf` | Nginx server configuration | Copied by initial-setup.sh |
| `.env.example` | Environment variables template | Reference only |
| `DEPLOYMENT.md` | Complete deployment guide | Read before deploying |
| `README.md` | This file | Quick reference |

## Workflow Diagram

```
┌─────────────────────────────────────┐
│   1. Run initial-setup.sh (once)    │
│   - Installs all software            │
│   - Builds application               │
│   - Configures Nginx                 │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│   2. Configure DNS                   │
│   - Add A record to domain           │
│   - Wait for propagation             │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│   3. Run setup-ssl.sh (once)         │
│   - Obtains SSL certificate          │
│   - Configures HTTPS                 │
│   - Site goes live!                  │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│   4. Run deploy.sh (for updates)     │
│   - Pulls latest code                │
│   - Rebuilds application             │
│   - Deploys updates                  │
└─────────────────────────────────────┘
```

## Prerequisites

- Hetzner VPS (Ubuntu 22.04 LTS recommended)
- Domain name with DNS access
- SSH access to server
- Root/sudo privileges

## What Gets Installed

- **Node.js 20.x LTS** - JavaScript runtime
- **Nginx** - Web server
- **Certbot** - SSL certificate manager
- **Git** - Version control
- **UFW** - Firewall
- **Essential build tools** - For compiling packages

## Server Setup Details

### Created Users
- `deploy` - Dedicated deployment user with sudo access

### Firewall Rules (UFW)
- Port 22 (SSH) - Open
- Port 80 (HTTP) - Open (redirects to HTTPS)
- Port 443 (HTTPS) - Open
- All other ports - Blocked

### Directory Structure
```
/var/www/madares-score-prototype/     # Application
/var/backups/madares-score/            # Backups
/etc/nginx/sites-available/            # Nginx config
/etc/letsencrypt/                      # SSL certificates
/var/log/nginx/                        # Logs
```

## Troubleshooting

### Scripts not executable?
```bash
chmod +x deployment/*.sh
```

### Permission denied?
```bash
sudo chown -R deploy:deploy /var/www/madares-score-prototype
```

### Nginx errors?
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/madares-score-error.log
```

### DNS not resolving?
```bash
dig yourdomain.com
nslookup yourdomain.com
```

## Getting Help

For detailed instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**

## Security Notes

- All scripts include error checking (`set -e`)
- Firewall is configured automatically
- SSL certificates auto-renew
- Backups are created before each deployment
- Scripts use sudo only where necessary

## Maintenance

### Check logs
```bash
sudo tail -f /var/log/nginx/madares-score-access.log
sudo tail -f /var/log/nginx/madares-score-error.log
```

### View backups
```bash
ls -lh /var/backups/madares-score/
```

### Update system
```bash
sudo apt update && sudo apt upgrade -y
```

### Check SSL certificate
```bash
sudo certbot certificates
```

## Time Estimates

- **Initial Setup:** 10-15 minutes
- **DNS Propagation:** 5-30 minutes (not in your control)
- **SSL Setup:** 5-10 minutes
- **Future Deployments:** 3-5 minutes

---

**Total deployment time (first time):** 20-55 minutes (including DNS wait time)

**Total deployment time (updates):** 3-5 minutes

---

## Support

For issues or questions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed documentation
2. Review script output for error messages
3. Check logs in `/var/log/nginx/`
4. Verify DNS configuration with `dig` or online tools

---

Last updated: November 5, 2025
