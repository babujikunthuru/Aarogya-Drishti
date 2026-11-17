import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Stethoscope,
  HeartHandshake,
  Activity,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  PhoneCall,
  FileText,
  Calendar,
  Send,
  Eye,
  Building2,
  MapPin,
  Ambulance,
  Smile,
  Scissors,
  Truck,
  PackageCheck,
  Pill,
  Home,
  CalendarCheck,
  ChevronRight,
  ShieldCheck,
  QrCode,
  Sparkles,
  Plus,
  RefreshCw,
  Printer,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  X
} from 'lucide-react';
import { Language } from '../i18n/translations.ts';
import {
  ASR_11_MANDALS_PANCHAYATS,
  TOTAL_PANCHAYATS_COUNT,
  CONSULTING_DOCTORS,
  ConsultingDoctor,
  VILLAGE_ASHA_CARE_GRID,
  VillageAshaCareProfile,
  ASHA_13_CARE_LOOP_STAGES,
  INITIAL_ASHA_PATIENTS,
  AshaPatientRecord
} from '../data/asrMandalsPanchayats.ts';

interface AshaWorkerModuleProps {
  lang: Language;
  currentPatient?: any;
  onOpenScreening?: () => void;
  onOpenTelemedicine?: (doctor?: any) => void;
}

export const AshaWorkerModule: React.FC<AshaWorkerModuleProps> = ({
  lang,
  currentPatient,
  onOpenScreening,
  onOpenTelemedicine
}) => {
  // Navigation Tabs inside ASHA Module
  const [activeTab, setActiveTab] = useState<
    'loop_patients' | 'register' | 'village_grid' | 'biopsy_kit' | 'referrals' | 'prescriptions'
  >('loop_patients');

  // Patients Data State
  const [patients, setPatients] = useState<AshaPatientRecord[]>(() => {
    // If current logged-in patient exists, ensure they are represented
    if (currentPatient && currentPatient.uidn) {
      const exists = INITIAL_ASHA_PATIENTS.some((p) => p.uidn === currentPatient.uidn);
      if (!exists) {
        const customPatient: AshaPatientRecord = {
          uidn: currentPatient.uidn,
          name: currentPatient.name,
          age: currentPatient.age || 45,
          gender: currentPatient.gender || 'M',
          phone: currentPatient.phone || '9490123000',
          mandal: currentPatient.mandal || 'G. Madugula',
          panchayat: currentPatient.village || 'Nurmati',
          village: currentPatient.village || 'Nurmati',
          habit: 'Adda Poga (Reverse Smoking) & Tobacco',
          habitYears: 18,
          lesionType: 'Indurated Buccal Leukoplakia (Under Observation)',
          lesionSeverity: 'Moderate',
          consultingDoctorId: 'DOC-SWAPNA',
          currentLoopStageId: 4, // General Oral Treatment
          dailyTrackingStatus: 'Daily topical oral paste application monitored by ASHA',
          lastVisitDate: new Date().toISOString().slice(0, 10),
          prescriptionsCount: 1,
          prescriptions: [
            {
              rxId: 'RX-ASR-2026-7731',
              date: new Date().toISOString().slice(0, 10),
              doctorName: 'Dr. Swapna Devi, MDS',
              doctorHospital: 'Area Hospital Paderu / PHC G. Madugula Hub',
              medicines: [
                { name: 'Kenacort 0.1% Oral Paste', dosage: 'Apply over lesion twice daily', duration: '14 Days' },
                { name: 'Cap. Lycopene 10,000 mcg', dosage: '1 capsule daily', duration: '30 Days' }
              ],
              notes: 'Patient strictly instructed on complete Adda Poga cessation.',
              barcode: 'BARCODE-RX-7731'
            }
          ]
        };
        return [customPatient, ...INITIAL_ASHA_PATIENTS];
      }
    }
    return INITIAL_ASHA_PATIENTS;
  });

  // Selected Patient for Care Loop Tracking and Details
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    patients[0]?.uidn || 'UIDN-ASR-2026-0038'
  );

  const selectedPatient = patients.find((p) => p.uidn === selectedPatientId) || patients[0];

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMandalFilter, setSelectedMandalFilter] = useState('ALL');
  const [selectedPanchayatFilter, setSelectedPanchayatFilter] = useState('ALL');
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState('ALL');

  // Referral Modal State
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [referralTargetPatient, setReferralTargetPatient] = useState<AshaPatientRecord | null>(null);
  const [referralDoctorId, setReferralDoctorId] = useState('DOC-SWAPNA');
  const [referralPriority, setReferralPriority] = useState<'Routine' | 'Urgent' | 'Emergency 108'>(
    'Urgent'
  );
  const [referralReason, setReferralReason] = useState('4mm Diagnostic Punch Biopsy Confirmation');
  const [referralSuccessMsg, setReferralSuccessMsg] = useState<string | null>(null);

  // New Patient Registration Form State (with 11 Mandals & 176 Panchayats)
  const [regForm, setRegForm] = useState({
    name: '',
    age: 45,
    gender: 'M',
    phone: '',
    mandal: 'G. Madugula',
    panchayat: 'Nurmati',
    village: 'Nurmati',
    habit: 'Adda Poga (Reverse Smoking of Cigar)',
    habitYears: 15,
    lesionType: 'White Mucosal Patch (Leukoplakia)',
    lesionSeverity: 'Moderate' as const,
    consultingDoctorId: 'DOC-SWAPNA',
    ashaWorkerId: 'ASHA-GMD-01 (K. Lakshmi)'
  });

  const [regSuccessMsg, setRegSuccessMsg] = useState<string | null>(null);

  // Biopsy Medical Kit State
  const [biopsyKitStatus, setBiopsyKitStatus] = useState({
    kitId: 'PBK-ASR-2026-041',
    assignedPhc: 'PHC G. Madugula (Tribal Hub)',
    mandal: 'G. Madugula',
    trephines4mmCount: 12,
    formalinVialsCount: 8,
    lignocaineVialsCount: 10,
    sterileGauzePacks: 24,
    coldChainTempCelsius: 4.2,
    transitBoxStatus: 'Optimal (2°C - 8°C)',
    lastSterilizationDate: '2026-11-15',
    ambulanceTransitDispatchActive: false
  });

  // Handle Mandal Change in Registration Form (updates panchayats dropdown)
  const handleRegMandalChange = (mandalEn: string) => {
    const mandalObj = ASR_11_MANDALS_PANCHAYATS.find((m) => m.mandalEn === mandalEn);
    const firstPanchayat = mandalObj?.panchayats[0]?.en || 'Paderu';
    setRegForm((prev) => ({
      ...prev,
      mandal: mandalEn,
      panchayat: firstPanchayat,
      village: firstPanchayat
    }));
  };

  // Submit New Patient Registration
  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name.trim()) {
      alert(lang === 'te' ? 'దయచేసి రోగి పూర్తి పేరు నమోదు చేయండి' : 'Please enter patient full name');
      return;
    }

    const newUidn = `UIDN-ASR-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const newRecord: AshaPatientRecord = {
      uidn: newUidn,
      name: regForm.name.trim(),
      age: Number(regForm.age) || 45,
      gender: regForm.gender,
      phone: regForm.phone.trim() || '9490123999',
      mandal: regForm.mandal,
      panchayat: regForm.panchayat,
      village: regForm.village,
      habit: regForm.habit,
      habitYears: Number(regForm.habitYears) || 10,
      lesionType: regForm.lesionType,
      lesionSeverity: regForm.lesionSeverity,
      consultingDoctorId: regForm.consultingDoctorId,
      currentLoopStageId: 1, // Step 1: ASHA field screening
      dailyTrackingStatus: 'Newly registered by ASHA; preliminary photo triage taken',
      lastVisitDate: new Date().toISOString().slice(0, 10),
      prescriptionsCount: 0,
      prescriptions: []
    };

    setPatients((prev) => [newRecord, ...prev]);
    setSelectedPatientId(newUidn);
    setRegSuccessMsg(
      lang === 'te'
        ? `రోగి ${newRecord.name} విజయవంతంగా నమోదయ్యారు! కేటాయించిన డిజిటల్ UIDN: ${newUidn}`
        : `Patient ${newRecord.name} registered successfully! Assigned Digital UIDN: ${newUidn}`
    );

    setTimeout(() => {
      setRegSuccessMsg(null);
      setActiveTab('loop_patients');
    }, 2000);
  };

  // Submit Specialist Referral
  const handleSendReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralTargetPatient) return;

    const assignedDoc = CONSULTING_DOCTORS.find((d) => d.id === referralDoctorId);

    // Update patient consulting doctor and loop stage
    setPatients((prev) =>
      prev.map((p) => {
        if (p.uidn === referralTargetPatient.uidn) {
          return {
            ...p,
            consultingDoctorId: referralDoctorId,
            currentLoopStageId: Math.max(p.currentLoopStageId, 3), // Advance to Specialist step
            dailyTrackingStatus: `Referred to ${assignedDoc?.name || 'Specialist'} for ${referralReason} (${referralPriority})`
          };
        }
        return p;
      })
    );

    setReferralSuccessMsg(
      lang === 'te'
        ? `రోగి ${referralTargetPatient.name} విజయవంతంగా ${assignedDoc?.nameTe || assignedDoc?.name} గారికి రిఫర్ చేయబడ్డారు!`
        : `Patient ${referralTargetPatient.name} referred successfully to ${assignedDoc?.name}!`
    );

    setTimeout(() => {
      setIsReferralModalOpen(false);
      setReferralSuccessMsg(null);
      setReferralTargetPatient(null);
    }, 1800);
  };

  // Advance Patient to Next Stage in 13-Care Loop
  const handleAdvanceStage = (patientUidn: string) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.uidn === patientUidn) {
          const nextStageId = p.currentLoopStageId >= 13 ? 1 : p.currentLoopStageId + 1;
          const nextStageObj = ASHA_13_CARE_LOOP_STAGES.find((s) => s.id === nextStageId);
          return {
            ...p,
            currentLoopStageId: nextStageId,
            dailyTrackingStatus: `Advanced to Step ${nextStageId}: ${nextStageObj?.desc || ''}`,
            lastVisitDate: new Date().toISOString().slice(0, 10)
          };
        }
        return p;
      })
    );
  };

  // Helper to get Doctor object by ID
  const getDoctor = (docId: string): ConsultingDoctor => {
    return (
      CONSULTING_DOCTORS.find((d) => d.id === docId) ||
      CONSULTING_DOCTORS[0]
    );
  };

  // Filtered patients list
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uidn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lesionType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMandal = selectedMandalFilter === 'ALL' || p.mandal === selectedMandalFilter;
    const matchesPanchayat = selectedPanchayatFilter === 'ALL' || p.panchayat === selectedPanchayatFilter;
    const matchesDoctor = selectedDoctorFilter === 'ALL' || p.consultingDoctorId === selectedDoctorFilter;

    return matchesSearch && matchesMandal && matchesPanchayat && matchesDoctor;
  });

  // Current mandal's panchayats for filter
  const currentMandalFilterObj = ASR_11_MANDALS_PANCHAYATS.find(
    (m) => m.mandalEn === selectedMandalFilter
  );

  return (
    <div className="space-y-6">
      {/* 1. ASHA COMMAND HERO BANNER */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/60 relative overflow-hidden">
        {/* Subtle background tribal texture glow */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-sm flex items-center space-x-1">
                <HeartHandshake className="w-3.5 h-3.5 text-slate-950" />
                <span>
                  {lang === 'te' ? 'ఆశా కార్యకర్తల సమగ్ర గ్రామీణ విభాగం' : 'ASHA Grassroots Health Command'}
                </span>
              </span>
              <span className="bg-white/20 text-emerald-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/30 font-mono">
                11 {lang === 'te' ? 'మండలాలు' : 'Mandals'} • {TOTAL_PANCHAYATS_COUNT} {lang === 'te' ? 'గ్రామ పంచాయితీలు' : 'Gram Panchayats'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {lang === 'te'
                ? 'ఆరోగ్య దృష్టి — ఆశా కార్యకర్తల ముందస్తు నోటి క్యాన్సర్ నిఘా వ్యవస్థ'
                : 'Aarogya Drishti — ASHA Grassroots Onco-Care & Community Surveillance'}
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
              {lang === 'te'
                ? 'అల్లూరి సీతారామరాజు జిల్లాలోని 11 గిరిజన మండలాల్లో గ్రామ స్థాయి ఆశా కార్యకర్తల రోగుల నమోదు, 4మి.మీ పంచ్ బయాప్సీ కిట్ పర్యవేక్షణ, 108/104 అంబులెన్స్ రిఫరల్, నిపుణ వైద్యుల సంప్రదింపులు మరియు 13-దశల సంరక్షణ చక్రం.'
                : 'Empowering Accredited Social Health Activists (ASHA workers) across 11 tribal agency mandals with grassroots oral cancer registration, 4mm punch biopsy kits, specialist referral, and the 13-stage longitudinal care loop.'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('register')}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg transition-all flex items-center space-x-1.5 active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              <span>{lang === 'te' ? '+ కొత్త రోగి నమోదు' : '+ Register Patient'}</span>
            </button>

            <button
              onClick={() => {
                const target = patients[0];
                if (target) {
                  setReferralTargetPatient(target);
                  setIsReferralModalOpen(true);
                }
              }}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-2xl border border-white/40 shadow-sm transition-all flex items-center space-x-1.5 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4 text-emerald-200" />
              <span>{lang === 'te' ? 'నిపుణుడికి రిఫరల్' : 'Refer to Specialist'}</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-emerald-700/60 text-xs">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <span className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider block">
              {lang === 'te' ? 'కవర్ చేయబడిన మండలాలు' : 'Covered Mandals'}
            </span>
            <div className="text-xl font-black text-white mt-0.5">11 / 11</div>
            <span className="text-[10px] text-emerald-200">{lang === 'te' ? '176 పంచాయితీలు' : '176 Panchayats'}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <span className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider block">
              {lang === 'te' ? 'ఆశా ఆధ్వర్యంలోని రోగులు' : 'ASHA Registered Cases'}
            </span>
            <div className="text-xl font-black text-amber-300 mt-0.5">{patients.length}</div>
            <span className="text-[10px] text-emerald-200">{lang === 'te' ? 'యాక్టివ్ నిఘా' : 'Under Active Care'}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <span className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider block">
              {lang === 'te' ? 'పంచ్ బయాప్సీ కిట్లు' : 'Biopsy Punch Kits'}
            </span>
            <div className="text-xl font-black text-emerald-300 mt-0.5">12 {lang === 'te' ? 'సిద్ధం' : 'Ready'}</div>
            <span className="text-[10px] text-emerald-200">{lang === 'te' ? '10% ఫార్మాలిన్ వయల్స్' : '10% Formalin Vials'}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <span className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider block">
              {lang === 'te' ? 'సంప్రదింపు నిపుణ వైద్యులు' : 'Consulting Doctors'}
            </span>
            <div className="text-xl font-black text-white mt-0.5">{CONSULTING_DOCTORS.length}</div>
            <span className="text-[10px] text-emerald-200">{lang === 'te' ? 'పాడేరు & చింతపల్లి హబ్స్' : 'Paderu & Chintapalle'}</span>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY MODULE TABS */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white border border-slate-200 rounded-3xl shadow-sm">
        {[
          {
            id: 'loop_patients',
            labelEn: '13-Stage Care Loop & Patients',
            labelTe: '13-దశల సంరక్షణ చక్రం & రోగులు',
            icon: Activity,
            count: patients.length
          },
          {
            id: 'register',
            labelEn: '+ Patient Registration (Field)',
            labelTe: '+ నూతన రోగి నమోదు (ఫీల్డ్)',
            icon: UserPlus
          },
          {
            id: 'village_grid',
            labelEn: 'Village ASHA Care Grid',
            labelTe: 'గ్రామ వారీ ఆశా బృందం',
            icon: Home,
            count: VILLAGE_ASHA_CARE_GRID.length
          },
          {
            id: 'biopsy_kit',
            labelEn: 'Biopsy Medical Kit Tracking',
            labelTe: 'బయాప్సీ మెడికల్ కిట్ నిల్వలు',
            icon: Scissors
          },
          {
            id: 'referrals',
            labelEn: 'Referral & Doctors Dropbox',
            labelTe: 'నిపుణుల రిఫరల్ & వైద్యుల డ్రాప్‌బాక్స్',
            icon: Stethoscope,
            count: CONSULTING_DOCTORS.length
          },
          {
            id: 'prescriptions',
            labelEn: 'Patient Prescriptions Vault',
            labelTe: 'రోగి ప్రిస్క్రిప్షన్ రికార్డులు',
            icon: FileText
          }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
              <span>{lang === 'te' ? tab.labelTe : tab.labelEn}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 13-STAGE CARE LOOP & PATIENTS LIST */}
      {/* ========================================================================= */}
      {activeTab === 'loop_patients' && (
        <div className="space-y-6">
          {/* A. 13-STAGE MANDATORY LONGITUDINAL CARE LOOP TRACKER */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                  <h3 className="font-black text-sm sm:text-base text-slate-950 uppercase tracking-wide">
                    {lang === 'te'
                      ? '13-దశల నిరంతర సంరక్షణ చక్రం (ASHA-Ambulance-Specialist-Biopsy-Daily Tracking)'
                      : 'Official 13-Stage Grassroots Longitudinal Care Loop Pipeline'}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {lang === 'te'
                    ? `ఎంచుకున్న రోగి: ${selectedPatient?.name} (${selectedPatient?.uidn}) • ప్రస్తుత దశ: ${selectedPatient?.currentLoopStageId} / 13`
                    : `Active Patient: ${selectedPatient?.name} (${selectedPatient?.uidn}) • Current Stage: ${selectedPatient?.currentLoopStageId} / 13`}
                </p>
              </div>

              {/* Advance Stage Button */}
              {selectedPatient && (
                <button
                  onClick={() => handleAdvanceStage(selectedPatient.uidn)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>{lang === 'te' ? 'తదుపరి దశకు మార్చండి (Advance)' : 'Advance to Next Stage'}</span>
                </button>
              )}
            </div>

            {/* Horizontal Scrollable 13-Stage Visual Pipeline */}
            <div className="overflow-x-auto pb-3 pt-1">
              <div className="flex items-start space-x-2 min-w-[1200px]">
                {ASHA_13_CARE_LOOP_STAGES.map((st) => {
                  const isCurrent = selectedPatient?.currentLoopStageId === st.id;
                  const isCompleted = (selectedPatient?.currentLoopStageId || 1) > st.id;

                  return (
                    <div
                      key={st.id}
                      className={`flex-1 min-w-[140px] p-3 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                          : isCompleted
                          ? 'bg-slate-50 border-slate-200 opacity-90'
                          : 'bg-white border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                            isCurrent
                              ? 'bg-emerald-600 text-white animate-pulse'
                              : isCompleted
                              ? 'bg-slate-700 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {st.id}
                        </span>
                        {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {isCurrent && (
                          <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                            LIVE
                          </span>
                        )}
                      </div>

                      <div className="font-extrabold text-[11px] text-slate-900 leading-tight">
                        {lang === 'te' ? st.titleTe : st.title}
                      </div>

                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                        {lang === 'te' ? st.descTe : st.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Stage Callout for Selected Patient */}
            {selectedPatient && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-extrabold text-emerald-950 uppercase text-[10px] tracking-wider block">
                    {lang === 'te' ? 'ప్రస్తుత రోగి స్థితి & ఆశా డైలీ పర్యవేక్షణ' : 'Current Patient Status & Daily Tracking'}
                  </span>
                  <div className="text-slate-900 font-bold">
                    {selectedPatient.dailyTrackingStatus}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {lang === 'te' ? 'చివరి ఆశా హోమ్ విజిట్' : 'Last Home Visit'}:{' '}
                    <strong>{selectedPatient.lastVisitDate}</strong> • {lang === 'te' ? 'గ్రామం' : 'Village'}:{' '}
                    <strong>{selectedPatient.village} ({selectedPatient.mandal})</strong>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setReferralTargetPatient(selectedPatient);
                      setIsReferralModalOpen(true);
                    }}
                    className="px-3.5 py-2 bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center space-x-1 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-royal-200" />
                    <span>{lang === 'te' ? 'వైద్యుడికి రిఫర్ చేయండి' : 'Refer to Doctor'}</span>
                  </button>

                  {onOpenScreening && (
                    <button
                      onClick={onOpenScreening}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center space-x-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{lang === 'te' ? 'నోటి ఫోటో తీయండి' : 'Retake Mouth Scan'}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* B. ASHA PATIENT ROSTER WITH FILTERS */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-950 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-emerald-700" />
                  <span>
                    {lang === 'te'
                      ? `ఆశా పరిధిలోని రోగుల జాబితా (${filteredPatients.length})`
                      : `ASHA Community Patients Registry (${filteredPatients.length})`}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'te'
                    ? '11 మండలాలు మరియు 176 పంచాయితీల్లో ఆశా వర్కర్లు పర్యవేక్షిస్తున్న రోగుల సమగ్ర వివరాలు'
                    : 'Search, filter, track clinical status, and maintain prescription history across 11 Mandals'}
                </p>
              </div>

              {/* 11 Mandals Dropdown & Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* 11 Mandals DropDown */}
                <div className="flex items-center space-x-1 bg-slate-100 border border-slate-300 rounded-xl px-2.5 py-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="font-bold text-slate-700">{lang === 'te' ? 'మండలం:' : 'Mandal:'}</span>
                  <select
                    value={selectedMandalFilter}
                    onChange={(e) => {
                      setSelectedMandalFilter(e.target.value);
                      setSelectedPanchayatFilter('ALL');
                    }}
                    className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">{lang === 'te' ? 'అన్ని 11 మండలాలు' : 'All 11 Mandals'}</option>
                    {ASR_11_MANDALS_PANCHAYATS.map((m) => (
                      <option key={m.mandalEn} value={m.mandalEn}>
                        {lang === 'te' ? m.mandalTe : m.mandalEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 176 Panchayats Segments Dropdown (Dependent on selected Mandal) */}
                <div className="flex items-center space-x-1 bg-slate-100 border border-slate-300 rounded-xl px-2.5 py-1.5">
                  <span className="font-bold text-slate-700">{lang === 'te' ? 'పంచాయితీ:' : 'Panchayat:'}</span>
                  <select
                    value={selectedPanchayatFilter}
                    onChange={(e) => setSelectedPanchayatFilter(e.target.value)}
                    className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer max-w-[150px] truncate"
                  >
                    <option value="ALL">{lang === 'te' ? 'అన్ని పంచాయితీలు' : 'All Panchayats'}</option>
                    {currentMandalFilterObj
                      ? currentMandalFilterObj.panchayats.map((p) => (
                          <option key={p.en} value={p.en}>
                            {lang === 'te' ? p.te : p.en}
                          </option>
                        ))
                      : ASR_11_MANDALS_PANCHAYATS.flatMap((m) => m.panchayats).map((p) => (
                          <option key={p.en} value={p.en}>
                            {lang === 'te' ? p.te : p.en}
                          </option>
                        ))}
                  </select>
                </div>

                {/* Doctors List Dropbox Filter */}
                <div className="flex items-center space-x-1 bg-slate-100 border border-slate-300 rounded-xl px-2.5 py-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-royal-600" />
                  <span className="font-bold text-slate-700">{lang === 'te' ? 'వైద్యులు:' : 'Doctor:'}</span>
                  <select
                    value={selectedDoctorFilter}
                    onChange={(e) => setSelectedDoctorFilter(e.target.value)}
                    className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer max-w-[140px] truncate"
                  >
                    <option value="ALL">{lang === 'te' ? 'అందరు వైద్యులు' : 'All Doctors'}</option>
                    {CONSULTING_DOCTORS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {lang === 'te' ? d.nameTe : d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Free Search Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === 'te' ? 'పేరు, UIDN, గ్రామం శోధించండి...' : 'Search Name, UIDN, Village...'}
                    className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44"
                  />
                </div>
              </div>
            </div>

            {/* Patients Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">{lang === 'te' ? 'రోగి & డిజిటల్ UIDN' : 'Patient & UIDN'}</th>
                    <th className="py-3 px-4">{lang === 'te' ? 'గ్రామం / పంచాయితీ / మండలం' : 'Village & Mandal'}</th>
                    <th className="py-3 px-4">{lang === 'te' ? 'నోటి స్థితి & అలవాటు' : 'Lesion & Habit'}</th>
                    <th className="py-3 px-4">{lang === 'te' ? 'సంప్రదింపు వైద్యులు' : 'Which Doctor Consulting'}</th>
                    <th className="py-3 px-4 text-center">{lang === 'te' ? '13-దశల సంరక్షణ స్థితి' : 'Care Loop Stage'}</th>
                    <th className="py-3 px-4 text-center">{lang === 'te' ? 'చర్యలు' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {filteredPatients.map((p) => {
                    const doc = getDoctor(p.consultingDoctorId);
                    const isSelected = p.uidn === selectedPatientId;
                    const stageObj = ASHA_13_CARE_LOOP_STAGES.find((s) => s.id === p.currentLoopStageId);

                    return (
                      <tr
                        key={p.uidn}
                        onClick={() => setSelectedPatientId(p.uidn)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-emerald-50/80 font-bold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="font-extrabold text-slate-950 flex items-center space-x-1.5">
                            <span>{p.name}</span>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            <span className="text-emerald-700 font-bold">{p.uidn}</span> • {p.age} Yrs ({p.gender})
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{p.village}</div>
                          <div className="text-[10px] text-slate-500">
                            GP: {p.panchayat} • Mandal: <strong>{p.mandal}</strong>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                              p.lesionSeverity === 'Biopsy Needed' || p.lesionSeverity === 'Severe'
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : p.lesionSeverity === 'Moderate'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            {p.lesionType}
                          </span>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {p.habit} ({p.habitYears} Yrs)
                          </div>
                        </td>

                        {/* Which Doctor Consulting */}
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-7 h-7 rounded-xl ${doc.avatarColor} text-white flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                              {doc.name.charAt(4) || 'D'}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{lang === 'te' ? doc.nameTe : doc.name}</div>
                              <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                                {lang === 'te' ? doc.hospitalTe : doc.hospital}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Care Loop Stage */}
                        <td className="py-3 px-4 text-center">
                          <span className="font-extrabold text-[10px] px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 inline-block shadow-2xs">
                            Step {p.currentLoopStageId}: {stageObj?.key || ''}
                          </span>
                          <div className="text-[9px] text-slate-500 mt-0.5 font-medium">
                            {lang === 'te' ? stageObj?.titleTe : stageObj?.desc}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setReferralTargetPatient(p);
                                setIsReferralModalOpen(true);
                              }}
                              className="px-2 py-1 bg-royal-50 hover:bg-royal-100 text-royal-800 font-bold text-[10px] rounded-lg border border-royal-200 transition-all"
                              title="Refer to Doctor"
                            >
                              {lang === 'te' ? 'రిఫరల్' : 'Refer'}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPatientId(p.uidn);
                                setActiveTab('prescriptions');
                              }}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-lg border border-emerald-200 transition-all"
                              title="View Prescription"
                            >
                              Rx ({p.prescriptionsCount})
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ASHA FIELD PATIENT REGISTRATION FORM */}
      {/* ========================================================================= */}
      {activeTab === 'register' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div className="border-b border-slate-200 pb-4">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 mb-2">
              <UserPlus className="w-3.5 h-3.5" />
              <span>{lang === 'te' ? 'ఆశా ఫీల్డ్ నమోదు విభాగం' : 'ASHA Field Registration Console'}</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-950">
              {lang === 'te'
                ? 'నూతన గిరిజన పౌరుడి నోటి క్యాన్సర్ స్క్రీనింగ్ నమోదు'
                : 'New Tribal Citizen Oral Cancer Screening Registration'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'te'
                ? '11 మండలాలు మరియు 176 పంచాయితీల్లోని గిరిజనులకు తక్షణ డిజిటల్ UIDN & ఆశా కేర్ ట్రాకింగ్'
                : 'Instant UIDN generation with 11 Mandals & 176 Panchayats mapping and doctor assignment'}
            </p>
          </div>

          {regSuccessMsg ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-extrabold text-lg text-emerald-950">{regSuccessMsg}</h4>
              <p className="text-xs text-emerald-800 font-medium">
                {lang === 'te'
                  ? 'రోగి రికార్డు ఆశా రిజిస్ట్రీకి మరియు 13-దశల సంరక్షణ చక్రానికి జతచేయబడింది!'
                  : 'Patient linked to ASHA active caseload and longitudinal care loop!'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegisterPatient} className="space-y-4 text-xs">
              {/* Row 1: Patient Name, Age, Gender, Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'te' ? 'రోగి పూర్తి పేరు *' : 'Patient Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    placeholder="e.g. K. Somanna Dora"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'te' ? 'వయస్సు (సంవత్సరాలు) *' : 'Age (Years) *'}
                  </label>
                  <input
                    type="number"
                    required
                    min={10}
                    max={100}
                    value={regForm.age}
                    onChange={(e) => setRegForm({ ...regForm, age: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'te' ? 'లింగం *' : 'Gender *'}
                  </label>
                  <select
                    value={regForm.gender}
                    onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="M">{lang === 'te' ? 'పురుషుడు (Male)' : 'Male'}</option>
                    <option value="F">{lang === 'te' ? 'మహిళ (Female)' : 'Female'}</option>
                    <option value="Other">{lang === 'te' ? 'ఇతర (Other)' : 'Other'}</option>
                  </select>
                </div>
              </div>

              {/* Row 2: 11 Mandals DropDown & 176 Panchayats Segments DropDown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'te' ? '11 మండలాలు (11 Mandals DropDown) *' : 'Mandal (11 ASR Mandals) *'}
                  </label>
                  <select
                    value={regForm.mandal}
                    onChange={(e) => handleRegMandalChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-extrabold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {ASR_11_MANDALS_PANCHAYATS.map((m) => (
                      <option key={m.mandalEn} value={m.mandalEn}>
                        {lang === 'te' ? m.mandalTe : m.mandalEn} ({m.panchayatsCount} GP)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'te' ? 'గ్రామ పంచాయితీ (176 Segments) *' : 'Gram Panchayat (176 Segments) *'}
                  </label>
                  <select
                    value={regForm.panchayat}
                    onChange={(e) =>
                      setRegForm({ ...regForm, panchayat: e.target.value, village: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {ASR_11_MANDALS_PANCHAYATS.find((m) => m.mandalEn === regForm.mandal)?.panchayats.map(
                      (p) => (
                        <option key={p.en} value={p.en}>
                          {lang === 'te' ? p.te : p.en}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'te' ? 'గ్రామం / నివాసం *' : 'Village / Habitation *'}
                  </label>
                  <input
                    type="text"
                    value={regForm.village}
                    onChange={(e) => setRegForm({ ...regForm, village: e.target.value })}
                    placeholder="e.g. Nurmati Tribal Habitation"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Row 3: Habits Exposure, Lesion Type, Severity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'te' ? 'అలవాటు (Habit Exposure) *' : 'Indigenous Habit *'}
                  </label>
                  <select
                    value={regForm.habit}
                    onChange={(e) => setRegForm({ ...regForm, habit: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Adda Poga (Reverse Smoking of Cigar)">
                      {lang === 'te' ? 'అడ్డాపొగ (రివర్స్ చుట్ట కాల్చడం)' : 'Adda Poga (Reverse Smoking of Cigar)'}
                    </option>
                    <option value="Chewable Tobacco & Gutkha">
                      {lang === 'te' ? 'నమిలే పొగాకు & గుట్కా' : 'Chewable Tobacco & Gutkha'}
                    </option>
                    <option value="Raw Areca Nut & Paan">
                      {lang === 'te' ? 'పచ్చి వక్క & తమలపాకు ఖైనీ' : 'Raw Areca Nut & Paan'}
                    </option>
                    <option value="Multiple Risk Habits">
                      {lang === 'te' ? 'పొగత్రాగడం మరియు పొగాకు రెండూ' : 'Multiple Risk Habits'}
                    </option>
                    <option value="No Tobacco Habit">
                      {lang === 'te' ? 'పొగాకు అలవాటు లేదు' : 'No Tobacco Habit'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'te' ? 'ప్రాథమిక నోటి లక్షణం *' : 'Observed Oral Lesion *'}
                  </label>
                  <select
                    value={regForm.lesionType}
                    onChange={(e) => setRegForm({ ...regForm, lesionType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="White Mucosal Patch (Leukoplakia)">
                      {lang === 'te' ? 'తెల్లటి మచ్చ (ల్యూకోప్లాకియా)' : 'White Mucosal Patch (Leukoplakia)'}
                    </option>
                    <option value="Red Velvety Patch (Erythroplakia)">
                      {lang === 'te' ? 'ఎర్రటి రక్తవర్ణ మచ్చ (ఎరిత్రోప్లాకియా)' : 'Red Velvety Patch (Erythroplakia)'}
                    </option>
                    <option value="Restricted Mouth Opening (OSMF)">
                      {lang === 'te' ? 'నోరు తెరుచుకోకపోవడం (OSMF)' : 'Restricted Mouth Opening (OSMF)'}
                    </option>
                    <option value="Non-healing Ulcer > 2 Weeks">
                      {lang === 'te' ? '2 వారాలకు పైగా మానని పుండు' : 'Non-healing Ulcer > 2 Weeks'}
                    </option>
                    <option value="Healthy Mucosa (Normal)">
                      {lang === 'te' ? 'సాధారణ ఆరోగ్యకరమైన నోరు' : 'Healthy Mucosa (Normal)'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'te' ? 'తీవ్రత అంచనా *' : 'Triage Severity *'}
                  </label>
                  <select
                    value={regForm.lesionSeverity}
                    onChange={(e) => setRegForm({ ...regForm, lesionSeverity: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Biopsy Needed">{lang === 'te' ? '🔴 బయాప్సీ అవసరం (Biopsy Needed)' : 'Biopsy Needed'}</option>
                    <option value="Severe">{lang === 'te' ? '🟠 తీవ్రమైన ప్రమాదం (Severe)' : 'Severe'}</option>
                    <option value="Moderate">{lang === 'te' ? '🟡 మధ్యస్థం (Moderate)' : 'Moderate'}</option>
                    <option value="Mild">{lang === 'te' ? '🟢 సాధారణం (Mild)' : 'Mild'}</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Doctors List Dropbox & Assigned ASHA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="font-bold text-slate-700 block mb-1 flex items-center space-x-1">
                    <Stethoscope className="w-3.5 h-3.5 text-royal-600" />
                    <span>{lang === 'te' ? 'కేటాయించే నిపుణ వైద్యులు (Doctors List Dropbox) *' : 'Assign Consulting Doctor (Dropbox) *'}</span>
                  </label>
                  <select
                    value={regForm.consultingDoctorId}
                    onChange={(e) => setRegForm({ ...regForm, consultingDoctorId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-extrabold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {CONSULTING_DOCTORS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {lang === 'te' ? d.nameTe : d.name} — {d.specialization} ({d.mandal})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'te' ? 'బాధ్యత వహించే ఆశా కార్యకర్త ID' : 'Caring ASHA Worker ID'}
                  </label>
                  <input
                    type="text"
                    value={regForm.ashaWorkerId}
                    onChange={(e) => setRegForm({ ...regForm, ashaWorkerId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('loop_patients')}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-all cursor-pointer"
                >
                  {lang === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>{lang === 'te' ? 'రోగిని నమోదు చేయండి (UIDN జనరేట్)' : 'Register & Assign UIDN'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: VILLAGE ASHA CARE GRID ("How many ASHA workers caring about Patients in one Village") */}
      {/* ========================================================================= */}
      {activeTab === 'village_grid' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 mb-1">
                <Home className="w-3.5 h-3.5" />
                <span>
                  {lang === 'te'
                    ? 'ఒక గ్రామంలో ఎంతమంది ఆశా కార్యకర్తలు సేవలందిస్తున్నారు?'
                    : 'Village ASHA Staffing & Caseload Grid'}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-950">
                {lang === 'te'
                  ? 'గ్రామ వారీగా ఆశా కార్యకర్తల సంఖ్య & రోగుల పర్యవేక్షణ నెట్‌వర్క్'
                  : 'Village-Wise ASHA Coverage & Active Patient Caseload'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'te'
                  ? 'అల్లూరి సీతారామరాజు జిల్లాలోని ప్రతి గ్రామంలో ఆశా కార్యకర్తల సంఖ్య, పేర్లు, ఫోన్ నంబర్లు మరియు కేటాయించిన బయాప్సీ కిట్లు'
                  : 'Detailed breakdown of active ASHA workers stationed per village, population ratios, and punch biopsy readiness'}
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2 text-xs text-emerald-900 font-bold">
              <span>{lang === 'te' ? 'మొత్తం మ్యాప్ చేసిన గ్రామాలు:' : 'Mapped Tribal Villages:'} </span>
              <strong className="text-emerald-700 font-black">{VILLAGE_ASHA_CARE_GRID.length}</strong>
            </div>
          </div>

          {/* Village Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VILLAGE_ASHA_CARE_GRID.map((vg, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-300 rounded-3xl p-5 shadow-2xs transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  {/* Village Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">
                        {lang === 'te' ? vg.villageTe : vg.village}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-semibold">
                        GP: {vg.panchayat} • Mandal: <strong>{vg.mandal}</strong>
                      </span>
                    </div>

                    <span className="bg-emerald-700 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-2xs">
                      {vg.ashaCount} {lang === 'te' ? 'ఆశా వర్కర్లు' : 'ASHAs'}
                    </span>
                  </div>

                  {/* ASHA Workers list in this village */}
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wide block">
                      {lang === 'te' ? 'ఈ గ్రామంలోని ఆశా కార్యకర్తలు:' : 'ASHAs Caring for this Village:'}
                    </span>
                    <div className="space-y-1">
                      {vg.ashaWorkers.map((aw) => (
                        <div
                          key={aw.id}
                          className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs"
                        >
                          <div className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            <span className="font-bold text-slate-900">
                              {lang === 'te' ? aw.nameTe : aw.name}
                            </span>
                            {aw.isLead && (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1 rounded">
                                LEAD
                              </span>
                            )}
                          </div>
                          <a
                            href={`tel:${aw.phone}`}
                            className="font-mono text-[10px] text-emerald-700 hover:underline flex items-center space-x-1"
                          >
                            <PhoneCall className="w-2.5 h-2.5" />
                            <span>{aw.phone}</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-3 text-center text-[10px]">
                    <div className="bg-white p-2 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block">{lang === 'te' ? 'జనాభా' : 'Population'}</span>
                      <strong className="text-slate-900 text-xs">{vg.populationCovered}</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block">{lang === 'te' ? 'స్క్రీనింగ్' : 'Screened'}</span>
                      <strong className="text-royal-700 text-xs">{vg.patientsScreened}</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block">{lang === 'te' ? 'తీవ్ర కేసులు' : 'High Risk'}</span>
                      <strong className="text-red-700 text-xs">{vg.highRiskCases}</strong>
                    </div>
                  </div>
                </div>

                {/* Allocated Kit & Ambulance */}
                <div className="pt-2 border-t border-slate-200 text-[10px] space-y-1">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>{lang === 'te' ? 'బయాప్సీ కిట్:' : 'Biopsy Kit:'}</span>
                    <strong className="font-mono text-emerald-800">{vg.punchBiopsyKitAllocated}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>{lang === 'te' ? 'అంబులెన్స్ సేవ:' : 'Ambulance Unit:'}</span>
                    <strong className="text-slate-900">{vg.ambulanceSubCentre}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: BIOPSY MEDICAL KIT TRACKING */}
      {/* ========================================================================= */}
      {activeTab === 'biopsy_kit' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-royal-800 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 mb-1">
                <Scissors className="w-3.5 h-3.5" />
                <span>{lang === 'te' ? '4మి.మీ డయాగ్నస్టిక్ పంచ్ బయాప్సీ కిట్' : '4mm Diagnostic Punch Biopsy Kit Inventory'}</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-950">
                {lang === 'te' ? 'ఆశా మరియు పీహెచ్‌సీ బయాప్సీ మెడికల్ కిట్ నిల్వలు & రవాణా' : 'ASHA & PHC Biopsy Medical Kit & Cold-Chain Transit'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'te'
                  ? 'కణజాల సంరక్షణ కోసం 10% ఫార్మాలిన్ వయల్స్, స్టెరైల్ పంచ్ బ్లేడ్లు మరియు పాడేరు ల్యాబ్‌కు 104 రవాణా'
                  : 'Formalin preservation, sterile trephines, local anesthesia, and cold-chain sample transport to Area Hospital Paderu Tele-Lab'}
              </p>
            </div>

            <div className="bg-slate-100 rounded-2xl p-3 border border-slate-300 text-xs space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">{lang === 'te' ? 'కిట్ కోడ్' : 'Kit Serial ID'}</span>
              <div className="font-mono font-black text-slate-900 text-sm">{biopsyKitStatus.kitId}</div>
              <span className="text-emerald-700 font-bold text-[10px]">{biopsyKitStatus.assignedPhc}</span>
            </div>
          </div>

          {/* Kit Visual Inventory Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                {lang === 'te' ? '4మి.మీ స్టెరైల్ పంచ్ బ్లేడ్లు' : '4mm Sterile Trephines'}
              </span>
              <div className="text-2xl font-black text-slate-900">{biopsyKitStatus.trephines4mmCount}</div>
              <span className="text-[10px] text-emerald-700 font-bold">{lang === 'te' ? 'సిద్ధంగా ఉన్నాయి (Disposables)' : 'Sterile & Ready'}</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                {lang === 'te' ? '10% ఫార్మాలిన్ వయల్స్' : '10% Formalin Vials'}
              </span>
              <div className="text-2xl font-black text-slate-900">{biopsyKitStatus.formalinVialsCount}</div>
              <span className="text-[10px] text-blue-700 font-bold">{lang === 'te' ? 'కణజాల రక్షణ సిద్ధం' : 'Preservation Ready'}</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                {lang === 'te' ? '2% లిగ్నోకేన్ అనస్థీషియా' : '2% Lignocaine Vials'}
              </span>
              <div className="text-2xl font-black text-slate-900">{biopsyKitStatus.lignocaineVialsCount}</div>
              <span className="text-[10px] text-emerald-700 font-bold">{lang === 'te' ? 'నొప్పి నివారణ' : 'Local Anesthetic'}</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                {lang === 'te' ? 'కోల్డ్-చైన్ ఉష్ణోగ్రత' : 'Cold-Chain Transit Box'}
              </span>
              <div className="text-2xl font-black text-emerald-700">{biopsyKitStatus.coldChainTempCelsius}°C</div>
              <span className="text-[10px] text-emerald-800 font-bold">{biopsyKitStatus.transitBoxStatus}</span>
            </div>
          </div>

          {/* Procedure Readiness Guide */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-3 text-xs">
            <h4 className="font-extrabold text-sm text-royal-950 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-royal-700" />
              <span>
                {lang === 'te'
                  ? 'ఆశా & పీహెచ్‌సీ 4మి.మీ పంచ్ బయాప్సీ ప్రామాణిక ప్రోటోకాల్ (SOP)'
                  : 'Official 4mm Punch Biopsy Standard Operating Procedure (SOP)'}
              </span>
            </h4>
            <ol className="list-decimal pl-5 space-y-1 text-slate-700 font-medium">
              <li>
                {lang === 'te'
                  ? 'రోగి ముఖం మరియు నోటి భాగంలో ల్యూకోప్లాకియా లేదా ఎరిత్రోప్లాకియా ఉన్న ప్రాంతాన్ని గుర్తించి యాంటిసెప్టిక్ వాష్ చేయడం.'
                  : 'Identify and disinfect the indurated leukoplakia or erythroplakic site with chlorhexidine.'}
              </li>
              <li>
                {lang === 'te'
                  ? 'వైద్యాధికారి 2% లిగ్నోకేన్ లోకల్ అనస్థీషియాను 0.5మి.లీ ఇంజెక్ట్ చేసి 3 నిమిషాలు వేచి ఉండటం.'
                  : 'Administer 0.5ml 2% Lignocaine local anesthesia subcutaneously into surrounding margins.'}
              </li>
              <li>
                {lang === 'te'
                  ? '4మి.మీ స్టెరైల్ పంచ్ బ్లేడ్‌తో కణజాలాన్ని గుండ్రంగా సేకరించి, వెంటనే 10% న్యూట్రల్ బఫర్డ్ ఫార్మాలిన్ వయల్‌లో భద్రపరచడం.'
                  : 'Excise 4mm tissue core with sterile rotary trephine and immediately submerge in 10% buffered formalin vial.'}
              </li>
              <li>
                {lang === 'te'
                  ? 'వయల్‌పై రోగి డిజిటల్ UIDN బార్‌కోడ్ అతికించి, 104 రవాణా అంబులెన్స్ ద్వారా పాడేరు హిస్టోపాథాలజీ ల్యాబ్‌కు పంపడం.'
                  : 'Affix patient UIDN barcode on formalin container and dispatch via 104 transit to Area Hospital Paderu Tele-Lab.'}
              </li>
            </ol>
          </div>

          {/* Restock & 104 Dispatch Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
            <span className="text-[11px] text-slate-500">
              {lang === 'te'
                ? `చివరిగా కిట్ శుభ్రపరచిన తేది: ${biopsyKitStatus.lastSterilizationDate}`
                : `Last Sterilization Batch: ${biopsyKitStatus.lastSterilizationDate}`}
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setBiopsyKitStatus((prev) => ({
                    ...prev,
                    ambulanceTransitDispatchActive: true
                  }));
                  alert(
                    lang === 'te'
                      ? '104 మొబైల్ శాంపిల్ పికప్ వాహనం అభ్యర్థించబడింది! డ్రైవర్ త్వరలోనే చేరుకుంటారు.'
                      : '104 Mobile Sample Transit Vehicle dispatched for formalin specimen pickup!'
                  );
                }}
                className="px-4 py-2.5 bg-royal-700 hover:bg-royal-800 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>{lang === 'te' ? '104 శాంపిల్ పికప్ రవాణా' : 'Dispatch 104 Specimen Pickup'}</span>
              </button>

              <button
                onClick={() => {
                  setBiopsyKitStatus((prev) => ({
                    ...prev,
                    trephines4mmCount: prev.trephines4mmCount + 10,
                    formalinVialsCount: prev.formalinVialsCount + 10
                  }));
                  alert(
                    lang === 'te'
                      ? 'ఐటీడీఏ సెంట్రల్ డిపో నుండి 10 కొత్త పంచ్ బ్లేడ్లు & ఫార్మాలిన్ వయల్స్ రీస్టాక్ చేయబడ్డాయి!'
                      : 'Kit restocked successfully with 10 sterile punch trephines and formalin vials from ITDA Central Depot!'
                  );
                }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>{lang === 'te' ? 'కిట్ రీస్టాక్ చేయండి' : 'Request Kit Restock'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: REFERRAL TO SPECIALIST & DOCTORS LIST DROPBOX */}
      {/* ========================================================================= */}
      {activeTab === 'referrals' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-royal-800 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 mb-1">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{lang === 'te' ? 'నిపుణుల నెట్‌వర్క్ & రిఫరల్ గేట్‌వే' : 'Specialist Network & Referral Gateway'}</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-950">
                {lang === 'te'
                  ? 'సంప్రదింపు వైద్యుల జాబితా (Doctors List Dropbox)'
                  : 'Consulting Onco-Specialists Directory & Referrals'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'te'
                  ? 'పాడేరు జిల్లా ప్రధాన ఆసుపత్రి, చింతపల్లి ఏరియా ఆసుపత్రి మరియు అరకు సీహెచ్‌సీ నిపుణ వైద్యులు'
                  : 'Verified onco-pathologists, head & neck ENT surgeons, and oral medicine specialists available for direct ASHA tele-consultation'}
              </p>
            </div>

            <button
              onClick={() => {
                setReferralTargetPatient(patients[0]);
                setIsReferralModalOpen(true);
              }}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4 text-white" />
              <span>{lang === 'te' ? '+ కొత్త రిఫరల్ పంపండి' : '+ Create Patient Referral'}</span>
            </button>
          </div>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONSULTING_DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-royal-300 rounded-3xl p-5 shadow-2xs transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start space-x-3">
                    <div className={`w-12 h-12 rounded-2xl ${doc.avatarColor} text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-sm`}>
                      {doc.name.charAt(4) || 'D'}
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-950 text-sm">
                        {lang === 'te' ? doc.nameTe : doc.name}
                      </div>
                      <div className="text-[11px] text-royal-700 font-bold">{doc.qualification}</div>
                      <span className="font-mono text-[10px] text-slate-400 font-bold">{doc.id}</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 text-xs">
                    <div className="text-slate-700">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">{lang === 'te' ? 'ప్రత్యేకత' : 'Specialization'}</span>
                      <strong className="text-slate-900">{lang === 'te' ? doc.specializationTe : doc.specialization}</strong>
                    </div>

                    <div className="text-slate-700 pt-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">{lang === 'te' ? 'విధి నిర్వహణ ఆసుపత్రి' : 'Hospital Duty'}</span>
                      <span>{lang === 'te' ? doc.hospitalTe : doc.hospital}</span>
                    </div>

                    <div className="text-slate-700 pt-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">{lang === 'te' ? 'లభ్యత సమయం' : 'OPD & Tele-Duty'}</span>
                      <span className="text-[11px] text-emerald-800 font-semibold">{doc.availableDays}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <a
                    href={`tel:${doc.phone}`}
                    className="font-mono text-xs text-slate-700 hover:text-emerald-700 flex items-center space-x-1 font-bold"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{doc.phone}</span>
                  </a>

                  <button
                    onClick={() => {
                      setReferralDoctorId(doc.id);
                      setReferralTargetPatient(patients[0]);
                      setIsReferralModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-royal-600 hover:bg-royal-700 text-white font-extrabold text-[11px] rounded-xl shadow-2xs transition-all cursor-pointer"
                  >
                    {lang === 'te' ? 'రోగిని రిఫర్ చేయి' : 'Refer Patient'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: MAINTAIN RECORD/HISTORY OF PATIENTS PRESCRIPTION */}
      {/* ========================================================================= */}
      {activeTab === 'prescriptions' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 mb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === 'te' ? 'డిజిటల్ ఔషధ రికార్డులు & హిస్టరీ' : 'Prescription Vault & Medical History'}</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-950">
                {lang === 'te'
                  ? `రోగి ప్రిస్క్రిప్షన్ల హిస్టరీ — ${selectedPatient?.name} (${selectedPatient?.uidn})`
                  : `Longitudinal Prescription Vault — ${selectedPatient?.name} (${selectedPatient?.uidn})`}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'te'
                  ? 'కన్సల్టింగ్ డాక్టర్ సూచించిన మందులు, మోతాదు, బయాప్సీ ఆర్డర్లు మరియు అధికారిక బార్‌కోడ్ స్లిప్పులు'
                  : 'Official medications, dosage schedules, surgical punch notes, and verifiable QR/Barcode records'}
              </p>
            </div>

            {/* Switch Selected Patient Dropdown */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-bold text-slate-600">{lang === 'te' ? 'రోగిని ఎంచుకోండి:' : 'Select Patient:'}</span>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="bg-slate-100 border border-slate-300 font-extrabold text-slate-900 rounded-xl px-3 py-2 cursor-pointer focus:outline-none"
              >
                {patients.map((p) => (
                  <option key={p.uidn} value={p.uidn}>
                    {p.name} ({p.uidn})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Prescriptions List */}
          {selectedPatient && selectedPatient.prescriptions.length > 0 ? (
            <div className="space-y-4">
              {selectedPatient.prescriptions.map((rx, idx) => (
                <div
                  key={rx.rxId || idx}
                  className="bg-slate-50 rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-royal-700 text-white flex items-center justify-center font-bold text-sm">
                        Rx
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-black text-slate-900 text-sm">{rx.rxId}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                            {lang === 'te' ? 'ధృవీకరించబడిన ప్రిస్క్రిప్షన్' : 'Verified e-Prescription'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {lang === 'te' ? 'తేది' : 'Prescribed Date'}: <strong>{rx.date}</strong> • {lang === 'te' ? 'వైద్యులు' : 'Consulting Doctor'}:{' '}
                          <strong className="text-royal-800">{rx.doctorName}</strong> ({rx.doctorHospital})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.print()}
                        className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-all flex items-center space-x-1 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-600" />
                        <span>{lang === 'te' ? 'స్లిప్ ప్రింట్ చేయండి' : 'Print Slip'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Medicines Table */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-4">{lang === 'te' ? 'ఔషధం పేరు' : 'Medicine Name'}</th>
                          <th className="py-2.5 px-4">{lang === 'te' ? 'మోతాదు & వినియోగ విధానం' : 'Dosage & Instructions'}</th>
                          <th className="py-2.5 px-4">{lang === 'te' ? 'వ్యవధి' : 'Duration'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                        {rx.medicines.map((m, mIdx) => (
                          <tr key={mIdx} className="hover:bg-slate-50">
                            <td className="py-2.5 px-4 font-bold text-slate-900">• {m.name}</td>
                            <td className="py-2.5 px-4 text-slate-600">{m.dosage}</td>
                            <td className="py-2.5 px-4 font-mono font-bold text-royal-700">{m.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Clinical Remarks & Barcode */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
                    <div className="text-slate-600 italic max-w-xl">
                      "{rx.notes}"
                    </div>

                    <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                      <QrCode className="w-5 h-5 text-slate-900" />
                      <span className="font-mono text-[11px] font-bold text-slate-800">{rx.barcode}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-3xl border border-slate-200">
              {lang === 'te'
                ? 'ఈ రోగికి ప్రస్తుతానికి ప్రిస్క్రిప్షన్లు నమోదు కాలేదు. వైద్యుడి సంప్రదింపు తర్వాత ఇక్కడ కనిపిస్తాయి.'
                : 'No prescriptions recorded for this patient yet. Specialist doctor will issue after consultation.'}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: REFERRAL TO SPECIALIST WITH DOCTORS LIST DROPBOX */}
      {/* ========================================================================= */}
      {isReferralModalOpen && referralTargetPatient && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-base text-slate-950">
                  {lang === 'te' ? 'నిపుణ వైద్యుడికి రిఫరల్ (Referral to Specialist)' : 'Patient Referral to Specialist'}
                </h3>
              </div>
              <button
                onClick={() => setIsReferralModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {referralSuccessMsg ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-emerald-950 text-sm">{referralSuccessMsg}</h4>
              </div>
            ) : (
              <form onSubmit={handleSendReferral} className="space-y-3.5 text-xs">
                {/* Patient Summary Header */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">{referralTargetPatient.name}</div>
                  <div className="text-[11px] text-slate-500">
                    UIDN: <strong className="font-mono text-emerald-700">{referralTargetPatient.uidn}</strong> • {referralTargetPatient.age} Yrs ({referralTargetPatient.gender})
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    {lang === 'te' ? 'లక్షణం' : 'Lesion'}: <strong className="text-amber-800">{referralTargetPatient.lesionType}</strong>
                  </div>
                </div>

                {/* Doctors List Dropbox */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'te' ? 'సంప్రదింపు వైద్యులు (Doctors List Dropbox) *' : 'Select Consulting Specialist (Dropbox) *'}
                  </label>
                  <select
                    value={referralDoctorId}
                    onChange={(e) => setReferralDoctorId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {CONSULTING_DOCTORS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {lang === 'te' ? d.nameTe : d.name} — {d.specialization} ({d.hospital})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Referral Priority */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {lang === 'te' ? 'ప్రాధాన్యత *' : 'Referral Priority *'}
                    </label>
                    <select
                      value={referralPriority}
                      onChange={(e) => setReferralPriority(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="Urgent">{lang === 'te' ? '🟡 అత్యవసరం (Urgent - 24h)' : 'Urgent (24h)'}</option>
                      <option value="Emergency 108">{lang === 'te' ? '🔴 అత్యవసర 108 అంబులెన్స్' : 'Emergency (108 Transit)'}</option>
                      <option value="Routine">{lang === 'te' ? '🟢 సాధారణం (Routine - 48h)' : 'Routine (48h)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {lang === 'te' ? 'రిఫరల్ కారణం *' : 'Reason for Referral *'}
                    </label>
                    <select
                      value={referralReason}
                      onChange={(e) => setReferralReason(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="4mm Diagnostic Punch Biopsy Confirmation">
                        4mm Diagnostic Punch Biopsy Confirmation
                      </option>
                      <option value="Severe Induration & Burning Sensation">
                        Severe Induration & Burning Sensation
                      </option>
                      <option value="Oral Submucous Fibrosis (OSMF) Staging">
                        Oral Submucous Fibrosis (OSMF) Staging
                      </option>
                      <option value="Post-Biopsy Histopathology Staging Review">
                        Post-Biopsy Histopathology Staging Review
                      </option>
                      <option value="Adda Poga Cessation Medical Therapy">
                        Adda Poga Cessation Medical Therapy
                      </option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsReferralModalOpen(false)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {lang === 'te' ? 'రద్దు' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'te' ? 'రిఫరల్ జారీ చేయండి' : 'Dispatch Referral'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AshaWorkerModule;
