/**
 * Google Apps Script - 部署為 Web App（執行身份：我，誰可存取：所有人）
 * Sheet 名稱：NEWS，欄位：id | title | slug | excerpt | content | cover | date | seoTitle | seoDesc
 * cover 支援：完整 URL、Drive 檔名（如 1.png）、Drive 檔案 ID、Drive 分享連結
 *
 * 聯絡表單（POST JSON）：Next.js /api/contact 轉發至此網址
 * Script 屬性：CONTACT_SECRET（與 .env CONTACT_GAS_SECRET 一致）
 * 試算表 CONTACT：第一列為欄位 key（timestamp, name, phone, email, requirements），寫入時依欄名對應，欄序可調整
 * 通知信：寄至 Web App 執行身分（您本人）信箱，寄件者為您的 Google 帳號
 *
 * 若錯誤提示沒有 MailApp.sendEmail 權限：在編輯器執行一次 authorizeMailAppOnce() 完成 OAuth（檔案底部）。
 */
const SHEET_NAME = "NEWS";
const CONTACT_SHEET_NAME = "CONTACT";
const DRIVE_COVERS_FOLDER_ID = "1VtuTtomdrT10AqZ5Ii6baeADVzWnbr7w";

function doGet(e) {
  const action = e.parameter.action || "list";

  if (action === "list") {
    return jsonOutput(getAllNews());
  }

  if (action === "detail" && e.parameter.slug) {
    return jsonOutput(getNewsBySlug(e.parameter.slug));
  }

  return jsonOutput({ error: "Invalid request" });
}

function doPost(e) {
  if (!e.postData || !e.postData.contents) {
    return jsonOutput({ ok: false, error: "Empty body" });
  }
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOutput({ ok: false, error: "Invalid JSON" });
  }

  const props = PropertiesService.getScriptProperties();
  const expected = String(
    props.getProperty("CONTACT_SECRET") ||
      props.getProperty("CONTACT_GAS_SECRET") ||
      "",
  ).trim();
  const got = String(payload.secret ?? "").trim();
  if (!expected || got !== expected) {
    return jsonOutput({ ok: false, error: "Unauthorized" });
  }

  let fields;
  if (payload.fields && typeof payload.fields === "object") {
    fields = payload.fields;
  } else {
    fields = Object.assign({}, payload);
    delete fields.secret;
  }

  const record = {
    name: String(fields.name || "").trim(),
    phone: String(fields.phone || "").trim(),
    email: String(fields.email || "").trim(),
    requirements: String(fields.requirements || "").trim(),
  };

  if (!record.name || !record.phone || !record.email || !record.requirements) {
    return jsonOutput({ ok: false, error: "Missing fields" });
  }

  try {
    appendContactRowByKeys(record);
    sendContactNotifyEmail(record);
    return jsonOutput({ ok: true });
  } catch (err) {
    return jsonOutput({
      ok: false,
      error: String(err.message || err),
    });
  }
}

/** 預設欄位 key；若試算表已有表頭會沿用，僅補上缺少的欄 */
const CONTACT_DEFAULT_KEYS = [
  "timestamp",
  "name",
  "phone",
  "email",
  "requirements",
];

function appendContactRowByKeys(record) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONTACT_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(CONTACT_SHEET_NAME);

  const headers = ensureContactHeaderKeys(sheet);
  const rowObj = Object.assign({ timestamp: new Date() }, record);
  const row = headers.map(function (key) {
    const v = rowObj[key];
    if (v instanceof Date) return v;
    return v != null && v !== "" ? String(v) : "";
  });
  sheet.appendRow(row);
}

function ensureContactHeaderKeys(sheet) {
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) {
    sheet.appendRow(CONTACT_DEFAULT_KEYS);
    return CONTACT_DEFAULT_KEYS.slice();
  }
  const raw = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  let headers = raw.map(function (h) {
    return String(h || "").trim();
  });
  while (headers.length && headers[headers.length - 1] === "") headers.pop();
  if (!headers.length) {
    sheet
      .getRange(1, 1, 1, CONTACT_DEFAULT_KEYS.length)
      .setValues([CONTACT_DEFAULT_KEYS]);
    return CONTACT_DEFAULT_KEYS.slice();
  }
  const missing = CONTACT_DEFAULT_KEYS.filter(function (k) {
    return headers.indexOf(k) === -1;
  });
  if (missing.length) {
    const start = headers.length + 1;
    sheet
      .getRange(1, start, 1, start + missing.length - 1)
      .setValues([missing]);
    headers = headers.concat(missing);
  }
  return headers;
}

function contactNotifyRecipientEmail() {
  const a = Session.getEffectiveUser().getEmail();
  if (a) return a;
  return Session.getActiveUser().getEmail();
}

function escapeHtml_(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sendContactNotifyEmail(record) {
  const to = contactNotifyRecipientEmail();
  if (!to) {
    throw new Error(
      "無法取得您的信箱，請確認 Web App「執行身分」為您本人且已登入授權",
    );
  }

  const submittedAt = Utilities.formatDate(
    new Date(),
    "Asia/Taipei",
    "yyyy-MM-dd HH:mm",
  );
  const subject = "【官網諮詢】" + record.name + "｜聯絡表單通知";

  const textBody =
    "您好：\n\n" +
    "官網聯絡表單收到一筆新的諮詢，摘要如下。\n\n" +
    "━━━━━━━━━━━━━━━━━━━━\n" +
    "提交時間　" +
    submittedAt +
    "（台北時間）\n" +
    "聯絡姓名　" +
    record.name +
    "\n" +
    "聯絡電話　" +
    record.phone +
    "\n" +
    "電子郵件　" +
    record.email +
    "\n\n" +
    "諮詢內容\n" +
    record.requirements +
    "\n" +
    "━━━━━━━━━━━━━━━━━━━━\n\n" +
    "請使用郵件「回覆」功能直接聯繫對方，回覆將寄至對方所留信箱。\n\n" +
    "──\n" +
    "本信由網站表單系統自動發送，請勿直接轉寄內含個資之內容至公開管道。\n";

  const h = escapeHtml_;
  const htmlTableRow = function (label, valueHtml) {
    return (
      "<tr>" +
      '<td style="padding:12px 14px;background:#f4f4f5;color:#3f3f46;font-size:13px;font-weight:600;width:120px;vertical-align:top;border-bottom:1px solid #e4e4e7;text-align:left;">' +
      h(label) +
      "</td>" +
      '<td style="padding:12px 14px;color:#18181b;font-size:14px;vertical-align:top;border-bottom:1px solid #e4e4e7;text-align:left;">' +
      valueHtml +
      "</td>" +
      "</tr>"
    );
  };

  const htmlBody =
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;text-align:left;">' +
    "<tr><td align=\"left\" style=\"text-align:left;\">" +
    "<div style=\"font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;color:#18181b;line-height:1.65;max-width:600px;margin:0;text-align:left;\">" +
    '<p style="margin:0 0 8px;font-size:15px;font-weight:600;text-align:left;">聯絡表單通知</p>' +
    '<p style="margin:0 0 20px;color:#52525b;font-size:14px;text-align:left;">官網收到一筆新的諮詢，以下為提交資料。</p>' +
    '<table role="presentation" align="left" width="100%" style="width:100%;max-width:600px;border-collapse:collapse;border:1px solid #e4e4e7;border-radius:8px;overflow:hidden;margin:0 0 24px;text-align:left;">' +
    htmlTableRow("提交時間", h(submittedAt) + "（台北時間）") +
    htmlTableRow("聯絡姓名", h(record.name)) +
    htmlTableRow("聯絡電話", h(record.phone)) +
    htmlTableRow("電子郵件", h(record.email)) +
    htmlTableRow(
      "諮詢內容",
      '<div style="white-space:pre-wrap;word-break:break-word;">' +
        h(record.requirements).replace(/\r\n|\n|\r/g, "<br>") +
        "</div>",
    ) +
    "</table>" +
    '<p style="margin:0;font-size:12px;color:#71717a;line-height:1.5;text-align:left;">請使用「回覆」與填表人聯繫。本信由系統自動發送。</p>' +
    "</div>" +
    "</td></tr></table>";

  MailApp.sendEmail({
    to: to,
    replyTo: record.email,
    subject: subject,
    body: textBody,
    htmlBody: htmlBody,
  });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME);
}

function getAllNews() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();

  return rows
    .filter((row) => row[1]) // 有 title 才算有效資料
    .map((row) => mapRow(headers, row));
}

function getNewsBySlug(slug) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();

  const found = rows.find((row) => row[2] === slug);
  if (!found) return null;

  return mapRow(headers, found);
}

function mapRow(headers, row) {
  const obj = {};
  headers.forEach((key, i) => {
    obj[key] = formatValue(key, row[i]);
  });
  return obj;
}

function formatValue(key, value) {
  if (key === "date" && value instanceof Date) {
    return Utilities.formatDate(value, "Asia/Taipei", "yyyy-MM-dd");
  }
  if (key === "cover" && value) {
    return resolveCoverUrl(String(value));
  }
  return value;
}

/**
 * 將 cover 欄位轉為可嵌入的圖片 URL
 * Drive 直接連結自 2024 年起會 403，改為透過 GAS 圖片代理
 * - 已是 http(s) 開頭：原樣回傳
 * - Drive 分享連結 / 檔案 ID / 檔名：轉為 GAS 代理 URL
 */
function resolveCoverUrl(cover) {
  if (!cover || typeof cover !== "string") return "";
  const val = cover.trim();
  if (!val) return "";

  // 已是完整 URL（非 Drive）
  if (/^https?:\/\//i.test(val) && !val.includes("drive.google.com"))
    return val;

  let fileId = null;

  // Drive 分享連結：/file/d/FILE_ID/view
  const fileIdMatch =
    val.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    val.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    val.match(/^([a-zA-Z0-9_-]{33,44})$/);
  if (fileIdMatch) {
    fileId = fileIdMatch[1];
  }

  // 檔名：從 Drive 資料夾查詢
  if (!fileId && /^[^/\\]+\.(png|jpg|jpeg|gif|webp)$/i.test(val)) {
    try {
      const folder = DriveApp.getFolderById(DRIVE_COVERS_FOLDER_ID);
      const files = folder.getFilesByName(val);
      if (files.hasNext()) fileId = files.next().getId();
    } catch (err) {}
  }

  if (fileId) {
    // Drive 直接連結自 2024 年起會 403，改由 Next.js API 代理
    return "/api/image?id=" + encodeURIComponent(fileId);
  }

  return val;
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/**
 * 在 Apps Script「編輯器」選此函式 → 按執行，會跳出 OAuth，勾選寄信權限並允許。
 * Web App 是以「你的帳號」執行時，必須先讓專案通過這次授權，MailApp 才會在線上生效。
 * 測試信會寄到您目前執行身分／登入帳號的信箱。
 */
function authorizeMailAppOnce() {
  const to = contactNotifyRecipientEmail();
  if (!to) {
    throw new Error("無法取得您的信箱，請確認已用 Google 帳號登入編輯器");
  }
  MailApp.sendEmail(
    to,
    "[GAS] MailApp 授權測試",
    "若收到此信，表示已具備寄信權限，Web App 聯絡表單可正常寄信。",
  );
}
