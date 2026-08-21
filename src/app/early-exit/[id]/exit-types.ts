import type { PortfolioInvestment } from "@/lib/mock-data";

export type EarlyExitScreen =
    | "info"
    | "reason"
    | "documents"
    | "review"
    | "submitted"
    | "rejected"
    | "offer"
    | "declined"
    | "payout-account"
    | "confirm-exit"
    | "payout-processing"
    | "payout-success"
    | "payout-failed";

export interface EarlyExitData {
    reason: string;
    documentsUploaded: boolean;
    payoutAccountId: string;
}

export interface EarlyExitFlowProps {
    inv: PortfolioInvestment;
    data: EarlyExitData;
    updateData: (updates: Partial<EarlyExitData>) => void;
    goTo: (screen: EarlyExitScreen) => void;
}

export function getExitOffer(inv: PortfolioInvestment) {
    const forfeitedProfit = Math.round(inv.accruedProfit * 0.5);
    const retainedProfit = inv.accruedProfit - forfeitedProfit;
    const charges = Math.round(inv.principal * 0.025);
    const estimatedPayout = inv.principal + retainedProfit - charges;
    return { forfeitedProfit, retainedProfit, charges, estimatedPayout };
}
