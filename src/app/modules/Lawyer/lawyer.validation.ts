// lawyer.validation.ts
import { z } from 'zod';

const createLawyerSchema = z.object({
  body: z.object({
    name:         z.string({ required_error: 'নাম দিন' }).min(1),
    designation:  z.string({ required_error: 'পদবী দিন' }).min(1),
    lawyerType:   z.enum(['civil', 'criminal', 'family', 'corporate', 'general'], {
      required_error: 'আইনজীবীর ধরন দিন',
    }),
    courtType: z.enum(
      ['supreme', 'high', 'district', 'magistrate', 'labor', 'other'],
      { required_error: 'আদালতের ধরন দিন' }
    ),
    barCouncilId: z.string().optional(),
    area:         z.string({ required_error: 'এলাকা দিন' }).min(1),
    address:      z.string({ required_error: 'ঠিকানা দিন' }).min(1),
    phone:        z.array(z.string()).min(1, 'কমপক্ষে একটি নম্বর দিন'),
    experience:   z.number().optional(),
  }),
});

const updateLawyerSchema = z.object({
  body: z.object({
    name:         z.string().min(1).optional(),
    designation:  z.string().min(1).optional(),
    lawyerType:   z.enum(['civil', 'criminal', 'family', 'corporate', 'general']).optional(),
    courtType:    z.enum(['supreme', 'high', 'district', 'magistrate', 'labor', 'other']).optional(),
    barCouncilId: z.string().optional(),
    area:         z.string().min(1).optional(),
    address:      z.string().min(1).optional(),
    phone:        z.array(z.string()).optional(),
    experience:   z.number().optional(),
  }),
});

export const LawyerValidation = {
  createLawyerSchema,
  updateLawyerSchema,
};