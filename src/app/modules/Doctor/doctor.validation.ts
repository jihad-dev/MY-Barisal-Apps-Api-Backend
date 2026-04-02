import { z } from 'zod';

const createDoctorValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'ডাক্তারের নাম প্রয়োজন' }),
    speciality: z.string({ required_error: 'স্পেশালিটি উল্লেখ করুন' }),
    degree: z.string({ required_error: 'ডিগ্রি প্রয়োজন' }),
    experience: z.string().optional(),
    chamberAddress: z.string({ required_error: 'চেম্বারের ঠিকানা দিন' }),
    visitingHours: z.string({ required_error: 'রোগী দেখার সময় দিন' }),
    phone: z.array(z.string()).nonempty('সিরিয়ালের জন্য অন্তত একটি নম্বর দিন'),
  }),
});

export const DoctorValidations = {
  createDoctorValidationSchema,
};