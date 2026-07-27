'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle, Upload, CheckCircle2, Building, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const submitPropertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  purpose: z.enum(['sale', 'rent']),
  type: z.enum(['villa', 'apartment', 'penthouse', 'townhouse', 'commercial', 'land', 'new-development']),
  price: z.number().min(1000, 'Price must be valid'),
  city: z.string().min(2, 'City is required'),
  address: z.string().min(5, 'Address is required'),
  bedrooms: z.number().min(1),
  bathrooms: z.number().min(1),
  areaSqFt: z.number().min(100),
  description: z.string().min(20, 'Description must be at least 20 characters')
});

type SubmitPropertyInputs = z.infer<typeof submitPropertySchema>;

export default function SubmitPropertyPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SubmitPropertyInputs>({
    resolver: zodResolver(submitPropertySchema),
    defaultValues: {
      purpose: 'sale',
      type: 'penthouse',
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 4500
    }
  });

  const onSubmit = async (data: SubmitPropertyInputs) => {
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6 text-center">
        <Badge variant="gold">Exclusive Listing Intake</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          Submit Your Signature Property
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Submit your property for confidential representation by EstateVista advisors.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200 shadow-md">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#111827]">Submission Received</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Our valuation team will review your property details and contact you for verification and photography scheduling.
          </p>
          <Button variant="primary" onClick={() => setSubmitted(false)}>
            Submit Another Listing
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-sm space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#111827]">1. Basic Information</h3>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Property Title</label>
              <input
                {...register('title')}
                placeholder="e.g. The Monolith Glass Duplex"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#B88746]"
              />
              {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Listing Purpose</label>
                <select {...register('purpose')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none">
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Property Type</label>
                <select {...register('type')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none">
                  <option value="penthouse">Penthouse</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="commercial">Commercial</option>
                  <option value="new-development">New Development</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Price ($)</label>
              <input
                type="number"
                {...register('price', { valueAsNumber: true })}
                placeholder="4500000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#B88746]"
              />
              {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price.message}</p>}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-serif font-bold text-[#111827]">2. Location & Specs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">City</label>
                <input
                  {...register('city')}
                  placeholder="New York"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none"
                />
                {errors.city && <p className="text-xs text-rose-500 mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Address</label>
                <input
                  {...register('address')}
                  placeholder="450 Park Avenue"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none"
                />
                {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">Bedrooms</label>
                <input
                  type="number"
                  {...register('bedrooms', { valueAsNumber: true })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm text-slate-900 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">Bathrooms</label>
                <input
                  type="number"
                  {...register('bathrooms', { valueAsNumber: true })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm text-slate-900 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">Area SqFt</label>
                <input
                  type="number"
                  {...register('areaSqFt', { valueAsNumber: true })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm text-slate-900 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Description</label>
              <textarea
                rows={4}
                {...register('description')}
                placeholder="Highlight key architectural details, indoor-outdoor flow, views, and materials..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none"
              />
              {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>}
            </div>
          </div>

          <Button variant="gold" isLoading={isSubmitting} className="w-full justify-center py-3.5 text-base">
            Submit Property for Advisory Review
          </Button>
        </form>
      )}
    </div>
  );
}
