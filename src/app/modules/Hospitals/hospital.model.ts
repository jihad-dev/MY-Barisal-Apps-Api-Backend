
import { Schema, model } from 'mongoose';
import { IHospital } from './hospital.interface';

const hospitalSchema = new Schema<IHospital>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['government', 'private', 'clinic', 'diagnostic'],
      required: true,
    },
    address: { type: String, required: true },
    area: { type: String, required: true },
    phone: [{ type: String, required: true }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Hospital = model<IHospital>('Hospital', hospitalSchema);
export default Hospital;