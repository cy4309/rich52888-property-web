/** 全站跑馬燈用假資料（地名 + 百家姓常見單姓，隨機組合） */

export const DEAL_MARQUEE_CITIES = [
  "台北",
  "新北",
  "桃園",
  "台中",
  "台南",
  "高雄",
  "新竹",
  "嘉義",
  "基隆",
  "宜蘭",
  "花蓮",
  "台東",
  "苗栗",
  "彰化",
  "南投",
  "雲林",
  "屏東",
  // "澎湖",
  // "金門",
] as const;

export const DEAL_MARQUEE_HONORIFICS = ["先生", "小姐"] as const;

/** 台灣常見姓氏一覽（單字姓，不含複姓） */
export const DEAL_MARQUEE_SURNAMES = [
  "陳",
  "林",
  "黃",
  "張",
  "李",
  "王",
  "吳",
  "劉",
  "蔡",
  "楊",
  "許",
  "鄭",
  "謝",
  "郭",
  "洪",
  "曾",
  "邱",
  "廖",
  "徐",
  "周",
  "葉",
  "蘇",
  "莊",
  "呂",
  "江",
  "何",
  "蕭",
  "羅",
  "高",
  "潘",
  "簡",
  "朱",
  "鍾",
  "游",
  "彭",
  "詹",
  "胡",
  "施",
  "沈",
  "余",
  "盧",
  "梁",
  "趙",
  "顏",
  "柯",
  "翁",
  "魏",
  "孫",
  "戴",
  "方",
  "宋",
  "鄧",
  "杜",
  "侯",
  "曹",
  "薛",
  "傅",
  "丁",
  "溫",
  "馬",
  "董",
  "石",
  "卓",
  "姚",
  "紀",
  "童",
  "歐",
  "程",
  "田",
  "康",
  "白",
  "崔",
  "賴",
  "龔",
] as const;

function pick<T extends readonly unknown[]>(arr: T): T[number] {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

/** 隨機一則（可能與其它則重複） */
export function buildRandomDealAnnouncement(): string {
  const city = pick(DEAL_MARQUEE_CITIES);
  const surname = pick(DEAL_MARQUEE_SURNAMES);
  const honor = pick(DEAL_MARQUEE_HONORIFICS);
  return `賀! ${city}${surname}${honor}申貸成功!`;
}

const MIN_MARQUEE_LINES = 5;

/**
 * 產生多則**不重複**的喜訊（預設 6 則；`count` 可傳 5，仍至少 5 組）。
 */
export function buildUniqueDealAnnouncements(count: number = 6): string[] {
  const n = Math.max(MIN_MARQUEE_LINES, count);
  const seen = new Set<string>();
  let attempts = 0;
  const maxAttempts = n * 80;

  while (seen.size < n && attempts < maxAttempts) {
    attempts += 1;
    seen.add(buildRandomDealAnnouncement());
  }

  while (seen.size < n) {
    seen.add(`${buildRandomDealAnnouncement()} ·${seen.size}`);
  }

  return Array.from(seen);
}
