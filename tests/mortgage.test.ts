import { describe, it, expect } from 'vitest';

function calculateMortgage(homePrice: number, downPaymentPercent: number, interestRate: number, years: number) {
  const downPayment = (homePrice * downPaymentPercent) / 100;
  const principal = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = years * 12;

  if (monthlyRate === 0) return principal / totalPayments;

  return Math.round(
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1)
  );
}

describe('Mortgage Calculation Helper', () => {
  it('calculates monthly principal and interest correctly', () => {
    // $1,000,000 home, 20% down ($800k principal), 6% interest, 30 years -> ~$4,796/mo
    const monthly = calculateMortgage(1000000, 20, 6, 30);
    expect(monthly).toBeGreaterThan(4700);
    expect(monthly).toBeLessThan(4900);
  });
});
