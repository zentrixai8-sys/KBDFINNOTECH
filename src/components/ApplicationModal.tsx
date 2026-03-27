import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { X, Send, Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
  company: string;
}

export const ApplicationModal = ({ isOpen, onClose, jobId, jobTitle, company }: ApplicationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume_url: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setStatus({ type: 'error', message: 'Supabase is not configured.' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert([{
          job_id: jobId,
          candidate_name: formData.name,
          candidate_email: formData.email,
          candidate_phone: formData.phone,
          resume_url: formData.resume_url,
          message: formData.message,
          status: 'pending'
        }]);

      if (error) throw error;

      setStatus({ type: 'success', message: 'Application submitted successfully!' });
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', phone: '', resume_url: '', message: '' });
        setStatus(null);
      }, 2000);
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setStatus({ type: 'error', message: err.message || 'Failed to submit application.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-primary rounded-[3rem] shadow-2xl overflow-hidden border border-white/10"
      >
        <div className="p-10 md:p-16">
          <div className="flex justify-between items-start mb-12">
            <div>
              <span className="text-accent font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Application Form</span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter mb-4">
                JOIN THE <br />
                <span className="text-white/30">ELITE TEAM</span>
              </h2>
              <p className="text-white/40 font-bold text-xs uppercase tracking-widest">
                {jobTitle} <span className="text-accent">@ {company}</span>
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-white/10 rounded-2xl transition-all text-white/40 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {status && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-10 p-6 rounded-2xl flex items-center gap-4 border ${
                status.type === 'success' 
                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}
            >
              {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              <span className="font-black text-xs uppercase tracking-widest">{status.message}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-6 py-5 bg-white/5 rounded-2xl border border-white/10 text-white focus:outline-none focus:border-accent transition-all font-medium"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-5 bg-white/5 rounded-2xl border border-white/10 text-white focus:outline-none focus:border-accent transition-all font-medium"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-6 py-5 bg-white/5 rounded-2xl border border-white/10 text-white focus:outline-none focus:border-accent transition-all font-medium"
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Resume Link (Google Drive/Dropbox)</label>
              <input
                type="url"
                required
                value={formData.resume_url}
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                className="w-full px-6 py-5 bg-white/5 rounded-2xl border border-white/10 text-white focus:outline-none focus:border-accent transition-all font-medium"
                placeholder="https://drive.google.com/..."
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Brief Message (Optional)</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-6 py-5 bg-white/5 rounded-2xl border border-white/10 text-white focus:outline-none focus:border-accent transition-all resize-none font-medium"
                placeholder="Tell us a bit about yourself..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-primary py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-2xl shadow-accent/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
