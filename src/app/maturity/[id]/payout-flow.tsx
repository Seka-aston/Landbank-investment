"use client";

import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Clock,
    XCircle,
    AlertTriangle,
    Hourglass03,
    Wallet04,
    Phone,
    ShieldTick,
    Rocket01,
    Mail01,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { formatRWF, payoutAccounts, getPayoutAccount } from "@/lib/mock-data";
import { cx } from "@/utils/cx";
import type { MaturityFlowProps } from "./maturity-types";

// ─── Payout Account Selection ────────────────────────────────────────────────

export function PayoutAccountSelect({ inv, data, updateData, goTo }: MaturityFlowProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Select Payout Account</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Choose where to receive your payout of {formatRWF(inv.currentValue)}.
                </p>
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
                                isSelected
                                    ? "border-brand bg-brand-secondary ring-1 ring-brand"
                                    : "border-secondary bg-primary hover:bg-secondary",
                            )}
                        >
                            <div
                                className={cx(
                                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                                    isSelected ? "bg-brand-solid" : "bg-secondary",
                                )}
                            >
                                <Icon
                                    className={cx("size-4.5", isSelected ? "text-fg-white" : "text-fg-quaternary")}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-primary">{account.provider}</p>
                                <p className="text-xs text-tertiary">{account.accountNumber}</p>
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

            <div className="flex items-center justify-between pt-2">
                <Button
                    color="secondary"
                    size="md"
                    iconLeading={ArrowLeft}
                    onClick={() => goTo("choose-action")}
                >
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("payout-review")}
                    isDisabled={!data.payoutAccountId}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

// ─── Payout Review ───────────────────────────────────────────────────────────

export function PayoutReview({ inv, data, goTo }: MaturityFlowProps) {
    const account = getPayoutAccount(data.payoutAccountId);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Review Payout</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Please confirm the details of your payout request.
                </p>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <h4 className="mb-3 text-sm font-semibold text-primary">Payout Summary</h4>
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Investment", inv.name],
                        ["Principal", formatRWF(inv.principal)],
                        ["Accrued Profit", `+${formatRWF(inv.accruedProfit)}`],
                        ["Total Payout", formatRWF(inv.currentValue)],
                        [
                            "Payout Account",
                            account ? `${account.provider} (${account.accountNumber})` : "—",
                        ],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <ShieldTick className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                <p className="text-sm text-tertiary">
                    Your payout request will be reviewed by our team. Once approved, funds will be
                    transferred to your selected account within 2–3 business days.
                </p>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button
                    color="secondary"
                    size="md"
                    iconLeading={ArrowLeft}
                    onClick={() => goTo("payout-account")}
                >
                    Back
                </Button>
                <Button color="primary" size="md" onClick={() => goTo("payout-requested")}>
                    Request Payout
                </Button>
            </div>
        </div>
    );
}

// ─── Payout Requested (Staff Review) ─────────────────────────────────────────

type ReviewStatus = "under-review" | "approved" | "rejected";

export function PayoutRequested({ inv, data, goTo }: MaturityFlowProps) {
    const [reviewStatus, setReviewStatus] = useState<ReviewStatus>("under-review");
    const account = getPayoutAccount(data.payoutAccountId);

    return (
        <div className="flex flex-col gap-6">
            {reviewStatus === "under-review" && (
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                    <FeaturedIcon icon={Clock} size="xl" color="warning" theme="light" />
                    <div>
                        <Badge color="warning" size="md">Under Review</Badge>
                        <h2 className="mt-3 text-display-xs font-semibold text-primary">
                            Payout Under Review
                        </h2>
                        <p className="mt-2 text-md text-tertiary">
                            Your payout request of {formatRWF(inv.currentValue)} is being reviewed by our
                            team. This usually takes 1–2 business days.
                        </p>
                    </div>
                    <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                        <div className="flex flex-col gap-2.5">
                            {[
                                ["Amount", formatRWF(inv.currentValue)],
                                ["Account", account ? account.provider : "—"],
                                ["Status", "Under Review"],
                            ].map(([label, value]) => (
                                <div key={label} className="flex justify-between text-sm">
                                    <span className="text-tertiary">{label}</span>
                                    <span className="font-medium text-primary">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button href="/portfolio" color="secondary" size="md" className="w-full">
                        Back to Portfolio
                    </Button>
                </div>
            )}

            {reviewStatus === "approved" && (
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                    <FeaturedIcon icon={CheckCircle} size="xl" color="success" theme="light" />
                    <div>
                        <Badge color="success" size="md">Approved</Badge>
                        <h2 className="mt-3 text-display-xs font-semibold text-primary">
                            Payout Approved
                        </h2>
                        <p className="mt-2 text-md text-tertiary">
                            Your payout request has been approved. Click below to initiate the transfer.
                        </p>
                    </div>
                    <Button
                        color="primary"
                        size="md"
                        iconTrailing={ArrowRight}
                        onClick={() => goTo("payout-processing")}
                        className="w-full"
                    >
                        Process Payout
                    </Button>
                </div>
            )}

            {reviewStatus === "rejected" && (
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                    <FeaturedIcon icon={XCircle} size="xl" color="error" theme="light" />
                    <div>
                        <Badge color="error" size="md">Rejected</Badge>
                        <h2 className="mt-3 text-display-xs font-semibold text-primary">
                            Payout Rejected
                        </h2>
                        <p className="mt-2 text-md text-tertiary">
                            Your payout request could not be processed. The payout account could not be
                            verified. Please update your account details and try again.
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:flex-row">
                        <Button
                            color="primary"
                            size="md"
                            onClick={() => goTo("payout-account")}
                            className="flex-1"
                        >
                            Update Account
                        </Button>
                        <Button
                            href="mailto:support@landbank.rw"
                            color="secondary"
                            size="md"
                            iconLeading={Mail01}
                            className="flex-1"
                        >
                            Contact Support
                        </Button>
                    </div>
                </div>
            )}

            {/* Dev switcher */}
            <div className="rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-quaternary">
                    Dev: Simulate Review Status
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {(["under-review", "approved", "rejected"] as ReviewStatus[]).map((status) => (
                        <Button
                            key={status}
                            color={reviewStatus === status ? "primary" : "secondary"}
                            size="xs"
                            onClick={() => setReviewStatus(status)}
                        >
                            {status}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Payout Processing ───────────────────────────────────────────────────────

export function PayoutProcessing({ inv, goTo }: MaturityFlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={Hourglass03} size="xl" color="brand" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Processing Payout</h2>
                <p className="mt-2 text-md text-tertiary">
                    Transferring {formatRWF(inv.currentValue)} to your payout account. This may take a few
                    moments.
                </p>
            </div>

            {/* Dev simulate buttons */}
            <div className="w-full rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-quaternary">
                    Dev: Simulate Result
                </p>
                <div className="flex gap-1.5">
                    <Button color="primary" size="xs" onClick={() => goTo("payout-success")}>
                        Simulate Success
                    </Button>
                    <Button color="secondary" size="xs" onClick={() => goTo("payout-failed")}>
                        Simulate Failed
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Payout Success ──────────────────────────────────────────────────────────

export function PayoutSuccess({ inv, data }: MaturityFlowProps) {
    const account = getPayoutAccount(data.payoutAccountId);

    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={Rocket01} size="xl" color="success" theme="light" />

            <div>
                <Badge color="success" size="md">Payout Complete</Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">
                    Payout Successful!
                </h2>
                <p className="mt-2 text-md text-tertiary">
                    {formatRWF(inv.currentValue)} has been transferred to your{" "}
                    {account?.provider ?? "payout account"}.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Investment", inv.name],
                        ["Principal Returned", formatRWF(inv.principal)],
                        ["Profit Paid", `+${formatRWF(inv.accruedProfit)}`],
                        ["Total Paid", formatRWF(inv.currentValue)],
                        [
                            "Paid To",
                            account ? `${account.provider} (${account.accountNumber})` : "—",
                        ],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Button
                href="/portfolio"
                color="primary"
                size="md"
                iconTrailing={ArrowRight}
                className="w-full"
            >
                Back to Portfolio
            </Button>
        </div>
    );
}

// ─── Payout Failed ───────────────────────────────────────────────────────────

export function PayoutFailed({ inv, goTo }: MaturityFlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={AlertTriangle} size="xl" color="error" theme="light" />

            <div>
                <Badge color="error" size="md">Failed</Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">Payout Failed</h2>
                <p className="mt-2 text-md text-tertiary">
                    We were unable to process your payout. This may be due to an issue with your payout
                    account. Please try again or contact support.
                </p>
            </div>

            <div className="flex w-full flex-col gap-3">
                <Button
                    color="primary"
                    size="md"
                    onClick={() => goTo("payout-account")}
                    className="w-full"
                >
                    Update Payout Account
                </Button>
                <Button
                    color="secondary"
                    size="md"
                    onClick={() => goTo("payout-processing")}
                    className="w-full"
                >
                    Try Again
                </Button>
                <Button
                    href="mailto:support@landbank.rw"
                    color="tertiary"
                    size="md"
                    iconLeading={Mail01}
                    className="w-full"
                >
                    Contact Support
                </Button>
            </div>
        </div>
    );
}
