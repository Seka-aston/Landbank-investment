"use client";

import {
    ArrowLeft,
    ArrowRight,
    Phone01,
    Clock,
    CheckCircle,
    XCircle,
    AlertTriangle,
    RefreshCcw01,
    Building07,
    Lock01,
    CreditCard02,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { formatRWF } from "@/lib/mock-data";
import type { FlowProps, FlowScreen } from "./invest-types";

// ─── Mobile Money — Phone Input ──────────────────────────────────────────────

export function MobileMoneyInput({ opp, data, updateData, goTo, paymentMethod }: FlowProps) {
    const providerName = paymentMethod === "mtn" ? "MTN Mobile Money" : "Airtel Money";
    const actualInvestment = data.shares * opp.sharePrice;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">{providerName}</h2>
                <p className="mt-1 text-sm text-tertiary">Amount: {formatRWF(actualInvestment)}</p>
            </div>

            <Input
                label="Phone Number"
                placeholder="+250 78X XXX XXX"
                value={data.phoneNumber}
                onChange={(value) => updateData({ phoneNumber: value })}
                size="md"
                icon={Phone01}
                hint={`Enter the ${paymentMethod === "mtn" ? "MTN" : "Airtel"} number registered to your mobile money account`}
            />

            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <Lock01 className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                <p className="text-sm text-tertiary">
                    A payment prompt will be sent to your phone. You'll need to enter your Mobile Money PIN to confirm.
                </p>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("payment-method")}>
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("mm-waiting")}
                    isDisabled={!data.phoneNumber.trim()}
                >
                    Send Payment Prompt
                </Button>
            </div>
        </div>
    );
}

// ─── Mobile Money — Waiting ──────────────────────────────────────────────────

export function MobileMoneyWaiting({ data, goTo, paymentMethod }: FlowProps) {
    const providerName = paymentMethod === "mtn" ? "MTN Mobile Money" : "Airtel Money";

    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={Clock} size="xl" color="warning" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Payment Prompt Sent</h2>
                <p className="mt-2 text-md text-tertiary">
                    We've sent a payment prompt to <strong className="text-secondary">{data.phoneNumber || "+250 78X XXX XXX"}</strong> via{" "}
                    {providerName}. Open your Mobile Money menu and enter your PIN to confirm.
                </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-tertiary">
                <Clock className="size-4 animate-spin text-fg-quaternary" />
                <span>Waiting for confirmation...</span>
            </div>

            <Button color="tertiary" size="sm" onClick={() => goTo("payment-method")}>
                Change Payment Method
            </Button>

            <div className="mt-4 w-full rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                <p className="mb-3 text-xs font-semibold text-quaternary uppercase tracking-wide">Dev: Simulate Result</p>
                <div className="flex justify-center gap-2">
                    <Button color="secondary" size="sm" onClick={() => goTo("payment-success")}>
                        Success
                    </Button>
                    <Button color="secondary" size="sm" onClick={() => goTo("mm-failed")}>
                        Failed / Timeout
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Mobile Money — Failed ───────────────────────────────────────────────────

export function MobileMoneyFailed({ goTo, paymentMethod }: FlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={XCircle} size="xl" color="error" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Payment Failed</h2>
                <p className="mt-2 text-md text-tertiary">
                    The payment request timed out or was declined. Please check your Mobile Money balance and try again.
                </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button
                    color="primary"
                    size="md"
                    iconLeading={RefreshCcw01}
                    onClick={() => goTo("mm-input")}
                    className="flex-1"
                >
                    Retry
                </Button>
                <Button color="secondary" size="md" onClick={() => goTo("payment-method")} className="flex-1">
                    Change Payment Method
                </Button>
            </div>
        </div>
    );
}

// ─── Card — Input Form ───────────────────────────────────────────────────────

export function CardInput({ opp, data, updateData, goTo }: FlowProps) {
    const actualInvestment = data.shares * opp.sharePrice;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Card Payment</h2>
                <p className="mt-1 text-sm text-tertiary">Amount: {formatRWF(actualInvestment)}</p>
            </div>

            <Input
                label="Cardholder Name"
                placeholder="Jean Mugabo"
                value={data.cardName}
                onChange={(value) => updateData({ cardName: value })}
                size="md"
            />

            <Input
                label="Card Number"
                placeholder="4242 4242 4242 4242"
                value={data.cardNumber}
                onChange={(value) => updateData({ cardNumber: value })}
                size="md"
                icon={CreditCard02}
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <Input
                    label="Expiry Date"
                    placeholder="MM / YY"
                    value={data.cardExpiry}
                    onChange={(value) => updateData({ cardExpiry: value })}
                    size="md"
                />
                <Input
                    label="CVC"
                    placeholder="123"
                    value={data.cardCvc}
                    onChange={(value) => updateData({ cardCvc: value })}
                    size="md"
                />
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <Lock01 className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                <p className="text-sm text-tertiary">
                    Your card details are encrypted and processed securely. We do not store your full card number.
                </p>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("payment-method")}>
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("card-processing")}
                    isDisabled={!data.cardNumber.trim() || !data.cardExpiry.trim() || !data.cardCvc.trim()}
                >
                    Pay {formatRWF(actualInvestment)}
                </Button>
            </div>
        </div>
    );
}

// ─── Card — Processing ───────────────────────────────────────────────────────

export function CardProcessing({ goTo }: FlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={CreditCard02} size="xl" color="brand" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Processing Payment</h2>
                <p className="mt-2 text-md text-tertiary">
                    Please wait while we process your card payment. Do not close this page.
                </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-tertiary">
                <Clock className="size-4 animate-spin text-fg-quaternary" />
                <span>Processing...</span>
            </div>

            <div className="mt-4 w-full rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                <p className="mb-3 text-xs font-semibold text-quaternary uppercase tracking-wide">Dev: Simulate Result</p>
                <div className="flex justify-center gap-2">
                    <Button color="secondary" size="sm" onClick={() => goTo("payment-success")}>
                        Success
                    </Button>
                    <Button color="secondary" size="sm" onClick={() => goTo("card-failed")}>
                        Declined
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Card — Failed ───────────────────────────────────────────────────────────

export function CardFailed({ goTo }: FlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={XCircle} size="xl" color="error" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Payment Declined</h2>
                <p className="mt-2 text-md text-tertiary">
                    Your card payment was declined. Please check your card details and available balance, then try again.
                </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button color="primary" size="md" iconLeading={RefreshCcw01} onClick={() => goTo("card-input")} className="flex-1">
                    Retry
                </Button>
                <Button color="secondary" size="md" onClick={() => goTo("payment-method")} className="flex-1">
                    Change Payment Method
                </Button>
            </div>
        </div>
    );
}

// ─── Bank Transfer — Instructions ────────────────────────────────────────────

export function BankTransferInstructions({ opp, data, goTo }: FlowProps) {
    const actualInvestment = data.shares * opp.sharePrice;
    const refCode = `INV-2026-${opp.slug.slice(0, 6).toUpperCase()}-${data.shares}`;

    const bankDetails = [
        ["Bank Name", "Bank of Kigali"],
        ["Account Name", "Land Bank Rwanda Ltd"],
        ["Account Number", "4010-1234-5678-001"],
        ["Branch", "Kigali City Tower Branch"],
        ["Reference", refCode],
        ["Amount", formatRWF(actualInvestment)],
    ];

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Bank Transfer</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Transfer the exact amount below and include the reference code. Verification takes 1–2 business days.
                </p>
            </div>

            <div className="rounded-xl border border-secondary bg-primary">
                <div className="border-b border-secondary bg-secondary px-4 py-3">
                    <div className="flex items-center gap-2">
                        <Building07 className="size-4 text-fg-quaternary" />
                        <h3 className="text-sm font-semibold text-primary">Transfer Details</h3>
                    </div>
                </div>
                <div className="flex flex-col divide-y divide-secondary px-4">
                    {bankDetails.map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between py-3">
                            <span className="text-sm text-tertiary">{label}</span>
                            <span className="text-sm font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-fg-warning-secondary" />
                <p className="text-sm text-tertiary">
                    Use the exact reference code above. Transfers without the correct reference may be delayed or returned.
                </p>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("payment-method")}>
                    Back
                </Button>
                <Button color="primary" size="md" iconTrailing={ArrowRight} onClick={() => goTo("bt-upload")}>
                    I've Made the Transfer
                </Button>
            </div>
        </div>
    );
}

// ─── Bank Transfer — Upload Proof ────────────────────────────────────────────

export function BankTransferUpload({ data, updateData, goTo }: FlowProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Upload Proof of Payment</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Upload a screenshot or receipt of your bank transfer so our team can verify the payment.
                </p>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-secondary">Payment Receipt</label>
                <FileUploadDropZone
                    accept="image/*,.pdf"
                    hint="PNG, JPG or PDF (max. 10MB)"
                    allowsMultiple={false}
                    maxSize={10 * 1024 * 1024}
                    onDropFiles={() => updateData({ proofUploaded: true })}
                />
            </div>

            {data.proofUploaded && (
                <div className="flex items-center gap-2 rounded-lg border border-secondary bg-success-primary p-3">
                    <CheckCircle className="size-4 text-fg-success-secondary" />
                    <span className="text-sm font-medium text-success-primary">Receipt uploaded successfully</span>
                </div>
            )}

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("bt-instructions")}>
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("bt-waiting")}
                    isDisabled={!data.proofUploaded}
                >
                    Submit for Verification
                </Button>
            </div>
        </div>
    );
}

// ─── Bank Transfer — Awaiting Verification ───────────────────────────────────

export function BankTransferWaiting({ goTo }: FlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={Clock} size="xl" color="warning" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Awaiting Verification</h2>
                <p className="mt-2 text-md text-tertiary">
                    Our team is verifying your bank transfer. This typically takes 1–2 business days. You'll receive an email once
                    verified.
                </p>
            </div>

            <Button href={`/opportunities`} color="tertiary" size="sm">
                Browse Other Opportunities
            </Button>

            <div className="mt-4 w-full rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                <p className="mb-3 text-xs font-semibold text-quaternary uppercase tracking-wide">Dev: Simulate Result</p>
                <div className="flex justify-center gap-2">
                    <Button color="secondary" size="sm" onClick={() => goTo("payment-success")}>
                        Approved
                    </Button>
                    <Button color="secondary" size="sm" onClick={() => goTo("bt-rejected")}>
                        Rejected
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Bank Transfer — Rejected ────────────────────────────────────────────────

export function BankTransferRejected({ goTo }: FlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={XCircle} size="xl" color="error" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Transfer Not Verified</h2>
                <p className="mt-2 text-md text-tertiary">
                    We were unable to verify your bank transfer. This could be due to an incorrect reference code, amount mismatch, or
                    the transfer has not yet been received by the bank.
                </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button
                    color="primary"
                    size="md"
                    iconLeading={RefreshCcw01}
                    onClick={() => goTo("bt-upload")}
                    className="flex-1"
                >
                    Re-upload Receipt
                </Button>
                <Button color="secondary" size="md" onClick={() => goTo("payment-method")} className="flex-1">
                    Change Payment Method
                </Button>
            </div>

            <Button href="mailto:support@landbank.rw" color="link-color" size="sm">
                Contact Support
            </Button>
        </div>
    );
}

// ─── Payment Successful (shared) ─────────────────────────────────────────────

export function PaymentSuccess({ opp, data, goTo, paymentMethod }: FlowProps) {
    const actualInvestment = data.shares * opp.sharePrice;
    const methodLabels: Record<string, string> = {
        mtn: "MTN Mobile Money",
        airtel: "Airtel Money",
        card: "Card Payment",
        "bank-transfer": "Bank Transfer",
    };
    const txnId = `TXN-${Date.now().toString(36).toUpperCase().slice(-8)}`;

    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={CheckCircle} size="xl" color="success" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Payment Successful</h2>
                <p className="mt-2 text-md text-tertiary">
                    Your payment of {formatRWF(actualInvestment)} has been confirmed. Next, review and sign the investment agreement.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Method</span>
                        <span className="font-medium text-primary">{methodLabels[paymentMethod || "mtn"]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Amount</span>
                        <span className="font-medium text-primary">{formatRWF(actualInvestment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Transaction ID</span>
                        <span className="font-medium text-primary">{txnId}</span>
                    </div>
                </div>
            </div>

            <Button color="primary" size="lg" iconTrailing={ArrowRight} onClick={() => goTo("contract-ready")}>
                Continue to Contract
            </Button>
        </div>
    );
}
