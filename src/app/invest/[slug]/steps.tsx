"use client";

import { useState, useEffect } from "react";
import {
    ArrowLeft,
    ArrowRight,
    MarkerPin01,
    AlertTriangle,
    CheckCircle,
    Clock,
    TrendUp01,
    Wallet04,
    Phone01,
    CreditCard02,
    Building07,
    Hourglass03,
    XCircle,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import { formatRWF } from "@/lib/mock-data";
import type { FlowProps, FlowScreen, PaymentMethod } from "./invest-types";

function getProjectedReturn(amount: number, annualReturn: number, termMonths: number) {
    return Math.round(amount * (annualReturn / 100) * (termMonths / 12));
}

function getMaturityDate(termMonths: number) {
    const d = new Date();
    d.setMonth(d.getMonth() + termMonths);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// ─── Amount & Term Selection ─────────────────────────────────────────────────

export function AmountStep({ opp, data, updateData, goTo }: FlowProps) {
    const sharesForAmount = Math.floor(data.amount / opp.sharePrice);
    const actualInvestment = sharesForAmount * opp.sharePrice;
    const projectedProfit = getProjectedReturn(actualInvestment, opp.annualReturn, data.term);
    const totalReturn = actualInvestment + projectedProfit;

    const termOptions = [
        Math.max(6, opp.term - 12),
        opp.term,
        opp.term + 12,
    ].filter((v, i, a) => a.indexOf(v) === i);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <div className="mb-1 text-xs font-medium text-brand-secondary">Step 1 of 3</div>
                <h2 className="text-display-xs font-semibold text-primary">Amount & Term Selection</h2>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-quaternary">
                    <MarkerPin01 className="size-5 text-fg-quaternary" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-primary">{opp.name}</p>
                    <p className="text-xs text-tertiary">{opp.location} · {opp.annualReturn}% annual return</p>
                </div>
            </div>

            <Input
                label="Investment Amount (RWF)"
                placeholder={`Min. ${formatRWF(opp.minInvestment)}`}
                value={data.amount ? data.amount.toLocaleString() : ""}
                onChange={(value) => {
                    const num = parseInt(value.replace(/\D/g, ""), 10);
                    const amount = isNaN(num) ? 0 : num;
                    updateData({ amount, shares: Math.floor(amount / opp.sharePrice) });
                }}
                size="md"
                icon={Wallet04}
                hint={
                    sharesForAmount > 0
                        ? `= ${sharesForAmount} share${sharesForAmount !== 1 ? "s" : ""} at ${formatRWF(opp.sharePrice)} per share`
                        : `Minimum investment: ${formatRWF(opp.minInvestment)}`
                }
            />

            <div>
                <label className="mb-1.5 block text-sm font-medium text-secondary">Investment Term</label>
                <div className="flex gap-3">
                    {termOptions.map((t) => (
                        <button
                            key={t}
                            onClick={() => updateData({ term: t })}
                            className={cx(
                                "flex-1 rounded-lg border p-3 text-center transition duration-100",
                                data.term === t
                                    ? "border-brand bg-brand-section_subtle"
                                    : "border-secondary bg-primary hover:bg-secondary",
                            )}
                        >
                            <p className={cx("text-md font-semibold", data.term === t ? "text-brand-secondary" : "text-primary")}>
                                {t}
                            </p>
                            <p className="text-xs text-tertiary">months</p>
                        </button>
                    ))}
                </div>
            </div>

            {sharesForAmount > 0 && (
                <div className="rounded-xl border border-secondary bg-primary p-4">
                    <h4 className="text-sm font-semibold text-primary">Projected Returns</h4>
                    <div className="mt-3 flex flex-col gap-2.5">
                        <div className="flex justify-between text-sm">
                            <span className="text-tertiary">Investment Amount</span>
                            <span className="font-medium text-primary">{formatRWF(actualInvestment)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-tertiary">Annual Return Rate</span>
                            <span className="font-medium text-success-primary">{opp.annualReturn}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-tertiary">Projected Profit</span>
                            <span className="font-medium text-success-primary">+{formatRWF(projectedProfit)}</span>
                        </div>
                        <hr className="border-secondary" />
                        <div className="flex justify-between text-sm">
                            <span className="font-semibold text-primary">Total at Maturity</span>
                            <span className="font-semibold text-primary">{formatRWF(totalReturn)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-tertiary">Maturity Date</span>
                            <span className="font-medium text-secondary">{getMaturityDate(data.term)}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between pt-2">
                <Button href={`/opportunities/${opp.slug}`} color="secondary" size="md" iconLeading={ArrowLeft}>
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("review")}
                    isDisabled={sharesForAmount < 1 || actualInvestment < opp.minInvestment}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

// ─── Investment Review & Risk Assessment ─────────────────────────────────────

export function ReviewStep({ opp, data, updateData, goTo }: FlowProps) {
    const actualInvestment = data.shares * opp.sharePrice;
    const projectedProfit = getProjectedReturn(actualInvestment, opp.annualReturn, data.term);
    const totalReturn = actualInvestment + projectedProfit;

    const allAccepted = data.riskAccepted && data.termsAccepted && data.lossAccepted;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <div className="mb-1 text-xs font-medium text-brand-secondary">Step 2 of 3</div>
                <h2 className="text-display-xs font-semibold text-primary">Investment Review</h2>
            </div>

            <div className="rounded-xl border border-secondary bg-primary">
                <div className="border-b border-secondary bg-secondary px-4 py-3">
                    <h3 className="text-sm font-semibold text-primary">Investment Summary</h3>
                </div>
                <div className="flex flex-col divide-y divide-secondary px-4">
                    {[
                        ["Opportunity", opp.name],
                        ["Location", opp.location],
                        ["Investment Amount", formatRWF(actualInvestment)],
                        ["Shares", `${data.shares} shares at ${formatRWF(opp.sharePrice)}`],
                        ["Term", `${data.term} months`],
                        ["Annual Return", `${opp.annualReturn}%`],
                        ["Projected Profit", `+${formatRWF(projectedProfit)}`],
                        ["Total at Maturity", formatRWF(totalReturn)],
                        ["Maturity Date", getMaturityDate(data.term)],
                    ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between py-2.5">
                            <span className="text-sm text-tertiary">{label}</span>
                            <span className="text-sm font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-sm font-semibold text-primary">Risk Disclosure</h3>
                <div className="flex flex-col gap-3">
                    <div className="rounded-lg border border-secondary p-4">
                        <Checkbox
                            isSelected={data.riskAccepted}
                            onChange={(checked) => updateData({ riskAccepted: checked })}
                            size="md"
                            label="I understand the risks"
                            hint="I acknowledge that land investments carry risks including loss of capital, market volatility, and illiquidity. Past performance does not guarantee future results."
                        />
                    </div>
                    <div className="rounded-lg border border-secondary p-4">
                        <Checkbox
                            isSelected={data.termsAccepted}
                            onChange={(checked) => updateData({ termsAccepted: checked })}
                            size="md"
                            label="I accept the terms"
                            hint="I have read and agree to Land Bank's Investment Terms and Conditions, including the fee schedule and early exit policy."
                        />
                    </div>
                    <div className="rounded-lg border border-secondary p-4">
                        <Checkbox
                            isSelected={data.lossAccepted}
                            onChange={(checked) => updateData({ lossAccepted: checked })}
                            size="md"
                            label="I can afford this investment"
                            hint="I confirm that I can afford to lose the full amount of this investment without impacting my essential living expenses."
                        />
                    </div>
                </div>
            </div>

            {!allAccepted && (
                <div className="flex items-start gap-2 rounded-lg bg-secondary p-3">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-fg-warning-secondary" />
                    <p className="text-xs text-tertiary">You must accept all disclosures to continue.</p>
                </div>
            )}

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("amount")}>
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("confirm")}
                    isDisabled={!allAccepted}
                >
                    Confirm Investment
                </Button>
            </div>
        </div>
    );
}

// ─── Confirm Investment (Reservation + Timer) ───────────────────────────────

export function ConfirmStep({ opp, data, goTo }: FlowProps) {
    const [secondsLeft, setSecondsLeft] = useState(900);
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        if (expired) return;
        const interval = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    setExpired(true);
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [expired]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const timerStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    const actualInvestment = data.shares * opp.sharePrice;
    const projectedProfit = getProjectedReturn(actualInvestment, opp.annualReturn, data.term);

    if (expired) {
        return (
            <div className="flex flex-col items-center gap-6 py-4 text-center">
                <FeaturedIcon icon={Hourglass03} size="xl" color="error" theme="light" />
                <div>
                    <h2 className="text-display-xs font-semibold text-primary">Reservation Expired</h2>
                    <p className="mt-2 text-md text-tertiary">
                        Your 15-minute reservation has expired. The shares have been released. You can start a new investment.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button color="primary" size="md" onClick={() => { setExpired(false); setSecondsLeft(900); }}>
                        Try Again
                    </Button>
                    <Button href={`/opportunities/${opp.slug}`} color="secondary" size="md">
                        Back to Opportunity
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <div className="mb-1 text-xs font-medium text-brand-secondary">Step 3 of 3</div>
                <h2 className="text-display-xs font-semibold text-primary">Confirm Investment</h2>
            </div>

            <div className="flex items-center justify-center gap-3 rounded-xl border border-brand bg-brand-section_subtle p-4">
                <Clock className="size-5 text-fg-brand-primary" />
                <div className="text-center">
                    <p className="text-xs text-tertiary">Reservation expires in</p>
                    <p className="text-display-xs font-semibold text-brand-secondary">{timerStr}</p>
                </div>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Opportunity</span>
                        <span className="font-medium text-primary">{opp.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Amount</span>
                        <span className="font-medium text-primary">{formatRWF(actualInvestment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Shares</span>
                        <span className="font-medium text-primary">{data.shares}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Term</span>
                        <span className="font-medium text-primary">{data.term} months</span>
                    </div>
                    <hr className="border-secondary" />
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Projected Profit</span>
                        <span className="font-medium text-success-primary">+{formatRWF(projectedProfit)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Maturity Date</span>
                        <span className="font-medium text-secondary">{getMaturityDate(data.term)}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-fg-warning-secondary" />
                <p className="text-sm text-tertiary">
                    By proceeding, you agree to complete payment within 15 minutes. If payment is not completed, your reservation will
                    expire and the shares will be released.
                </p>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("review")}>
                    Back
                </Button>
                <Button color="primary" size="md" iconTrailing={ArrowRight} onClick={() => goTo("payment-method")}>
                    Proceed to Payment
                </Button>
            </div>
        </div>
    );
}

// ─── Choose Payment Method ───────────────────────────────────────────────────

const PAYMENT_METHODS: { id: PaymentMethod; label: string; hint: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "mtn", label: "MTN Mobile Money", hint: "Pay instantly using your MTN MoMo account", icon: Phone01 },
    { id: "airtel", label: "Airtel Money", hint: "Pay instantly using your Airtel Money account", icon: Phone01 },
    { id: "card", label: "Credit / Debit Card", hint: "Visa, Mastercard, or other supported cards", icon: CreditCard02 },
    { id: "bank-transfer", label: "Bank Transfer", hint: "Transfer from your bank account (1–2 business days)", icon: Building07 },
];

export function PaymentMethodStep({
    opp,
    data,
    goTo,
    paymentMethod,
    onSelectMethod,
}: FlowProps & { onSelectMethod: (m: PaymentMethod) => void }) {
    const actualInvestment = data.shares * opp.sharePrice;

    const getFirstScreen = (method: PaymentMethod): FlowScreen => {
        switch (method) {
            case "mtn":
            case "airtel":
                return "mm-input";
            case "card":
                return "card-input";
            case "bank-transfer":
                return "bt-instructions";
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Choose Payment Method</h2>
                <p className="mt-1 text-sm text-tertiary">Amount to pay: {formatRWF(actualInvestment)}</p>
            </div>

            <div className="flex flex-col gap-3">
                {PAYMENT_METHODS.map((method) => {
                    const isSelected = paymentMethod === method.id;
                    return (
                        <button
                            key={method.id}
                            onClick={() => onSelectMethod(method.id)}
                            className={cx(
                                "flex items-start gap-3.5 rounded-xl border p-4 text-left transition duration-100",
                                isSelected ? "border-brand bg-brand-section_subtle" : "border-secondary bg-primary hover:bg-secondary",
                            )}
                        >
                            <div
                                className={cx(
                                    "flex size-10 shrink-0 items-center justify-center rounded-lg",
                                    isSelected ? "bg-brand-secondary" : "bg-secondary",
                                )}
                            >
                                <method.icon className={cx("size-5", isSelected ? "text-fg-brand-primary" : "text-fg-quaternary")} />
                            </div>
                            <div className="flex-1">
                                <p className={cx("text-sm font-semibold", isSelected ? "text-brand-secondary" : "text-primary")}>
                                    {method.label}
                                </p>
                                <p className="text-xs text-tertiary">{method.hint}</p>
                            </div>
                            <div
                                className={cx(
                                    "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                                    isSelected ? "border-brand bg-brand-solid" : "border-secondary",
                                )}
                            >
                                {isSelected && <div className="size-2 rounded-full bg-white" />}
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("confirm")}>
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => paymentMethod && goTo(getFirstScreen(paymentMethod))}
                    isDisabled={!paymentMethod}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
