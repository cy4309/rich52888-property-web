"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartRow = {
  label: string;
  bank: number;
  owner: number;
};

type CalculatorPayload = {
  loanAmountWan: number;
  loanYears: number;
  graceYears: number;
  startMonth: number;
  endMonth: number;
  annualRate: number;
};

const currency = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 0,
});

function toNonNegativeNumber(value: string, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, parsed);
}

function calcBankMonthlyPayment(principal: number, annualRatePercent: number, months: number) {
  const monthlyRate = annualRatePercent / 100 / 12;
  if (months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;

  // 每月應付本息金額之平均攤還率
  // = {[(1＋月利率)^月數]×月利率} ÷ {[(1＋月利率)^月數]－1}
  const pow = (1 + monthlyRate) ** months;
  const amortizationRate = (pow * monthlyRate) / (pow - 1);
  return principal * amortizationRate;
}

export default function LoanComparisonCalculator() {
  // 借款總額單位：萬元
  const [loanAmountWanInput, setLoanAmountWanInput] = useState("100");
  const [loanYearsInput, setLoanYearsInput] = useState("1");
  const [graceYearsInput, setGraceYearsInput] = useState("0");
  const [startMonthInput, setStartMonthInput] = useState("1");
  const [endMonthInput, setEndMonthInput] = useState("12");
  const [annualRateInput, setAnnualRateInput] = useState("1.565");
  const [submitted, setSubmitted] = useState<CalculatorPayload | null>(null);

  const loanAmountWan = toNonNegativeNumber(loanAmountWanInput, 100);
  const loanYears = toNonNegativeNumber(loanYearsInput, 1);
  const graceYears = toNonNegativeNumber(graceYearsInput, 0);
  const startMonth = Math.max(1, Math.round(toNonNegativeNumber(startMonthInput, 1)));
  const endMonth = Math.max(startMonth, Math.round(toNonNegativeNumber(endMonthInput, 12)));
  const annualRate = toNonNegativeNumber(annualRateInput, 1.565);

  const active = submitted ?? {
    loanAmountWan,
    loanYears,
    graceYears,
    startMonth,
    endMonth,
    annualRate,
  };

  const totalMonths = Math.max(1, Math.round(active.loanYears * 12));
  const graceMonths = Math.min(totalMonths, Math.round(active.graceYears * 12));
  const repayMonths = Math.max(1, totalMonths - graceMonths);
  const principal = active.loanAmountWan * 10000;

  const ownerMonthlyPayment = useMemo(() => {
    // 業主公式（依你提供）：貸款金額 * 0.2 / 12
    return principal * 0.2 / 12;
  }, [principal]);

  const bankMonthlyPayment = useMemo(() => {
    return calcBankMonthlyPayment(principal, active.annualRate, repayMonths);
  }, [principal, active.annualRate, repayMonths]);

  const ownerTotalPayment = ownerMonthlyPayment * totalMonths;
  const bankTotalPayment = bankMonthlyPayment * repayMonths;

  const chartData: ChartRow[] = useMemo(() => {
    const rows: ChartRow[] = [];
    const marks = Array.from(
      new Set([
        1,
        active.startMonth,
        Math.round((active.startMonth + active.endMonth) / 2),
        active.endMonth,
        totalMonths,
      ]),
    )
      .filter((m) => m >= 1 && m <= totalMonths)
      .sort((a, b) => a - b);

    for (const month of marks) {
      const bankPaidMonths = Math.max(0, month - graceMonths);
      rows.push({
        label: `第${month}月`,
        bank: bankMonthlyPayment * bankPaidMonths,
        owner: ownerMonthlyPayment * month,
      });
    }

    return rows;
  }, [active.startMonth, active.endMonth, totalMonths, graceMonths, bankMonthlyPayment, ownerMonthlyPayment]);

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-6">
      <h3 className="text-deep text-lg font-bold">利率貸款試算</h3>

      {!submitted ? (
        <div className="mt-4 space-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <InputRow
              label="借款總額（單位萬元）"
              value={loanAmountWanInput}
              onChange={setLoanAmountWanInput}
              step="1"
            />
            <InputRow label="貸款年期（年）" value={loanYearsInput} onChange={setLoanYearsInput} step="1" />
            <InputRow label="寬限期（年）" value={graceYearsInput} onChange={setGraceYearsInput} step="1" />
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-3">
            <p className="text-sm font-semibold text-deep">利率方式：單一利率</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <InputRow
                label="第1段起始月"
                value={startMonthInput}
                onChange={setStartMonthInput}
                step="1"
              />
              <InputRow
                label="結束月"
                value={endMonthInput}
                onChange={setEndMonthInput}
                step="1"
              />
            </div>
            <div className="mt-3">
              <InputRow
                label="年利率（%）"
                value={annualRateInput}
                onChange={setAnnualRateInput}
                step="0.001"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setSubmitted({
                loanAmountWan,
                loanYears,
                graceYears,
                startMonth,
                endMonth,
                annualRate,
              })
            }
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            開始試算
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <p className="text-sm font-semibold text-deep">即時比較（長條圖）</p>
            <div className="mt-3 h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={10}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="label" />
                  <YAxis tickFormatter={(value) => `${Math.round(value / 10000)}萬`} />
                  <Tooltip
                    formatter={(value) =>
                      typeof value === "number" ? currency.format(value) : String(value ?? "")
                    }
                  />
                  <Legend />
                  <Bar dataKey="bank" name="他行銀行（藍）" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="owner" name="謙謙（橘）" fill="#f97316" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSubmitted(null)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-deep transition hover:bg-neutral-50"
          >
            重新試算（返回表單）
          </button>
        </div>
      )}
    </section>
  );
}

function InputRow({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  step: string;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-semibold text-neutral-700">{label}</span>
      <input
        type="number"
        value={value}
        min="0"
        step={step}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-deep outline-none ring-primary/20 transition focus:border-primary focus:ring"
      />
    </label>
  );
}

function ResultCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: "blue" | "orange";
}) {
  const style =
    color === "blue"
      ? "border-blue-200 bg-blue-50 text-blue-700"
      : "border-orange-200 bg-orange-50 text-orange-700";

  return (
    <div className={`rounded-lg border p-3 ${style}`}>
      <p className="text-xs font-semibold">{title}</p>
      <p className="mt-1 text-lg font-bold">{value}</p>
    </div>
  );
}
