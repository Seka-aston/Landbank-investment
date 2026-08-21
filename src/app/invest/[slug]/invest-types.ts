import type { InvestmentOpportunity } from "@/lib/mock-data";

export type FlowScreen =
    | "amount"
    | "review"
    | "confirm"
    | "payment-method"
    | "mm-input"
    | "mm-waiting"
    | "mm-success"
    | "mm-failed"
    | "card-input"
    | "card-processing"
    | "card-success"
    | "card-failed"
    | "bt-instructions"
    | "bt-upload"
    | "bt-waiting"
    | "bt-approved"
    | "bt-rejected"
    | "payment-success"
    | "contract-ready"
    | "contract-review"
    | "contract-sign"
    | "activated";

export type PaymentMethod = "mtn" | "airtel" | "card" | "bank-transfer";

export interface InvestmentData {
    amount: number;
    shares: number;
    term: number;
    phoneNumber: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    cardName: string;
    proofUploaded: boolean;
    riskAccepted: boolean;
    termsAccepted: boolean;
    lossAccepted: boolean;
}

export interface FlowProps {
    opp: InvestmentOpportunity;
    data: InvestmentData;
    updateData: (updates: Partial<InvestmentData>) => void;
    goTo: (screen: FlowScreen) => void;
    paymentMethod: PaymentMethod | null;
}
