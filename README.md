# Soma Portfolio & CMS - Hostinger Deployment Guide

This project is a high-performance React (Vite + Tailwind CSS) portfolio with an exclusive Admin CMS powered by Firebase Firestore.

---

## 🚀 How to Publish to Hostinger via GitHub

We have pre-configured everything for Hostinger:
- **`public/.htaccess`**: Automatically copied to `dist/.htaccess` during build to handle React client-side routing and Gzip compression on Hostinger's Apache/LiteSpeed web servers.
- **`vite.config.ts`**: Set with `base: './'` for universal asset paths.
- **`.github/workflows/deploy-hostinger.yml`**: Automatic CI/CD workflow that builds and pushes updates to Hostinger every time you push to GitHub!

---

### Method 1: Automatic GitHub Actions Deployment (Recommended)

Whenever you push to your GitHub `main` branch, GitHub will automatically build your site and deploy it straight to your Hostinger `public_html` directory!

#### Step 1: Get your Hostinger FTP Credentials
1. Log in to your [Hostinger hPanel](https://hpanel.hostinger.com/).
2. Navigate to **Websites** -> click **Manage** on your domain.
3. In the left sidebar or search bar, go to **Files** -> **FTP Accounts**.
4. Note down:
   - **FTP Host / IP** (e.g. `ftp.yourdomain.com` or an IP address like `185.xxx.xxx.xxx`)
   - **FTP Username** (e.g. `u123456789`)
   - **FTP Password** (Set or change if you don't remember)
   - Ensure the directory is pointing to `/public_html` or `/`

#### Step 2: Add Secrets to Your GitHub Repository
1. Go to your GitHub repository in your browser.
2. Click on **Settings** (tab at the top).
3. In the left sidebar, click **Secrets and variables** -> **Actions**.
4. Click the green button: **New repository secret**.
5. Add these 3 secrets one by one:
   - **Name**: `HOSTINGER_FTP_SERVER`
     - **Value**: Your Hostinger FTP Host (e.g., `ftp.yourdomain.com` or Hostinger FTP IP)
   - **Name**: `HOSTINGER_FTP_USERNAME`
     - **Value**: Your Hostinger FTP username
   - **Name**: `HOSTINGER_FTP_PASSWORD`
     - **Value**: Your Hostinger FTP password

#### Step 3: Push to GitHub!
Now simply push your code to the `main` branch:
```bash
git add .
git commit -m "Deploy to Hostinger"
git push origin main
```
GitHub Actions will automatically run the **Deploy to Hostinger via FTP** workflow, compile `npm run build`, and upload your site to `public_html/`.

---

### Method 3: Hostinger Git / Deployments (Direct from hPanel)

If you connected your GitHub repo directly inside Hostinger hPanel (**Websites -> Deployments**):

#### Option A (Recommended): If Framework is set to **Express**
Hostinger requires an **Entry File** and **Output Directory**:
- **Framework**: `Express`
- **Entry File**: `server.js` (We created this production server to serve `dist/`)
- **Output Directory**: `dist`
- **Build Command**: `npm run build`
- **Start Command**: `npm start` (or `node server.js`)
- **Node version**: `20.x` or `22.x`

#### Option B: If Framework is set to **Vite** / **React**
- **Framework**: `Vite` (or `Other` / `Static`)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node version**: `20.x` or `22.x`

2. Click **Fix and redeploy** or **Redeploy** in Hostinger!

If you prefer uploading files directly:
1. Run in your terminal:
   ```bash
   npm install
   npm run build
   ```
2. Open the generated `dist` folder.
3. In Hostinger hPanel, go to **Files** -> **File Manager**.
4. Open the `public_html` directory.
5. Upload all files and folders from inside `dist/` (including `index.html`, `assets/`, `.htaccess`) directly into `public_html/`.
6. Your website is immediately live!
