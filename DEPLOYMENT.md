# Deployment Guide

## 🚀 **Automated Deployment Setup**

This project uses GitHub Actions to automatically deploy:
- **Frontend** → GitHub Pages
- **Backend** → Railway (free tier)

---

## 📦 **Prerequisites**

### 1. Enable GitHub Pages

1. Go to your GitHub repo → **Settings** → **Pages**
2. Under **Source**, select:
   - Source: **GitHub Actions**
3. Save

### 2. Setup Railway (Backend Hosting)

#### **Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your `uthrix` repository
5. Choose `server` folder as the root directory

#### **Add Environment Variables in Railway**
In Railway dashboard → your project → **Variables** tab, add:

```bash
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...
DATABASE_URL=postgresql://postgres.xxx:password@aws-0-region.pooler.supabase.com:6543/postgres

# Redis (use Railway's Redis add-on)
REDIS_URL=redis://default:password@redis.railway.internal:6379

# SendGrid
SENDGRID_API_KEY=SG.xxxxx
EMAIL_FROM=careers@uthrix.com
EMAIL_TO_HR=careers@uthrix.com

# Production settings
NODE_ENV=production
PORT=4000
LOG_LEVEL=info
CORS_ORIGIN=https://yourusername.github.io
```

#### **Add Redis to Railway**
1. In Railway dashboard → **New** → **Database** → **Add Redis**
2. Copy the `REDIS_URL` from Redis service variables
3. Add to your backend service variables

#### **Get Railway Token for GitHub Actions**
1. Railway dashboard → **Account Settings** → **Tokens**
2. Click **"Create Token"**
3. Copy the token

### 3. Add GitHub Secrets

Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `RAILWAY_TOKEN` | `your_railway_token` | From Railway account settings |
| `VITE_APPLICATION_API_URL` | `https://your-backend.railway.app/api/applications` | Railway backend URL |
| `VITE_UPLOAD_API_URL` | `https://your-backend.railway.app/api/uploads/resume` | Railway upload endpoint |

---

## 🔧 **Deployment Process**

### **Automatic Deployment (on push to main)**

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main
```

This triggers:
1. **Frontend workflow** → Builds and deploys to GitHub Pages
2. **Backend workflow** → Deploys to Railway

### **Manual Deployment**

Go to **Actions** tab → Select workflow → **Run workflow**

---

## 📊 **Post-Deployment Steps**

### 1. Run Database Migrations on Railway

In Railway dashboard → your backend service → **Settings** → **Deploy**:

Add to **Build Command**:
```bash
npx prisma generate && npx prisma db push
```

Or run manually in Railway's terminal:
```bash
npx prisma db push
```

### 2. Setup Worker Process

Railway supports multiple processes. In your Railway service:

1. Go to **Settings** → **Deploy**
2. Under **Start Command**, it will use the `Procfile`:
   - `web` process runs `npm start` (API server)
   - `worker` process runs `npm run worker` (email queue)

Railway will automatically run both.

### 3. Verify Deployment

- **Frontend:** `https://yourusername.github.io/uthrix`
- **Backend:** `https://your-backend.railway.app/health`

---

## 🔄 **Alternative: Deploy Backend to Render**

If you prefer Render over Railway:

### **Setup Render**

1. Go to [render.com](https://render.com)
2. **New** → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npx prisma generate && npx prisma db push`
   - **Start Command:** `npm start`
   - **Environment:** Node

### **Add Worker Service**

1. **New** → **Background Worker**
2. Same repo, `server` directory
3. **Start Command:** `npm run worker`
4. Add same environment variables

### **GitHub Actions for Render**

Create `.github/workflows/deploy-backend-render.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]
    paths: ['server/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Render Deploy
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

Add `RENDER_DEPLOY_HOOK` secret (from Render dashboard → Settings → Deploy Hook).

---

## 🐳 **Alternative: Docker Deployment**

For AWS/GCP/Azure, use Docker:

### **Create Dockerfile**

```dockerfile
# server/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
EXPOSE 4000
CMD ["npm", "start"]
```

### **Docker Compose (with worker)**

```yaml
# server/docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "4000:4000"
    env_file: .env
    
  worker:
    build: .
    command: npm run worker
    env_file: .env
```

---

## 📝 **Environment Variables Checklist**

### **Frontend (.env or GitHub Secrets)**
- `VITE_APPLICATION_API_URL` - Backend applications endpoint
- `VITE_UPLOAD_API_URL` - Backend upload endpoint

### **Backend (Railway/Render Environment Variables)**
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `DATABASE_URL`
- `REDIS_URL`
- `SENDGRID_API_KEY`
- `EMAIL_FROM`
- `EMAIL_TO_HR`
- `NODE_ENV=production`
- `CORS_ORIGIN` - Your frontend URL

---

## 🔍 **Troubleshooting**

### Frontend build fails
- Check `vite.config.ts` base path matches repo name
- Verify GitHub Pages is enabled
- Check Actions permissions (Settings → Actions → General → Workflow permissions)

### Backend deployment fails
- Check Railway/Render logs
- Verify all environment variables are set
- Run `npx prisma generate` before deploy
- Check database connection string

### Worker not processing jobs
- Verify Redis is running and accessible
- Check `REDIS_URL` is correct
- View worker logs in Railway/Render dashboard
- Ensure worker process is running separately

### CORS errors
- Update `CORS_ORIGIN` in backend to match frontend URL
- Check frontend is using correct API URLs

---

## 📞 **Support**

- Railway: [docs.railway.app](https://docs.railway.app)
- Render: [render.com/docs](https://render.com/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
