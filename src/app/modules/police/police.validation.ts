
// const createPoliceValidationSchema = z.object({
//   body: z.object({
//     thanaName: z.string({ required_error: 'থানার নাম প্রয়োজন' }),
//     location: z.string({ required_error: 'ঠিকানা প্রয়োজন' }),
//     ocName: z.string({ required_error: 'ওসির নাম প্রয়োজন' }), // <--- নতুন যোগ করা হয়েছে
//     ocNumber: z.string({ required_error: 'ওসির নম্বর প্রয়োজন' }),
//     dutyOfficer: z.string({ required_error: 'ডিউটি অফিসারের নম্বর প্রয়োজন' }),
//     controlRoom: z.string().optional(),
//   }),
// });

import { z } from 'zod';


const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

export const createPoliceValidationSchema = z.object({
  body: z.object({
    thanaName: z
      .string({ required_error: 'থানার নাম প্রয়োজন' })
      .min(3, { message: 'থানার নাম অন্তত ৩ অক্ষরের হতে হবে' })
      .trim(),

    location: z
      .string({ required_error: 'ঠিকানা প্রয়োজন' })
      .min(5, { message: 'ঠিকানা একটু বিস্তারিত হওয়া প্রয়োজন' })
      .trim(),

    ocName: z
      .string({ required_error: 'ওসির নাম প্রয়োজন' })
      .min(3, { message: 'নাম অন্তত ৩ অক্ষরের হতে হবে' })
      .trim(),

    ocNumber: z
      .string({ required_error: 'ওসির নম্বর প্রয়োজন' })
      .regex(bdPhoneRegex, { message: 'সঠিক বাংলাদেশী মোবাইল নম্বর দিন (১১ ডিজিট)' }),

    dutyOfficer: z
      .string({ required_error: 'ডিউটি অফিসারের নম্বর প্রয়োজন' })
      .regex(bdPhoneRegex, { message: 'সঠিক ডিউটি অফিসার নম্বর দিন' }),

    controlRoom: z
      .string()
      .optional()
      .or(z.literal('')), // যদি ইনপুট ফিল্ড ফাঁকা থাকে তাহলে যেন এরর না দেয়

  }),


});
export const PoliceValidations = {
  createPoliceValidationSchema,
};