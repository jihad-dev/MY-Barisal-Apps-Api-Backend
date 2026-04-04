// lawyer.model.ts
import { Schema, model } from 'mongoose';
import { ILawyer } from './lawyer.interface';

const lawyerSchema = new Schema<ILawyer>(
  {
    name:        { type: String, required: true },
    designation: { type: String, required: true },
    lawyerType: {
      type: String,
      enum: ['civil', 'criminal', 'family', 'corporate', 'general'],
      required: true,
    },
    courtType: {
      type: String,
      enum: ['supreme', 'high', 'district', 'magistrate', 'labor', 'other'],
      required: true,
    },
    barCouncilId: { type: String },
    area:         { type: String, required: true },
    address:      { type: String, required: true },
    phone:        [{ type: String, required: true }],
    experience:   { type: Number },
    isDeleted:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Lawyer = model<ILawyer>('Lawyer', lawyerSchema);
export default Lawyer;