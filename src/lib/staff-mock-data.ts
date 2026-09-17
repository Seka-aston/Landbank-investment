export type KycStatus = "pending" | "approved" | "rejected" | "resubmission";
export type TransferStatus = "pending" | "approved" | "rejected";
export type PayoutStatus = "pending" | "approved" | "processing" | "rejected";
export type ExitStatus = "pending" | "approved" | "rejected";

export interface KycSubmission {
    id: string;
    applicantName: string;
    email: string;
    phone: string;
    nationalId: string;
    nationality: string;
    dateOfBirth: string;
    submittedAt: string;
    status: KycStatus;
    documentType: string;
    documentNumber: string;
    hasProofOfAddress: boolean;
    isPEP: boolean;
    rejectionReason?: string;
    rejectedFields?: string[];
}

export interface BankTransfer {
    id: string;
    investorName: string;
    investorEmail: string;
    opportunityName: string;
    amount: number;
    reference: string;
    bankName: string;
    accountNumber: string;
    uploadedAt: string;
    status: TransferStatus;
    proofFileName: string;
    proofFileSize: string;
    rejectionReason?: string;
}

export interface PayoutRequest {
    id: string;
    investorName: string;
    investorEmail: string;
    investmentName: string;
    principal: number;
    accruedProfit: number;
    tax: number;
    finalAmount: number;
    payoutAccountType: string;
    payoutAccountProvider: string;
    payoutAccountNumber: string;
    requestedAt: string;
    status: PayoutStatus;
    type: "maturity" | "early-exit";
    rejectionReason?: string;
}

export interface EarlyExitRequest {
    id: string;
    investorName: string;
    investorEmail: string;
    investmentName: string;
    principal: number;
    accruedProfit: number;
    forfeitedProfit: number;
    exitCharge: number;
    estimatedPayout: number;
    reason: string;
    hasDocuments: boolean;
    requestedAt: string;
    status: ExitStatus;
    elapsedMonths: number;
    totalTermMonths: number;
    rejectionReason?: string;
}

export const kycSubmissions: KycSubmission[] = [
    {
        id: "kyc-001",
        applicantName: "Marie Uwimana",
        email: "marie.uwimana@gmail.com",
        phone: "+250 788 456 789",
        nationalId: "1199880012345678",
        nationality: "Rwandan",
        dateOfBirth: "1988-03-14",
        submittedAt: "2026-09-15T10:30:00Z",
        status: "pending",
        documentType: "National ID",
        documentNumber: "1199880012345678",
        hasProofOfAddress: true,
        isPEP: false,
    },
    {
        id: "kyc-002",
        applicantName: "Patrick Habimana",
        email: "p.habimana@yahoo.com",
        phone: "+250 738 234 567",
        nationalId: "1199270098765432",
        nationality: "Rwandan",
        dateOfBirth: "1992-07-22",
        submittedAt: "2026-09-15T08:15:00Z",
        status: "pending",
        documentType: "Passport",
        documentNumber: "RP0045678",
        hasProofOfAddress: false,
        isPEP: false,
    },
    {
        id: "kyc-003",
        applicantName: "Ange Mutoni",
        email: "ange.mutoni@outlook.com",
        phone: "+250 788 112 334",
        nationalId: "1199550034567890",
        nationality: "Rwandan",
        dateOfBirth: "1995-11-08",
        submittedAt: "2026-09-14T16:45:00Z",
        status: "pending",
        documentType: "National ID",
        documentNumber: "1199550034567890",
        hasProofOfAddress: true,
        isPEP: false,
    },
    {
        id: "kyc-004",
        applicantName: "Emmanuel Nsengiyumva",
        email: "e.nsengiyumva@gmail.com",
        phone: "+250 788 678 901",
        nationalId: "1198560045678901",
        nationality: "Rwandan",
        dateOfBirth: "1985-06-30",
        submittedAt: "2026-09-14T11:20:00Z",
        status: "pending",
        documentType: "Driving License",
        documentNumber: "DL-2024-04567",
        hasProofOfAddress: true,
        isPEP: true,
    },
    {
        id: "kyc-005",
        applicantName: "Diane Iradukunda",
        email: "diane.ira@gmail.com",
        phone: "+250 738 890 123",
        nationalId: "1200130056789012",
        nationality: "Rwandan",
        dateOfBirth: "2001-01-19",
        submittedAt: "2026-09-13T09:00:00Z",
        status: "approved",
        documentType: "National ID",
        documentNumber: "1200130056789012",
        hasProofOfAddress: true,
        isPEP: false,
    },
    {
        id: "kyc-006",
        applicantName: "Claude Niyonzima",
        email: "claude.niyo@gmail.com",
        phone: "+250 788 345 678",
        nationalId: "1199000067890123",
        nationality: "Rwandan",
        dateOfBirth: "1990-04-25",
        submittedAt: "2026-09-12T14:30:00Z",
        status: "rejected",
        documentType: "National ID",
        documentNumber: "1199000067890123",
        hasProofOfAddress: false,
        isPEP: false,
        rejectionReason: "ID document image was blurred and unreadable",
        rejectedFields: ["Identity Document"],
    },
    {
        id: "kyc-007",
        applicantName: "Grace Ingabire",
        email: "grace.ingabire@yahoo.com",
        phone: "+250 738 567 890",
        nationalId: "1199340078901234",
        nationality: "Rwandan",
        dateOfBirth: "1993-04-12",
        submittedAt: "2026-09-11T13:10:00Z",
        status: "resubmission",
        documentType: "Passport",
        documentNumber: "RP0098765",
        hasProofOfAddress: true,
        isPEP: false,
        rejectionReason: "Selfie does not match ID photo — please retake",
        rejectedFields: ["Selfie Verification"],
    },
];

export const bankTransfers: BankTransfer[] = [
    {
        id: "bt-001",
        investorName: "Jean Mugabo",
        investorEmail: "jean.mugabo@gmail.com",
        opportunityName: "Nyarutarama Residential Block 7",
        amount: 3_000_000,
        reference: "LB-INV-20260915-A7B3",
        bankName: "Bank of Kigali",
        accountNumber: "****4589",
        uploadedAt: "2026-09-15T14:20:00Z",
        status: "pending",
        proofFileName: "transfer_receipt_sept15.pdf",
        proofFileSize: "1.2 MB",
    },
    {
        id: "bt-002",
        investorName: "Alice Mukamana",
        investorEmail: "alice.muk@gmail.com",
        opportunityName: "Kacyiru Diplomatic Quarter Plot",
        amount: 5_000_000,
        reference: "LB-INV-20260915-C4D8",
        bankName: "Equity Bank Rwanda",
        accountNumber: "****7823",
        uploadedAt: "2026-09-15T11:05:00Z",
        status: "pending",
        proofFileName: "equity_transfer_proof.pdf",
        proofFileSize: "0.8 MB",
    },
    {
        id: "bt-003",
        investorName: "Eric Nshimiyimana",
        investorEmail: "eric.nshimi@outlook.com",
        opportunityName: "Kibagabaga Hillside Plot A",
        amount: 1_500_000,
        reference: "LB-INV-20260914-E2F6",
        bankName: "I&M Bank Rwanda",
        accountNumber: "****3456",
        uploadedAt: "2026-09-14T16:30:00Z",
        status: "pending",
        proofFileName: "im_bank_slip.jpg",
        proofFileSize: "2.1 MB",
    },
    {
        id: "bt-004",
        investorName: "Sandrine Uwase",
        investorEmail: "sandrine.uwase@gmail.com",
        opportunityName: "Rusororo Agricultural Parcel",
        amount: 2_000_000,
        reference: "LB-INV-20260913-G1H5",
        bankName: "Bank of Kigali",
        accountNumber: "****9012",
        uploadedAt: "2026-09-13T09:45:00Z",
        status: "approved",
        proofFileName: "bk_transfer_sept13.pdf",
        proofFileSize: "0.9 MB",
    },
    {
        id: "bt-005",
        investorName: "Thierry Mugisha",
        investorEmail: "thierry.m@gmail.com",
        opportunityName: "Nyarutarama Residential Block 7",
        amount: 1_000_000,
        reference: "LB-INV-20260912-J3K7",
        bankName: "Cogebanque",
        accountNumber: "****6789",
        uploadedAt: "2026-09-12T10:15:00Z",
        status: "rejected",
        proofFileName: "cogebanque_receipt.pdf",
        proofFileSize: "0.5 MB",
        rejectionReason: "Amount on receipt (RWF 900,000) does not match expected amount (RWF 1,000,000)",
    },
];

export const payoutRequests: PayoutRequest[] = [
    {
        id: "po-001",
        investorName: "Marie Uwimana",
        investorEmail: "marie.uwimana@gmail.com",
        investmentName: "Gisozi Memorial Heights",
        principal: 2_000_000,
        accruedProfit: 600_000,
        tax: 78_000,
        finalAmount: 2_522_000,
        payoutAccountType: "mobile-money",
        payoutAccountProvider: "MTN Mobile Money",
        payoutAccountNumber: "0788 456 789",
        requestedAt: "2026-09-15T09:00:00Z",
        status: "pending",
        type: "maturity",
    },
    {
        id: "po-002",
        investorName: "Patrick Habimana",
        investorEmail: "p.habimana@yahoo.com",
        investmentName: "Nyarutarama Residential Block 7",
        principal: 3_000_000,
        accruedProfit: 990_000,
        tax: 128_700,
        finalAmount: 3_861_300,
        payoutAccountType: "bank",
        payoutAccountProvider: "Bank of Kigali",
        payoutAccountNumber: "****4521",
        requestedAt: "2026-09-14T15:30:00Z",
        status: "pending",
        type: "maturity",
    },
    {
        id: "po-003",
        investorName: "Ange Mutoni",
        investorEmail: "ange.mutoni@outlook.com",
        investmentName: "Kibagabaga Hillside Plot A",
        principal: 1_000_000,
        accruedProfit: 70_000,
        tax: 9_100,
        finalAmount: 1_060_900,
        payoutAccountType: "mobile-money",
        payoutAccountProvider: "Airtel Money",
        payoutAccountNumber: "0738 112 334",
        requestedAt: "2026-09-13T12:00:00Z",
        status: "approved",
        type: "early-exit",
    },
    {
        id: "po-004",
        investorName: "Emmanuel Nsengiyumva",
        investorEmail: "e.nsengiyumva@gmail.com",
        investmentName: "Kacyiru Diplomatic Quarter Plot",
        principal: 4_000_000,
        accruedProfit: 1_240_000,
        tax: 161_200,
        finalAmount: 5_078_800,
        payoutAccountType: "bank",
        payoutAccountProvider: "Equity Bank Rwanda",
        payoutAccountNumber: "****8901",
        requestedAt: "2026-09-12T11:00:00Z",
        status: "processing",
        type: "maturity",
    },
    {
        id: "po-005",
        investorName: "Diane Iradukunda",
        investorEmail: "diane.ira@gmail.com",
        investmentName: "Rusororo Agricultural Parcel",
        principal: 1_500_000,
        accruedProfit: 90_000,
        tax: 11_700,
        finalAmount: 1_578_300,
        payoutAccountType: "mobile-money",
        payoutAccountProvider: "MTN Mobile Money",
        payoutAccountNumber: "0788 890 123",
        requestedAt: "2026-09-11T08:30:00Z",
        status: "rejected",
        type: "maturity",
        rejectionReason: "Payout account phone number does not match registered investor phone",
    },
];

export const earlyExitRequests: EarlyExitRequest[] = [
    {
        id: "ex-001",
        investorName: "Claude Niyonzima",
        investorEmail: "claude.niyo@gmail.com",
        investmentName: "Nyarutarama Residential Block 7",
        principal: 2_500_000,
        accruedProfit: 164_000,
        forfeitedProfit: 82_000,
        exitCharge: 62_500,
        estimatedPayout: 2_519_500,
        reason: "Personal financial need",
        hasDocuments: true,
        requestedAt: "2026-09-15T07:45:00Z",
        status: "pending",
        elapsedMonths: 6,
        totalTermMonths: 24,
    },
    {
        id: "ex-002",
        investorName: "Grace Ingabire",
        investorEmail: "grace.ingabire@yahoo.com",
        investmentName: "Kacyiru Diplomatic Quarter Plot",
        principal: 2_000_000,
        accruedProfit: 103_000,
        forfeitedProfit: 51_500,
        exitCharge: 50_000,
        estimatedPayout: 2_001_500,
        reason: "Better investment opportunity elsewhere",
        hasDocuments: false,
        requestedAt: "2026-09-14T13:20:00Z",
        status: "pending",
        elapsedMonths: 4,
        totalTermMonths: 24,
    },
    {
        id: "ex-003",
        investorName: "Thierry Mugisha",
        investorEmail: "thierry.m@gmail.com",
        investmentName: "Rusororo Agricultural Parcel",
        principal: 1_000_000,
        accruedProfit: 40_000,
        forfeitedProfit: 20_000,
        exitCharge: 25_000,
        estimatedPayout: 995_000,
        reason: "Relocating abroad",
        hasDocuments: true,
        requestedAt: "2026-09-13T10:00:00Z",
        status: "approved",
        elapsedMonths: 10,
        totalTermMonths: 36,
    },
    {
        id: "ex-004",
        investorName: "Sandrine Uwase",
        investorEmail: "sandrine.uwase@gmail.com",
        investmentName: "Kibagabaga Hillside Plot A",
        principal: 500_000,
        accruedProfit: 11_666,
        forfeitedProfit: 5_833,
        exitCharge: 12_500,
        estimatedPayout: 493_333,
        reason: "Dissatisfied with investment progress",
        hasDocuments: false,
        requestedAt: "2026-09-12T16:50:00Z",
        status: "rejected",
        elapsedMonths: 2,
        totalTermMonths: 18,
        rejectionReason: "Minimum holding period of 3 months has not been met",
    },
];

export function formatRWF(amount: number): string {
    return new Intl.NumberFormat("en-RW", {
        style: "currency",
        currency: "RWF",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function formatDateTime(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function getTimeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
}
