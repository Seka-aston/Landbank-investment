import type { PortfolioInvestment } from "@/lib/mock-data";

export type WithdrawScreen =
    | "amount"
    | "account"
    | "review"
    | "processing"
    | "success"
    | "failed"
    | "unavailable";

export interface WithdrawData {
    amount: number;
    payoutAccountId: string;
}

export interface WithdrawFlowProps {
    inv: PortfolioInvestment;
    available: number;
    data: WithdrawData;
    updateData: (updates: Partial<WithdrawData>) => void;
    goTo: (screen: WithdrawScreen) => void;
}

/** Smallest amount a mobile money / bank transfer can carry. */
export const MIN_WITHDRAWAL = 500;

/** Profit withdrawals are free in this prototype — see open questions. */
export const WITHDRAWAL_FEE = 0;
