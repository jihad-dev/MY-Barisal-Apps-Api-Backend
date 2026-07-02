
import { Schema, model } from 'mongoose';
import { IAmbulance } from './ambulance.interface';

const ambulanceSchema = new Schema<IAmbulance>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['government', 'private', 'volunteer'],
      required: true,
    },
    area: { type: String, required: true },
    thana: { type: String, required: true },
    phone: [{ type: String, required: true, unique: true }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Ambulance = model<IAmbulance>('Ambulance', ambulanceSchema);
export default Ambulance;