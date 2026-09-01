'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema, type InquiryFormValues } from '@/lib/validations/inquiry';
import { submitInquiryAction } from '@/app/actions/inquiry';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InquiryFormProps {
  productItemId?: string | null;
  productTitle?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export function InquiryForm({
  productItemId,
  productTitle,
  onSuccess,
  compact = false,
}: InquiryFormProps) {
  const [isPending, setIsPending] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      phone: '',
      message: productTitle
        ? `I am interested in acquiring or requesting a private viewing for the "${productTitle}". Please share availability and provenance details.`
        : '',
      productItemId: productItemId || null,
      preferredTimeframe: 'Immediate Consultation',
    },
  });

  const onSubmit = async (values: InquiryFormValues) => {
    setIsPending(true);
    setServerError(null);

    const formData = new FormData();
    formData.append('clientName', values.clientName);
    formData.append('clientEmail', values.clientEmail);
    if (values.phone) formData.append('phone', values.phone);
    formData.append('message', values.message);
    if (values.productItemId) formData.append('productItemId', values.productItemId);
    if (values.preferredTimeframe) formData.append('preferredTimeframe', values.preferredTimeframe);

    const result = await submitInquiryAction(formData);
    setIsPending(false);

    if (result.success) {
      setIsSuccess(true);
      reset();
      if (onSuccess) onSuccess();
    } else {
      setServerError(result.message || 'An error occurred during submission.');
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 text-center bg-[#FFFFFF] border border-[#E5E2DB] flex flex-col items-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#111111] text-[#C5A880] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif text-[#111111]">
              Consultation Request Received
            </h3>
            <p className="text-sm text-[#666666] leading-relaxed max-w-md">
              Thank you for extending your interest. A dedicated client advisor from our Zurich & London private concierge will contact you within 24 hours.
            </p>
            <div className="pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSuccess(false)}
              >
                Submit Another Inquiry
              </Button>
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-[#FFFFFF] p-6 sm:p-10 border border-[#E5E2DB] shadow-sm"
          >
            {productTitle && (
              <div className="pb-4 border-b border-[#E5E2DB] flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-[#737373]">
                  Selected Creation
                </span>
                <span className="text-sm font-serif text-[#111111] font-medium">
                  {productTitle}
                </span>
              </div>
            )}

            {serverError && (
              <div className="p-4 bg-[#FEF2F2] border border-[#F87171] text-xs text-[#991B1B] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="inquiry-client-name"
                  className="block text-[11px] uppercase tracking-[0.18em] text-[#444444] font-medium"
                >
                  Full Name <span className="text-[#C5A880]">*</span>
                </label>
                <Input
                  id="inquiry-client-name"
                  placeholder="e.g. Lady Vivienne Montgomery"
                  {...register('clientName')}
                  className={errors.clientName ? 'border-red-400' : ''}
                />
                {errors.clientName && (
                  <p className="text-[11px] text-red-500">{errors.clientName.message}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label
                  htmlFor="inquiry-client-email"
                  className="block text-[11px] uppercase tracking-[0.18em] text-[#444444] font-medium"
                >
                  Email Address <span className="text-[#C5A880]">*</span>
                </label>
                <Input
                  id="inquiry-client-email"
                  type="email"
                  placeholder="client@domaine.com"
                  {...register('clientEmail')}
                  className={errors.clientEmail ? 'border-red-400' : ''}
                />
                {errors.clientEmail && (
                  <p className="text-[11px] text-red-500">{errors.clientEmail.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone / WhatsApp */}
              <div className="space-y-1.5">
                <label
                  htmlFor="inquiry-phone"
                  className="block text-[11px] uppercase tracking-[0.18em] text-[#444444] font-medium"
                >
                  Telephone / Private Mobile (Optional)
                </label>
                <Input
                  id="inquiry-phone"
                  placeholder="+41 22 819 0000"
                  {...register('phone')}
                />
              </div>

              {/* Preferred Timeframe */}
              <div className="space-y-1.5">
                <label
                  htmlFor="inquiry-timeframe"
                  className="block text-[11px] uppercase tracking-[0.18em] text-[#444444] font-medium"
                >
                  Preferred Consultation Cadence
                </label>
                <select
                  id="inquiry-timeframe"
                  {...register('preferredTimeframe')}
                  className="flex h-11 w-full bg-[#FFFFFF] px-4 py-2 text-sm text-[#111111] border border-[#E5E2DB] focus-visible:outline-none focus-visible:border-[#111111] focus-visible:ring-1 focus-visible:ring-[#111111]"
                >
                  <option value="Immediate Consultation">Immediate Consultation (24 Hours)</option>
                  <option value="Within 7 Days">Within 7 Days</option>
                  <option value="Private Salon Visit Zurich">Private Salon Visit (Zurich)</option>
                  <option value="Private Salon Visit London">Private Salon Visit (London)</option>
                  <option value="Private Salon Visit Tokyo">Private Salon Visit (Tokyo)</option>
                </select>
              </div>
            </div>

            {/* Message / Specifications */}
            <div className="space-y-1.5">
              <label
                htmlFor="inquiry-message"
                className="block text-[11px] uppercase tracking-[0.18em] text-[#444444] font-medium"
              >
                Inquiry Details & Bespoke Requirements <span className="text-[#C5A880]">*</span>
              </label>
              <Textarea
                id="inquiry-message"
                rows={compact ? 3 : 5}
                placeholder="Kindly outline any specific material preferences, personalized engraving requests, or private delivery timelines..."
                {...register('message')}
                className={errors.message ? 'border-red-400' : ''}
              />
              {errors.message && (
                <p className="text-[11px] text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Privacy note */}
            <p className="text-[11px] text-[#737373] leading-relaxed">
              We respect your confidentiality. All inquiries are encrypted and handled exclusively by senior maison partners under strict non-disclosure conventions.
            </p>

            {/* Submit Action */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 flex items-center justify-center gap-2 text-xs tracking-[0.2em]"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                  <span>Submitting Confidential Request...</span>
                </>
              ) : (
                <>
                  <span>Request Private Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </>
              )}
            </Button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
