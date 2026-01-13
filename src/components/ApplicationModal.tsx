import { AnimatePresence, motion } from 'framer-motion';
import { X, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getResumeUploadUrl, uploadResumeToSignedUrl, submitApplicationJson } from '../lib/application';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId: string;
}

export function ApplicationModal({ isOpen, onClose, jobTitle, jobId }: ApplicationModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const dialogRef = useRef<HTMLDivElement | null>(null);

  const isEmailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);
  const isPhoneValid = useMemo(() => phone.replace(/\D/g, '').length >= 9, [phone]);
  const isPortfolioValid = useMemo(() => {
    if (!portfolio) return true;
    try {
      const u = new URL(portfolio);
      return ['http:', 'https:'].includes(u.protocol);
    } catch {
      return false;
    }
  }, [portfolio]);
  const isResumeValid = useMemo(() => {
    if (!resume) return false;
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const sizeOk = resume.size <= 5 * 1024 * 1024;
    return allowed.includes(resume.type) && sizeOk;
  }, [resume]);

  const isFormValid = fullName.trim().length > 2 && isEmailValid && isPhoneValid && isPortfolioValid && isResumeValid && !honeypot;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setStatus('idle');
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid || !resume) return;
    setIsSubmitting(true);
    setErrorText('');
    try {
      // 1) Request presigned upload URL
      const presigned = await getResumeUploadUrl(resume.name, resume.type);
      if (!presigned.ok || !presigned.uploadUrl || !presigned.fileUrl) {
        setStatus('error');
        setErrorText(presigned.message || 'Failed to prepare upload');
        return;
      }
      // 2) Upload file directly to storage
      const up = await uploadResumeToSignedUrl(presigned.uploadUrl, resume);
      if (!up.ok) {
        setStatus('error');
        setErrorText(up.message || 'Failed to upload resume');
        return;
      }
      // 3) Submit application JSON referencing the file URL
      const result = await submitApplicationJson({
        jobId,
        fullName,
        email,
        phone,
        coverLetter,
        portfolio,
        resumeUrl: presigned.fileUrl,
      });
      if (result.ok) {
        setStatus('success');
        setTimeout(() => {
          setFullName('');
          setEmail('');
          setPhone('');
          setCoverLetter('');
          setPortfolio('');
          setResume(null);
          setStatus('idle');
          onClose();
        }, 1800);
      } else {
        setStatus('error');
        setErrorText(result.message || 'Submission failed');
      }
    } catch (err) {
      setStatus('error');
      setErrorText('Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            role="dialog"
            aria-modal="true"
            aria-label="Apply Now"
            className="relative bg-[var(--bg-primary)] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-[var(--bg-secondary)] bg-[var(--bg-primary)]">
              <div>
                <h2 className="text-2xl font-bold">Apply Now</h2>
                <p className="text-sm text-[var(--text-secondary)]">{jobTitle || 'General Application'}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors" aria-label="Close">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Application submitted</h3>
                  <p className="text-[var(--text-secondary)]">We will review and respond soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-600">
                      <AlertCircle className="w-5 h-5" />
                      <span>{errorText}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--bg-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-invalid={fullName.trim().length <= 2}
                      aria-label="Full Name"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--bg-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-invalid={!isEmailValid}
                      aria-label="Email"
                      required
                    />
                  </div>

                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--bg-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-invalid={!isPhoneValid}
                    aria-label="Phone Number"
                    required
                  />

                  <div className="border-2 border-dashed border-[var(--bg-secondary)] rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResume(e.target.files?.[0] || null)}
                      className="hidden"
                      id="resume"
                      aria-label="Resume"
                      required
                    />
                    <label htmlFor="resume" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="font-semibold">Upload Resume *</p>
                      <p className="text-sm text-[var(--text-secondary)]">PDF, DOC, or DOCX, max 5MB</p>
                      {resume && <p className="text-sm text-green-500 mt-2">{resume.name}</p>}
                    </label>
                    {!isResumeValid && resume && (
                      <p className="text-xs text-red-600 mt-2">Invalid file type or size</p>
                    )}
                  </div>

                  <textarea
                    placeholder="Cover Letter (Optional)"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--bg-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    aria-label="Cover Letter"
                  />

                  <input
                    type="url"
                    placeholder="Portfolio/GitHub Link (Optional)"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--bg-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-invalid={!isPortfolioValid}
                    aria-label="Portfolio URL"
                  />

                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    aria-hidden="true"
                    tabIndex={-1}
                  />

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-2 border border-[var(--bg-secondary)] rounded-lg font-semibold hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormValid}
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? 'Submitting…' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
