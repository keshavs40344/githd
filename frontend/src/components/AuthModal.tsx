'use client';

import React, { useState, useEffect } from 'react';
import { 
  signInWithEmail, signUpWithEmail, sendMagicLink, verifyOtpToken, 
  signOutUser, getCurrentUser, isSupabaseConfigured, supabase 
} from '@/lib/supabase';
import { 
  User as UserIcon, Lock, Mail, Sparkles, KeyRound, ArrowRight, 
  CheckCircle2, AlertCircle, RefreshCw, LogOut, ShieldCheck, Eye, EyeOff 
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';
import type { User } from '@supabase/supabase-js';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (user: User) => void;
}

type AuthTab = 'signin' | 'signup' | 'otp';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (isOpen) {
      getCurrentUser().then(user => setCurrentUser(user));
      setErrorMessage('');
      setSuccessMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await signInWithEmail(email, password);
      if (res.error) throw res.error;
      if (res.data?.user) {
        const loggedUser = res.data.user;
        sacredAudio.playTempleBell(0.35);
        setSuccessMessage('शुभ प्रवेश! आपका स्वागत है। (Signed in successfully)');
        setTimeout(() => {
          onAuthSuccess && onAuthSuccess(loggedUser);
          onClose();
        }, 900);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'लॉगिन विफल रहा। कृपया विवरण पुनः जांचें।');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await signUpWithEmail(email, password, fullName);
      if (res.error) throw res.error;
      sacredAudio.playTempleBell(0.35);
      setSuccessMessage('खाता सफलतापूर्वक बनाया गया! कृपया अपनी ईमेल में सत्यापन लिंक देखें। (Verification link sent)');
      setTimeout(() => {
        if (res.data?.user) onAuthSuccess && onAuthSuccess(res.data.user);
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || 'पंजीकरण विफल रहा।');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await sendMagicLink(email);
      if (res.error) throw res.error;
      sacredAudio.playNavChime(0.15);
      setSuccessMessage('सत्यापन कोड/मैजिक लिंक आपकी ईमेल पर भेजा गया है! (Check your inbox)');
    } catch (err: any) {
      setErrorMessage(err.message || 'OTP भेजने में त्रुटि हुई।');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await verifyOtpToken(email, otpCode);
      if (res.error) throw res.error;
      if (res.data?.user) {
        const verifiedUser = res.data.user;
        sacredAudio.playTempleBell(0.35);
        setSuccessMessage('सत्यापन सफल! आपका स्वागत है। (Verified successfully)');
        setTimeout(() => {
          onAuthSuccess && onAuthSuccess(verifiedUser);
          onClose();
        }, 900);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'अमान्य OTP कोड। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    await signOutUser();
    setCurrentUser(null);
    setLoading(false);
    sacredAudio.playNavChime(0.1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-xl animate-in fade-in duration-300">
      
      <div className="bg-gradient-to-b from-obsidian-900 via-obsidian-900 to-amber-950/30 border border-gold-500/35 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Close Button */}
        <div className="flex items-center justify-between border-b border-gold-500/15 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-obsidian-950 font-bold text-lg shadow-[0_0_15px_rgba(232,163,32,0.4)]">
              ॐ
            </span>
            <div>
              <h3 className="font-cinzel text-base font-bold text-gold-100">
                साधक द्वार (Dharma Auth)
              </h3>
              <p className="text-[11px] text-gold-400/70 font-sans">
                PostgreSQL & Supabase Cloud Sync
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gold-400/60 hover:text-gold-200 hover:bg-obsidian-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* If user is already logged in */}
        {currentUser ? (
          <div className="space-y-5 text-center py-4 relative z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-amber-600 mx-auto flex items-center justify-center text-obsidian-950 font-bold text-2xl shadow-xl animate-pulse">
              {(currentUser.user_metadata?.full_name || currentUser.email || 'ॐ')[0].toUpperCase()}
            </div>
            
            <div className="space-y-1">
              <h4 className="font-devanagari text-base font-bold text-gold-100">
                {currentUser.user_metadata?.full_name || 'साधक (Sadhaka)'}
              </h4>
              <p className="text-xs text-gold-400/80 font-mono">
                {currentUser.email}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 mt-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>सत्यापित साधक (Verified Session)</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 font-bold text-xs font-sans shadow-lg cursor-pointer"
              >
                साधना जारी रखें (Continue)
              </button>

              <button
                onClick={handleSignOut}
                disabled={loading}
                className="w-full py-2.5 rounded-2xl bg-obsidian-800 hover:bg-red-500/20 text-gold-300 hover:text-red-300 border border-gold-500/20 text-xs font-sans flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>लॉग आउट (Sign Out)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Forms */
          <div className="space-y-5 relative z-10">
            
            {/* Tabs */}
            <div className="flex rounded-2xl bg-obsidian-950/80 p-1 border border-gold-500/15">
              {[
                { id: 'signin', label: 'प्रवेश (Sign In)' },
                { id: 'signup', label: 'पंजीकरण (Sign Up)' },
                { id: 'otp',    label: 'OTP / Magic Link' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as AuthTab);
                    setErrorMessage('');
                    setSuccessMessage('');
                    sacredAudio.playNavChime(0.1);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold shadow-md'
                      : 'text-gold-300/60 hover:text-gold-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Error / Success Banners */}
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form: Sign In */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-gold-400/80 font-semibold">
                    ईमेल (Email)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gold-500/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seeker@dharma.os"
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-gold-100 placeholder:text-gold-500/30 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-gold-400/80 font-semibold">
                    पासवर्ड (Password)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gold-500/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl pl-10 pr-10 py-2.5 text-xs text-gold-100 placeholder:text-gold-500/30 focus:outline-none focus:border-gold-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold-500/40 hover:text-gold-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 text-obsidian-950 font-bold text-xs font-sans shadow-[0_0_20px_rgba(232,163,32,0.35)] hover:scale-102 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  <span>साधना कक्ष में प्रवेश करें (Sign In)</span>
                </button>
              </form>
            )}

            {/* Form: Sign Up */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-gold-400/80 font-semibold">
                    साधक नाम (Full Name)
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-gold-500/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="पार्थ / अर्जुन"
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-gold-100 placeholder:text-gold-500/30 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-gold-400/80 font-semibold">
                    ईमेल (Email)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gold-500/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seeker@dharma.os"
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-gold-100 placeholder:text-gold-500/30 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-gold-400/80 font-semibold">
                    पासवर्ड (Password)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gold-500/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="कम से कम ६ अक्षर (Min 6 chars)"
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl pl-10 pr-10 py-2.5 text-xs text-gold-100 placeholder:text-gold-500/30 focus:outline-none focus:border-gold-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold-500/40 hover:text-gold-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 text-obsidian-950 font-bold text-xs font-sans shadow-[0_0_20px_rgba(232,163,32,0.35)] hover:scale-102 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>नया खाता बनाएं (Sign Up)</span>
                </button>
              </form>
            )}

            {/* Form: OTP / Magic Link */}
            {activeTab === 'otp' && (
              <div className="space-y-3.5">
                <form onSubmit={handleSendOtp} className="space-y-2">
                  <label className="text-[11px] font-mono uppercase text-gold-400/80 font-semibold">
                    ईमेल पर OTP / लिंक प्राप्त करें
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seeker@dharma.os"
                      className="flex-1 bg-obsidian-950 border border-gold-500/20 rounded-2xl px-4 py-2 text-xs text-gold-100 focus:outline-none focus:border-gold-400"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 rounded-2xl bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-400/40 text-xs font-sans shrink-0 cursor-pointer"
                    >
                      OTP भेजें
                    </button>
                  </div>
                </form>

                <form onSubmit={handleVerifyOtp} className="space-y-2 pt-2 border-t border-gold-500/15">
                  <label className="text-[11px] font-mono uppercase text-gold-400/80 font-semibold">
                    प्राप्त ६-अंकीय OTP कोड दर्ज करें
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="123456"
                      className="flex-1 bg-obsidian-950 border border-gold-500/20 rounded-2xl px-4 py-2 text-xs text-gold-100 font-mono tracking-widest text-center focus:outline-none focus:border-gold-400"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 rounded-2xl bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 font-bold text-xs font-sans shrink-0 cursor-pointer"
                    >
                      सत्यापित करें
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Guest mode */}
            <div className="pt-2 text-center border-t border-gold-500/15">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-gold-400/70 hover:text-gold-200 underline transition-colors cursor-pointer"
              >
                अतिथि साधक के रूप में जारी रखें (Continue as Guest)
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
