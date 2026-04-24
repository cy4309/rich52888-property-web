import { NextRequest, NextResponse } from "next/server";
import { CONTACT_REQUIREMENTS_MAX_CHARS } from "@/lib/contact-limits";
import { appConfig } from "@/lib/app-config";

const MAX_REQUIREMENTS_LEN = CONTACT_REQUIREMENTS_MAX_CHARS;
const MAX_PHONE_LEN = 32;

function isValidPhoneInput(value: string): boolean {
  if (!value || value.length > MAX_PHONE_LEN) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= 8;
}

function gasWebAppUrl(): string | undefined {
  return appConfig.sheetApi;
}

export async function POST(request: NextRequest) {
  const url = gasWebAppUrl()?.trim();
  const secret = process.env.CONTACT_GAS_SECRET?.trim();

  if (!url || !secret) {
    return NextResponse.json(
      { error: "聯絡表單尚未完成伺服器設定（缺少 GAS 網址或密鑰）" },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const fieldsRaw = record.fields;
  const fields =
    fieldsRaw && typeof fieldsRaw === "object" && !Array.isArray(fieldsRaw)
      ? (fieldsRaw as Record<string, unknown>)
      : record;

  const trimmedName = typeof fields.name === "string" ? fields.name.trim() : "";
  const trimmedPhone =
    typeof fields.phone === "string"
      ? fields.phone.trim().slice(0, MAX_PHONE_LEN)
      : "";
  const trimmedEmail =
    typeof fields.email === "string" ? fields.email.trim() : "";
  const trimmedDemand =
    typeof fields.demand === "string" ? fields.demand.trim() : "";
  const trimmedReq =
    typeof fields.requirements === "string"
      ? fields.requirements.trim()
      : "";

  if (!trimmedName || !trimmedPhone) {
    return NextResponse.json({ error: "請填寫完整表單" }, { status: 400 });
  }

  if (trimmedReq.length > MAX_REQUIREMENTS_LEN) {
    return NextResponse.json(
      { error: `備註最多 ${MAX_REQUIREMENTS_LEN} 字` },
      { status: 400 },
    );
  }

  if (!isValidPhoneInput(trimmedPhone)) {
    return NextResponse.json(
      { error: "請填寫有效的電話號碼（至少 8 碼數字）" },
      { status: 400 },
    );
  }

  if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return NextResponse.json(
      { error: "請填寫有效的電子郵件地址" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        secret,
        fields: {
          name: trimmedName,
          phone: trimmedPhone,
          email: trimmedEmail,
          demand: trimmedDemand,
          requirements: trimmedReq,
        },
      }),
    });

    const text = await res.text();
    let data: { ok?: boolean; error?: string } = {};
    try {
      data = JSON.parse(text) as typeof data;
    } catch {
      return NextResponse.json({ error: "伺服器回應異常" }, { status: 502 });
    }

    if (data.ok !== true) {
      const msg =
        data.error === "Unauthorized"
          ? "密鑰驗證失敗：請確認 GAS「指令碼屬性」已設定 CONTACT_SECRET（或 CONTACT_GAS_SECRET），且與 .env 的 CONTACT_GAS_SECRET 完全相同，並已重新部署 Web App"
          : data.error || "提交失敗";
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "提交失敗" }, { status: 502 });
  }
}
