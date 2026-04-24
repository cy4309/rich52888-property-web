type AppStage = "dev" | "prod";

function resolveStage(raw: string | undefined): AppStage {
  return raw?.trim().toLowerCase() === "prod" ? "prod" : "dev";
}

function pickByStage(
  stage: AppStage,
  values: {
    dev?: string;
    prod?: string;
  },
): string | undefined {
  const v = stage === "prod" ? values.prod ?? values.dev : values.dev ?? values.prod;
  return v?.trim() || undefined;
}

export const appStage: AppStage = resolveStage(process.env.APP_STAGE);

export const appConfig = {
  stage: appStage,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || undefined,
  sheetApi: pickByStage(appStage, {
    dev: process.env.NEXT_PUBLIC_SHEET_API_DEV,
    prod: process.env.NEXT_PUBLIC_SHEET_API_PROD,
  }),
  gaId: pickByStage(appStage, {
    dev: process.env.NEXT_PUBLIC_GA_ID_DEV,
    prod: process.env.NEXT_PUBLIC_GA_ID_PROD,
  }),
};
