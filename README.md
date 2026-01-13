# UthriX Portfolio

## Getting Started

1. Run `npm install`
2. Run `npm run dev`

## Job Applications API

The application system uses **Supabase Storage** for resume uploads and **Supabase Postgres** for data.

- **Storage:** Presigned uploads (no files through backend)
- **Database:** Postgres via Prisma ORM
- **Emails:** SendGrid via BullMQ worker
- **Queue:** Redis for reliable async jobs

### Dev Server Setup

**Backend** (in `server/`):

```powershell
cd server
npm install

# Copy .env.example to .env and configure:
# - SUPABASE_URL, SUPABASE_SERVICE_KEY
# - DATABASE_URL (Supabase Postgres)
# - REDIS_URL, SENDGRID_API_KEY, etc.

npx prisma generate
npx prisma db push
npm run dev
```

**Email Worker** (separate terminal):

```powershell
cd server
npm run worker
```

**Frontend:**

```powershell
npm install
npm run dev
```

Frontend dev proxy forwards `/api/*` to `http://localhost:4000` (see [vite.config.ts](vite.config.ts)).

**Optional:** Set `VITE_APPLICATION_SIMULATE=true` to bypass backend and simulate success.

### Production Setup

**Required Services:**
1. **Supabase** (database + storage) - [supabase.com](https://supabase.com)
2. **Redis** (BullMQ queue) - Local or [Upstash](https://upstash.com)
3. **SendGrid** (emails) - [sendgrid.com](https://sendgrid.com)

**Configure `server/.env`:**

```bash
# Supabase (Settings > API)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...  # service_role key
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres

# Redis
REDIS_URL=redis://localhost:6379

# SendGrid
SENDGRID_API_KEY=SG.xxxxx
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO_HR=hr@yourdomain.com
```

**Deploy:**

```powershell
cd server
npx prisma generate
npx prisma db push
npm start  # or deploy to Railway/Render/Fly.io
```

**Run worker** (separate process/container):

```powershell
cd server
npm run worker
```
