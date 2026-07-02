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
    thana: { type: String, required: true }, // এটি যোগ করা হয়েছে (যেমন: bakerganj, sadar)
    address: { type: String, required: true },
    area: { type: String, required: true }, // এটি নির্দিষ্ট এলাকা বা গ্রামের জন্য থাকবে
    phone: [{ type: String, required: true }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Hospital = model<IHospital>('Hospital', hospitalSchema);
export default Hospital;