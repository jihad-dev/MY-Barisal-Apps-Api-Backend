import { z } from "zod";

// Create validation schema
const createEsebaZodSchema = z.object({
  body: z.object({
    image: z
      .string({
        required_error: "Image is required",
      })
      .url("Image must be a valid URL"),
     title: z.string({
        required_error: "Title is required",
      }),

    link: z
      .string({
        required_error: "Link is required",
      })
      .url("Link must be a valid URL"),
  }),
});

export const EsebaValidation = {
  createEsebaZodSchema,
};