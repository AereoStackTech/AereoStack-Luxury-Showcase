import { z } from 'zod';

export const inquirySchema = z.object({
  clientName: z
    .string()
    .min(2, { message: 'Please provide your full name (minimum 2 characters).' })
    .max(100, { message: 'Name must not exceed 100 characters.' }),
  clientEmail: z
    .string()
    .email({ message: 'Please provide a valid private or corporate email address.' }),
  phone: z
    .string()
    .max(30, { message: 'Phone number must not exceed 30 characters.' })
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, { message: 'Please provide brief details regarding your inquiry or commission request (minimum 10 characters).' })
    .max(2000, { message: 'Message must not exceed 2000 characters.' }),
  productItemId: z.string().optional().nullable(),
  preferredTimeframe: z.string().optional(),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export const inquiryStatusUpdateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(['PENDING', 'REVIEWED', 'RESOLVED']),
  notes: z.string().max(1000).optional(),
});

export type InquiryStatusUpdateValues = z.infer<typeof inquiryStatusUpdateSchema>;
