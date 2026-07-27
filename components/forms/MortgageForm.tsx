'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

interface MortgageFormProps {
  initialPrice?: number;
}

export const MortgageForm: React.FC<MortgageFormProps> = ({ initialPrice = 5000000 }) => {
  const [homePrice, setHomePrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(4500);
  const [hoaMonthly, setHoaMonthly] = useState<number>(650);

  // Math Calculations
  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const principal = Math.max(0, homePrice - downPaymentAmount);
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyPrincipalAndInterest = 0;
  if (monthlyInterestRate > 0 && numberOfPayments > 0 && principal > 0) {
    monthlyPrincipalAndInterest =
      (principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  }

  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = homeInsuranceAnnual / 12;
  const totalMonthlyPayment = Math.round(monthlyPrincipalAndInterest + monthlyTax + monthlyInsurance + hoaMonthly);

  return (
    <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 lg:p-8 space-y-8 shadow-sm">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-[#B88746]/10 text-[#B88746] flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-serif font-bold text-[#111827]">Mortgage Estimator</h3>
          <p className="text-xs text-slate-500">Calculate estimated monthly payments and principal breakdowns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="space-y-5">
          {/* Home Price Input */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">
              Home Price ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#B88746]"
              />
            </div>
          </div>

          {/* Down Payment Slider & Input */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="text-[#B88746]">${downPaymentAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={1}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#B88746]"
            />
          </div>

          {/* Interest Rate & Loan Term */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#B88746]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">
                Loan Term (Years)
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#B88746]"
              >
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>
          </div>

          {/* Taxes, Insurance, HOA */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">Property Tax %</label>
              <input
                type="number"
                step="0.1"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">Ins. $/Yr</label>
              <input
                type="number"
                value={homeInsuranceAnnual}
                onChange={(e) => setHomeInsuranceAnnual(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">HOA $/Mo</label>
              <input
                type="number"
                value={hoaMonthly}
                onChange={(e) => setHoaMonthly(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Calculated Monthly Summary */}
        <div className="bg-[#0B1220] rounded-3xl p-6 text-white space-y-6 flex flex-col justify-between h-full border border-white/10 shadow-xl">
          <div>
            <span className="text-xs uppercase tracking-widest text-slate-400 block mb-1 font-sans">
              Estimated Monthly Payment
            </span>
            <div className="text-4xl lg:text-5xl font-serif font-bold text-[#B88746]">
              ${totalMonthlyPayment.toLocaleString()}
              <span className="text-sm font-sans text-slate-300 font-normal"> / mo</span>
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B88746]" /> Principal & Interest
              </span>
              <span className="font-mono font-bold">${Math.round(monthlyPrincipalAndInterest).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Property Tax
              </span>
              <span className="font-mono font-bold">${Math.round(monthlyTax).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Home Insurance
              </span>
              <span className="font-mono font-bold">${Math.round(monthlyInsurance).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> HOA Fees
              </span>
              <span className="font-mono font-bold">${Math.round(hoaMonthly).toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2">
            <Button variant="gold" className="w-full justify-center">
              Get Pre-Approved with Preferred Lenders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
