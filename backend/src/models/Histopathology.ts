import mongoose, { Document, Schema } from 'mongoose';

export type HistopathologyStatus =
  | 'pending'
  | 'sample_collected'
  | 'in_lab'
  | 'under_review'
  | 'completed';

export interface IHistopathology extends Document {
  patientUidn: string;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  patientMandal?: string;
  patientVillage?: string;
  sampleId: string;
  status: HistopathologyStatus;
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
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const HistopathologySchema = new Schema<IHistopathology>(
  {
    patientUidn: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    patientName: {
      type: String,
      required: true,
      trim: true
    },
    patientAge: {
      type: Number
    },
    patientGender: {
      type: String
    },
    patientMandal: {
      type: String,
      trim: true
    },
    patientVillage: {
      type: String,
      trim: true
    },
    sampleId: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    status: {
      type: String,
      enum: ['pending', 'sample_collected', 'in_lab', 'under_review', 'completed'],
      default: 'in_lab',
      index: true
    },
    collectionCenter: {
      type: String,
      default: 'CHC G. Madugula (Punch Biopsy Unit)'
    },
    collectionDate: {
      type: String
    },
    labName: {
      type: String,
      default: 'Area Hospital Paderu Tele-Lab'
    },
    receivedDate: {
      type: String
    },
    biopsySite: {
      type: String,
      default: 'Right Buccal Mucosa'
    },
    specimenType: {
      type: String,
      default: '4mm Diagnostic Punch Biopsy Tissue'
    },
    stainingMethod: {
      type: String,
      default: 'Hematoxylin & Eosin (H&E)'
    },
    microscopicDescription: {
      type: String
    },
    diagnosis: {
      type: String,
      default: 'Oral Hyperkeratosis with Moderate Epithelial Dysplasia'
    },
    grade: {
      type: String,
      default: 'Grade II (Moderate Dysplasia)'
    },
    isMalignant: {
      type: Boolean,
      default: false
    },
    pathologistName: {
      type: String,
      default: 'Dr. Swapna Devi, MDS (Oral & Maxillofacial Pathology)'
    },
    pathologistAbdmCode: {
      type: String,
      default: 'ABDM-DOC-AP-7821'
    },
    notes: {
      type: String,
      default: 'Stratified squamous epithelium demonstrates hyperorthokeratosis with drop-shaped rete ridges. Nuclear hyperchromasia noted in basal and parabasal layers. Basement membrane intact. No invasive malignancy.'
    },
    recommendation: {
      type: String,
      default: 'Complete cessation of Adda Poga (reverse smoking), topical corticosteroid paste application, and follow-up clinical evaluation at Area Hospital Paderu in 4 weeks.'
    },
    turnaroundTime: {
      type: String,
      default: '24-48 Hours'
    },
    printableBarcodeId: {
      type: String
    },
    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export const HistopathologyModel =
  mongoose.models.Histopathology ||
  mongoose.model<IHistopathology>('Histopathology', HistopathologySchema);

export default HistopathologyModel;
