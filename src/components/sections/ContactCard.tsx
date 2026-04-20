"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { CONTACT_REQUIREMENTS_MAX_CHARS } from "@/lib/contact-limits";
import { trackEvent } from "@/lib/ga";

export default function ContactCard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [demand, setDemand] = useState("");
  const [requirements, setRequirements] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [validationError, setValidationError] = useState("");
  const fieldClassName =
    "w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-inter text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-slate-400 transition-colors";
  const sanitizePhoneInput = (value: string) => value.replace(/\D/g, "");
  const sanitizeEmailInput = (value: string) =>
    value.replace(/[^A-Za-z0-9@._-]/g, "");

  const isValidPhone = (value: string) => {
    const v = value.trim();
    if (!v || v.length > 32) return false;
    return /^\d{8,32}$/.test(v);
  };

  const isValidEmail = (value: string) =>
    /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedDemand = demand.trim();
    const trimmedRequirements = requirements.trim();

    if (!trimmedName || !trimmedPhone) {
      setValidationError("請填寫完整表單");
      trackEvent("form_submit_error", {
        form_name: "contact_form",
        error_type: "validation",
      });
      return;
    }

    if (!isValidPhone(trimmedPhone)) {
      setValidationError("電話僅能輸入數字（8 到 32 碼），不可包含特殊符號");
      trackEvent("form_submit_error", {
        form_name: "contact_form",
        error_type: "validation",
      });
      return;
    }

    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      setValidationError("電子郵件格式錯誤，且不可包含特殊符號");
      trackEvent("form_submit_error", {
        form_name: "contact_form",
        error_type: "validation",
      });
      return;
    }

    if (trimmedRequirements.length > CONTACT_REQUIREMENTS_MAX_CHARS) {
      setValidationError(`備註最多 ${CONTACT_REQUIREMENTS_MAX_CHARS} 字`);
      trackEvent("form_submit_error", {
        form_name: "contact_form",
        error_type: "validation",
      });
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            name: trimmedName,
            phone: trimmedPhone,
            email: trimmedEmail,
            demand: trimmedDemand,
            requirements: trimmedRequirements,
          },
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? "提交失敗");
      }
      trackEvent("generate_lead", {
        lead_type: "contact_form",
        source: "contact_section",
        demand_type: trimmedDemand || "unspecified",
      });
      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setDemand("");
      setRequirements("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (caught) {
      const message =
        caught instanceof Error && caught.message ? caught.message : "提交失敗";
      trackEvent("form_submit_error", {
        form_name: "contact_form",
        error_type: "api",
      });
      setValidationError(message);
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setValidationError("");
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      // className="relative w-full bg-background border-t border-white/10 z-20 py-16 px-6 md:px-12"
      className="py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          title="立即諮詢"
          subtitle="歡迎直接填寫表單與我們聯繫，或點擊右下角浮動按鈕直接撥打電話、加LINE洽詢"
        />
        {/* Requirements form */}
        <form
          onSubmit={handleSubmit}
          className="my-16 max-w-xl w-full md:max-w-3xl md:mx-auto"
          suppressHydrationWarning
        >
          {/* <h3 className="font-mono text-xs tracking-widest uppercase opacity-50 mb-6">
            立即諮詢
          </h3> */}
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-mono uppercase tracking-widest opacity-60 mb-2"
              >
                姓名
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                suppressHydrationWarning
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                htmlFor="contact-phone"
                className="block text-xs font-mono uppercase tracking-widest opacity-60 mb-2"
              >
                電話
              </label>
              <input
                id="contact-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
                required
                suppressHydrationWarning
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs font-mono uppercase tracking-widest opacity-60 mb-2"
              >
                電子郵件（選填）
              </label>
              <input
                id="contact-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(sanitizeEmailInput(e.target.value))}
                suppressHydrationWarning
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                htmlFor="contact-demand"
                className="block text-xs font-mono uppercase tracking-widest opacity-60 mb-2"
              >
                需求（選填）
              </label>
              <div className="relative">
                <select
                  id="contact-demand"
                  value={demand}
                  onChange={(e) => setDemand(e.target.value)}
                  suppressHydrationWarning
                  className={`${fieldClassName} appearance-none pr-10`}
                >
                  <option value="">請選擇需求</option>
                  <option value="房屋二胎">房屋二胎</option>
                  <option value="汽機車借款">汽機車借款</option>
                  <option value="代書借款">代書借款</option>
                  <option value="小額借款">小額借款</option>
                </select>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <label
                  htmlFor="contact-requirements"
                  className="block text-xs font-mono uppercase tracking-widest opacity-60"
                >
                  備註（選填）
                </label>
                <span
                  className="text-xs tabular-nums opacity-50"
                  aria-live="polite"
                >
                  {requirements.length}/{CONTACT_REQUIREMENTS_MAX_CHARS}
                </span>
              </div>
              <textarea
                id="contact-requirements"
                value={requirements}
                onChange={(e) =>
                  setRequirements(
                    e.target.value.slice(0, CONTACT_REQUIREMENTS_MAX_CHARS),
                  )
                }
                maxLength={CONTACT_REQUIREMENTS_MAX_CHARS}
                rows={4}
                suppressHydrationWarning
                className={`${fieldClassName} resize-none`}
              />
            </div>
            <Button
              type="submit"
              disabled={status === "loading"}
              aria-label="提交"
              className="self-end px-6 py-3 disabled:opacity-50"
            >
              {status === "loading" ? "..." : "提交"}
            </Button>
            {status === "success" && (
              <p className="text-sm text-primary/80">提交成功</p>
            )}
            {(validationError || status === "error") && (
              <p className="text-sm text-primary/80">
                {validationError || "提交失敗"}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
