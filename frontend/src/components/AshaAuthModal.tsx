import React, { useState } from 'react';
import {
  HeartHandshake,
  Lock,
  Phone,
  KeyRound,
  CheckCircle,
  X,
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import api from '../services/api.ts';
import { Language, translations } from '../i18n/translations.ts';

interface AshaAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAuthenticated: (ashaWorker: any) => void;
}

export const AshaAuthModal: React.FC<AshaAuthModalProps> = ({
  isOpen,
  onClose,
  lang,
  onAuthenticated
}) => {
  const t = translations[lang];

  // Clean Form states
  const [loginIdOrPhone, setLoginIdOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Forgot password modal state
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotWorkerId, setForgotWorkerId] = useState('');
  const [forgotSecurityCode, setForgotSecurityCode] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.ashaWorkerLogin(loginIdOrPhone.trim(), password.trim());
      if (res.ashaWorker) {
        onAuthenticated(res.ashaWorker);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'ASHA Worker login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.ashaWorkerResetPassword(
        forgotWorkerId.trim(),
        forgotSecurityCode.trim(),
        forgotNewPass.trim()
      );
      setForgotSuccess(true);
      setTimeout(() => {
        setIsForgotOpen(false);
        setForgotSuccess(false);
        setLoginIdOrPhone(forgotWorkerId.trim());
      }, 1500);
    } catch (err: any) {
      alert(`Reset failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const fillDemoCreds = (uidn: string, pass: string) => {
    setLoginIdOrPhone(uidn);
    setPassword(pass);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white max-w-md w-full rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-royal-600 text-white flex items-center justify-center shadow-blue-card flex-shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {lang === 'te'
                  ? 'ఆశా వర్కర్ లాగిన్'
                  : lang === 'hi'
                  ? 'आशा कार्यकर्ता लॉगिन'
                  : 'ASHA Worker Sign-In'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'te'
                  ? '11 మండలాలు & 176 పంచాయతీల ఆరోగ్య సంరక్షణ'
                  : 'Grassroots Care • 11 Mandals & 176 Panchayats'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Credential Notice Banner (Soft Yellow & Royal Blue) */}
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-2.5 text-xs text-amber-900 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-royal-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-slate-900 block mb-0.5">
              {lang === 'te'
                ? 'అడ్మిన్ జారీ చేసిన ఖాతా వివరాలు మాత్రమే'
                : 'Admin-Issued Credentials Only'}
            </strong>
            <span>
              {lang === 'te'
                ? 'గ్రామీణ ఆశా వర్కర్ల లాగిన్ వివరాలు ITDA పాడేరు జిల్లా అడ్మిన్ ద్వారా మాత్రమే జారీ చేయబడతాయి. పబ్లిక్ సైన్-అప్ అనుమతించబడదు.'
                : 'ASHA Worker credentials are generated exclusively by the ITDA District Health Admin. Public self-signup is restricted for security.'}
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {lang === 'te'
                ? 'ఆశా వర్కర్ యూజర్ ID లేదా మొబైల్ నంబర్'
                : 'ASHA Worker ID or Registered Phone'}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={loginIdOrPhone}
                autoComplete="username"
                onChange={(e) => setLoginIdOrPhone(e.target.value)}
                placeholder="e.g. ASHA-ASR-2026-001 or 9490123001"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-royal-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">
                {lang === 'te' ? 'పాస్‌వర్డ్' : 'Account Password'}
              </label>
              <button
                type="button"
                onClick={() => setIsForgotOpen(true)}
                className="text-[11px] text-royal-600 hover:text-royal-800 font-bold"
              >
                {lang === 'te' ? 'పాస్‌వర్డ్ మర్చిపోయారా?' : 'Forgot Password?'}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-royal-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Demo Fill Pill (Soft Yellow highlight) */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs">
            <span className="text-[11px] text-amber-900 font-medium flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-royal-600" />
              <span>Demo ID: <strong>ASHA-ASR-2026-001</strong></span>
            </span>
            <button
              type="button"
              onClick={() => fillDemoCreds('ASHA-ASR-2026-001', 'Asha@2026')}
              className="text-[10px] font-bold text-royal-700 hover:text-royal-900 bg-white px-2 py-1 rounded border border-amber-300 shadow-2xs transition-all"
            >
              1-Click Fill
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs rounded-xl shadow-blue-card transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <span>{lang === 'te' ? 'లాగిన్ అవుతోంది...' : 'Authenticating ASHA Worker...'}</span>
            ) : (
              <>
                <span>
                  {lang === 'te' ? 'ఆశా వర్కర్ కన్సోల్ ప్రవేశించండి' : 'Enter ASHA Worker Workspace'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>ITDA Paderu Grassroots Registry</span>
          <span className="font-mono text-[10px]">176 GP NETWORK</span>
        </div>

        {/* Forgot Password Sub-Modal */}
        {isForgotOpen && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-sm w-full rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                  <KeyRound className="w-4 h-4 text-royal-600" />
                  <span>Reset ASHA Worker Password</span>
                </h4>
                <button
                  onClick={() => setIsForgotOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {forgotSuccess ? (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 text-center font-bold">
                  Password updated! Redirecting to login...
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                      ASHA Worker ID / Phone
                    </label>
                    <input
                      type="text"
                      value={forgotWorkerId}
                      onChange={(e) => setForgotWorkerId(e.target.value)}
                      placeholder="e.g. ASHA-ASR-2026-001"
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                      Security Verification Code
                    </label>
                    <input
                      type="text"
                      value={forgotSecurityCode}
                      onChange={(e) => setForgotSecurityCode(e.target.value)}
                      placeholder="e.g. ASR-ASHA-2026"
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showForgotPass ? 'text' : 'password'}
                        value={forgotNewPass}
                        onChange={(e) => setForgotNewPass(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full p-2 pr-9 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowForgotPass(!showForgotPass)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title={showForgotPass ? 'Hide password' : 'Show password'}
                      >
                        {showForgotPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-royal-600 text-white rounded-xl text-xs font-bold hover:bg-royal-700 transition-all mt-2"
                  >
                    Confirm & Update Password
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AshaAuthModal;
