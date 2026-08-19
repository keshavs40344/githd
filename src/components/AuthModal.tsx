'use client';

import React, { useState, useEffect } from 'react';
import { 
  signInWithEmail, signUpWithEmail, sendMagicLink, verifyOtpToken, 
  signInWithOAuthProvider, signOutUser, getCurrentUser, isSupabaseConfigured, supabase 
} from '@/lib/supabase';
import { 
  User as UserIcon, Lock, Mail, Sparkles, KeyRound, ArrowRight, 
  CheckCircle2, AlertCircle, RefreshCw, LogOut, ShieldCheck, Eye, EyeOff, Globe 
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
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
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

  const handleSocialAuth = async (provider: 'google' | 'github' | 'facebook') => {
    setSocialLoading(provider);
    setErrorMessage('');
    setSuccessMessage('');
    sacredAudio.playNavChime(0.12);

    try {
      const res = await signInWithOAuthProvider(provider);
      if (res.error) throw res.error;
    } catch (err: any) {
      setErrorMessage(err.message || `${provider} प्रमाणीकरण में त्रुटि हुई।`);
      setSocialLoading(null);
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
      
      <div className="bg-gradient-to-b from-obsidian-900 via-obsidian-900 to-amber-950/30 border border-gold-500/35 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative overflow-hidden space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
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
                Google, GitHub, Facebook & Supabase Sync
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
          <div className="space-y-4 relative z-10">
            
            {/* ── 1-CLICK SOCIAL LOGIN BUTTONS (Google, GitHub, Facebook) ── */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-gold-400/70 font-semibold block text-center">
                1-क्लिक सोशल लॉगिन (Social Verification)
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                
                {/* Google OAuth Button */}
                <button
                  type="button"
                  onClick={() => handleSocialAuth('google')}
                  disabled={!!socialLoading}
                  className="py-2.5 px-2 rounded-2xl bg-obsidian-950/90 hover:bg-obsidian-800 border border-gold-500/25 hover:border-gold-400 text-gold-200 text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-95 cursor-pointer shadow-sm"
                  title="Google से लॉगिन करें"
                >
                  {socialLoading === 'google' ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-gold-400" />
                  ) : (
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5c1.7 0 3 .6 4 1.5l3-3C17.2 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                      <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z" />
                      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z" />
                    </svg>
                  )}
                  <span>Google</span>
                </button>

                {/* GitHub OAuth Button */}
                <button
                  type="button"
                  onClick={() => handleSocialAuth('github')}
                  disabled={!!socialLoading}
                  className="py-2.5 px-2 rounded-2xl bg-obsidian-950/90 hover:bg-obsidian-800 border border-gold-500/25 hover:border-gold-400 text-gold-200 text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-95 cursor-pointer shadow-sm"
                  title="GitHub से लॉगिन करें"
                >
                  {socialLoading === 'github' ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-gold-400" />
                  ) : (
                    <svg className="w-3.5 h-3.5 fill-current text-gold-300 shrink-0" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  )}
                  <span>GitHub</span>
                </button>

                {/* Facebook OAuth Button */}
                <button
                  type="button"
                  onClick={() => handleSocialAuth('facebook')}
                  disabled={!!socialLoading}
                  className="py-2.5 px-2 rounded-2xl bg-obsidian-950/90 hover:bg-obsidian-800 border border-gold-500/25 hover:border-gold-400 text-gold-200 text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-95 cursor-pointer shadow-sm"
                  title="Facebook से लॉगिन करें"
                >
                  {socialLoading === 'facebook' ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-gold-400" />
                  ) : (
                    <svg className="w-3.5 h-3.5 fill-[#1877F2] shrink-0" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  <span>Facebook</span>
                </button>

              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="h-[1px] bg-gold-500/15 flex-1" />
              <span className="text-[10px] font-mono text-gold-400/60 uppercase">या ईमेल द्वारा</span>
              <div className="h-[1px] bg-gold-500/15 flex-1" />
            </div>

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
                  className={`flex-1 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
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
              <form onSubmit={handleSignIn} className="space-y-3">
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
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 text-obsidian-950 font-bold text-xs font-sans shadow-[0_0_20px_rgba(232,163,32,0.35)] hover:scale-102 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  <span>साधना कक्ष में प्रवेश करें (Sign In)</span>
                </button>
              </form>
            )}

            {/* Form: Sign Up */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3">
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
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 text-obsidian-950 font-bold text-xs font-sans shadow-[0_0_20px_rgba(232,163,32,0.35)] hover:scale-102 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>नया खाता बनाएं (Sign Up)</span>
                </button>
              </form>
            )}

            {/* Form: OTP / Magic Link */}
            {activeTab === 'otp' && (
              <div className="space-y-3">
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
