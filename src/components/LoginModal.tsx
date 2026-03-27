import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, Loader2, AlertCircle, Briefcase, X, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('kbdfinnotech@gmail.com');
  const [password, setPassword] = useState('Kbd@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConfigured) {
      // Demo bypass for the requested default credentials even if Supabase is not configured
      if (email === 'kbdfinnotech@gmail.com' && password === 'Kbd@2026') {
        localStorage.setItem('kbd_demo_session', 'true');
        onClose();
        navigate('/admin');
        window.location.reload();
        return;
      }
      setError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANONYMOUS_KEY in AI Studio Settings.');
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Specific handling for common configuration errors
      if (error.message.includes('Forbidden use of secret API key')) {
        setError('Configuration Error: You have used a "service_role" key instead of the "anon" key. Please update VITE_SUPABASE_ANONYMOUS_KEY in AI Studio Settings.');
        setLoading(false);
        return;
      }

      setError(error.message);
      setLoading(false);
    } else {
      onClose();
      navigate('/admin');
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="min-h-screen px-4 text-center flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-primary/80 backdrop-blur-md"
            />
            
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="inline-block w-full max-w-md bg-primary rounded-[3rem] shadow-2xl overflow-hidden text-left align-middle transition-all transform relative my-8 border border-white/10"
            >
              <button 
                onClick={onClose}
                className="absolute right-8 top-8 p-3 hover:bg-white/10 rounded-2xl transition-all text-white/40 hover:text-white z-10"
              >
                <X size={20} />
              </button>

              <div className="p-10 md:p-12">
                <div className="flex flex-col items-center mb-12">
                  <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-accent/20 transform -rotate-6">
                    <Briefcase className="text-primary" size={36} />
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Admin Access</h2>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mt-3">Zentrix Secure Portal</p>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center gap-4 text-xs font-bold uppercase tracking-widest"
                  >
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-14 pr-5 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent text-white transition-all font-medium"
                        placeholder="admin@zentrix.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-14 pr-14 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent text-white transition-all font-medium"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent text-primary py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white transition-all duration-500 shadow-2xl shadow-accent/20 disabled:opacity-50 group"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                      <>
                        Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              <div className="bg-white/5 p-6 text-center border-t border-white/10">
                <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-black">
                  Authorized Personnel Only
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
