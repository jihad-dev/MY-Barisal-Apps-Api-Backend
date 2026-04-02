import { z } from 'zod';

const createPoliceValidationSchema = z.object({
  body: z.object({
    thanaName: z.string({ required_error: 'থানার নাম প্রয়োজন' }),
    location: z.string({ required_error: 'ঠিকানা প্রয়োজন' }),
    ocNumber: z.string({ required_error: 'ওসির নম্বর প্রয়োজন' }),
    dutyOfficer: z.string({ required_error: 'ডিউটি অফিসারের নম্বর প্রয়োজন' }),
    controlRoom: z.string().optional(),
  }),
});

export const PoliceValidations = {
  createPoliceValidationSchema,
};