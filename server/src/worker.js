import 'dotenv/config';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import sgMail from '@sendgrid/mail';
import pino from 'pino';
import { getSignedDownloadUrl } from './storage.js';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const connection = new IORedis(process.env.REDIS_URL);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const worker = new Worker('applications', async (job) => {
  if (job.name === 'application.received') {
    const { application } = job.data;
    
    // Extract path from Supabase public URL for signed download
    const urlPath = new URL(application.resumeUrl).pathname;
    const resumePath = urlPath.split('/').pop();
    const downloadUrl = await getSignedDownloadUrl(resumePath, 86400); // 24 hours
    
    const toApplicant = {
      to: application.email,
      from: process.env.EMAIL_FROM,
      subject: `Application Received - UthriX`,
      html: `
        <h2>Thank you for applying!</h2>
        <p>Hi ${application.fullName},</p>
        <p>We received your application for <strong>${application.jobId}</strong>.</p>
        <p>We'll review your application and get back to you soon.</p>
        <br>
        <p>Best regards,<br>UthriX Team</p>
      `,
    };
    
    const toHR = {
      to: process.env.EMAIL_TO_HR,
      from: process.env.EMAIL_FROM,
      subject: `New Application: ${application.fullName} - ${application.jobId}`,
      html: `
        <h2>New Application Received</h2>
        <p><strong>Name:</strong> ${application.fullName}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Phone:</strong> ${application.phone}</p>
        <p><strong>Position:</strong> ${application.jobId}</p>
        <p><strong>Portfolio:</strong> ${application.portfolio || 'N/A'}</p>
        <br>
        <p><strong>Cover Letter:</strong></p>
        <p style="white-space: pre-wrap;">${application.coverLetter || 'N/A'}</p>
        <br>
        <p><a href="${downloadUrl}" style="background: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download Resume</a></p>
        <p><small>Link expires in 24 hours</small></p>
      `,
    };
    
    await sgMail.send(toApplicant);
    await sgMail.send(toHR);
    logger.info({ id: job.id, applicationId: application.id }, 'Emails sent');
  }
}, { connection });

worker.on('completed', (job) => logger.info({ jobId: job.id }, 'Job completed'));
worker.on('failed', (job, err) => logger.error({ jobId: job?.id, err }, 'Job failed'));

logger.info('📧 Email worker started');
