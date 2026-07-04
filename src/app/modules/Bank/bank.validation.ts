import { threadId } from 'worker_threads';
import { z } from 'zod';

const createBankValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'ব্যাংকের নাম অবশ্যই দিতে হবে (যেমন: ডাচ-বাংলা ব্যাংক)',
    }).min(3, 'ব্যাংকের নাম কমপক্ষে ৩ অক্ষরের হতে হবে'),

    branch: z.string({
      required_error: 'শাখার নাম প্রয়োজন (যেমন: সদর রোড শাখা)',
    }),

    routingNumber: z.string()
      .length(9, 'রাউটিং নম্বর অবশ্যই ৯ ডিজিটের হতে হবে')
      .optional()
      .or(z.literal('')), // যদি খালি স্ট্রিং পাঠায় তাও এক্সেপ্ট করবে

    address: z.string({
      required_error: 'ব্যাংকের সঠিক ঠিকানা প্রয়োজন',
    }),
    thana: z.string({
      required_error: 'Thana সঠিক ঠিকানা প্রয়োজন',
    }),

    phone: z.array(
      z.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন')
    ).nonempty('কমপক্ষে একটি ফোন নম্বর দিতে হবে'),

    isDeleted: z.boolean().default(false).optional(),
  }),
});

// আপডেট করার জন্য আলাদা স্কিমা (সবগুলো অপশনাল)
const updateBankValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    branch: z.string().optional(),
    routingNumber: z.string().length(9).optional(),
    address: z.string().optional(),
    thana: z.string().optional(),
    phone: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const BankValidations = {
  createBankValidationSchema,
  updateBankValidationSchema,
};