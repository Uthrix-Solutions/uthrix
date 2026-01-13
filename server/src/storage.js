import { createClient } from '@supabase/supabase-js';
import crypto from 'node:crypto';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const BUCKET_NAME = 'resumes';

// Initialize bucket on first run
export async function initStorage() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some(b => b.name === BUCKET_NAME);
    
    if (!exists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
      });
      console.log('✅ Resumes bucket created');
    }
  } catch (error) {
    console.error('Storage init error:', error);
  }
}

// Generate presigned upload URL
export async function createPresignedUpload(filename, contentType) {
  const timestamp = Date.now();
  const randomId = crypto.randomUUID();
  const sanitized = filename.replace(/[^\w.\-]/g, '_');
  const path = `${timestamp}-${randomId}-${sanitized}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUploadUrl(path);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);

  return {
    uploadUrl: data.signedUrl,
    fileUrl: publicUrl,
    path
  };
}

// Generate signed download URL (for HR emails)
export async function getSignedDownloadUrl(path, expiresIn = 86400) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(path, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}

export { supabase };
