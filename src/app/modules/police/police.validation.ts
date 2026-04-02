import { z } from 'zod';

const createPoliceValidationSchema = z.object({
  body: z.object({
    thanaName: z.string({ required_error: 'থানার নাম প্রয়োজন' }),
    location: z.string({ required_error: 'ঠিকানা প্রয়োজন' }),
    ocName: z.string({ required_error: 'ওসির নাম প্রয়োজন' }), // <--- নতুন যোগ করা হয়েছে
    ocNumber: z.string({ required_error: 'ওসির নম্বর প্রয়োজন' }),
    dutyOfficer: z.string({ required_error: 'ডিউটি অফিসারের নম্বর প্রয়োজন' }),
    controlRoom: z.string().optional(),
  }),
});
export const PoliceValidations = {
  createPoliceValidationSchema,
};