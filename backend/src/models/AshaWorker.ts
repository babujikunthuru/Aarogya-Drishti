import mongoose, { Document, Schema } from 'mongoose';

export interface IAshaWorker extends Document {
  uidn: string;
  name: string;
  phone: string;
  email?: string;
  mandal: string;
  village: string;
  panchayat?: string;
  assignedPhc?: string;
  assignedPopulation?: number;
  status: 'Active' | 'Inactive';
  activeStatus: boolean;
  abdmCode?: string;
  password?: string;
  passwordHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AshaWorkerSchema = new Schema<IAshaWorker>(
  {
    uidn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true
    },
    mandal: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    village: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    panchayat: {
      type: String,
      trim: true
    },
    assignedPhc: {
      type: String,
      trim: true
    },
    assignedPopulation: {
      type: Number,
      default: 1200
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
      index: true
    },
    activeStatus: {
      type: Boolean,
      default: true
    },
    abdmCode: {
      type: String,
      trim: true
    },
    password: {
      type: String
    },
    passwordHash: {
      type: String,
      select: false
    }
  },
  {
    timestamps: true
  }
);

export const AshaWorkerModel =
  mongoose.models.AshaWorker || mongoose.model<IAshaWorker>('AshaWorker', AshaWorkerSchema);

export default AshaWorkerModel;
