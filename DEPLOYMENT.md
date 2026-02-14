# Deployment Guide

This guide walks you through deploying the Pokemon Draft League app to Vercel with GitHub Actions for continuous deployment.

## Overview

- **Hosting**: Vercel (free tier available)
- **CI/CD**: GitHub Actions
- **Trigger**: Push to `master` or `main` branch deploys to production; PRs get preview deployments

---

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Node.js 20+ installed locally

---

## One-Time Setup Steps

### 1. Create GitHub Repository

```bash
cd /Users/meath/Documents/pokemon-draft/draft-league-app

# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: League creation wizard"

# Create repo on GitHub (using GitHub CLI, or do it manually on github.com)
gh repo create pokemon-draft-league --public --source=. --push

# Or if you prefer to do it manually:
# 1. Go to https://github.com/new
# 2. Create repository named "pokemon-draft-league"
# 3. Run these commands:
git remote add origin https://github.com/YOUR_USERNAME/pokemon-draft-league.git
git branch -M master
git push -u origin master
```

### 2. Create Vercel Project

**Option A: Via Vercel CLI (Recommended)**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Link project (run from project root)
cd /Users/meath/Documents/pokemon-draft/draft-league-app
vercel link

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? pokemon-draft-league (or your choice)
# - Directory with code? ./
# - Override settings? No
```

**Option B: Via Vercel Dashboard**

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Configure:
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click Deploy

### 3. Get Vercel Credentials

You need three values for GitHub Actions:

#### VERCEL_TOKEN
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it "GitHub Actions"
4. Copy the token (you won't see it again)

#### VERCEL_ORG_ID and VERCEL_PROJECT_ID
After running `vercel link`, these are stored locally:

```bash
cat .vercel/project.json
```

Output looks like:
```json
{
  "orgId": "team_xxxxxxxxxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxxxxxxxxx"
}
```

Copy both values.

### 4. Add Secrets to GitHub

1. Go to your repo on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each:

| Secret Name | Value |
|-------------|-------|
| `VERCEL_TOKEN` | Your Vercel token from step 3 |
| `VERCEL_ORG_ID` | The `orgId` from project.json |
| `VERCEL_PROJECT_ID` | The `projectId` from project.json |

### 5. Add .vercel to .gitignore

```bash
echo ".vercel" >> .gitignore
git add .gitignore
git commit -m "Add .vercel to gitignore"
git push
```

---

## Verify Deployment

### Trigger a Deployment

```bash
# Make a small change
echo "" >> README.md
git add README.md
git commit -m "Trigger deployment"
git push
```

### Check Status

1. Go to your repo on GitHub
2. Click the **Actions** tab
3. Watch the "Deploy to Vercel" workflow run
4. Once complete, visit your Vercel dashboard for the live URL

---

## How It Works

### On Push to master/main
1. **lint-and-build** job runs: installs deps, lints, builds
2. If successful, **deploy-production** job deploys to production URL

### On Pull Request
1. **lint-and-build** job runs
2. If successful, **deploy-preview** job creates a preview deployment
3. Bot comments on PR with preview URL

---

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL is automatic

---

## Environment Variables

The app uses Vite environment variables (prefixed with `VITE_`).

### Available Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3001/api` |
| `VITE_API_TIMEOUT` | API timeout in ms | `30000` |
| `VITE_APP_NAME` | App display name | `Pokemon Draft League` |
| `VITE_APP_URL` | Public app URL | `http://localhost:5173` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | `false` |
| `VITE_ENABLE_DEBUG` | Debug logging | `true` in dev |

### Local Development

```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
nano .env.local
```

Files loaded (in order, later overrides earlier):
1. `.env` - Base defaults
2. `.env.local` - Local overrides (gitignored)
3. `.env.development` - Development mode
4. `.env.development.local` - Local dev overrides (gitignored)

### Setting Up for Production

#### Option A: Vercel Dashboard (Recommended)

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add each variable:

| Name | Value | Environments |
|------|-------|--------------|
| `VITE_API_URL` | `https://api.yourdomain.com/api` | Production |
| `VITE_APP_URL` | `https://yourdomain.com` | Production |
| `VITE_APP_NAME` | `Pokemon Draft League` | All |
| `VITE_ENABLE_ANALYTICS` | `true` | Production |
| `VITE_ENABLE_DEBUG` | `false` | Production |

4. Redeploy for changes to take effect

#### Option B: GitHub Repository Variables

For variables that aren't secrets, use GitHub repository variables:

1. Go to repo **Settings** → **Secrets and variables** → **Actions**
2. Click the **Variables** tab
3. Add repository variables:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://api.yourdomain.com/api` |
| `VITE_APP_URL` | `https://yourdomain.com` |
| `VITE_APP_NAME` | `Pokemon Draft League` |
| `VITE_ENABLE_ANALYTICS` | `true` |

These are referenced in the workflow via `${{ vars.VARIABLE_NAME }}`.

### Accessing in Code

```typescript
import { env } from './config/env';

// Use typed config
console.log(env.apiUrl);      // https://api.yourdomain.com/api
console.log(env.isProduction); // true

// Or access directly
console.log(import.meta.env.VITE_API_URL);
```

### Security Notes

- All `VITE_*` variables are **bundled into client code** - never use for secrets
- For sensitive values (API keys, database URLs), use server-side only
- The `env.ts` config validates required variables at startup

---

## Troubleshooting

### Build Fails
- Check the Actions log for errors
- Run `npm run build` locally to reproduce
- Ensure Node version matches (20.x)

### Deployment Fails
- Verify all 3 secrets are set correctly
- Check Vercel dashboard for detailed logs
- Ensure the project is linked (`vercel link`)

### Preview URLs Not Appearing on PRs
- Check that the workflow has permission to comment
- Go to Settings → Actions → General → Workflow permissions
- Enable "Read and write permissions"

---

## Quick Reference

| Action | Command |
|--------|---------|
| Deploy manually | `vercel` (preview) or `vercel --prod` (production) |
| Check deployment status | `vercel ls` |
| View logs | `vercel logs [deployment-url]` |
| Rollback | Vercel Dashboard → Deployments → Promote previous |

---

## File Structure

```
.github/
  workflows/
    deploy.yml          # GitHub Actions workflow
.vercel/
  project.json          # Local Vercel config (gitignored)
src/
  config/
    env.ts              # Typed environment config
  vite-env.d.ts         # TypeScript declarations for env vars
.env.example            # Template for local setup
.env.development        # Development defaults (committed)
.env.production         # Production defaults (committed)
.env.local              # Local overrides (gitignored)
dist/                   # Build output (gitignored)
```
