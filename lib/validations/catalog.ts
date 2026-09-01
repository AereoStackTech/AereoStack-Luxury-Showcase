import { z } from 'zod';

export const productItemSchema = z.object({
  title: z.string().min(2, { message: 'Title is required.' }).max(150),
  slug: z
    .string()
    .min(2)
    .max(150)
    .regex(/^[a-z0-9-]+$/, { message: 'Slug must only contain lowercase letters, numbers, and hyphens.' }),
  subtitle: z.string().max(200).optional().or(z.literal('')),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number.' }),
  images: z.array(z.string().url()).min(1, { message: 'At least one image URL is required.' }),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().min(1, { message: 'Category is required.' }),
  materials: z.string().optional().or(z.literal('')),
  leadTime: z.string().optional().or(z.literal('')),
});

export type ProductItemFormValues = z.infer<typeof productItemSchema>;

export const faqSchema = z.object({
  question: z.string().min(5, { message: 'Question must be at least 5 characters.' }).max(300),
  answer: z.string().min(10, { message: 'Answer must be at least 10 characters.' }).max(2000),
  order: z.coerce.number().int().min(0).default(0),
});

export type FAQFormValues = z.infer<typeof faqSchema>;
