import {
  HiOutlineHome,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import type { ServiceDefinition } from "./types";
import HouseSecondMortgagePageContent from "./pages/HouseSecondMortgagePageContent";
import VehicleLoanPageContent from "./pages/VehicleLoanPageContent";
import ScrivenerCreditLoanPageContent from "./pages/ScrivenerCreditLoanPageContent";
import SmallLoanPageContent from "./pages/SmallLoanPageContent";

export const houseSecondMortgageService: ServiceDefinition = {
  slug: "house-second-mortgage",
  title: "房屋二胎",
  description: "整合多元管道，依需求彈性規劃最適合您的房屋二胎方案。",
  icon: HiOutlineHome,
  PageContent: HouseSecondMortgagePageContent,
};

export const vehicleLoanService: ServiceDefinition = {
  slug: "vehicle-loan",
  title: "汽機車借款",
  description: "汽車與機車皆可評估，提供即時且彈性的借款服務。",
  icon: HiOutlineTruck,
  PageContent: VehicleLoanPageContent,
};

export const scrivenerCreditLoanService: ServiceDefinition = {
  slug: "scrivener-credit-loan",
  title: "代書信貸",
  description: "快速便捷的資金周轉，代書信貸方案。",
  icon: HiOutlineUser,
  PageContent: ScrivenerCreditLoanPageContent,
};

export const smallLoanService: ServiceDefinition = {
  slug: "small-loan",
  title: "小額借款",
  description: "小額資金需求快速申辦，協助解決短期週轉壓力。",
  icon: HiOutlineCurrencyDollar,
  PageContent: SmallLoanPageContent,
};

export const serviceDefinitions: readonly ServiceDefinition[] = [
  houseSecondMortgageService,
  vehicleLoanService,
  scrivenerCreditLoanService,
  smallLoanService,
];
