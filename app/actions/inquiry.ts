'use server';

import { luxuryDb } from '@/lib/db';
import { inquirySchema, inquiryStatusUpdateSchema } from '@/lib/validations/inquiry';
import { revalidatePath } from 'next/cache';

export interface ActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export async function submitInquiryAction(formData: FormData): Promise<ActionResult> {
  try {
    const rawData = {
      clientName: formData.get('clientName'),
      clientEmail: formData.get('clientEmail'),
      phone: formData.get('phone') || undefined,
      message: formData.get('message'),
      productItemId: formData.get('productItemId') || undefined,
      preferredTimeframe: formData.get('preferredTimeframe') || undefined,
    };

    const parsed = inquirySchema.safeParse(rawData);

    if (!parsed.success) {
      const flattenedErrors = parsed.error.flatten().fieldErrors;
      return {
        success: false,
        message: 'Please review and correct the required fields.',
        errors: flattenedErrors,
      };
    }

    const newInquiry = await luxuryDb.createInquiry({
      clientName: parsed.data.clientName,
      clientEmail: parsed.data.clientEmail,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
      productItemId: parsed.data.productItemId || null,
    });

    revalidatePath('/admin');
    revalidatePath('/admin/inquiries');

    return {
      success: true,
      message: 'Your inquiry has been received with discreet honor. A dedicated maison advisor will contact you shortly.',
      data: newInquiry,
    };
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return {
      success: false,
      message: 'An unexpected system issue occurred. Please reach out directly to concierge@aereostack.com.',
    };
  }
}

export async function updateInquiryStatusAction(data: {
  id: string;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED';
  notes?: string;
}): Promise<ActionResult> {
  try {
    const parsed = inquiryStatusUpdateSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: 'Invalid status update parameters.',
      };
    }

    const updated = await luxuryDb.updateInquiryStatus(parsed.data.id, parsed.data.status, parsed.data.notes);

    if (!updated) {
      return {
        success: false,
        message: 'Inquiry record not found.',
      };
    }

    revalidatePath('/admin');
    revalidatePath('/admin/inquiries');

    return {
      success: true,
      message: `Inquiry status updated to ${parsed.data.status}.`,
      data: updated,
    };
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return {
      success: false,
      message: 'Failed to update inquiry status.',
    };
  }
}
