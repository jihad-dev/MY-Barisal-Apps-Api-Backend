
import { Schema, model } from 'mongoose';
import { IImamMuazzin } from './imam-muazzin.interface';

const imamMuazzinSchema = new Schema<IImamMuazzin>(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ['imam', 'muazzin', 'both'],
      required: true,
    },
    phone: { type: String, required: true, unique: true },
    district: { type: String, required: true },
    upazila: { type: String, required: true },
    union: { type: String },
    village: { type: String, required: true },
    employmentStatus: {
      type: String,
      enum: ['available', 'hired'],
      default: 'available',
    },
    statusUpdatedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ImamMuazzin = model<IImamMuazzin>('ImamMuazzin', imamMuazzinSchema);

export default ImamMuazzin;