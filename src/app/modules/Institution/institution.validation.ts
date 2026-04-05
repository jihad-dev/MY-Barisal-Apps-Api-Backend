// institution.validation.ts
import { z } from 'zod';

const createInstitutionSchema = z.object({
  body: z.object({
    name:    z.string({ required_error: 'নাম দিন' }).min(1),
    type:    z.enum(
      ['primary_school', 'high_school', 'college', 'masjid', 'madrasa', 'mandir'],
      { required_error: 'ধরন দিন' }
    ),
    status:        z.enum(['active', 'inactive']).optional(),
    area:          z.string({ required_error: 'এলাকা দিন' }).min(1),
    upazila:       z.string({ required_error: 'উপজেলা দিন' }).min(1),
    address:       z.string({ required_error: 'ঠিকানা দিন' }).min(1),
    phone:         z.array(z.string()).optional(),
    established:   z.number().optional(),
    totalStudents: z.number().optional(),
  }),
});

const updateInstitutionSchema = z.object({
  body: z.object({
    name:          z.string().min(1).optional(),
    type:          z.enum(['primary_school', 'high_school', 'college', 'masjid', 'madrasa', 'mandir']).optional(),
    status:        z.enum(['active', 'inactive']).optional(),
    area:          z.string().min(1).optional(),
    upazila:       z.string().min(1).optional(),
    address:       z.string().min(1).optional(),
    phone:         z.array(z.string()).optional(),
    established:   z.number().optional(),
    totalStudents: z.number().optional(),
  }),
});

export const InstitutionValidation = {
  createInstitutionSchema,
  updateInstitutionSchema,
};