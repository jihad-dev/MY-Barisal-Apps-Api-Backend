import { z } from 'zod';

// রক্তের গ্রুপের enum ভ্যালিডেশন
const BloodGroupEnum = z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);

const createDonorValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'নাম অবশ্যই দিতে হবে',
      })
      .min(3, { message: 'নাম অন্তত ৩ অক্ষরের হতে হবে' })
      .max(50),
    
    bloodGroup: BloodGroupEnum,
    
    area: z.string({
      required_error: 'এরিয়া বা লোকেশন দেওয়া বাধ্যতামূলক',
    }),
    
    phone: z
      .string({
        required_error: 'মোবাইল নম্বর প্রয়োজন',
      })
      .regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, {
        message: 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন',
      }),
    
    // lastDonationDate অপশনাল হতে পারে যদি নতুন ডোনার হয়
    lastDonationDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'তারিখ YYYY-MM-DD ফরম্যাটে হতে হবে' })
      .optional()
      .nullable(),

    isAvailable: z.boolean().optional().default(true),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateDonorValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    bloodGroup: BloodGroupEnum.optional(),
    area: z.string().optional(),
    phone: z.string().optional(),
    lastDonationDate: z.string().optional(),
    isAvailable: z.boolean().optional(),
  }),
});

export const DonorValidations = {
  createDonorValidationSchema,
  updateDonorValidationSchema,
};