import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "wouter";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

interface CalcInputs {
  propertyPrice: number;
  downPayment: number;
  interestRate: number;
  loanTenure: number;
  holdPeriod: number;
  expectedAppreciation: number;
  monthlyRent: number;
  annualMaintenance: number;
  stampDuty: number;
}

const DEFAULTS: CalcInputs = {
  propertyPrice: 30000000,
  downPayment: 25,
  interestRate: 8.5,
  loanTenure: 20,
  holdPeriod: 10,
  expectedAppreciation: 8,
  monthlyRent: 150000,
  annualMaintenance: 60000,
  stampDuty: 5,
};

function formatINR(val: number): string {
  return "₹" + val.toLocaleString("en-IN");
}

function formatPercent(val: number): string {
  return val.toFixed(2) + "%";
}

function InputRow({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="section-label text-muted-foreground">{label}</label>
      <div className="flex items-center border-2 border-foreground/30 bg-card focus-within:border-primary transition-colors">
        {prefix && <span className="pl-3 font-mono text-xs text-muted-foreground">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          className="w-full bg-transparent border-none outline-none px-3 py-2.5 font-mono text-sm"
        />
        {suffix && <span className="pr-3 font-mono text-xs text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

function formatYear(val: number): string {
  return val.toFixed(0);
}

export default function InvestmentCalculatorPage() {
  const [inputs, setInputs] = useState<CalcInputs>(DEFAULTS);

  const updateInput = (key: keyof CalcInputs) => (val: number) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const results = useMemo(() => {
    const { propertyPrice, downPayment: dpPercent, interestRate, loanTenure, holdPeriod, expectedAppreciation, monthlyRent, annualMaintenance, stampDuty } = inputs;

    const dpAmount = propertyPrice * (dpPercent / 100);
    const loanAmount = propertyPrice - dpAmount;
    const sdAmount = propertyPrice * (stampDuty / 100);
    const totalAcqCost = dpAmount + sdAmount;

    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTenure * 12;
    const emi = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalRepayment = emi * totalMonths;
    const totalInterest = totalRepayment - loanAmount;

    const annualAppr = expectedAppreciation / 100;
    const futureValue = propertyPrice * Math.pow(1 + annualAppr, holdPeriod);
    const capitalGain = futureValue - propertyPrice;
    const netRentOverPeriod = (monthlyRent * 12 - annualMaintenance) * holdPeriod;
    const totalReturn = capitalGain + netRentOverPeriod;
    const totalInvested = totalAcqCost + (emi * 12 * holdPeriod);
    const netProfit = totalReturn - totalInvested + (loanAmount * (holdPeriod / loanTenure));
    const roi = totalInvested > 0 ? (netProfit / totalInvested) * 100 : 0;

    const yearlyData = Array.from({ length: holdPeriod }, (_, i) => {
      const year = i + 1;
      const propVal = propertyPrice * Math.pow(1 + annualAppr, year);
      const yearsRent = (monthlyRent * 12 - annualMaintenance) * year;
      const cumRepay = emi * 12 * Math.min(year, loanTenure);
      const remainingLoan = year <= loanTenure ? loanAmount - (loanAmount * year / loanTenure) : 0;
      const equity = propVal - remainingLoan;
      return {
        year,
        propertyValue: Math.round(propVal),
        equity: Math.round(equity),
        cumulativeRent: Math.round(yearsRent),
        loanBalance: Math.round(remainingLoan),
        totalInvested: Math.round(totalAcqCost + cumRepay),
      };
    });

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalRepayment: Math.round(totalRepayment),
      futureValue: Math.round(futureValue),
      capitalGain: Math.round(capitalGain),
      netRentOverPeriod: Math.round(netRentOverPeriod),
      totalReturn: Math.round(totalReturn),
      totalInvested: Math.round(totalInvested),
      netProfit: Math.round(netProfit),
      roi,
      dpAmount: Math.round(dpAmount),
      loanAmount: Math.round(loanAmount),
      sdAmount: Math.round(sdAmount),
      totalAcqCost: Math.round(totalAcqCost),
      yearlyData,
    };
  }, [inputs]);

  return (
    <div className="pt-20">
      <Navbar />
      <main className="bg-background min-h-screen page-enter">
        <div className="border-b-[3px] border-foreground px-5 md:px-10 py-3 flex items-center justify-between">
          <Link href="/" className="section-label text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <span className="section-label text-muted-foreground">Investment Calculator</span>
        </div>

        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-8 md:py-12 bg-primary text-primary-foreground">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="section-label text-primary-foreground/70 mb-2">BRUT Realty</p>
            <h1 className="font-sans font-extrabold leading-[0.95] tracking-tight text-balance" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
              Investment<br />Calculator
            </h1>
            <p className="font-sans text-base md:text-lg text-primary-foreground/80 mt-4 max-w-xl leading-relaxed">
              Model the buy-to-let yield and capital-growth case for any Mumbai property.
            </p>
          </motion.div>
        </section>

        <section className="border-b-[3px] border-foreground px-5 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10">
          <div className="space-y-5">
            <h2 className="font-sans font-bold text-lg">Property Details</h2>
            <InputRow label="Property Price" value={inputs.propertyPrice} onChange={updateInput("propertyPrice")} prefix="₹" />
            <InputRow label="Down Payment" value={inputs.downPayment} onChange={updateInput("downPayment")} suffix="%" min={0} max={100} step={1} />
            <InputRow label="Interest Rate" value={inputs.interestRate} onChange={updateInput("interestRate")} suffix="%" min={0} max={30} step={0.1} />
            <InputRow label="Loan Tenure" value={inputs.loanTenure} onChange={updateInput("loanTenure")} suffix="years" min={1} max={30} step={1} />
            <InputRow label="Hold Period" value={inputs.holdPeriod} onChange={updateInput("holdPeriod")} suffix="years" min={1} max={30} step={1} />
            <InputRow label="Expected Appreciation" value={inputs.expectedAppreciation} onChange={updateInput("expectedAppreciation")} suffix="%/yr" min={0} max={30} step={0.5} />
            <InputRow label="Monthly Rent (est.)" value={inputs.monthlyRent} onChange={updateInput("monthlyRent")} prefix="₹" />
            <InputRow label="Annual Maintenance" value={inputs.annualMaintenance} onChange={updateInput("annualMaintenance")} prefix="₹" />
            <InputRow label="Stamp Duty & Reg." value={inputs.stampDuty} onChange={updateInput("stampDuty")} suffix="%" min={0} max={15} step={0.5} />
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Monthly EMI", value: formatINR(results.emi) },
                { label: "Total Interest", value: formatINR(results.totalInterest) },
                { label: "Future Value", value: formatINR(results.futureValue) },
                { label: "Net Profit", value: formatINR(results.netProfit), highlight: results.netProfit > 0 },
                { label: "ROI", value: formatPercent(results.roi), highlight: results.roi > 0 },
                { label: "Capital Gain", value: formatINR(results.capitalGain) },
                { label: "Net Rent Income", value: formatINR(results.netRentOverPeriod) },
                { label: "Total Return", value: formatINR(results.totalReturn) },
              ].map(({ label, value, highlight }) => (
                <div key={label} className={`border-2 p-4 ${highlight ? "border-primary bg-primary/5" : "border-foreground/15"}`}>
                  <p className="section-label text-muted-foreground mb-1">{label}</p>
                  <p className={`font-mono font-bold text-lg ${highlight ? "text-primary" : ""}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="border-2 border-foreground/15 p-5">
              <h3 className="font-sans font-bold text-base mb-4">Property Value Growth</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(20 22% 14% / 0.1)" />
                    <XAxis dataKey="year" tickFormatter={formatYear} tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v) => "₹" + (v / 10000000).toFixed(1) + "Cr"} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: number) => [formatINR(v)]} />
                    <Line type="monotone" dataKey="propertyValue" stroke="hsl(14 56% 49%)" strokeWidth={2} dot={false} name="Property Value" />
                    <Line type="monotone" dataKey="equity" stroke="hsl(20 22% 14%)" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Equity" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border-2 border-foreground/15 p-5">
              <h3 className="font-sans font-bold text-base mb-4">Year-over-Year Breakdown</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(20 22% 14% / 0.1)" />
                    <XAxis dataKey="year" tickFormatter={formatYear} tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v) => "₹" + (v / 10000000).toFixed(1) + "Cr"} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: number) => [formatINR(v)]} />
                    <Legend />
                    <Bar dataKey="loanBalance" fill="hsl(14 56% 49% / 0.6)" name="Loan Balance" />
                    <Bar dataKey="totalInvested" fill="hsl(20 22% 14% / 0.4)" name="Total Invested" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border-2 border-foreground/15 p-5 bg-foreground text-card">
              <h3 className="font-sans font-bold text-base mb-2">Acquisition Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm">
                <div>
                  <p className="text-card/50 text-[10px] uppercase tracking-widest">Down Payment</p>
                  <p className="font-bold">{formatINR(results.dpAmount)}</p>
                </div>
                <div>
                  <p className="text-card/50 text-[10px] uppercase tracking-widest">Loan Amount</p>
                  <p className="font-bold">{formatINR(results.loanAmount)}</p>
                </div>
                <div>
                  <p className="text-card/50 text-[10px] uppercase tracking-widest">Stamp Duty</p>
                  <p className="font-bold">{formatINR(results.sdAmount)}</p>
                </div>
                <div>
                  <p className="text-card/50 text-[10px] uppercase tracking-widest">Total Upfront</p>
                  <p className="font-bold text-primary">{formatINR(results.totalAcqCost)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
