export interface ApplicationPayload {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  portfolio?: string;
  resume: File;
}

export async function getResumeUploadUrl(filename: string, contentType: string): Promise<{ ok: boolean; uploadUrl?: string; fileUrl?: string; message?: string }> {
  const endpoint = import.meta.env.VITE_UPLOAD_API_URL || '/api/uploads/resume';
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, contentType })
    });
    if (!res.ok) return { ok: false, message: `Server responded ${res.status}` };
    const data = await res.json();
    return { ok: true, uploadUrl: data.uploadUrl, fileUrl: data.fileUrl };
  } catch (err: any) {
    return { ok: false, message: 'Network error' };
  }
}

export async function uploadResumeToSignedUrl(uploadUrl: string, file: File): Promise<{ ok: boolean; message?: string }> {
  try {
    const res = await fetch(uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
    if (!res.ok) return { ok: false, message: `Upload failed ${res.status}` };
    return { ok: true };
  } catch (err: any) {
    return { ok: false, message: 'Upload error' };
  }
}

export async function submitApplicationJson(payload: Omit<ApplicationPayload, 'resume'> & { resumeUrl: string }): Promise<{ ok: boolean; message?: string }> {
  const endpoint = import.meta.env.VITE_APPLICATION_API_URL || '/api/applications';
  try {
    if (import.meta.env.VITE_APPLICATION_SIMULATE === 'true') {
      await new Promise((r) => setTimeout(r, 600));
      return { ok: true };
    }
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) return { ok: false, message: `Server responded ${res.status}` };
    return { ok: true };
  } catch (err: any) {
    return { ok: false, message: 'Network error' };
  }
}
