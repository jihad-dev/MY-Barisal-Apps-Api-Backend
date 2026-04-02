// fire-service.validation.ts
import { z } from 'zod';

const createFireServiceSchema = z.object({
  body: z.object({
    name:   z.string({ required_error: 'নাম দিন' }).min(1),
    type:   z.enum(['government', 'volunteer'], {
      required_error: 'ধরন দিন',
    }),
    status: z.enum(['active', 'inactive']).optional(),
    area:   z.string({ required_error: 'এলাকা দিন' }).min(1),
    phone:  z.array(z.string()).min(1, 'কমপক্ষে একটি নম্বর দিন'),
  }),
});

const updateFireServiceSchema = z.object({
  body: z.object({
    name:   z.string().min(1).optional(),
    type:   z.enum(['government', 'volunteer']).optional(),
    status: z.enum(['active', 'inactive']).optional(),
    area:   z.string().min(1).optional(),
    phone:  z.array(z.string()).optional(),
  }),
});

export const FireServiceValidation = {
  createFireServiceSchema,
  updateFireServiceSchema,
};