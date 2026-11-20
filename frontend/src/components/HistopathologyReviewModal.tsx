import React, { useRef, useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  X,
  CheckCircle,
  Clock,
  QrCode,
  ShieldCheck,
  Stethoscope,
  Activity,
  Calendar,
  Volume2,
  VolumeX,
  Video,
  Building2,
  FlaskConical,
  Microscope,
  AlertCircle
} from 'lucide-react';
import { Language } from '../i18n/translations.ts';

export interface HistopathologyData {
  patientUidn: string;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  patientMandal?: string;
  patientVillage?: string;
  sampleId: string;
  status: 'pending' | 'sample_collected' | 'in_lab' | 'under_review' | 'completed';
  collectionCenter: string;
  collectionDate?: string;
  labName: string;
  receivedDate?: string;
  biopsySite: string;
  specimenType: string;
  stainingMethod?: string;
  microscopicDescription?: string;
  diagnosis: string;
  grade: string;
  isMalignant: boolean;
  pathologistName: string;
  pathologistAbdmCode?: string;
  notes: string;
  recommendation: string;
  turnaroundTime: string;
  printableBarcodeId?: string;
  completedAt?: string | Date;
}

interface HistopathologyReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: HistopathologyData | null;
  patient: any;
  lang: Language;
  onStartTeleconsult?: () => void;
}

export const HistopathologyReviewModal: React.FC<HistopathologyReviewModalProps> = ({
  isOpen,
  onClose,
  data,
  patient,
  lang,
  onStartTeleconsult
}) => {
  const printableRef = useRef<HTMLDivElement>(null);
  const [isPlayingTts, setIsPlayingTts] = useState(false);

  if (!isOpen || !data) return null;

  // 5-Stage Tele-Lab Tracking Timeline
  const stages = [
    {
      id: 'sample_collected',
      label: lang === 'te' ? 'నమూనా సేకరణ' : lang === 'hi' ? 'नमूना एकत्र' : 'Sample Collected',
      location: data.collectionCenter || 'CHC G. Madugula (Punch Biopsy Unit)',
      date: data.collectionDate || '2026-11-18'
    },
    {
      id: 'in_lab',
      label: lang === 'te' ? 'పాడేరు టెలి-ల్యాబ్‌కు చేరింది' : lang === 'hi' ? 'पाडेरू टेली-लैब में प्राप्त' : 'Received at Paderu Tele-Lab',
      location: 'Area Hospital Paderu Tele-Lab Hub',
      date: data.receivedDate || '2026-11-19'
    },
    {
      id: 'staining',
      label: lang === 'te' ? 'స్లైడ్ స్టెయినింగ్ & మైక్రోస్కోపీ' : lang === 'hi' ? 'स्लाइड स्टेनिंग एवं माइक्रोस्कोपी' : 'Slide Staining & Microscopy',
      location: 'Histopathology Automated Sectioning Unit',
      date: data.receivedDate || '2026-11-19'
    },
    {
      id: 'under_review',
      label: lang === 'te' ? 'పాథాలజిస్ట్ సమీక్ష' : lang === 'hi' ? 'पैथोलॉजिस्ट समीक्षा' : 'Pathologist Review',
      location: data.pathologistName || 'Dr. Swapna Devi, MDS',
      date: data.completedAt ? new Date(data.completedAt).toISOString().split('T')[0] : 'In Progress'
    },
    {
      id: 'completed',
      label: lang === 'te' ? 'తుది నివేదిక సిద్ధం' : lang === 'hi' ? 'अंतिम रिपोर्ट तैयार' : 'Final Report Ready',
      location: 'Official ABDM Tele-Lab Vault',
      date: data.completedAt ? new Date(data.completedAt).toISOString().split('T')[0] : 'Awaiting Completion'
    }
  ];

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'sample_collected':
        return 0;
      case 'in_lab':
        return 2;
      case 'under_review':
        return 3;
      case 'completed':
        return 4;
      default:
        return 1;
    }
  };

  const currentStageIdx = getStageIndex(data.status);

  // Web Speech API Read Aloud
  const handleToggleTts = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingTts) {
      window.speechSynthesis.cancel();
      setIsPlayingTts(false);
      return;
    }

    let ttsText = '';
    if (lang === 'te') {
      ttsText = `నమస్కారం ${patient?.name || data.patientName} గారూ. ఏరియా ఆసుపత్రి పాడేరు టెలి-ల్యాబ్ నుండి మీ నోటి బయాప్సీ హిస్టోపాథాలజీ నివేదిక వివరాలు: నమూనా ఐడీ ${data.sampleId}. నిర్ధారణ: ${data.diagnosis}. గ్రేడ్: ${data.grade}. వైద్యుల సలహా: ${data.recommendation}. అడ్డా పొగ లేదా పొగాకు వాడకాన్ని పూర్తిగా ఆపండి. సకాలంలో వైద్యులను సంప్రదించండి.`;
    } else if (lang === 'hi') {
      ttsText = `नमस्ते ${patient?.name || data.patientName} जी. एरिया अस्पताल पाडेरू टेली-लैब से आपकी बायोप्सी रिपोर्ट: नमूना संख्या ${data.sampleId}. निदान: ${data.diagnosis}. ग्रेड: ${data.grade}. सिफारिश: ${data.recommendation}. तंबाकू का सेवन तुरंत बंद करें।`;
    } else {
      ttsText = `Hello ${patient?.name || data.patientName}. This is your Official Histopathology Review from Area Hospital Paderu Tele-Lab. Sample ID ${data.sampleId}. Diagnosis: ${data.diagnosis}. Histological Grade: ${data.grade}. Doctor's Recommendation: ${data.recommendation}.`;
    }

    const utterance = new SpeechSynthesisUtterance(ttsText);
    utterance.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9;

    utterance.onend = () => setIsPlayingTts(false);
    utterance.onerror = () => setIsPlayingTts(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlayingTts(true);
  };

  // Print Slip
  const handlePrint = () => {
    let portal = document.getElementById('histopathology-print-portal');
    if (!portal) {
      portal = document.createElement('div');
      portal.id = 'histopathology-print-portal';
      document.body.appendChild(portal);
    }

    const slipElement = printableRef.current;
    if (!slipElement) return;

    portal.innerHTML = '';
    const clone = slipElement.cloneNode(true) as HTMLElement;
    clone.style.maxWidth = '780px';
    clone.style.width = '100%';
    clone.style.margin = '0 auto';
    clone.style.boxShadow = 'none';
    portal.appendChild(clone);

    const originalTitle = document.title;
    document.title = `HistoReport_${patient?.uidn || data.patientUidn}_${data.sampleId}`;

    document.body.classList.add('printing-prescription-only');

    const cleanup = () => {
      document.body.classList.remove('printing-prescription-only');
      if (portal) portal.innerHTML = '';
      document.title = originalTitle;
      window.removeEventListener('afterprint', cleanup);
    };

    window.addEventListener('afterprint', cleanup);
    window.print();
    setTimeout(cleanup, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl border border-royal-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-royal-900 via-royal-800 to-royal-900 text-white px-6 py-4 flex items-center justify-between border-b border-royal-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Microscope className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                  Step 4 • Onco-Care Treatment Journey
                </span>
                <span className="text-xs text-royal-200 font-mono">
                  {data.sampleId}
                </span>
              </div>
              <h3 className="text-lg font-black tracking-tight text-white mt-0.5">
                {lang === 'te'
                  ? 'హిస్టోపాథాలజీ సమీక్ష — ఏరియా ఆసుపత్రి పాడేరు టెలి-ల్యాబ్'
                  : lang === 'hi'
                  ? 'हिस्टोपैथोलॉजी समीक्षा — एरिया अस्पताल पाडेरू टेली-लैब'
                  : 'Histopathology Review — Area Hospital Paderu Tele-Lab'}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Read Aloud TTS Button */}
            <button
              onClick={handleToggleTts}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer border ${
                isPlayingTts
                  ? 'bg-amber-400 text-royal-950 border-amber-300 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
              title={lang === 'te' ? 'తెలుగులో వినండి' : 'Read Aloud'}
            >
              {isPlayingTts ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
              <span>{isPlayingTts ? (lang === 'te' ? 'ఆపండి' : 'Stop') : (lang === 'te' ? '🔊 వినండి' : '🔊 Listen')}</span>
            </button>

            {/* Print Slip Button */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-royal-700 hover:bg-royal-600 text-white border border-royal-500 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'te' ? 'ప్రింట్' : 'Print'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          {/* 1. TELE-LAB 5-STAGE TRACKING TIMELINE */}
          <div className="bg-white p-5 rounded-2xl border border-royal-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FlaskConical className="w-4 h-4 text-royal-700" />
                <h4 className="text-xs font-extrabold text-royal-900 uppercase tracking-wide">
                  {lang === 'te' ? 'నమూనా & టెలి-ల్యాబ్ ట్రాకింగ్ కాలక్రమం' : 'Specimen & Tele-Lab Tracking Timeline'}
                </h4>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  data.status === 'completed'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-amber-50 text-amber-900 border-amber-200'
                }`}
              >
                {data.status === 'completed'
                  ? (lang === 'te' ? '✓ తుది నివేదిక సిద్ధంగా ఉంది' : '✓ Final Report Verified')
                  : (lang === 'te' ? 'ల్యాబ్ ప్రాసెసింగ్ కొనసాగుతోంది' : 'In Transit / Lab Processing')}
              </span>
            </div>

            {/* Visual Step Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
              {stages.map((stage, idx) => {
                const isPassed = idx < currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                return (
                  <div
                    key={stage.id}
                    className={`p-3 rounded-xl border transition-all ${
                      isPassed
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                        : isCurrent
                        ? 'bg-royal-50 border-royal-400 text-royal-950 ring-2 ring-royal-200'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-70'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          isPassed
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-royal-600 text-white animate-pulse'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isPassed ? '✓' : idx + 1}
                      </span>
                      <span className="font-bold text-[11px] leading-tight truncate">
                        {stage.label}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-600 truncate pl-6">
                      {stage.location}
                    </div>
                    <div className="text-[9px] text-slate-400 pl-6 mt-0.5 font-mono">
                      {stage.date}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. PRINTABLE REPORT SECTION CONTAINER */}
          <div
            ref={printableRef}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5"
          >
            {/* OFFICIAL ITDA PADERU & ABDM HEADER */}
            <div className="border-b-2 border-royal-800 pb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-royal-900 text-white flex items-center justify-center font-black text-xl shadow-sm">
                  AD
                </div>
                <div>
                  <div className="text-[11px] font-bold text-royal-700 uppercase tracking-widest">
                    Government of Andhra Pradesh • ITDA Paderu
                  </div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">
                    AREA HOSPITAL PADERU TELE-LABORATORY
                  </h2>
                  <div className="text-xs text-slate-500">
                    Department of Oncopathology & Tele-Diagnostic Sciences • Alluri Sitharama Raju District
                  </div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="inline-block bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                  ABDM NHA ACCREDITED TELE-LAB
                </div>
                <div className="text-[11px] font-mono text-slate-600">
                  Sample ID: <strong className="text-slate-900">{data.sampleId}</strong>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Turnaround: {data.turnaroundTime || '24-48 Hours'}
                </div>
              </div>
            </div>

            {/* PATIENT & SPECIMEN METADATA GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Patient Name</span>
                <span className="font-extrabold text-slate-900 text-sm">{patient?.name || data.patientName}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Digital UIDN</span>
                <span className="font-mono font-bold text-royal-700">{patient?.uidn || data.patientUidn}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Age / Gender</span>
                <span className="font-semibold text-slate-800">
                  {patient?.age || data.patientAge || 54} Yrs • {patient?.gender || data.patientGender || 'Male'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Agency Mandal / Village</span>
                <span className="font-semibold text-slate-800">
                  {patient?.mandal || data.patientMandal || 'G. Madugula'}, {patient?.village || data.patientVillage || 'Nurmati'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Collection Center</span>
                <span className="font-semibold text-slate-800">{data.collectionCenter}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Biopsy Site</span>
                <span className="font-bold text-slate-900">{data.biopsySite}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Specimen Type</span>
                <span className="font-semibold text-slate-800">{data.specimenType}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Staining Method</span>
                <span className="font-semibold text-slate-800">{data.stainingMethod || 'Hematoxylin & Eosin (H&E)'}</span>
              </div>
            </div>

            {/* HISTOPATHOLOGICAL FINDINGS & DIAGNOSIS */}
            <div className="space-y-4">
              {/* Primary Diagnosis Callout */}
              <div
                className={`p-4 rounded-2xl border ${
                  data.isMalignant
                    ? 'bg-red-50 border-red-300'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-royal-900 flex items-center space-x-1.5">
                    <Activity className="w-4 h-4 text-royal-700" />
                    <span>Histopathological Diagnosis</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full border ${
                        data.isMalignant
                          ? 'bg-red-600 text-white border-red-700'
                          : 'bg-amber-200 text-amber-950 border-amber-300'
                      }`}
                    >
                      {data.grade || 'Grade II (Moderate Dysplasia)'}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        data.isMalignant ? 'bg-red-200 text-red-900' : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {data.isMalignant ? 'MALIGNANT' : 'POTENTIALLY MALIGNANT / NON-INVASIVE'}
                    </span>
                  </div>
                </div>
                <div className="text-base font-black text-slate-900">
                  {data.diagnosis}
                </div>
              </div>

              {/* Microscopic Description */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  Microscopic Examination & Histomorphology:
                </span>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans">
                  {data.microscopicDescription || data.notes}
                </div>
              </div>

              {/* Recommended Clinical Action Plan */}
              <div className="p-3.5 bg-blue-50/80 rounded-xl border border-royal-200 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-royal-900">
                  <ShieldCheck className="w-4 h-4 text-royal-700" />
                  <span>Recommended Next Steps & Clinical Management:</span>
                </div>
                <div className="text-xs text-royal-950 font-medium pl-5 leading-relaxed">
                  {data.recommendation}
                </div>
              </div>

              {/* Pathologist Authentication & Signature Strip */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <QrCode className="w-8 h-8 text-royal-900" />
                  <div className="text-[10px] font-mono text-slate-500">
                    <div>Barcode: <strong>{data.printableBarcodeId || 'BARCODE-HISTO-GM046'}</strong></div>
                    <div>ABDM Health Locker Synced • ITDA Paderu Hub</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-extrabold text-slate-900">
                    {data.pathologistName}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Oral & Maxillofacial Pathologist • {data.pathologistAbdmCode || 'ABDM-DOC-AP-7821'}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-0.5 flex items-center justify-end space-x-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Digitally Signed & Validated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER ACTIONS */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center space-x-1">
            <Building2 className="w-4 h-4 text-royal-700" />
            <span>Area Hospital Paderu Tele-Lab • Tribal Onco-Care Initiative</span>
          </div>

          <div className="flex items-center space-x-2">
            {onStartTeleconsult && (
              <button
                onClick={() => {
                  onClose();
                  onStartTeleconsult();
                }}
                className="px-4 py-2 bg-royal-600 hover:bg-royal-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer active:scale-95"
              >
                <Video className="w-4 h-4" />
                <span>{lang === 'te' ? 'వైద్యునితో టెలి-సంప్రదింపు ప్రారంభించండి' : 'Start Tele-Consult with Doctor'}</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-royal-900 border border-royal-300 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-royal-700" />
              <span>{lang === 'te' ? 'రిపోర్ట్ ప్రింట్ / డౌన్‌లోడ్' : 'Download / Print Slip'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistopathologyReviewModal;
