import { Schema, model } from 'mongoose';
import { IDoctor } from './doctor.interface';

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String },
    chamberAddress: { type: String, required: true },
    visitingHours: { type: String, required: true },
    phone: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// কুয়েরি মিডলওয়্যার: ডিলিট হওয়া ডাক্তারদের দেখাবে না
doctorSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Doctor = model<IDoctor>('Doctor', doctorSchema);