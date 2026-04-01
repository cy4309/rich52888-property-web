"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { CONTACT_REQUIREMENTS_MAX_CHARS } from "@/lib/contact-limits";

export default function ContactCard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requirements, setRequirements] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [validationError, setValidationError] = useState("");

  const isValidPhone = (value: string) => {
    const v = value.trim();
    if (!v || v.length > 32) return false;
    return v.replace(/\D/g, "").length >= 8;
  };

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedRequirements = requirements.trim();

    if (
      !trimmedName ||
      !trimmedPhone ||
      !trimmedEmail ||
      !trimmedRequirements
    ) {
      setValidationError("請填寫完整表單");
      return;
    }

    if (!isValidPhone(trimmedPhone)) {
      setValidationError("請填寫有效的電話號碼（至少 8 碼數字）");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setValidationError("請填寫有效的電子郵件地址");
      return;
    }

    if (trimmedRequirements.length > CONTACT_REQUIREMENTS_MAX_CHARS) {
      setValidationError(`需求最多 ${CONTACT_REQUIREMENTS_MAX_CHARS} 字`);
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
      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setRequirements("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (caught) {
      const message =
        caught instanceof Error && caught.message ? caught.message : "提交失敗";
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
        <SectionTitle title="立即諮詢" subtitle="歡迎與我們聯繫" />
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
                className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm font-inter focus:outline-none focus:border-white/40 transition-colors"
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
                onChange={(e) => setPhone(e.target.value)}
                required
                suppressHydrationWarning
                className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm font-inter focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs font-mono uppercase tracking-widest opacity-60 mb-2"
              >
                電子郵件
              </label>
              <input
                id="contact-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                suppressHydrationWarning
                className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm font-inter focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <label
                  htmlFor="contact-requirements"
                  className="block text-xs font-mono uppercase tracking-widest opacity-60"
                >
                  需求
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
                required
                maxLength={CONTACT_REQUIREMENTS_MAX_CHARS}
                rows={4}
                suppressHydrationWarning
                className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm font-inter focus:outline-none focus:border-white/40 transition-colors resize-none"
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
