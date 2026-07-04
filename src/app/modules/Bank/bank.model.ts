import { Schema, model } from 'mongoose';
import { IBank } from './bank.interface';

const bankSchema = new Schema<IBank>(
  {
    name: { type: String, required: true },
    thana: { type: String, required: true },
    branch: { type: String, required: true },
    routingNumber: { type: String },
    address: { type: String, required: true },
    phone: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// সফট ডিলিট ফিল্টার
bankSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Bank = model<IBank>('Bank', bankSchema);