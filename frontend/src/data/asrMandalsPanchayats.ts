// Alluri Sitharama Raju (ASR) District - 11 Agency Mandals & 176 Gram Panchayats Segments
// Official Administrative Mapping for ITDA Paderu Grassroots Healthcare & ASHA Surveillance

export interface MandalPanchayatData {
  mandalEn: string;
  mandalTe: string;
  phcHub: string;
  panchayatsCount: number;
  panchayats: { en: string; te: string }[];
}

export const ASR_11_MANDALS_PANCHAYATS: MandalPanchayatData[] = [
  {
    mandalEn: 'Paderu',
    mandalTe: 'పాడేరు',
    phcHub: 'District Hospital & Area Hospital Paderu',
    panchayatsCount: 19,
    panchayats: [
      { en: 'Paderu', te: 'పాడేరు' },
      { en: 'Minumuluru', te: 'మినుములూరు' },
      { en: 'Vanthala', te: 'వంతల' },
      { en: 'Kinchumanda', te: 'కించుమండ' },
      { en: 'Modapalli', te: 'మోదపల్లి' },
      { en: 'Dokuluru', te: 'డోకులురు' },
      { en: 'Guttulaputtu', te: 'గుత్తులపుట్టు' },
      { en: 'Talari', te: 'తలారి' },
      { en: 'Kainzora', te: 'కైంజోర' },
      { en: 'Pandirimamidi', te: 'పందిరిమామిడి' },
      { en: 'Sukuru', te: 'సుకూరు' },
      { en: 'Lagisapalli', te: 'లగిసపల్లి' },
      { en: 'Dalipatnam', te: 'దాలిపట్నం' },
      { en: 'Bitragonda', te: 'బిట్రగొండ' },
      { en: 'Iradapalli', te: 'ఇరడపల్లి' },
      { en: 'Gondeli', te: 'గొందెలి' },
      { en: 'Peda Garuvu', te: 'పెద గరువు' },
      { en: 'Salur Agency', te: 'సాలూరు ఏజెన్సీ' },
      { en: 'Allamputtu', te: 'అల్లంపుట్టు' }
    ]
  },
  {
    mandalEn: 'Araku Valley',
    mandalTe: 'అరకు లోయ',
    phcHub: 'Community Health Centre (CHC) Araku Valley',
    panchayatsCount: 14,
    panchayats: [
      { en: 'Araku', te: 'అరకు' },
      { en: 'Padmapuram', te: 'పద్మాపురం' },
      { en: 'Madagada', te: 'మదగడ' },
      { en: 'Sunkarametta', te: 'సుంకరమెట్ట' },
      { en: 'Chompi', te: 'చోంపి' },
      { en: 'Bosubeda', te: 'బోసుబెద' },
      { en: 'Malivalasa', te: 'మాలివలస' },
      { en: 'Gandha', te: 'గంధ' },
      { en: 'Hattaguda', te: 'హట్టగుడ' },
      { en: 'Karakavalasa', te: 'కారకవలస' },
      { en: 'Lotheru', te: 'లోతేరు' },
      { en: 'Pothangi', te: 'పోతంగి' },
      { en: 'Ravvalaguda', te: 'రవ్వలగుడ' },
      { en: 'Yendapallivalasa', te: 'ఎండపల్లివలస' }
    ]
  },
  {
    mandalEn: 'Chintapalle',
    mandalTe: 'చింతపల్లి',
    phcHub: 'Area Hospital & CHC Chintapalle',
    panchayatsCount: 18,
    panchayats: [
      { en: 'Chintapalle', te: 'చింతపల్లి' },
      { en: 'Lambasingi', te: 'లంబసింగి' },
      { en: 'Tajangi', te: 'తాజంగి' },
      { en: 'Lothugedda', te: 'లోతుగెడ్డ' },
      { en: 'Korukonda', te: 'కోరుకొండ' },
      { en: 'Gondipakalu', te: 'గొందిపాకలు' },
      { en: 'Balapam', te: 'బలపం' },
      { en: 'Cheruvulavenkatapuram', te: 'చెరువులవెంకటాపురం' },
      { en: 'Damanapalli', te: 'దామనపల్లి' },
      { en: 'Kudumusara', te: 'కుడుముసార' },
      { en: 'Pasuvulabanda', te: 'పశువులబండ' },
      { en: 'Peddabarada', te: 'పెద్దబారద' },
      { en: 'Peda Konda', te: 'పెద కొండ' },
      { en: 'Ravanapalli', te: 'రావణపల్లి' },
      { en: 'Sanyasamma Palem', te: 'సన్యాసమ్మ పాలెం' },
      { en: 'Thotakura', te: 'తోటకూర' },
      { en: 'Urangi', te: 'ఉరంగి' },
      { en: 'Vangasarada', te: 'వంగసారద' }
    ]
  },
  {
    mandalEn: 'G. Madugula',
    mandalTe: 'జి. మాడుగుల',
    phcHub: 'Primary Health Centre (PHC) G. Madugula',
    panchayatsCount: 16,
    panchayats: [
      { en: 'G. Madugula', te: 'జి. మాడుగుల' },
      { en: 'Nurmati', te: 'నుర్మతి' },
      { en: 'Bheemavaram', te: 'భీమవరం' },
      { en: 'Vanjari', te: 'వంజరి' },
      { en: 'Gemmeli', te: 'గెమ్మెలి' },
      { en: 'Solabham', te: 'సోలభం' },
      { en: 'Gaduthuru', te: 'గడుతురు' },
      { en: 'Kula Bharathi', te: 'కుల భారతి' },
      { en: 'Labburu', te: 'లబ్బురు' },
      { en: 'Maddigaruvu', te: 'మద్దిగరువు' },
      { en: 'Peda Kodapalli', te: 'పెద కొడపల్లి' },
      { en: 'Peda Lapa', te: 'పెద లాప' },
      { en: 'Sagulu', te: 'సాగులు' },
      { en: 'Salimeru', te: 'సాలిమేరు' },
      { en: 'Singavaram', te: 'సింగవరం' },
      { en: 'Vankachintala', te: 'వంకచింతల' }
    ]
  },
  {
    mandalEn: 'Hukumpeta',
    mandalTe: 'హుకుంపేట',
    phcHub: 'Primary Health Centre (PHC) Hukumpeta',
    panchayatsCount: 15,
    panchayats: [
      { en: 'Hukumpeta', te: 'హుకుంపేట' },
      { en: 'Pathakota', te: 'పాతకోట' },
      { en: 'Merakaputtu', te: 'మెరకపుట్టు' },
      { en: 'Mattam', te: 'మట్టం' },
      { en: 'Konthili', te: 'కొంతిలి' },
      { en: 'Bakuru', te: 'బాకూరు' },
      { en: 'Burugu', te: 'బురుగు' },
      { en: 'Cheedipalli', te: 'చీడిపల్లి' },
      { en: 'Dekapuram', te: 'దేకపురం' },
      { en: 'Ganneruputtu', te: 'గన్నేరుపుట్టు' },
      { en: 'Godugurai', te: 'గొడుగురాయి' },
      { en: 'Kasimpatnam', te: 'కాసింపట్నం' },
      { en: 'Madalamma', te: 'మదాలమ్మ' },
      { en: 'Munagapalli', te: 'మునగపల్లి' },
      { en: 'Thuraiguda', te: 'తురాయిగూడ' }
    ]
  },
  {
    mandalEn: 'Ananthagiri',
    mandalTe: 'అనంతగిరి',
    phcHub: 'Primary Health Centre (PHC) Ananthagiri',
    panchayatsCount: 14,
    panchayats: [
      { en: 'Ananthagiri', te: 'అనంతగిరి' },
      { en: 'Borra', te: 'బొర్రా' },
      { en: 'Gumma', te: 'గుమ్మ' },
      { en: 'Kasipatnam', te: 'కాశీపట్నం' },
      { en: 'Tokuru', te: 'తోకూరు' },
      { en: 'Bheemapolam', te: 'భీమపోలం' },
      { en: 'Chilakalagaddi', te: 'చిలకలగడ్డి' },
      { en: 'Damuku', te: 'దముకు' },
      { en: 'Gunduru', te: 'గుండూరు' },
      { en: 'Kothavuru', te: 'కొత్తవూరు' },
      { en: 'Lunubarthi', te: 'లునుబర్తి' },
      { en: 'Pinakota', te: 'పినకోట' },
      { en: 'Valasi', te: 'వలసి' },
      { en: 'Yenugu', te: 'ఏనుగు' }
    ]
  },
  {
    mandalEn: 'Dumbriguda',
    mandalTe: 'డుంబ్రిగుడ',
    phcHub: 'Primary Health Centre (PHC) Dumbriguda',
    panchayatsCount: 15,
    panchayats: [
      { en: 'Dumbriguda', te: 'డుంబ్రిగుడ' },
      { en: 'Keraputtu', te: 'కేరపుట్టు' },
      { en: 'Sagar', te: 'సాగర్' },
      { en: 'Araku RS', te: 'అరకు ఆర్.ఎస్' },
      { en: 'Bheemudu', te: 'భీముడు' },
      { en: 'Champaguda', te: 'చంపాగూడ' },
      { en: 'Gasabha', te: 'గసభ' },
      { en: 'Golluri', te: 'గొల్లూరి' },
      { en: 'Karakavalasa', te: 'కారకవలస' },
      { en: 'Kinchumanda', te: 'కించుమండ' },
      { en: 'Kolliguda', te: 'కొల్లిగూడ' },
      { en: 'Rangasila', te: 'రంగసీల' },
      { en: 'Sagara', te: 'సాగర' },
      { en: 'Sovva', te: 'సోవ్వ' },
      { en: 'Vanthuguda', te: 'వంతుగూడ' }
    ]
  },
  {
    mandalEn: 'Munchingiputtu',
    mandalTe: 'ముంచంగిపుట్టు',
    phcHub: 'Community Health Centre (CHC) Munchingiputtu',
    panchayatsCount: 18,
    panchayats: [
      { en: 'Munchingiputtu', te: 'ముంచంగిపుట్టు' },
      { en: 'Bungaputtu', te: 'బుంగపుట్టు' },
      { en: 'Sujanakota', te: 'సుజనకోట' },
      { en: 'Jolaput', te: 'జోలాపుట్' },
      { en: 'Barada', te: 'బారద' },
      { en: 'Bheempalli', te: 'భీంపల్లి' },
      { en: 'Chepudiputtu', te: 'చేపుడిపుట్టు' },
      { en: 'Dangarputtu', te: 'దంగర్‌పుట్టు' },
      { en: 'Duduma', te: 'దుదుమ' },
      { en: 'Guntaseema', te: 'గుంటసీమ' },
      { en: 'Jangarputtu', te: 'జంగర్‌పుట్టు' },
      { en: 'Killamkota', te: 'కిల్లంకోట' },
      { en: 'Kumada', te: 'కుమద' },
      { en: 'Labburu', te: 'లబ్బురు' },
      { en: 'Mattam', te: 'మట్టం' },
      { en: 'Pedaguda', te: 'పెదగూడ' },
      { en: 'Rangabayalu', te: 'రంగబయలు' },
      { en: 'Vanabhasingi', te: 'వనభసింగి' }
    ]
  },
  {
    mandalEn: 'Pedabayalu',
    mandalTe: 'పెదబయలు',
    phcHub: 'Primary Health Centre (PHC) Pedabayalu',
    panchayatsCount: 17,
    panchayats: [
      { en: 'Pedabayalu', te: 'పెదబయలు' },
      { en: 'Arada', te: 'అరద' },
      { en: 'Gomangi', te: 'గోమంగి' },
      { en: 'Rudavalasa', te: 'రుదవాలస' },
      { en: 'Bongaram', te: 'బొంగరం' },
      { en: 'Bunkaputtu', te: 'బుంకపుట్టు' },
      { en: 'Chintalaveedhi', te: 'చింతలవీధి' },
      { en: 'Ginjarthi', te: 'గింజార్తి' },
      { en: 'Goyiguda', te: 'గోయిగూడ' },
      { en: 'Jamiguda', te: 'జామిగూడ' },
      { en: 'Jangarputtu', te: 'జంగర్‌పుట్టు' },
      { en: 'Kinchuru', te: 'కించూరు' },
      { en: 'Kudumulu', te: 'కుడుములు' },
      { en: 'Lingeti', te: 'లింగేటి' },
      { en: 'Marrivalasa', te: 'మర్రివలస' },
      { en: 'Mundaguda', te: 'ముండగూడ' },
      { en: 'Seepuram', te: 'సీపురం' }
    ]
  },
  {
    mandalEn: 'Koyyuru',
    mandalTe: 'కొయ్యూరు',
    phcHub: 'Community Health Centre (CHC) Koyyuru',
    panchayatsCount: 16,
    panchayats: [
      { en: 'Koyyuru', te: 'కొయ్యూరు' },
      { en: 'Mampa', te: 'మంప' },
      { en: 'Rajendrapalem', te: 'రాజేంద్రపాలెం' },
      { en: 'Revallu', te: 'రేవల్లు' },
      { en: 'Antharla', te: 'అంతర్ల' },
      { en: 'Budaralla', te: 'బుదరాళ్ల' },
      { en: 'Chintalapudi', te: 'చింతలపూడి' },
      { en: 'Downuru', te: 'డౌనూరు' },
      { en: 'Gadabapalem', te: 'గడబపాలెం' },
      { en: 'Kannavaram', te: 'కన్నవరం' },
      { en: 'Kothapalli', te: 'కొత్తపల్లి' },
      { en: 'Marripakala', te: 'మర్రిపాకల' },
      { en: 'Peda Sarada', te: 'పెద సారద' },
      { en: 'Peda Yerravaram', te: 'పెద యెర్రవరం' },
      { en: 'Sarabhannapalem', te: 'శరభన్నపాలెం' },
      { en: 'Y.B. Patnam', te: 'వై.బి. పట్నం' }
    ]
  },
  {
    mandalEn: 'G.K. Veedhi',
    mandalTe: 'జి.కె. వీధి',
    phcHub: 'Area Hospital Sapparla & CHC G.K. Veedhi',
    panchayatsCount: 14,
    panchayats: [
      { en: 'G.K. Veedhi', te: 'జి.కె. వీధి' },
      { en: 'Darakonda', te: 'దారకొండ' },
      { en: 'Sapparla', te: 'సప్పర్ల' },
      { en: 'Sileru', te: 'సీలేరు' },
      { en: 'Cheekulagondi', te: 'చీకులగొంది' },
      { en: 'Chintalapudi', te: 'చింతలపూడి' },
      { en: 'Jerrela', te: 'జెర్రెల' },
      { en: 'Koyyuru Agency', te: 'కొయ్యూరు ఏజెన్సీ' },
      { en: 'Kumkumudi', te: 'కుంకుముడి' },
      { en: 'Lakkavarapukota', te: 'లక్కవరపుకోట' },
      { en: 'Marrivalasa', te: 'మర్రివలస' },
      { en: 'Pedavalasa', te: 'పెదవలస' },
      { en: 'Rallagedda', te: 'రాళ్లగెడ్డ' },
      { en: 'Vanthamarri', te: 'వంతమర్రి' }
    ]
  }
];

// Total Panchayats Count Verification: 19+14+18+16+15+14+15+18+17+16+14 = 176
export const TOTAL_PANCHAYATS_COUNT = ASR_11_MANDALS_PANCHAYATS.reduce(
  (acc, m) => acc + m.panchayatsCount,
  0
);

// Specialist Doctors List for ASHA Referral Dropbox
export interface ConsultingDoctor {
  id: string;
  name: string;
  nameTe: string;
  qualification: string;
  specialization: string;
  specializationTe: string;
  hospital: string;
  hospitalTe: string;
  mandal: string;
  phone: string;
  availableDays: string;
  avatarColor: string;
}

export const CONSULTING_DOCTORS: ConsultingDoctor[] = [
  {
    id: 'DOC-SWAPNA',
    name: 'Dr. Swapna Devi, MDS',
    nameTe: 'డాక్టర్ స్వప్న దేవి, MDS',
    qualification: 'MDS (Oral & Maxillofacial Pathology)',
    specialization: 'Oral Onco-Pathology & 4mm Punch Biopsy',
    specializationTe: 'నోటి క్యాన్సర్ పాథాలజీ & 4మి.మీ పంచ్ బయాప్సీ నిపుణులు',
    hospital: 'Area Hospital Paderu / PHC G. Madugula Hub',
    hospitalTe: 'ఏరియా ఆసుపత్రి పాడేరు / ప్రాథమిక ఆరోగ్య కేంద్రం జి. మాడుగుల',
    mandal: 'G. Madugula',
    phone: '9490123411',
    availableDays: 'Mon, Wed, Fri (09:00 AM - 04:00 PM)',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 'DOC-RAJESH',
    name: 'Dr. K. Rajesh, MS (ENT)',
    nameTe: 'డాక్టర్ కె. రాజేష్, MS (ENT)',
    qualification: 'MS (Oto-Rhino-Laryngology), Head & Neck Onco',
    specialization: 'Head & Neck Surgical Oncology & Leukoplakia Excision',
    specializationTe: 'తల & మెడ క్యాన్సర్ సర్జరీ & ల్యూకోప్లాకియా నివారణ',
    hospital: 'Area Hospital Chintapalle Hub',
    hospitalTe: 'ఏరియా ఆసుపత్రి చింతపల్లి కేంద్రం',
    mandal: 'Chintapalle',
    phone: '9490123422',
    availableDays: 'Tue, Thu, Sat (10:00 AM - 05:00 PM)',
    avatarColor: 'bg-blue-600'
  },
  {
    id: 'DOC-ANAND',
    name: 'Dr. Anand Kumar, MDS',
    nameTe: 'డాక్టర్ ఆనంద్ కుమార్, MDS',
    qualification: 'MDS (Oral Medicine & Radiology)',
    specialization: 'Early Pre-Cancer Triage & Mucosal Diseases (OSMF)',
    specializationTe: 'ప్రారంభ క్యాన్సర్ ముందస్తు పరీక్షలు & నోటి పూత (OSMF)',
    hospital: 'District Hospital Paderu',
    hospitalTe: 'జిల్లా ప్రధాన ఆసుపత్రి పాడేరు',
    mandal: 'Paderu',
    phone: '9490123433',
    availableDays: 'Mon, Tue, Thu, Fri (09:30 AM - 03:30 PM)',
    avatarColor: 'bg-royal-600'
  },
  {
    id: 'DOC-RAMESH',
    name: 'Dr. Ramesh Varma, MDS',
    nameTe: 'డాక్టర్ రమేష్ వర్మ, MDS',
    qualification: 'MDS (Oral Pathology & Microscopic Tissue Staging)',
    specialization: 'Tissue Histopathology & Frozen Section Biopsy',
    specializationTe: 'కణజాల హిస్టోపాథాలజీ & సూక్ష్మదర్శిని కణ పరీక్ష',
    hospital: 'Community Health Centre (CHC) Chintapalle',
    hospitalTe: 'సామాజిక ఆరోగ్య కేంద్రం (CHC) చింతపల్లి',
    mandal: 'Chintapalle',
    phone: '9490123477',
    availableDays: 'Wed, Fri, Sat (09:00 AM - 04:30 PM)',
    avatarColor: 'bg-purple-600'
  },
  {
    id: 'DOC-PRIYA',
    name: 'Dr. Priya Sharma, MBBS, DLO',
    nameTe: 'డాక్టర్ ప్రియా శర్మ, MBBS, DLO',
    qualification: 'MBBS, DLO (ENT & Agency Healthcare Specialist)',
    specialization: 'Tribal Agency Tele-Oncology & Emergency Oral Triage',
    specializationTe: 'గిరిజన ప్రాంత టెలి-ఆంకాలజీ & అత్యవసర నోటి సంరక్షణ',
    hospital: 'Community Health Centre (CHC) Araku Valley',
    hospitalTe: 'సామాజిక ఆరోగ్య కేంద్రం (CHC) అరకు లోయ',
    mandal: 'Araku Valley',
    phone: '9490123455',
    availableDays: 'Mon to Sat (09:00 AM - 05:00 PM)',
    avatarColor: 'bg-teal-600'
  }
];

// Village-Wise ASHA Care Grid: "How many ASHA workers caring about their Patients in one Village"
export interface VillageAshaCareProfile {
  village: string;
  villageTe: string;
  panchayat: string;
  mandal: string;
  ashaCount: number;
  ashaWorkers: { id: string; name: string; nameTe: string; phone: string; isLead: boolean }[];
  populationCovered: number;
  patientsScreened: number;
  highRiskCases: number;
  punchBiopsyKitAllocated: string;
  ambulanceSubCentre: string;
}

export const VILLAGE_ASHA_CARE_GRID: VillageAshaCareProfile[] = [
  {
    village: 'Nurmati',
    villageTe: 'నుర్మతి',
    panchayat: 'Nurmati',
    mandal: 'G. Madugula',
    ashaCount: 3,
    ashaWorkers: [
      { id: 'ASHA-GMD-01', name: 'K. Lakshmi', nameTe: 'కె. లక్ష్మి', phone: '9848011201', isLead: true },
      { id: 'ASHA-GMD-02', name: 'P. Devamma', nameTe: 'పి. దేవమ్మ', phone: '9848011202', isLead: false },
      { id: 'ASHA-GMD-03', name: 'S. Parvathi', nameTe: 'ఎస్. పార్వతి', phone: '9848011203', isLead: false }
    ],
    populationCovered: 1420,
    patientsScreened: 38,
    highRiskCases: 3,
    punchBiopsyKitAllocated: 'PBK-ASR-041 (Active)',
    ambulanceSubCentre: '108 Station Nurmati Road'
  },
  {
    village: 'Lambasingi',
    villageTe: 'లంబసింగి',
    panchayat: 'Lambasingi',
    mandal: 'Chintapalle',
    ashaCount: 4,
    ashaWorkers: [
      { id: 'ASHA-CP-01', name: 'M. Chinnammayi', nameTe: 'ఎం. చిన్నమ్మాయి', phone: '9848011301', isLead: true },
      { id: 'ASHA-CP-02', name: 'T. Rathnamma', nameTe: 'టి. రత్నమ్మ', phone: '9848011302', isLead: false },
      { id: 'ASHA-CP-03', name: 'G. Kondamma', nameTe: 'జి. కొండమ్మ', phone: '9848011303', isLead: false },
      { id: 'ASHA-CP-04', name: 'K. Subbamma', nameTe: 'కె. సుబ్బమ్మ', phone: '9848011304', isLead: false }
    ],
    populationCovered: 2150,
    patientsScreened: 54,
    highRiskCases: 5,
    punchBiopsyKitAllocated: 'PBK-ASR-019 (Active)',
    ambulanceSubCentre: '104 Mobile Unit Chintapalle'
  },
  {
    village: 'Gondipakalu',
    villageTe: 'గొందిపాకలు',
    panchayat: 'Gondipakalu',
    mandal: 'Chintapalle',
    ashaCount: 2,
    ashaWorkers: [
      { id: 'ASHA-CP-05', name: 'B. Jayamma', nameTe: 'బి. జయమ్మ', phone: '9848011305', isLead: true },
      { id: 'ASHA-CP-06', name: 'N. Somamma', nameTe: 'ఎన్. సోమమ్మ', phone: '9848011306', isLead: false }
    ],
    populationCovered: 980,
    patientsScreened: 24,
    highRiskCases: 2,
    punchBiopsyKitAllocated: 'PBK-ASR-022 (Active)',
    ambulanceSubCentre: '108 Sub-Unit Chintapalle'
  },
  {
    village: 'Tajangi',
    villageTe: 'తాజంగి',
    panchayat: 'Tajangi',
    mandal: 'Chintapalle',
    ashaCount: 3,
    ashaWorkers: [
      { id: 'ASHA-CP-07', name: 'V. Chittamma', nameTe: 'వి. చిట్టమ్మ', phone: '9848011307', isLead: true },
      { id: 'ASHA-CP-08', name: 'R. Appalamma', nameTe: 'ఆర్. అప్పలమ్మ', phone: '9848011308', isLead: false },
      { id: 'ASHA-CP-09', name: 'K. Gowri', nameTe: 'కె. గౌరి', phone: '9848011309', isLead: false }
    ],
    populationCovered: 1640,
    patientsScreened: 41,
    highRiskCases: 4,
    punchBiopsyKitAllocated: 'PBK-ASR-028 (Active)',
    ambulanceSubCentre: '104 Mobile Unit Tajangi'
  },
  {
    village: 'Minumuluru',
    villageTe: 'మినుములూరు',
    panchayat: 'Minumuluru',
    mandal: 'Paderu',
    ashaCount: 3,
    ashaWorkers: [
      { id: 'ASHA-PAD-01', name: 'G. Satyavathi', nameTe: 'జి. సత్యవతి', phone: '9848011401', isLead: true },
      { id: 'ASHA-PAD-02', name: 'L. Kumari', nameTe: 'ఎల్. కుమారి', phone: '9848011402', isLead: false },
      { id: 'ASHA-PAD-03', name: 'M. Ramanamma', nameTe: 'ఎం. రమణమ్మ', phone: '9848011403', isLead: false }
    ],
    populationCovered: 1780,
    patientsScreened: 47,
    highRiskCases: 3,
    punchBiopsyKitAllocated: 'PBK-ASR-004 (Active)',
    ambulanceSubCentre: '108 Hub Paderu HQ'
  },
  {
    village: 'Sunkarametta',
    villageTe: 'సుంకరమెట్ట',
    panchayat: 'Sunkarametta',
    mandal: 'Araku Valley',
    ashaCount: 3,
    ashaWorkers: [
      { id: 'ASHA-ARK-01', name: 'P. Gangamma', nameTe: 'పి. గంగమ్మ', phone: '9848011501', isLead: true },
      { id: 'ASHA-ARK-02', name: 'S. Yerramma', nameTe: 'ఎస్. ఎర్రమ్మ', phone: '9848011502', isLead: false },
      { id: 'ASHA-ARK-03', name: 'D. Mangamma', nameTe: 'డి. మంగమ్మ', phone: '9848011503', isLead: false }
    ],
    populationCovered: 1510,
    patientsScreened: 33,
    highRiskCases: 2,
    punchBiopsyKitAllocated: 'PBK-ASR-012 (Active)',
    ambulanceSubCentre: '108 CHC Araku Valley'
  },
  {
    village: 'Borra',
    villageTe: 'బొర్రా',
    panchayat: 'Borra',
    mandal: 'Ananthagiri',
    ashaCount: 2,
    ashaWorkers: [
      { id: 'ASHA-ANA-01', name: 'T. Bangaramma', nameTe: 'టి. బంగారమ్మ', phone: '9848011601', isLead: true },
      { id: 'ASHA-ANA-02', name: 'K. Neelamma', nameTe: 'కె. నీలమ్మ', phone: '9848011602', isLead: false }
    ],
    populationCovered: 1120,
    patientsScreened: 29,
    highRiskCases: 2,
    punchBiopsyKitAllocated: 'PBK-ASR-033 (Active)',
    ambulanceSubCentre: '104 Transit Borra Unit'
  },
  {
    village: 'Vanjari',
    villageTe: 'వంజరి',
    panchayat: 'Vanjari',
    mandal: 'G. Madugula',
    ashaCount: 3,
    ashaWorkers: [
      { id: 'ASHA-GMD-04', name: 'M. Durgamma', nameTe: 'ఎం. దుర్గమ్మ', phone: '9848011204', isLead: true },
      { id: 'ASHA-GMD-05', name: 'S. Kondamma', nameTe: 'ఎస్. కొండమ్మ', phone: '9848011205', isLead: false },
      { id: 'ASHA-GMD-06', name: 'P. Mallamma', nameTe: 'పి. మల్లమ్మ', phone: '9848011206', isLead: false }
    ],
    populationCovered: 1360,
    patientsScreened: 31,
    highRiskCases: 3,
    punchBiopsyKitAllocated: 'PBK-ASR-045 (Active)',
    ambulanceSubCentre: '108 PHC G. Madugula'
  },
  {
    village: 'Gomangi',
    villageTe: 'గోమంగి',
    panchayat: 'Gomangi',
    mandal: 'Pedabayalu',
    ashaCount: 2,
    ashaWorkers: [
      { id: 'ASHA-PED-01', name: 'K. Chinna Kondamma', nameTe: 'కె. చిన్న కొండమ్మ', phone: '9848011701', isLead: true },
      { id: 'ASHA-PED-02', name: 'B. Parvathi', nameTe: 'బి. పార్వతి', phone: '9848011702', isLead: false }
    ],
    populationCovered: 890,
    patientsScreened: 21,
    highRiskCases: 2,
    punchBiopsyKitAllocated: 'PBK-ASR-051 (Active)',
    ambulanceSubCentre: '104 Mobile Unit Pedabayalu'
  },
  {
    village: 'Rajendrapalem',
    villageTe: 'రాజేంద్రపాలెం',
    panchayat: 'Rajendrapalem',
    mandal: 'Koyyuru',
    ashaCount: 3,
    ashaWorkers: [
      { id: 'ASHA-KOY-01', name: 'S. Venkatalakshmi', nameTe: 'ఎస్. వెంకటలక్ష్మి', phone: '9848011801', isLead: true },
      { id: 'ASHA-KOY-02', name: 'N. Savithri', nameTe: 'ఎన్. సావిత్రి', phone: '9848011802', isLead: false },
      { id: 'ASHA-KOY-03', name: 'M. Padmavati', nameTe: 'ఎం. పద్మావతి', phone: '9848011803', isLead: false }
    ],
    populationCovered: 1600,
    patientsScreened: 36,
    highRiskCases: 3,
    punchBiopsyKitAllocated: 'PBK-ASR-062 (Active)',
    ambulanceSubCentre: '108 CHC Koyyuru'
  },
  {
    village: 'Darakonda',
    villageTe: 'దారకొండ',
    panchayat: 'Darakonda',
    mandal: 'G.K. Veedhi',
    ashaCount: 2,
    ashaWorkers: [
      { id: 'ASHA-GKV-01', name: 'R. Ramulamma', nameTe: 'ఆర్. రాములమ్మ', phone: '9848011901', isLead: true },
      { id: 'ASHA-GKV-02', name: 'V. Appayamma', nameTe: 'వి. అప్పాయమ్మ', phone: '9848011902', isLead: false }
    ],
    populationCovered: 1050,
    patientsScreened: 26,
    highRiskCases: 2,
    punchBiopsyKitAllocated: 'PBK-ASR-071 (Active)',
    ambulanceSubCentre: '104 Transit Sapparla Station'
  }
];

// The 13 Mandatory Stages in the Longitudinal Grassroots Care Loop
export const ASHA_13_CARE_LOOP_STAGES = [
  {
    id: 1,
    key: 'ASHA',
    title: '1. ASHA',
    titleTe: '1. ఆశా క్షేత్ర పరీక్ష',
    desc: 'Grassroots Field Oral Check & Photo Triage',
    descTe: 'గ్రామంలో ఆశా కార్యకర్త ద్వారా నోటి తనిఖీ & ఫోటో స్కాన్',
    icon: 'Stethoscope'
  },
  {
    id: 2,
    key: 'AMBULANCE',
    title: '2. AMBULANCE',
    titleTe: '2. అంబులెన్స్ రవాణా',
    desc: '108 / 104 Tribal Transit Pickup to CHC/PHC',
    descTe: '108 / 104 వాహనంలో ఆసుపత్రికి తరలింపు',
    icon: 'Ambulance'
  },
  {
    id: 3,
    key: 'SPECIALIST',
    title: '3. SPECIALIST',
    titleTe: '3. నిపుణ వైద్యుల సంప్రదింపు',
    desc: 'Specialist Oncologist Review at Area Hospital Paderu',
    descTe: 'పాడేరు ఏరియా ఆసుపత్రి క్యాన్సర్ నిపుణుల పరిశీలన',
    icon: 'UserCheck'
  },
  {
    id: 4,
    key: 'GENERAL_ORAL_TREATMENT',
    title: '4. GENERAL ORAL TREATMENT',
    titleTe: '4. సాధారణ నోటి చికిత్స',
    desc: 'Topical Antiseptic Rinse & Antioxidant Therapy',
    descTe: 'యాంటిసెప్టిక్ వాష్ మరియు లైకోపీన్ మందుల ప్రారంభం',
    icon: 'Smile'
  },
  {
    id: 5,
    key: 'BIOPSY_TREATMENT',
    title: '5. BIOPSY TREATMENT',
    titleTe: '5. బయాప్సీ చికిత్స',
    desc: '4mm Sterile Punch Biopsy Performed at PHC',
    descTe: 'పీహెచ్‌సీ వద్ద 4మి.మీ స్టెరైల్ పంచ్ బయాప్సీ సేకరణ',
    icon: 'Scissors'
  },
  {
    id: 6,
    key: 'REPORTS',
    title: '6. REPORTS',
    titleTe: '6. ల్యాబ్ నివేదికలు',
    desc: 'Histopathology Tissue Pathology Report Generated',
    descTe: 'హిస్టోపాథాలజీ ల్యాబ్ నుండి సూక్ష్మదర్శిని నివేదిక',
    icon: 'FileText'
  },
  {
    id: 7,
    key: 'SPECIALIST_REVIEW',
    title: '7. SPECIALIST',
    titleTe: '7. నిపుణుల పునఃపరిశీలన',
    desc: 'Specialist Staging & Prescription Protocol Order',
    descTe: 'రిపోర్టుల ఆధారంగా నిపుణుల ఖచ్చితమైన ఔషధ ప్రణాళిక',
    icon: 'ShieldCheck'
  },
  {
    id: 8,
    key: 'AMBULANCE_RETURN',
    title: '8. AMBULANCE',
    titleTe: '8. 104 ఔషధ డెలివరీ',
    desc: '104 Transit Delivery of Prescribed Drugs to Village PHC',
    descTe: '104 వాహనం ద్వారా మందులను గ్రామ పీహెచ్‌సీకి చేరవేత',
    icon: 'Truck'
  },
  {
    id: 9,
    key: 'ASHA_RECEIVE',
    title: '9. ASHA',
    titleTe: '9. ఆశా ఔషధ స్వీకరణ',
    desc: 'ASHA Worker Receives Patient Medicine Box & Care Plan',
    descTe: 'ఆశా కార్యకర్త రోగి మందుల కిట్‌ను స్వీకరించడం',
    icon: 'PackageCheck'
  },
  {
    id: 10,
    key: 'MEDICINES',
    title: '10. MEDICINES',
    titleTe: '10. మందుల పంపిణీ సిద్ధం',
    desc: 'Kenacort, Lycopene & Cessation Drug Stock Verified',
    descTe: 'కెనాకార్ట్, యాంటీఆక్సిడెంట్స్, నికోటిన్ రీప్లేస్‌మెంట్ కిట్',
    icon: 'Pill'
  },
  {
    id: 11,
    key: 'ASHA_PATIENTS',
    title: '11. ASHA & PATIENTS',
    titleTe: '11. ఆశా & రోగుల ఇంట సంప్రదింపు',
    desc: 'Direct Home Visit, Drug Administration & Adda Poga Counseling',
    descTe: 'రోగి ఇంటి వద్దే మందుల వాడకం & అడ్డాపొగ మాన్పు కౌన్సెలింగ్',
    icon: 'HeartHandshake'
  },
  {
    id: 12,
    key: 'VILLAGE',
    title: '12. VILLAGE',
    titleTe: '12. గ్రామ స్థాయి నిఘా',
    desc: 'Community-Level Habit Cessation Surveillance',
    descTe: 'గ్రామంలోని కుటుంబ సభ్యులకు ముందస్తు స్క్రీనింగ్ అవగాహన',
    icon: 'Home'
  },
  {
    id: 13,
    key: 'TRACKING_DAILY',
    title: '13. TRACKING DAILY',
    titleTe: '13. రోజువారీ పర్యవేక్షణ',
    desc: 'Daily Symptom, Pain & Wound Healing Check by ASHA',
    descTe: 'గాయం మానడం & నోటి కదలికపై ఆశా ప్రతిరోజూ డైలీ ట్రాకింగ్',
    icon: 'CalendarCheck'
  }
];

// Initial Simulated ASHA Patients in the Grassroots Registry
export interface AshaPatientRecord {
  uidn: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  mandal: string;
  panchayat: string;
  village: string;
  habit: string;
  habitYears: number;
  lesionType: string;
  lesionSeverity: 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Biopsy Needed';
  consultingDoctorId: string;
  currentLoopStageId: number; // 1 to 13
  dailyTrackingStatus: string;
  lastVisitDate: string;
  prescriptionsCount: number;
  biopsyScheduledDate?: string;
  prescriptions: {
    rxId: string;
    date: string;
    doctorName: string;
    doctorHospital: string;
    medicines: { name: string; dosage: string; duration: string }[];
    notes: string;
    barcode: string;
  }[];
}

export const INITIAL_ASHA_PATIENTS: AshaPatientRecord[] = [
  {
    uidn: 'UIDN-ASR-2026-0038',
    name: 'K. Somanna Dora',
    age: 54,
    gender: 'M',
    phone: '9490123038',
    mandal: 'G. Madugula',
    panchayat: 'Nurmati',
    village: 'Nurmati',
    habit: 'Adda Poga (Reverse Smoking) & Gutkha',
    habitYears: 24,
    lesionType: 'Oral Leukoplakia with Right Buccal Induration',
    lesionSeverity: 'Biopsy Needed',
    consultingDoctorId: 'DOC-SWAPNA',
    currentLoopStageId: 5, // At Biopsy Treatment
    dailyTrackingStatus: 'Biopsy Site Healed 65%, Kenacort Oral Paste Applied',
    lastVisitDate: '2026-11-16',
    prescriptionsCount: 2,
    biopsyScheduledDate: '2026-11-18 (CHC G. Madugula)',
    prescriptions: [
      {
        rxId: 'RX-ASR-2026-8812',
        date: '2026-11-12',
        doctorName: 'Dr. Swapna Devi, MDS',
        doctorHospital: 'Area Hospital Paderu / PHC G. Madugula',
        medicines: [
          { name: 'Kenacort 0.1% Oral Paste', dosage: 'Apply over white patch after food', duration: '14 Days' },
          { name: 'Cap. Lycopene 10,000 mcg + Multivitamins', dosage: '1 capsule once daily', duration: '30 Days' },
          { name: 'Chlorhexidine 0.2% Antiseptic Mouthwash', dosage: '10ml rinse twice daily', duration: '14 Days' }
        ],
        notes: 'Advised 4mm diagnostic punch biopsy under 2% lignocaine. Patient instructed strictly on complete Adda Poga cessation.',
        barcode: 'BARCODE-RX-8812'
      },
      {
        rxId: 'RX-ASR-2026-8840',
        date: '2026-11-15',
        doctorName: 'Dr. Swapna Devi, MDS',
        doctorHospital: 'Area Hospital Paderu',
        medicines: [
          { name: 'Tab. Paracetamol 500mg', dosage: '1 tab SOS for post-biopsy pain', duration: '3 Days' },
          { name: 'Hexidine Gargle', dosage: 'Warm water rinse morning/night', duration: '7 Days' }
        ],
        notes: 'Pre-biopsy sterilization kit dispatched via 104 mobile van.',
        barcode: 'BARCODE-RX-8840'
      }
    ]
  },
  {
    uidn: 'UIDN-ASR-2026-0042',
    name: 'M. Kondamma',
    age: 48,
    gender: 'F',
    phone: '9490123042',
    mandal: 'Chintapalle',
    panchayat: 'Lambasingi',
    village: 'Lambasingi',
    habit: 'Adda Poga (Reverse Smoking of Cigar)',
    habitYears: 20,
    lesionType: 'Palatal Keratosis with Erythroplakic Speckles',
    lesionSeverity: 'Moderate',
    consultingDoctorId: 'DOC-RAJESH',
    currentLoopStageId: 11, // At ASHA & Patients Home Visit
    dailyTrackingStatus: 'Oral opening improved from 2.4cm to 2.9cm; daily gargle monitored',
    lastVisitDate: '2026-11-17',
    prescriptionsCount: 1,
    prescriptions: [
      {
        rxId: 'RX-ASR-2026-8902',
        date: '2026-11-14',
        doctorName: 'Dr. K. Rajesh, MS (ENT)',
        doctorHospital: 'Area Hospital Chintapalle Hub',
        medicines: [
          { name: 'Curcumin + Lycopene Synergistic Softgels', dosage: '1 twice daily after meals', duration: '45 Days' },
          { name: 'Benzydamine Anti-inflammatory Mouth Spray', dosage: '2 puffs thrice daily', duration: '15 Days' },
          { name: 'Nicotine Chewing Gum 2mg', dosage: 'Chew whenever craving Adda Poga', duration: '20 Days' }
        ],
        notes: 'Speech telemedicine session completed. High compliance noted. ASHA worker visiting daily.',
        barcode: 'BARCODE-RX-8902'
      }
    ]
  },
  {
    uidn: 'UIDN-ASR-2026-0046',
    name: 'B. Appala Naidu',
    age: 61,
    gender: 'M',
    phone: '9490123046',
    mandal: 'Chintapalle',
    panchayat: 'Tajangi',
    village: 'Tajangi',
    habit: 'Raw Areca Nut & Khaini Chewing',
    habitYears: 32,
    lesionType: 'Oral Submucous Fibrosis (OSMF Grade III - Trismus)',
    lesionSeverity: 'Severe',
    consultingDoctorId: 'DOC-ANAND',
    currentLoopStageId: 8, // Ambulance Delivery
    dailyTrackingStatus: 'Medication delivered to Tajangi PHC via 104; ASHA handover today',
    lastVisitDate: '2026-11-16',
    prescriptionsCount: 1,
    prescriptions: [
      {
        rxId: 'RX-ASR-2026-9014',
        date: '2026-11-13',
        doctorName: 'Dr. Anand Kumar, MDS',
        doctorHospital: 'District Hospital Paderu',
        medicines: [
          { name: 'Intralesional Hyaluronidase 1500 IU Injection', dosage: 'Weekly bi-weekly at PHC', duration: '4 Weeks' },
          { name: 'Dexamethasone 4mg + Lignocaine', dosage: 'Administered by Dental Officer', duration: '4 Weeks' },
          { name: 'Pentoxifylline 400mg Tablets', dosage: '1 tablet twice daily with food', duration: '60 Days' }
        ],
        notes: 'Severe fibrous bands on bilateral buccal mucosa. Inter-incisal distance 18mm. Daily mouth stretching physical therapy assigned to ASHA.',
        barcode: 'BARCODE-RX-9014'
      }
    ]
  },
  {
    uidn: 'UIDN-ASR-2026-0051',
    name: 'P. Balamma',
    age: 42,
    gender: 'F',
    phone: '9490123051',
    mandal: 'Paderu',
    panchayat: 'Minumuluru',
    village: 'Minumuluru',
    habit: 'Adda Poga (Reverse Smoking)',
    habitYears: 15,
    lesionType: 'Superficial White Striae (Early Leukoplakia)',
    lesionSeverity: 'Mild',
    consultingDoctorId: 'DOC-SWAPNA',
    currentLoopStageId: 13, // Daily tracking
    dailyTrackingStatus: 'Symptom free, zero burning sensation; habit stopped for 21 consecutive days',
    lastVisitDate: '2026-11-17',
    prescriptionsCount: 1,
    prescriptions: [
      {
        rxId: 'RX-ASR-2026-9120',
        date: '2026-11-10',
        doctorName: 'Dr. Swapna Devi, MDS',
        doctorHospital: 'Area Hospital Paderu',
        medicines: [
          { name: 'Topical Retinoid Cream 0.05%', dosage: 'Bedtime mucosal application', duration: '21 Days' },
          { name: 'Beta-Carotene + Zinc Capsules', dosage: '1 capsule daily morning', duration: '30 Days' }
        ],
        notes: 'Lesion regressed significantly by 60%. Biopsy deferred unless symptoms recur.',
        barcode: 'BARCODE-RX-9120'
      }
    ]
  }
];
