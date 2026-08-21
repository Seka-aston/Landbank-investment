import type { PortfolioInvestment } from "@/lib/mock-data";

export type MaturityScreen =
    | "maturity-reached"
    | "choose-action"
    | "payout-account"
    | "payout-review"
    | "payout-requested"
    | "payout-processing"
    | "payout-success"
    | "payout-failed"
    | "reinvest-choose"
    | "reinvest-review"
    | "reinvest-confirmed"
    | "split-payout-account"
    | "split-choose-opportunity"
    | "split-review"
    | "split-confirmed";

export type MaturityAction = "payout" | "reinvest" | "split";

export interface MaturityData {
    action: MaturityAction | null;
    payoutAccountId: string;
    reinvestOpportunitySlug: string;
}

export interface MaturityFlowProps {
    inv: PortfolioInvestment;
    data: MaturityData;
    updateData: (updates: Partial<MaturityData>) => void;
    goTo: (screen: MaturityScreen) => void;
}
