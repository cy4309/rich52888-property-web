import type { ComponentType } from "react";

export type ServiceIcon = ComponentType<{ className?: string }>;

export type ServicePageContent = ComponentType;

export type ServiceDefinition = {
  slug: string;
  title: string;
  /** 首頁卡片摘要與 SEO description */
  description: string;
  icon: ServiceIcon;
  PageContent: ServicePageContent;
};
