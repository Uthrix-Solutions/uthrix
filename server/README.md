# UthriX Applications API

A production-ready Express server for job applications using:
- **Supabase Storage** for resume uploads
- **Supabase Postgres** for data persistence  
- **BullMQ + Redis** for email queue
- **SendGrid** for transactional emails

## Quick Start

1. **Configure environment** (copy `.env.example` to `.env`):
   - Add Supabase URL and service key (Settings > API)
   - Add database connection string
   - Add SendGrid API key
   - Add Redis URL (local or Upstash)

2. **Install and setup**:

```powershell
cd server
npm install
npx prisma generate
npx prisma db push
```

3. **Run backend**:

```powershell
npm run dev
```

4. **Run email worker** (separate terminal):

```powershell
npm run worker
```

## Endpoints

### `POST /uploads/resume`
Returns presigned upload URL for Supabase Storage.

**Request:**
```json
{
  "filename": "resume.pdf",
  "contentType": "application/pdf"
}
```

**Response:**
```json
{
  "uploadUrl": "https://...supabase.co/storage/v1/object/upload/sign/...",
  "fileUrl": "https://...supabase.co/storage/v1/object/public/resumes/..."
}
```

### `POST /applications`
Accepts JSON application data with resume URL.

**Fields:**
- `jobId` (string, required)
- `fullName` (string, required)
- `email` (string email, required)
- `phone` (string, required)
- `coverLetter` (string, optional)
- `portfolio` (URL, optional)
- `resumeUrl` (URL from presigned upload, required)

**Response:**
```json
{ "id": "uuid" }
```

### `GET /health`
Health check endpoint.

## How It Works

1. **Frontend requests presigned URL** → Backend generates temporary Supabase upload URL
2. **Frontend uploads to Supabase** → Direct upload, backend never sees file
3. **Frontend submits application** → Backend saves to Postgres, enqueues email job
4. **Worker sends emails** → Confirmation to applicant + notification to HR

## Features

- ✅ **Presigned uploads** (no backend bottleneck)
- ✅ **Supabase Storage** (1GB free tier)
- ✅ **Postgres persistence** via Prisma ORM
- ✅ **Async email queue** with retry logic
- ✅ **Rate limiting** (10 req/min)
- ✅ **Bot protection** (honeypot field)
- ✅ **Structured logging** (Pino)
- ✅ **24-hour download links** in HR emails
