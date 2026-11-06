import { z } from 'zod';

// Ambulance Type Enum এর জন্য Zod Enum
export const AmbulanceTypeEnum = z.enum(['government', 'private', 'volunteer']);

// Create / Register Ambulance Validation Schema
export const createAmbulanceValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Ambulance name is required',
        }),
        type: AmbulanceTypeEnum,
        thana: z.string({
            required_error: 'Thana is required',
        }),
        area: z.string({
            required_error: 'Area is required',
        }),
        phone: z
            .array(z.string(), {
                required_error: 'Phone numbers are required',
            })
            .nonempty('Phone number array cannot be empty'),
        isDeleted: z.boolean().optional().default(false),
    }),
});

// Update Ambulance Validation Schema (সব ফিল্ড অপশনাল করার জন্য)
export const updateAmbulanceValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        type: AmbulanceTypeEnum.optional(),
        thana: z.string().optional(),
        area: z.string().optional(),
        phone: z.array(z.string()).optional(),
        isDeleted: z.boolean().optional(),
    }),
});