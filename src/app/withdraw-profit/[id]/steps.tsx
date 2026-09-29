"use client";

import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    AlertTriangle,
    CheckCircle,
    Clock,
    Hourglass03,
    InfoCircle,
    Mail01,
    Phone,
    Plus,
    Wallet04,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { formatRWF, payoutAccounts, getPayoutAccount } from "@/lib/mock-data";
import { cx } from "@/utils/cx";
import { MIN_WITHDRAWAL, WITHDRAWAL_FEE, type WithdrawFlowProps } from "./withdraw-types";

function SummaryRows({ rows }: { rows: [string, string][] }) {
    return (
        <div className="flex flex-col gap-2.5">
            {rows.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 text-sm">
                    <span className="text-tertiary">{label}</span>
                    <span className="text-right font-medium text-primary">{value}</span>
                </div>
            ))}
        </div>
    );
}

// ─── Step 1: Choose Amount ───────────────────────────────────────────────────

export function AmountScreen({ inv, available, data, updateData, goTo }: WithdrawFlowProps) {
    const [mode, setMode] = useState<"all" | "custom">(data.amount && data.amount !== available ? "custom" : "all");

    const amount = mode === "all" ? available : data.amount;
    const tooLow = amount > 0 && amount < MIN_WITHDRAWAL;
    const tooHigh = amount > available;
    const isValid = amount >= MIN_WITHDRAWAL && !tooHigh;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <div className="mb-1 text-xs font-medium text-brand-secondary">Step 1 of 3</div>
                <h2 className="text-display-xs font-semibold text-primary">Withdraw Profit</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Cash out the profit your investment has earned so far. Your principal stays invested and keeps earning.
                </p>
            </div>

            {/* Available balance */}
            <div className="rounded-xl border border-secondary bg-secondary p-5 text-center">
                <p className="text-sm text-tertiary">Available to withdraw</p>
                <p className="mt-1 text-display-sm font-semibold text-success-primary">{formatRWF(available)}</p>
                <p className="mt-1 text-xs text-tertiary">
                    +{formatRWF(inv.dailyAccrual)} added every day · {inv.name}
                </p>
            </div>

            {/* Amount options */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-secondary">How much would you like to withdraw?</label>
                {(
                    [
                        { id: "all", title: "Full available profit", subtitle: formatRWF(available) },
                        { id: "custom", title: "Custom amount", subtitle: `Min. ${formatRWF(MIN_WITHDRAWAL)}` },
                    ] as const
                ).map((option) => {
                    const isSelected = mode === option.id;
                    return (
                        <button
                            key={option.id}
                            onClick={() => {
                                setMode(option.id);
                                updateData({ amount: option.id === "all" ? available : 0 });
                            }}
                            className={cx(
                                "flex items-center justify-between rounded-xl border p-4 text-left transition duration-100",
                                isSelected ? "border-brand bg-brand-secondary ring-1 ring-brand" : "border-secondary bg-primary hover:bg-secondary",
                            )}
                        >
                            <span className="text-sm font-semibold text-primary">{option.title}</span>
                            <span className="text-sm text-tertiary">{option.subtitle}</span>
                        </button>
                    );
                })}
            </div>

            {mode === "custom" && (
                <Input
                    label="Amount (RWF)"
                    placeholder={`${formatRWF(MIN_WITHDRAWAL)} – ${formatRWF(available)}`}
                    value={data.amount ? data.amount.toLocaleString() : ""}
                    onChange={(value) => {
                        const num = parseInt(value.replace(/\D/g, ""), 10);
                        updateData({ amount: isNaN(num) ? 0 : num });
                    }}
                    size="md"
                    icon={Wallet04}
                    isInvalid={tooLow || tooHigh}
                    hint={
                        tooHigh
                            ? `You can withdraw up to ${formatRWF(available)}`
                            : tooLow
                              ? `Minimum withdrawal is ${formatRWF(MIN_WITHDRAWAL)}`
                              : `Remaining after withdrawal: ${formatRWF(Math.max(0, available - amount))}`
                    }
                />
            )}

            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <InfoCircle className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                <p className="text-sm text-tertiary">
                    Withdrawn profit is paid out instantly and is no longer part of your maturity payout. You can withdraw as often
                    as you like — even every day.
                </p>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button href={`/portfolio/${inv.id}`} color="secondary" size="md" iconLeading={ArrowLeft}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    isDisabled={!isValid}
                    onClick={() => {
                        updateData({ amount });
                        goTo("account");
                    }}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

// ─── Step 2: Payout Account ──────────────────────────────────────────────────

export function AccountScreen({ data, updateData, goTo }: WithdrawFlowProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <div className="mb-1 text-xs font-medium text-brand-secondary">Step 2 of 3</div>
                <h2 className="text-display-xs font-semibold text-primary">Select Payout Account</h2>
                <p className="mt-1 text-sm text-tertiary">Choose where to receive {formatRWF(data.amount)}.</p>
            </div>

            <div className="flex flex-col gap-2">
                {payoutAccounts.map((account) => {
                    const isSelected = data.payoutAccountId === account.id;
                    const Icon = account.type === "mobile-money" ? Phone : Wallet04;
                    return (
                        <button
                            key={account.id}
                            onClick={() => updateData({ payoutAccountId: account.id })}
                            className={cx(
                                "flex items-center gap-3 rounded-xl border p-4 text-left transition duration-100",
                                isSelected ? "border-brand bg-brand-secondary ring-1 ring-brand" : "border-secondary bg-primary hover:bg-secondary",
                            )}
                        >
                            <div className={cx("flex size-9 shrink-0 items-center justify-center rounded-lg", isSelected ? "bg-brand-solid" : "bg-secondary")}>
                                <Icon className={cx("size-4.5", isSelected ? "text-fg-white" : "text-fg-quaternary")} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-primary">{account.provider}</p>
                                <p className="text-xs text-tertiary">
                                    {account.accountNumber} · {account.type === "mobile-money" ? "Instant" : "Same business day"}
                                </p>
                            </div>
                            {account.isDefault && (
                                <Badge color="gray" size="sm">
                                    Default
                                </Badge>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center gap-2">
                <Button href="/account" color="link-color" size="sm" iconLeading={Plus}>
                    Add new account
                </Button>
                <span className="text-tertiary">·</span>
                <Button href="/account" color="link-gray" size="sm">
                    Manage accounts
                </Button>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("amount")}>
                    Back
                </Button>
                <Button color="primary" size="md" iconTrailing={ArrowRight} onClick={() => goTo("review")} isDisabled={!data.payoutAccountId}>
                    Continue
                </Button>
            </div>
        </div>
    );
}

// ─── Step 3: Review & Confirm ────────────────────────────────────────────────

export function ReviewScreen({ inv, available, data, goTo }: WithdrawFlowProps) {
    const account = getPayoutAccount(data.payoutAccountId);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <div className="mb-1 text-xs font-medium text-brand-secondary">Step 3 of 3</div>
                <h2 className="text-display-xs font-semibold text-primary">Review Withdrawal</h2>
                <p className="mt-1 text-sm text-tertiary">Check the details before you confirm.</p>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <h4 className="mb-3 text-sm font-semibold text-primary">Withdrawal Summary</h4>
                <SummaryRows
                    rows={[
                        ["Investment", inv.name],
                        ["Withdrawal Amount", formatRWF(data.amount)],
                        ["Fee", WITHDRAWAL_FEE === 0 ? "Free" : formatRWF(WITHDRAWAL_FEE)],
                        ["You Receive", formatRWF(data.amount - WITHDRAWAL_FEE)],
                        ["Paid To", account ? `${account.provider} (${account.accountNumber})` : "—"],
                    ]}
                />
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <h4 className="mb-3 text-sm font-semibold text-primary">After This Withdrawal</h4>
                <SummaryRows
                    rows={[
                        ["Principal (unchanged)", formatRWF(inv.principal)],
                        ["Remaining Accrued Profit", formatRWF(available - data.amount)],
                        ["Daily Accrual (unchanged)", `+${formatRWF(inv.dailyAccrual)}/day`],
                        ["Projected at Maturity", formatRWF(inv.projectedMaturityValue - data.amount)],
                    ]}
                />
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("account")}>
                    Back
                </Button>
                <Button color="primary" size="md" onClick={() => goTo("processing")}>
                    Confirm Withdrawal
                </Button>
            </div>
        </div>
    );
}

// ─── Processing ──────────────────────────────────────────────────────────────

export function ProcessingScreen({ data, goTo }: WithdrawFlowProps) {
    const account = getPayoutAccount(data.payoutAccountId);

    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={Hourglass03} size="xl" color="brand" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Sending Your Profit</h2>
                <p className="mt-2 text-md text-tertiary">
                    Transferring {formatRWF(data.amount)} to your {account?.provider ?? "payout account"}. This usually takes a few
                    seconds.
                </p>
            </div>

            {/* Dev simulate buttons */}
            <div className="w-full rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-quaternary">Dev: Simulate Result</p>
                <div className="flex gap-1.5">
                    <Button color="primary" size="xs" onClick={() => goTo("success")}>
                        Simulate Success
                    </Button>
                    <Button color="secondary" size="xs" onClick={() => goTo("failed")}>
                        Simulate Failed
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Success ─────────────────────────────────────────────────────────────────

export function SuccessScreen({ inv, available, data }: WithdrawFlowProps) {
    const account = getPayoutAccount(data.payoutAccountId);

    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={CheckCircle} size="xl" color="success" theme="light" />

            <div>
                <Badge color="success" size="md">
                    Paid
                </Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">Profit Withdrawn</h2>
                <p className="mt-2 text-md text-tertiary">
                    {formatRWF(data.amount)} has been sent to your {account?.provider ?? "payout account"}. Your investment remains
                    active and keeps earning.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <SummaryRows
                    rows={[
                        ["Amount Paid", formatRWF(data.amount - WITHDRAWAL_FEE)],
                        ["Paid To", account ? `${account.provider} (${account.accountNumber})` : "—"],
                        ["Reference", "TXN-PW-20260929-001"],
                        ["Date", "Sep 29, 2026"],
                        ["Remaining Accrued Profit", formatRWF(available - data.amount)],
                        ["Investment Status", "Active"],
                    ]}
                />
            </div>

            <div className="flex w-full flex-col gap-3">
                <Button href={`/portfolio/${inv.id}`} color="primary" size="md" iconTrailing={ArrowRight} className="w-full">
                    Back to Investment
                </Button>
                <Button href="/portfolio" color="secondary" size="md" className="w-full">
                    Go to Portfolio
                </Button>
            </div>
        </div>
    );
}

// ─── Failed ──────────────────────────────────────────────────────────────────

export function FailedScreen({ data, goTo }: WithdrawFlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={AlertTriangle} size="xl" color="error" theme="light" />

            <div>
                <Badge color="error" size="md">
                    Failed
                </Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">Withdrawal Failed</h2>
                <p className="mt-2 text-md text-tertiary">
                    We couldn&apos;t send {formatRWF(data.amount)} to your payout account. No money has left your investment — your
                    profit is still available to withdraw.
                </p>
            </div>

            <div className="flex w-full flex-col gap-3">
                <Button color="primary" size="md" onClick={() => goTo("processing")} className="w-full">
                    Try Again
                </Button>
                <Button color="secondary" size="md" onClick={() => goTo("account")} className="w-full">
                    Change Payout Account
                </Button>
                <Button href="mailto:support@landbank.rw" color="tertiary" size="md" iconLeading={Mail01} className="w-full">
                    Contact Support
                </Button>
            </div>
        </div>
    );
}

// ─── Nothing Available (below minimum) ───────────────────────────────────────

export function UnavailableScreen({ inv, available }: WithdrawFlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={Clock} size="xl" color="gray" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Not Enough Profit Yet</h2>
                <p className="mt-2 text-md text-tertiary">
                    You have {formatRWF(available)} available. The minimum withdrawal is {formatRWF(MIN_WITHDRAWAL)} — at{" "}
                    {formatRWF(inv.dailyAccrual)} a day, you can withdraw again very soon.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <SummaryRows
                    rows={[
                        ["Available Now", formatRWF(available)],
                        ["Minimum Withdrawal", formatRWF(MIN_WITHDRAWAL)],
                        ["Daily Accrual", `+${formatRWF(inv.dailyAccrual)}/day`],
                    ]}
                />
            </div>

            <Button href={`/portfolio/${inv.id}`} color="primary" size="md" iconLeading={ArrowLeft} className="w-full">
                Back to Investment
            </Button>
        </div>
    );
}
