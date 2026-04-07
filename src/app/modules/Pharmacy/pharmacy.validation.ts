import { z } from 'zod';

const createPharmacyValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }),
        area: z.string({ required_error: "Area is required" }),
        phone: z.array(z.string()).min(1, "At least one phone number is required"),
        isHomeDelivery: z.boolean().optional(),
        status: z.enum(['open', 'closed']).optional(),
    })
});

export const PharmacyValidations = {
    createPharmacyValidationSchema
};