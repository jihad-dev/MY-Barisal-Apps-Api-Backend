import { Schema, model } from 'mongoose';
import { IPolice } from './police.interface';

const policeSchema = new Schema<IPolice>(
  {
    thanaName: { type: String, required: true },
    location: { type: String, required: true },
    ocNumber: { type: String, required: true },
    dutyOfficer: { type: String, required: true },
    controlRoom: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// সফট ডিলিট ফিল্টার
policeSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Police = model<IPolice>('Police', policeSchema);