import { Schema, model } from 'mongoose';
import { IDonor } from './donor.interface';

const donorSchema = new Schema<IDonor>({
  name: { type: String, required: true },
  bloodGroup: { 
    type: String, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 
    required: true 
  },
  area: { type: String, required: true },
  phone: { type: String, required: true },
  lastDonationDate: { type: String, default: null },
  isAvailable: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// ডিলিট হওয়া ডোনারদের হাইড করার জন্য
donorSchema.pre('find', function() {
  this.where({ isDeleted: false });
});

export const Donor = model<IDonor>('Donor', donorSchema);