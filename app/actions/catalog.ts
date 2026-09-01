'use server';

import { luxuryDb } from '@/lib/db';
import { productItemSchema, faqSchema } from '@/lib/validations/catalog';
import { revalidatePath } from 'next/cache';
import type { ActionResult } from './inquiry';

export async function createProductAction(formData: FormData): Promise<ActionResult> {
  try {
    const rawImages = formData.get('images')?.toString() || '';
    const imagesArray = rawImages
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const rawData = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      subtitle: formData.get('subtitle') || '',
      description: formData.get('description'),
      price: formData.get('price'),
      images: imagesArray.length > 0 ? imagesArray : ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85'],
      isFeatured: formData.get('isFeatured') === 'on' || formData.get('isFeatured') === 'true',
      categoryId: formData.get('categoryId'),
      materials: formData.get('materials') || '',
      leadTime: formData.get('leadTime') || '',
    };

    const parsed = productItemSchema.safeParse(rawData);

    if (!parsed.success) {
      return {
        success: false,
        message: 'Invalid catalog item parameters.',
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const created = await luxuryDb.createProduct({
      title: parsed.data.title,
      slug: parsed.data.slug,
      subtitle: parsed.data.subtitle,
      description: parsed.data.description,
      price: parsed.data.price,
      images: parsed.data.images,
      isFeatured: parsed.data.isFeatured,
      categoryId: parsed.data.categoryId,
      materials: parsed.data.materials,
      leadTime: parsed.data.leadTime,
    });

    revalidatePath('/');
    revalidatePath('/catalog');
    revalidatePath('/admin');
    revalidatePath('/admin/catalog');

    return {
      success: true,
      message: 'New creation added to the curated catalog.',
      data: created,
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      message: 'Failed to create product item.',
    };
  }
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  try {
    const success = await luxuryDb.deleteProduct(id);
    if (!success) {
      return {
        success: false,
        message: 'Product not found or could not be removed.',
      };
    }

    revalidatePath('/');
    revalidatePath('/catalog');
    revalidatePath('/admin');
    revalidatePath('/admin/catalog');

    return {
      success: true,
      message: 'Catalog item removed successfully.',
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      message: 'Failed to delete product item.',
    };
  }
}

export async function createFAQAction(formData: FormData): Promise<ActionResult> {
  try {
    const rawData = {
      question: formData.get('question'),
      answer: formData.get('answer'),
      order: formData.get('order') || 0,
    };

    const parsed = faqSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        message: 'Invalid FAQ format.',
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const newFaq = await luxuryDb.createFAQ({
      question: parsed.data.question,
      answer: parsed.data.answer,
      order: parsed.data.order,
    });

    revalidatePath('/faq');
    revalidatePath('/admin');

    return {
      success: true,
      message: 'FAQ entry added.',
      data: newFaq,
    };
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return {
      success: false,
      message: 'Failed to create FAQ entry.',
    };
  }
}

export async function deleteFAQAction(id: string): Promise<ActionResult> {
  try {
    const success = await luxuryDb.deleteFAQ(id);
    if (!success) {
      return { success: false, message: 'FAQ entry not found.' };
    }
    revalidatePath('/faq');
    revalidatePath('/admin');
    return { success: true, message: 'FAQ entry deleted.' };
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return { success: false, message: 'Failed to delete FAQ.' };
  }
}
