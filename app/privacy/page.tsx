import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-serif font-bold text-[#111827]">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Effective Date: January 1, 2026</p>
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-4">
        <p>EstateVista Real Estate Platform is committed to preserving client confidentiality and data security. All buyer inquiries and off-market transaction data are encrypted with bank-grade security protocols.</p>
        <h3 className="text-sm font-serif font-bold text-slate-900">Information We Collect</h3>
        <p>We collect contact information voluntarily supplied during property dossier requests, viewing appointments, and newsletter subscriptions.</p>
      </div>
    </div>
  );
}
