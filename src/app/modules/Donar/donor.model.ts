// import { Schema, model } from 'mongoose';
// import { IDonor } from './donor.interface';

// const donorSchema = new Schema<IDonor>({
//   name: { type: String, required: true },
//   bloodGroup: { 
//     type: String, 
//     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 
//     required: true 
//   },
//   area: { type: String, required: true },
//   phone: { type: String, required: true },
//   lastDonationDate: { type: String, default: null },
//   isAvailable: { type: Boolean, default: true },
//   isDeleted: { type: Boolean, default: false }
// }, { timestamps: true });

// // ডিলিট হওয়া ডোনারদের হাইড করার জন্য
// donorSchema.pre('find', function() {
//   this.where({ isDeleted: false });
// });

// export const Donor = model<IDonor>('Donor', donorSchema);




import { Schema, model } from 'mongoose';
import { IDonor } from './donor.interface';

const donorSchema = new Schema<IDonor>({
  name: { type: String, required: true, trim: true }, // trim স্পেস কেটে দেবে
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  area: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, // ডুপ্লিকেট অ্যাকাউন্ট আটকাবে
  lastDonationDate: { type: String, default: null },
  isAvailable: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true
});

// দ্রুত সার্চ করার জন্য ইনডেক্সিং (Performance Optimization)
donorSchema.index({ area: 1, bloodGroup: 1 });

// 'find', 'findOne' সব কুয়েরিতে ডিলিট হওয়া ডোনারদের হাইড করার জন্য
donorSchema.pre(/^find/, function (next) {
  // TypeScript কে 'this' এর টাইপ বোঝানোর জন্য cast করা যেতে পারে, তবে এভাবেও কাজ করবে
  (this as any).where({ isDeleted: false });
  next();
});

export const Donor = model<IDonor>('Donor', donorSchema);