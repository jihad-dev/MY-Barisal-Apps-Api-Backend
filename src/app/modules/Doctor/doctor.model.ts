import { Schema, model } from 'mongoose';
import { IDoctor } from './doctor.interface';

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String },
    area: { type: String, required: true }, // 💡 নতুন ফিল্ড যুক্ত এবং রিকোয়ার্ড করা হলো
    chamberAddress: { type: String, required: true },
    visitingHours: { type: String, required: true },
    phone: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// কুয়েরি মিডলওয়্যার: ডিলিট হওয়া ডাক্তারদের দেখাবে না
doctorSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// findOne ব্যবহার করলেও যাতে ডিলিট হওয়া ডাটা না আসে তার জন্য আরেকটি মিডলওয়্যার (ঐচ্ছিক কিন্তু সেফ)
doctorSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Doctor = model<IDoctor>('Doctor', doctorSchema);