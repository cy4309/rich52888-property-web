"use client";

import { useMemo, useState } from "react";
import LineQrContactPanel from "@/components/sections/LineQrContactPanel";

type Labor = "yes" | "no";
type Collateral = "none" | "phone" | "motorcycle" | "car" | "house";

function parseWan(value: string) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return 10;
  return Math.min(500, Math.max(1, n));
}

/** 示意用：依條件粗估年利率（%），實際以專員核定為準 */
function estimateAnnualRatePercent(labor: Labor, collateral: Collateral) {
  let rate = 22;
  if (labor === "yes") rate -= 4;
  switch (collateral) {
    case "house":
      rate -= 6;
      break;
    case "car":
      rate -= 4;
      break;
    case "motorcycle":
      rate -= 2;
      break;
    case "phone":
      rate += 2;
      break;
    default:
      rate += 6;
      break;
  }
  return Math.min(36, Math.max(8, rate));
}

function monthlyPayment(principal: number, annualPercent: number, months: number) {
  const r = annualPercent / 100 / 12;
  if (months <= 0) return 0;
  if (r <= 0) return principal / months;
  const pow = (1 + r) ** months;
  return (principal * r * pow) / (pow - 1);
}

const currency = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 0,
});

type TrialSnapshot = {
  wan: number;
  labor: Labor;
  collateral: Collateral;
};

const MONTHS = 24;

export default function SmallLoanMinuteCalculator() {
  const [amountWan, setAmountWan] = useState("20");
  const [labor, setLabor] = useState<Labor>("yes");
  const [collateral, setCollateral] = useState<Collateral>("none");
  const [snapshot, setSnapshot] = useState<TrialSnapshot | null>(null);

  const showResult = snapshot !== null;

  const principalForResult = snapshot ? snapshot.wan * 10000 : 0;
  const annualForResult = snapshot
    ? estimateAnnualRatePercent(snapshot.labor, snapshot.collateral)
    : 0;
  const paymentForResult = useMemo(
    () => monthlyPayment(principalForResult, annualForResult, MONTHS),
    [principalForResult, annualForResult],
  );

  return (
    <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 md:p-5">
      {!showResult ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block space-y-1">
              <span className="text-xs font-semibold text-neutral-700">資金需求（萬元）</span>
              <input
                type="number"
                min={1}
                max={500}
                step={1}
                value={amountWan}
                onChange={(e) => setAmountWan(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-deep outline-none ring-primary/20 focus:border-primary focus:ring"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-semibold text-neutral-700">是否有勞保、薪轉</span>
              <select
                value={labor}
                onChange={(e) => setLabor(e.target.value as Labor)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-deep outline-none ring-primary/20 focus:border-primary focus:ring"
              >
                <option value="yes">是</option>
                <option value="no">否</option>
              </select>
            </label>
            <label className="block space-y-1 sm:col-span-2">
              <span className="text-xs font-semibold text-neutral-700">是否有抵押／擔保品</span>
              <select
                value={collateral}
                onChange={(e) => setCollateral(e.target.value as Collateral)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-deep outline-none ring-primary/20 focus:border-primary focus:ring"
              >
                <option value="none">無</option>
                <option value="phone">手機</option>
                <option value="motorcycle">機車</option>
                <option value="car">汽車</option>
                <option value="house">房子</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={() =>
              setSnapshot({
                wan: parseWan(amountWan),
                labor,
                collateral,
              })
            }
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            試算月還款金額
          </button>
        </>
      ) : (
        <>
          <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-4">
            <div>
              <p className="text-xs text-neutral-500">試算條件（示意）</p>
              <p className="mt-1 text-sm text-neutral-700">
                資金需求 {snapshot.wan} 萬元、勞保／薪轉{snapshot.labor === "yes" ? "有" : "無"}
                、擔保品
                {snapshot.collateral === "none"
                  ? "無"
                  : snapshot.collateral === "phone"
                    ? "手機"
                    : snapshot.collateral === "motorcycle"
                      ? "機車"
                      : snapshot.collateral === "car"
                        ? "汽車"
                        : "房子"}
                ；假設期數 {MONTHS} 個月、粗估年利率約 {annualForResult.toFixed(1)}
                %，實際額度、利率與期數以專員核定為準。
              </p>
              <p className="mt-3 text-lg font-bold text-deep">
                月還款約 <span className="text-primary">{currency.format(paymentForResult)}</span>
              </p>
            </div>

            <LineQrContactPanel />
          </div>

          <button
            type="button"
            onClick={() => setSnapshot(null)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-deep transition hover:bg-neutral-50"
          >
            返回重新填寫
          </button>
        </>
      )}
    </div>
  );
}
