export interface ApplicationPayload {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  portfolio?: string;
  resume: File;
}

export async function submitApplication(payload: ApplicationPayload): Promise<{ ok: boolean; message?: string }> {
  const endpoint = import.meta.env.VITE_APPLICATION_API_URL || '/api/applications';
  const fd = new FormData();
  fd.append('jobId', payload.jobId);
  fd.append('fullName', payload.fullName);
  fd.append('email', payload.email);
  fd.append('phone', payload.phone);
  if (payload.coverLetter) fd.append('coverLetter', payload.coverLetter);
  if (payload.portfolio) fd.append('portfolio', payload.portfolio);
  fd.append('resume', payload.resume);

  try {
    if (!import.meta.env.VITE_APPLICATION_API_URL && import.meta.env.DEV) {
      await new Promise((r) => setTimeout(r, 800));
      return { ok: true };
    }
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 20000);
    const res = await fetch(endpoint, { method: 'POST', body: fd, signal: ctrl.signal });
    clearTimeout(to);
    if (!res.ok) {
      return { ok: false, message: `Server responded ${res.status}` };
    }
    return { ok: true };
  } catch (err: any) {
    const msg = err?.name === 'AbortError' ? 'Request timed out' : 'Network error';
    return { ok: false, message: msg };
  }
}
