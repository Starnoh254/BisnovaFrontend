# Quick Start: Automated Deployment Setup

Follow these steps to set up automated deployment for BisnovaFrontend:

## 🚀 Step 1: Run VPS Setup
```bash
# SSH into your VPS
ssh your-username@your-vps-ip

# Navigate to project directory  
cd /var/www/BisnovaFrontend

# Run the setup script
chmod +x vps-setup.sh
./vps-setup.sh
```

## 🔑 Step 2: Configure GitHub Secrets

The setup script will show you the SSH private key. Copy it and add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

- `VPS_HOST`: Your VPS IP address or domain
- `VPS_USERNAME`: Your VPS username
- `VPS_SSH_KEY`: The private SSH key (from setup script output)
- `VPS_PORT`: SSH port (usually 22)

## ✅ Step 3: Test Automated Deployment

Make a small change to your code and push:

```bash
git add .
git commit -m "Test automated deployment"
git push origin main
```

## 📊 Step 4: Monitor Deployment

- Go to your GitHub repository > Actions tab
- Watch the deployment workflow run
- Check your VPS to confirm the changes are live

## 🔄 That's it!

From now on, every push to the main branch will automatically:
1. Run tests and build checks
2. Deploy to your VPS
3. Create backups
4. Rollback if anything fails

## 🛠️ Troubleshooting

If deployment fails:
1. Check GitHub Actions logs
2. SSH into VPS and check: `sudo systemctl status nginx`
3. Check deployment logs: `tail -f /var/log/nginx/error.log`
4. Manual rollback: `cd /var/www/BisnovaFrontend && ./deploy.sh`

## 📱 Optional: Slack Notifications

To get deployment notifications in Slack:
1. Create a Slack webhook URL
2. Add `SLACK_WEBHOOK` secret to GitHub
3. Uncomment notification code in deploy.sh
