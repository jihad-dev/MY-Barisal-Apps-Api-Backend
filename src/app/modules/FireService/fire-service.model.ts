// fire-service.model.ts
import { Schema, model } from 'mongoose';
import { IFireService } from './fire-service.interface';

const fireServiceSchema = new Schema<IFireService>(
  {
    name:   { type: String, required: true },
    type:   { type: String, enum: ['government', 'volunteer'], required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    area:   { type: String, required: true },
    phone:  [{ type: String, required: true }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const FireService = model<IFireService>('FireService', fireServiceSchema);
export default FireService;