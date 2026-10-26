export interface CalculatorInputs {
  teamSize: number;
  hourlyCost: number;
  weeklyHours: number;
  freelancerSpend: number;
  softwareBudget: number;
  setupInvestment: number;
  industry: 'SaaS' | 'E-commerce' | 'Other';
  currency: string;
}

export interface ROIData {
  month: number;
  manualCost: number;
  automationCost: number;
  netSavings: number;
  cumulativeSavings: number;
}

export interface ROIResults {
  monthlyManualLabourCost: number;
  monthlyAutomationSavings: number;
  breakevenMonth: number;
  twelveMonthSavings: number;
  roi: number;
  chartData: ROIData[];
  weeklyHoursSaved: number;
  fullyLoadedRate: number;
}

export const INDUSTRY_EFFICIENCY: Record<string, { rate: number; label: string }> = {
  'SaaS': { rate: 0.75, label: 'SaaS (75% automation efficiency)' },
  'E-commerce': { rate: 0.60, label: 'E-commerce (60% automation efficiency)' },
  'Other': { rate: 0.65, label: 'General (65% automation efficiency)' },
};

export const OVERHEAD_MULTIPLIER = 1.3;
export const MONTHLY_EFFICIENCY_GAIN = 0.005;
export const MONTHLY_MAINTENANCE_RATE = 0.05;

/**
 * Pure calculation engine for the ROI Time Machine tool.
 * Evaluates monthly labor, compounding automation savings, break-even month, and 12-month net ROI.
 */
export function calculateROI(inputs: CalculatorInputs): ROIResults {
  const safeHourlyCost = Math.max(0, inputs.hourlyCost || 0);
  const safeWeeklyHours = Math.max(0, inputs.weeklyHours || 0);
  const safeTeamSize = Math.max(0, inputs.teamSize || 0);
  const safeSetupInvestment = Math.max(0, inputs.setupInvestment || 0);

  const fullyLoadedRate = safeHourlyCost * OVERHEAD_MULTIPLIER;
  const weeklyManualHours = safeWeeklyHours * safeTeamSize;
  const monthlyManualHours = weeklyManualHours * 4.33;
  const monthlyManualLabourCost = monthlyManualHours * fullyLoadedRate;
  const industryConfig = INDUSTRY_EFFICIENCY[inputs.industry] || INDUSTRY_EFFICIENCY['Other'];
  const efficiencyRate = industryConfig.rate;

  const chartData: ROIData[] = [];
  let cumulativeSavings = -safeSetupInvestment;
  let cumulativeManualCost = 0;

  for (let i = 0; i <= 12; i++) {
    const monthEfficiency = efficiencyRate * (1 + MONTHLY_EFFICIENCY_GAIN * i);
    const monthlySavings = i === 0 ? 0 : monthlyManualLabourCost * Math.min(monthEfficiency, 0.95);
    const monthlyMaintenance = i === 0 ? 0 : safeSetupInvestment * MONTHLY_MAINTENANCE_RATE;
    const netMonthlySavings = monthlySavings - monthlyMaintenance;
    cumulativeManualCost += i === 0 ? 0 : monthlyManualLabourCost;

    if (i > 0) {
      cumulativeSavings += netMonthlySavings;
    }

    chartData.push({
      month: i,
      manualCost: Math.round(cumulativeManualCost),
      automationCost: Math.round(i === 0 ? safeSetupInvestment : monthlyMaintenance),
      netSavings: Math.round(i === 0 ? -safeSetupInvestment : netMonthlySavings),
      cumulativeSavings: Math.round(cumulativeSavings),
    });
  }

  const baseMonthlyNetSavings = (monthlyManualLabourCost * efficiencyRate) - (safeSetupInvestment * MONTHLY_MAINTENANCE_RATE);
  let breakevenMonth = Infinity;
  if (safeSetupInvestment === 0) {
    breakevenMonth = 0;
  } else if (baseMonthlyNetSavings > 0) {
    breakevenMonth = Math.ceil(safeSetupInvestment / baseMonthlyNetSavings);
  }

  const twelveMonthSavings = chartData[12].cumulativeSavings;
  const roi = safeSetupInvestment > 0
    ? (twelveMonthSavings / safeSetupInvestment) * 100
    : (twelveMonthSavings > 0 ? 100 : 0);

  const weeklyHoursSaved = Math.round(weeklyManualHours * efficiencyRate);

  return {
    monthlyManualLabourCost: Math.round(monthlyManualLabourCost),
    monthlyAutomationSavings: Math.round(baseMonthlyNetSavings),
    breakevenMonth,
    twelveMonthSavings: Math.round(twelveMonthSavings),
    roi: Math.round(roi),
    chartData,
    weeklyHoursSaved,
    fullyLoadedRate: Math.round(fullyLoadedRate),
  };
}
