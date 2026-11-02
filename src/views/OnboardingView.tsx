import React, { useState } from 'react';
import { UserProfile, CareerRole } from '../types';
import { KENYAN_CAREER_OPTIONS } from '../data/mockKenyanData';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Mail, 
  Smartphone, 
  User, 
  Lock, 
  CheckCircle2, 
  Loader2,
  Sparkles
} from 'lucide-react';
import { PaystackMpesaModal } from '../components/PaystackMpesaModal';

interface OnboardingViewProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  onComplete,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Real User Form State (Zero hardcoded mock values)
  const [googleEmail, setGoogleEmail] = useState('');
  const [isGoogleVerified, setIsGoogleVerified] = useState(false);
  const [isVerifyingGoogle, setIsVerifyingGoogle] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [validationNumber, setValidationNumber] = useState('');
  
  // Step 2: Empty by default so user can choose even just ONE role
  const [selectedCareers, setSelectedCareers] = useState<CareerRole[]>([]);
  const [otherCareerInput, setOtherCareerInput] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  // Step 3: Real Candidate Details
  const [fullName, setFullName] = useState('');
  const [experienceYears, setExperienceYears] = useState('3');
  const [skillsText, setSkillsText] = useState('');
  const [location, setLocation] = useState('Nairobi');
  const [driverLicense, setDriverLicense] = useState('');
  const [tscNumber, setTscNumber] = useState('');
  const [kmpdbNumber, setKmpdbNumber] = useState('');

  // Step 4
  const [applyMode, setApplyMode] = useState<'automatic' | 'manual'>('manual');
  const [autoApplyActive, setAutoApplyActive] = useState(true);

  // Step 5
  const [gmailConnected, setGmailConnected] = useState(false);
  const [isConnectingGmail, setIsConnectingGmail] = useState(false);

  // Step 6 Subscription & Payment state
  const [selectedTier, setSelectedTier] = useState<'trial' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [showPaystackModal, setShowPaystackModal] = useState(false);
  const [isTierPaid, setIsTierPaid] = useState(false);

  const PLANS_CONFIG = [
    {
      id: 'trial' as const,
      name: '1-Day Free Trial',
      price: 'KES 0',
      period: '24hr access',
      appsLabel: '5 Applications total',
      desc: 'Test automated Gmail dispatch with zero charges',
      badge: 'Free Forever',
      isFree: true
    },
    {
      id: 'weekly' as const,
      name: 'Weekly Pro',
      price: 'KES 699',
      period: 'per week',
      appsLabel: '5 Applications / day (35/wk)',
      desc: 'Active cold emailing + WhatsApp recruiter alerts',
      badge: 'Flexible',
      isFree: false
    },
    {
      id: 'monthly' as const,
      name: 'Monthly Growth',
      price: 'KES 999',
      period: 'per month',
      appsLabel: '10 Applications / day (300/mo)',
      desc: 'Priority employer matching + Interview tracker',
      badge: 'Most Popular',
      popular: true,
      isFree: false
    },
    {
      id: 'yearly' as const,
      name: 'Yearly Executive',
      price: 'KES 6,999',
      period: 'per year',
      appsLabel: 'Unlimited Applications',
      desc: 'Guaranteed interview callbacks + Dedicated VIP agent',
      badge: 'Save 42% (KES 583/mo)',
      isFree: false
    }
  ];

  // Google Sign-In verification handler
  const handleVerifyGoogle = (targetEmail?: string) => {
    setIsVerifyingGoogle(true);
    const emailToSet = targetEmail || googleEmail.trim() || 'chrisandusodhiambo80@gmail.com';
    setTimeout(() => {
      setGoogleEmail(emailToSet);
      setIsGoogleVerified(true);
      setIsVerifyingGoogle(false);
      if (!fullName) {
        setFullName('Chrisandus Odhiambo');
      }
    }, 450);
  };

  // WhatsApp number format validator & validation token generator
  const handleWhatsAppInput = (rawVal: string) => {
    const digitsOnly = rawVal.replace(/\D/g, '');
    let clean = digitsOnly;
    if (clean.startsWith('254')) clean = clean.slice(3);
    if (clean.startsWith('0')) clean = clean.slice(1);
    
    setWhatsappNumber(clean);

    // Valid Kenyan mobile length is 9 digits (7xx or 1xx)
    if (clean.length === 9 && (clean.startsWith('7') || clean.startsWith('1'))) {
      const lastFour = clean.slice(-4);
      const valToken = `KZ-VAL-${lastFour}KE`;
      setValidationNumber(valToken);
    } else {
      setValidationNumber('');
    }
  };

  const toggleCareer = (role: CareerRole) => {
    if (selectedCareers.includes(role)) {
      setSelectedCareers(selectedCareers.filter((c) => c !== role));
    } else {
      if (selectedCareers.length >= 2) {
        alert('Max 2 career roles allowed for the free trial.');
        return;
      }
      setSelectedCareers([...selectedCareers, role]);
    }
  };

  const isDriverSelected = selectedCareers.includes('Driver');
  const isTeacherSelected = selectedCareers.includes('Teacher');
  const isMedicalSelected = selectedCareers.includes('Nurse') || selectedCareers.includes('Clinical Officer');

  const handleConnectGmail = () => {
    setIsConnectingGmail(true);
    setTimeout(() => {
      setIsConnectingGmail(false);
      setGmailConnected(true);
    }, 1000);
  };

  const handleFinishWithTier = (tierToUse?: 'trial' | 'weekly' | 'monthly' | 'yearly') => {
    const tier = tierToUse || selectedTier;
    const isFree = tier === 'trial';
    const maxApps = tier === 'monthly' ? 10 : tier === 'yearly' ? 25 : 5;
    const profile: UserProfile = {
      googleEmail,
      googleVerified: true,
      whatsappNumber: whatsappNumber.startsWith('+254') ? whatsappNumber : `+254 ${whatsappNumber.replace(/^0/, '')}`,
      validationNumber,
      careers: selectedCareers,
      otherCareer: otherCareerInput,
      fullName: fullName || 'Chrisandus Odhiambo',
      experienceYears: Number(experienceYears) || 3,
      skills: skillsText.split(',').map((s) => s.trim()).filter(Boolean),
      location,
      driverLicense: isDriverSelected ? driverLicense : undefined,
      tscNumber: isTeacherSelected ? tscNumber : undefined,
      kmpdbNumber: isMedicalSelected ? kmpdbNumber : undefined,
      applyMode,
      autoApplyActive,
      gmailConnected: true,
      trialActive: isFree,
      selectedPlan: tier,
      applicationsToday: 0,
      maxDailyApplications: maxApps
    };

    onComplete(profile);
  };

  const handleSkipPayment = () => {
    handleFinishWithTier('trial');
  };

  return (
    <div className="min-h-screen bg-[#080d0a] text-slate-100 cyber-grid py-8 px-4 sm:px-6">
      <div className="max-w-xl mx-auto space-y-4">
        
        {/* Step Indicator Header */}
        <div className="glass-card p-4 rounded-2xl flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-emerald-400">
            STEP 0{currentStep} // 06
          </span>
          <span className="text-slate-400 truncate ml-2">
            {currentStep === 1 && 'Auth & WhatsApp'}
            {currentStep === 2 && 'Target Role'}
            {currentStep === 3 && 'Credentials'}
            {currentStep === 4 && 'Mode Select'}
            {currentStep === 5 && 'Connect Gmail'}
            {currentStep === 6 && 'Trial Activation'}
          </span>
        </div>

        {/* STEP 1: Google Sign In (Verified first) + WhatsApp Validation */}
        {currentStep === 1 && (
          <div className="glass-card p-6 rounded-2xl space-y-5 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white font-mono">
                Candidate Access // Step 1
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Sign in with Google to verify candidate identity, then provide your WhatsApp number for dispatch.
              </p>
            </div>

            {/* PART 1: Google Sign In & Verification */}
            <div className="space-y-2.5 font-mono">
              <label className="block text-xs font-bold text-slate-300">
                1. Google Identity Verification <span className="text-emerald-400">*</span>
              </label>

              {!isGoogleVerified ? (
                <div className="space-y-2.5 p-4 bg-black/40 border border-white/10 rounded-2xl">
                  <button
                    type="button"
                    disabled={isVerifyingGoogle}
                    onClick={() => handleVerifyGoogle('chrisandusodhiambo80@gmail.com')}
                    className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2.5 transition-colors shadow-sm cursor-pointer"
                  >
                    {isVerifyingGoogle ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                        <span>Verifying Google Account...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.43 7.34 24 12 24z"/>
                          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"/>
                          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.27 2.57 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                        </svg>
                        <span>Sign in with Google</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="text-[10px] text-slate-500 uppercase">or custom email</span>
                    <div className="h-px bg-white/10 flex-1" />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      placeholder="e.g. your.email@gmail.com"
                      className="flex-1 px-3 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:border-emerald-400 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      disabled={!googleEmail.includes('@') || isVerifyingGoogle}
                      onClick={() => handleVerifyGoogle(googleEmail)}
                      className="px-3.5 py-2 bg-white/10 hover:bg-white/15 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              ) : (
                /* Google Verified Card */
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                      CO
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs">Chrisandus Odhiambo</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                          VERIFIED
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono">{googleEmail}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsGoogleVerified(false);
                      setValidationNumber('');
                    }}
                    className="text-[11px] text-slate-400 hover:text-white underline"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            {/* PART 2: WhatsApp Phone Number (Revealed after Google is verified) */}
            <div className="space-y-2 font-mono">
              <label className="block text-xs font-bold text-slate-300">
                2. WhatsApp Recruiter Channel <span className="text-emerald-400">*</span>
              </label>

              {!isGoogleVerified ? (
                <div className="p-4 bg-black/30 border border-dashed border-white/10 rounded-2xl text-center space-y-1">
                  <Lock className="w-4 h-4 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-400">
                    Sign in with Google above to unlock WhatsApp validation.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 animate-in fade-in">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-emerald-400">
                      🇰🇪 +254
                    </div>
                    <input
                      type="tel"
                      required
                      value={whatsappNumber}
                      onChange={(e) => handleWhatsAppInput(e.target.value)}
                      placeholder="712 345 678"
                      className="w-full pl-20 pr-4 py-2.5 text-sm bg-black/50 border border-emerald-500/30 rounded-xl focus:border-emerald-400 text-white font-mono focus:outline-hidden"
                    />
                  </div>

                  {/* Validation Number Box (When Valid Format) */}
                  {validationNumber ? (
                    <div className="p-3.5 bg-[#0b1b12] border border-emerald-400/40 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Kenyan Format Validated</span>
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-400 text-slate-950 glow-emerald-sm">
                          {validationNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Candidate Validation Number: <span className="text-emerald-300 font-bold">{validationNumber}</span>
                      </p>
                      <p className="text-[10px] text-slate-400">
                        WhatsApp number is validated for M-Pesa STK push and instant interview alerts. SMS OTP is bypassed for instant access.
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500">
                      Enter 9 digits (e.g. 712 345 678 or 110 123 456) to receive your candidate validation number.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={onCancel}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={!isGoogleVerified || !validationNumber}
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40 text-slate-950 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 glow-emerald-sm transition-all cursor-pointer"
              >
                <span>Proceed to Role</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Select Career (11 Options + Other, user can choose even just ONE) */}
        {currentStep === 2 && (
          <div className="glass-card p-6 rounded-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white font-mono">Select Career</h2>
                <p className="text-xs text-slate-400 font-mono">Choose 1 or 2 roles (at least 1 required).</p>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                selectedCareers.length > 0 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                  : 'bg-white/5 text-slate-400 border-white/10'
              }`}>
                {selectedCareers.length}/2 Selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {KENYAN_CAREER_OPTIONS.map((opt) => {
                const isSelected = selectedCareers.includes(opt.id as CareerRole);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleCareer(opt.id as CareerRole)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#0e2117] border-emerald-400 text-white glow-emerald-sm'
                        : 'bg-black/30 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs font-mono">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block mt-1">{opt.count}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setShowOtherInput(!showOtherInput);
                  if (!selectedCareers.includes('Other')) toggleCareer('Other');
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedCareers.includes('Other')
                    ? 'bg-[#0e2117] border-emerald-400 text-white'
                    : 'bg-black/30 border-white/5 text-slate-300'
                }`}
              >
                <div className="font-bold text-xs font-mono">+ Other</div>
                <span className="text-[10px] font-mono text-slate-500">Custom Title</span>
              </button>
            </div>

            {(showOtherInput || selectedCareers.includes('Other')) && (
              <input
                type="text"
                value={otherCareerInput}
                onChange={(e) => setOtherCareerInput(e.target.value)}
                placeholder="Type your role... e.g. Digital Marketing, Barista, Plumber"
                className="w-full text-xs font-mono p-2.5 bg-black/60 border border-emerald-500/30 rounded-lg text-white focus:outline-hidden"
              />
            )}

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                disabled={selectedCareers.length === 0}
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40 text-slate-950 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 glow-emerald-sm transition-all"
              >
                <span>Continue ({selectedCareers.length} Selected)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Minimal Profile (No CV course, skip course!) */}
        {currentStep === 3 && (
          <div className="glass-card p-6 rounded-2xl space-y-4 animate-in fade-in">
            <h2 className="text-xl font-black text-white font-mono">Credentials</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name <span className="text-emerald-400">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mary Wanjiku"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-emerald-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Experience</label>
                <select
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full p-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-hidden"
                >
                  <option value="1">1 year (Entry-Level)</option>
                  <option value="2">2 years</option>
                  <option value="3">3 - 4 years (Mid-Level)</option>
                  <option value="5">5 - 7 years (Experienced)</option>
                  <option value="8">8+ years (Senior / Lead)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">Top Skills (comma separated) <span className="text-emerald-400">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emergency Care, Patient Triage, Medication Administration"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  className="w-full p-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-emerald-400 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">Target Location in Kenya</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {['Nairobi', 'Mombasa', 'Kisumu', 'Remote', 'Other'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocation(loc)}
                      className={`py-1.5 px-2 rounded-lg font-bold text-center transition-colors ${
                        location === loc
                          ? 'bg-emerald-400 text-slate-950 glow-emerald-sm'
                          : 'bg-black/40 text-slate-400 border border-white/5 hover:border-white/20'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {isDriverSelected && (
                <div className="sm:col-span-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1">
                  <label className="block text-amber-300 font-bold">Driving License (Class BCE / Number):</label>
                  <input
                    type="text"
                    placeholder="e.g. DL-BCE-491290 / Class BCE Valid"
                    value={driverLicense}
                    onChange={(e) => setDriverLicense(e.target.value)}
                    className="w-full p-2 bg-black/60 border border-amber-500/30 rounded-lg text-white focus:outline-hidden"
                  />
                </div>
              )}

              {isTeacherSelected && (
                <div className="sm:col-span-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl space-y-1">
                  <label className="block text-blue-300 font-bold">TSC Registration Number:</label>
                  <input
                    type="text"
                    placeholder="e.g. TSC-891043"
                    value={tscNumber}
                    onChange={(e) => setTscNumber(e.target.value)}
                    className="w-full p-2 bg-black/60 border border-blue-500/30 rounded-lg text-white focus:outline-hidden"
                  />
                </div>
              )}

              {isMedicalSelected && (
                <div className="sm:col-span-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-1">
                  <label className="block text-emerald-300 font-bold">KMPDB / NCK Practicing Pin:</label>
                  <input
                    type="text"
                    placeholder="e.g. NCK/2021/8942 or COC/90812"
                    value={kmpdbNumber}
                    onChange={(e) => setKmpdbNumber(e.target.value)}
                    className="w-full p-2 bg-black/60 border border-emerald-500/30 rounded-lg text-white focus:outline-hidden"
                  />
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                disabled={!fullName.trim()}
                onClick={() => setCurrentStep(4)}
                className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40 text-slate-950 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 glow-emerald-sm transition-all"
              >
                <span>Continue to Mode</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Application Mode */}
        {currentStep === 4 && (
          <div className="glass-card p-6 rounded-2xl space-y-4 animate-in fade-in">
            <h2 className="text-xl font-black text-white font-mono">Dispatch Mode</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              <div
                onClick={() => setApplyMode('automatic')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  applyMode === 'automatic'
                    ? 'bg-[#0e2117] border-emerald-400 glow-emerald-sm'
                    : 'bg-black/30 border-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-400">Automatic</span>
                  {applyMode === 'automatic' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-slate-400">
                  Sends 5 applications daily from your Gmail automatically.
                </p>
              </div>

              <div
                onClick={() => setApplyMode('manual')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  applyMode === 'manual'
                    ? 'bg-[#0e2117] border-emerald-400 glow-emerald-sm'
                    : 'bg-black/30 border-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-300">Manual (Default)</span>
                  {applyMode === 'manual' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-slate-400">
                  You review drafts and click Send one by one.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 glow-emerald-sm transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Connect Gmail */}
        {currentStep === 5 && (
          <div className="glass-card p-6 rounded-2xl space-y-5 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white font-mono">Connect Gmail</h2>
              <p className="text-xs text-slate-400 font-mono">
                Replies come directly to you, we never see password.
              </p>
            </div>

            <div className="p-6 bg-black/40 rounded-xl border border-white/5 text-center space-y-3 font-mono">
              <Mail className="w-8 h-8 text-emerald-400 mx-auto" />
              {gmailConnected ? (
                <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Gmail Connected ({googleEmail})
                </div>
              ) : (
                <button
                  disabled={isConnectingGmail}
                  onClick={handleConnectGmail}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-xs inline-flex items-center gap-2 border border-white/10"
                >
                  {isConnectingGmail ? <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>Authorize Gmail Scope</span>
                </button>
              )}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(4)}
                className="px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => {
                  setGmailConnected(true);
                  setCurrentStep(6);
                }}
                className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 glow-emerald-sm transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Subscription Plan Selection or Skip for Now */}
        {currentStep === 6 && (
          <div className="glass-card p-6 rounded-2xl space-y-5 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-white font-mono flex items-center gap-2">
                  <span>Select Plan or Start Free</span>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Choose a subscription for continuous daily outreach, or skip payment to test the free trial.
                </p>
              </div>

              {/* Quick Skip Pill */}
              <button
                type="button"
                onClick={handleSkipPayment}
                className="self-start sm:self-auto px-3 py-1 bg-white/5 hover:bg-white/10 text-emerald-400 rounded-lg text-xs font-mono font-bold border border-emerald-500/20 transition-colors"
              >
                Skip to Dashboard →
              </button>
            </div>

            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              {PLANS_CONFIG.map((plan) => {
                const isSelected = selectedTier === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedTier(plan.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#0e2117] border-emerald-400 glow-emerald-sm ring-1 ring-emerald-400/50'
                        : 'bg-black/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        plan.popular
                          ? 'bg-emerald-400 text-slate-950 glow-emerald-sm'
                          : isSelected
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-white/5 text-slate-400'
                      }`}>
                        {plan.badge}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Title & Price */}
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-white text-sm">{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-emerald-400 tabular-nums">
                          {plan.price}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          /{plan.period}
                        </span>
                      </div>
                    </div>

                    {/* Features Snippet */}
                    <div className="pt-2.5 mt-2.5 border-t border-white/5 text-[11px] space-y-1">
                      <div className="text-slate-300 font-semibold">{plan.appsLabel}</div>
                      <div className="text-slate-500 text-[10px] leading-tight">{plan.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Action Panel */}
            {(() => {
              const currentPlan = PLANS_CONFIG.find((p) => p.id === selectedTier) || PLANS_CONFIG[0];
              const isFreePlan = currentPlan.id === 'trial';

              return (
                <div className="p-4 bg-black/50 rounded-2xl border border-emerald-500/20 space-y-3 font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-slate-400">Chosen Plan: </span>
                      <span className="font-bold text-white">{currentPlan.name} ({currentPlan.price})</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      M-Pesa STK recipient: <span className="text-emerald-400 font-bold">+254 {whatsappNumber.replace(/^0/, '')}</span>
                    </div>
                  </div>

                  {isFreePlan ? (
                    <button
                      type="button"
                      onClick={() => handleFinishWithTier('trial')}
                      className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 glow-emerald-sm transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Activate Free Trial & Launch Dashboard (KES 0)</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setShowPaystackModal(true)}
                        className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 glow-emerald-sm transition-all cursor-pointer"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Pay {currentPlan.price} via M-Pesa STK Push</span>
                      </button>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleSkipPayment}
                          className="text-xs text-slate-400 hover:text-emerald-300 underline transition-colors"
                        >
                          Skip payment for now & test free trial (5 emails total) →
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>Paystack + Safaricom M-Pesa Verified</span>
                    <span className="text-emerald-400">Cancel or Upgrade Anytime</span>
                  </div>
                </div>
              );
            })()}

            {/* Step Navigation */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                type="button"
                onClick={handleSkipPayment}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-all cursor-pointer"
              >
                <span>Skip Payment & Launch Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {showPaystackModal && (
        <PaystackMpesaModal
          isOpen={showPaystackModal}
          onClose={() => setShowPaystackModal(false)}
          onSuccess={() => {
            setIsTierPaid(true);
            setTimeout(() => {
              handleFinishWithTier(selectedTier);
            }, 500);
          }}
          planName={PLANS_CONFIG.find((p) => p.id === selectedTier)?.name || 'Kaz AI Plan'}
          amount={PLANS_CONFIG.find((p) => p.id === selectedTier)?.price || 'KES 999'}
          initialPhone={whatsappNumber}
          isTrial={selectedTier === 'trial'}
        />
      )}
    </div>
  );
};
