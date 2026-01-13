import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import pino from 'pino';
import { createPresignedUpload, initStorage } from './storage.js';
import { createApplication } from './db.js';
import { enqueueApplicationReceived } from './queue.js';

const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const app = express();
app.use(cors({ origin: ORIGIN }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 60_000, max: 10 }));

// Initialize Supabase Storage
initStorage().catch(console.error);

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Schema
const applicationSchema = z.object({
  jobId: z.string().min(1),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  coverLetter: z.string().max(10000).optional(),
  portfolio: z.string().url().optional(),
  resumeUrl: z.string().url(),
  website: z.string().max(0).optional(), // honeypot
});

// Presigned upload URL (Supabase Storage)
const uploadReqSchema = z.object({
  filename: z.string().min(1).max(255),
  contentType: z.enum(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
});
app.post('/uploads/resume', async (req, res) => {
  try {
    const parsed = uploadReqSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid request', issues: parsed.error.issues });
    }
    const { filename, contentType } = parsed.data;
    const { uploadUrl, fileUrl } = await createPresignedUpload(filename, contentType);
    return res.json({ uploadUrl, fileUrl });
  } catch (err) {
    logger.error({ err }, 'Failed to create presigned URL');
    return res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});

// Application submission (JSON)
app.post('/applications', async (req, res) => {
  try {
    const parsed = applicationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid application', issues: parsed.error.issues });
    }
    const data = parsed.data;
    
    // Honeypot check
    if (data.website !== undefined && data.website !== '') {
      logger.warn({ email: data.email }, 'Bot caught by honeypot');
      return res.status(204).end();
    }

    const application = await createApplication({
      jobId: data.jobId,
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      coverLetter: data.coverLetter,
      portfolio: data.portfolio,
      resumeUrl: data.resumeUrl,
    });
    
    await enqueueApplicationReceived({ application });
    logger.info({ id: application.id }, 'Application created');
    return res.status(201).json({ id: application.id });
    
  } catch (err) {
    logger.error({ err }, 'Failed to process application');
    return res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Static serve uploads (dev convenience)
app.listen(PORT, () => {
  logger.info(`🚀 Applications API running on http://localhost:${PORT}`);
});
