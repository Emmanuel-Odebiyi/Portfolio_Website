import { describe, it, expect } from 'vitest';
import {
  calculateROI,
  INDUSTRY_EFFICIENCY,
  OVERHEAD_MULTIPLIER,
  type CalculatorInputs,
} from './roiCalculator';

describe('ROI Calculator Engine', () => {
  const baseInputs: CalculatorInputs = {
    teamSize: 1,
    hourlyCost: 35,
    weeklyHours: 15,
    freelancerSpend: 0,
    softwareBudget: 0,
    setupInvestment: 500,
    industry: 'SaaS',
    currency: 'USD',
  };

  it('calculates expected labor costs and savings for standard SaaS inputs', () => {
    const res = calculateROI(baseInputs);

    // 15 hours * 1 team * 4.33 = 64.95 hrs/mo. Rate = 35 * 1.3 = 45.5.
    // Monthly labor = 64.95 * 45.5 = ~2955
    expect(res.monthlyManualLabourCost).toBeGreaterThan(2900);
    expect(res.monthlyManualLabourCost).toBeLessThan(3000);

    // SaaS efficiency is 75%
    expect(res.weeklyHoursSaved).toBe(Math.round(15 * 0.75));

    // Break-even should occur quickly (within 1-2 months) given high savings vs $500 setup
    expect(res.breakevenMonth).toBe(1);
    expect(res.twelveMonthSavings).toBeGreaterThan(20000);
    expect(res.roi).toBeGreaterThan(4000);
    expect(res.chartData.length).toBe(13); // month 0 to 12
  });

  it('handles zero setup investment cleanly without division by zero', () => {
    const inputsWithZeroSetup: CalculatorInputs = {
      ...baseInputs,
      setupInvestment: 0,
    };
    const res = calculateROI(inputsWithZeroSetup);

    expect(res.breakevenMonth).toBe(0);
    expect(Number.isFinite(res.roi)).toBe(true);
    expect(res.chartData[0].automationCost).toBe(0);
  });

  it('handles zero team size and zero hours without NaN or negative infinity', () => {
    const zeroLaborInputs: CalculatorInputs = {
      ...baseInputs,
      teamSize: 0,
      weeklyHours: 0,
    };
    const res = calculateROI(zeroLaborInputs);

    expect(res.monthlyManualLabourCost).toBe(0);
    expect(res.weeklyHoursSaved).toBe(0);
    expect(res.breakevenMonth).toBe(Infinity);
    expect(Number.isNaN(res.twelveMonthSavings)).toBe(false);
  });

  it('applies industry efficiency tiers correctly', () => {
    const saas = calculateROI({ ...baseInputs, industry: 'SaaS' });
    const ecom = calculateROI({ ...baseInputs, industry: 'E-commerce' });
    const other = calculateROI({ ...baseInputs, industry: 'Other' });

    expect(saas.weeklyHoursSaved).toBe(Math.round(15 * INDUSTRY_EFFICIENCY['SaaS'].rate));
    expect(ecom.weeklyHoursSaved).toBe(Math.round(15 * INDUSTRY_EFFICIENCY['E-commerce'].rate));
    expect(other.weeklyHoursSaved).toBe(Math.round(15 * INDUSTRY_EFFICIENCY['Other'].rate));
    expect(saas.monthlyAutomationSavings).toBeGreaterThan(ecom.monthlyAutomationSavings);
  });
});
