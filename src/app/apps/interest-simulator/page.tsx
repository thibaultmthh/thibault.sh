"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type ChartData = {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
};

const chartConfig = {
  balance: {
    label: "Total Balance",
    color: "hsl(var(--chart-1))",
  },
  contributions: {
    label: "Total Contributions",
    color: "hsl(var(--chart-2))",
  },
  interest: {
    label: "Interest Earned",
    color: "hsl(var(--chart-3))",
  },
} as const;

export default function InterestSimulator() {
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7);
  const [years, setYears] = useState<number>(30);

  const calculateGrowth = (): ChartData[] => {
    const data: ChartData[] = [];
    const monthlyRate = annualInterestRate / 100 / 12;

    for (let year = 0; year <= years; year++) {
      // Using the compound interest formula: Vf = Vi × (1 + ρ/n)^(n×t)
      // For monthly contributions, we need to add the future value of an annuity formula
      const periods = year * 12;
      const initialGrowth = initialAmount * Math.pow(1 + monthlyRate, periods);

      // Calculate future value of monthly contributions
      // PMT × (((1 + r)^n - 1) / r) where PMT is monthly payment, r is monthly rate, n is number of periods
      const contributionsGrowth = monthlyContribution * ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate);

      const balance = initialGrowth + (periods > 0 ? contributionsGrowth : 0);
      const totalContributions = initialAmount + monthlyContribution * periods;

      data.push({
        year,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        interest: Math.round(balance - totalContributions),
      });
    }

    return data;
  };

  const data = calculateGrowth();
  const finalAmount = data[data.length - 1].balance;
  const totalContributions = monthlyContribution * 12 * years + initialAmount;
  const totalInterest = finalAmount - totalContributions;

  console.log(data);

  return (
    <div className="min-h-screen p-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Investment Interest Simulator</h1>
        <p className="text-gray-600">Visualize how your investments could grow over time with compound interest.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card className="p-6 space-y-4">
          <div>
            <Label htmlFor="initial">Initial Investment ($)</Label>
            <Input
              id="initial"
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="monthly">Monthly Contribution ($)</Label>
            <Input
              id="monthly"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="years">Investment Period (Years)</Label>
            <Input id="years" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Final Amount:</span>
              <span className="font-bold">${finalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Contributions:</span>
              <span className="font-bold">${totalContributions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest:</span>
              <span className="font-bold text-green-600">${totalInterest.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <ChartContainer config={chartConfig} className="h-[300px] md:h-[400px] w-[calc(100dvw-80px)] md:w-full">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `Y${value}`}
                className="text-xs md:text-sm"
                interval="preserveStartEnd"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                className="text-xs md:text-sm"
                width={45}
              />
              <ChartTooltip content={<ChartTooltipContent labelKey="year" />} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="var(--color-balance)"
                fill="var(--color-balance)"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="contributions"
                stroke="var(--color-contributions)"
                fill="var(--color-contributions)"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ChartContainer>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Understanding Compound Interest</h3>
          <p className="text-gray-600">
            Compound interest is the interest you earn on both your initial investment and previously earned interest.
            Over time, this can lead to exponential growth of your investment, often referred to as the &quot;snowball
            effect&quot; of investing. The earlier you start, the more time your money has to compound and grow.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Investment Tips</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Start early to maximize compound interest benefits</li>
            <li>• Consistently contribute to your investments</li>
            <li>• Diversify your investment portfolio</li>
            <li>• Consider your risk tolerance when choosing investments</li>
            <li>• Reinvest dividends when possible</li>
            <li>• Review and rebalance periodically</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Common Scenarios</h3>
          <div className="space-y-3">
            <button
              className="w-full p-2 text-sm rounded bg-gray-100 hover:bg-gray-200 text-left"
              onClick={() => {
                setInitialAmount(10000);
                setMonthlyContribution(500);
                setAnnualInterestRate(7);
                setYears(30);
              }}
            >
              Retirement Saving
              <span className="block text-xs text-gray-600">$10k initial, $500/month, 7% return, 30 years</span>
            </button>

            <button
              className="w-full p-2 text-sm rounded bg-gray-100 hover:bg-gray-200 text-left"
              onClick={() => {
                setInitialAmount(1000);
                setMonthlyContribution(200);
                setAnnualInterestRate(6);
                setYears(10);
              }}
            >
              Emergency Fund
              <span className="block text-xs text-gray-600">$1k initial, $200/month, 6% return, 10 years</span>
            </button>

            <button
              className="w-full p-2 text-sm rounded bg-gray-100 hover:bg-gray-200 text-left"
              onClick={() => {
                setInitialAmount(5000);
                setMonthlyContribution(300);
                setAnnualInterestRate(8);
                setYears(20);
              }}
            >
              College Savings
              <span className="block text-xs text-gray-600">$5k initial, $300/month, 8% return, 20 years</span>
            </button>
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">The Power of Time</h3>
          <p className="text-gray-600">
            Time is one of the most powerful factors in investing. Due to compound interest, even small regular
            investments can grow significantly over long periods. For example, $100 monthly invested at 7% annual return
            can grow to over $120,000 in 30 years, despite only contributing $36,000 directly.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Understanding Returns</h3>
          <p className="text-gray-600">
            The annual return rate significantly impacts long-term results. While stocks have historically averaged
            7-10% annual returns (S&P 500), actual returns vary yearly. Conservative investments like bonds typically
            return 2-5%. Consider inflation (historically 2-3% annually) when planning your investment strategy.
          </p>
        </Card>
      </div>
    </div>
  );
}
