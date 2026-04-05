// institution.model.ts
import { Schema, model } from 'mongoose';
import { IInstitution } from './institution.interface';

const institutionSchema = new Schema<IInstitution>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['primary_school', 'high_school', 'college', 'masjid', 'madrasa', 'mandir'],
      required: true,
    },
    status:        { type: String, enum: ['active', 'inactive'], default: 'active' },
    area:          { type: String, required: true },
    upazila:       { type: String, required: true },
    address:       { type: String, required: true },
    phone:         [{ type: String }],
    established:   { type: Number },
    totalStudents: { type: Number },
    isDeleted:     { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Institution = model<IInstitution>('Institution', institutionSchema);
export default Institution;