"use client";

import {
    ArrowLeft,
    ArrowRight,
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
import { getExitOffer } from "./exit-types";
import type { EarlyExitFlowProps } from "./exit-types";

// ─── Payout Account Selection (reuses Section E pattern) ─────────────────────

export function ExitPayoutAccountSelect({ inv, data, updateData, goTo }: EarlyExitFlowProps) {
    const { estimatedPayout } = getExitOffer(inv);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Select Payout Account</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Choose where to receive your early exit payout of {formatRWF(estimatedPayout)}.
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
                                    ? "border-brand bg-brand-section_subtle ring-1 ring-brand"
                                    : "border-secondary bg-primary hover:bg-secondary",
                            )}
                        >
                            <div
                                className={cx(
                                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                                    isSelected ? "bg-brand-primary" : "bg-secondary",
                                )}
                            >
                                <Icon
                                    className={cx(
                                        "size-4.5",
                                        isSelected ? "text-fg-white" : "text-fg-quaternary",
                                    )}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-primary">
                                    {account.provider}
                                </p>
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
                    onClick={() => goTo("offer")}
                >
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("confirm-exit")}
                    isDisabled={!data.payoutAccountId}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

// ─── Confirm Early Exit ──────────────────────────────────────────────────────

export function ConfirmExitScreen({ inv, data, goTo }: EarlyExitFlowProps) {
    const { forfeitedProfit, charges, estimatedPayout } = getExitOffer(inv);
    const account = getPayoutAccount(data.payoutAccountId);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Confirm Early Exit</h2>
                <p className="mt-1 text-sm text-tertiary">
                    This action is final. Please review the details one last time.
                </p>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <h4 className="mb-3 text-sm font-semibold text-primary">Exit Summary</h4>
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Investment", inv.name],
                        ["Principal Returned", formatRWF(inv.principal)],
                        ["Retained Profit", `+${formatRWF(inv.accruedProfit - forfeitedProfit)}`],
                        ["Forfeited Profit", `-${formatRWF(forfeitedProfit)}`],
                        ["Early Exit Charge", `-${formatRWF(charges)}`],
                        ["Final Payout", formatRWF(estimatedPayout)],
                        [
                            "Payout Account",
                            account
                                ? `${account.provider} (${account.accountNumber})`
                                : "—",
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
                    By confirming, you agree to exit your investment and accept the payout amount shown
                    above. This cannot be undone.
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
                <Button
                    color="primary"
                    size="md"
                    onClick={() => goTo("payout-processing")}
                >
                    Confirm & Process Payout
                </Button>
            </div>
        </div>
    );
}

// ─── Payout Processing (reuses Section E pattern) ────────────────────────────

export function ExitPayoutProcessing({ inv, goTo }: EarlyExitFlowProps) {
    const { estimatedPayout } = getExitOffer(inv);

    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={Hourglass03} size="xl" color="brand" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Processing Payout</h2>
                <p className="mt-2 text-md text-tertiary">
                    Transferring {formatRWF(estimatedPayout)} to your payout account. This may take a
                    few moments.
                </p>
            </div>

            {/* Dev simulate buttons */}
            <div className="w-full rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-quaternary">
                    Dev: Simulate Result
                </p>
                <div className="flex gap-1.5">
                    <Button
                        color="primary"
                        size="xs"
                        onClick={() => goTo("payout-success")}
                    >
                        Simulate Success
                    </Button>
                    <Button
                        color="secondary"
                        size="xs"
                        onClick={() => goTo("payout-failed")}
                    >
                        Simulate Failed
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Payout Success ──────────────────────────────────────────────────────────

export function ExitPayoutSuccess({ inv, data }: EarlyExitFlowProps) {
    const { estimatedPayout } = getExitOffer(inv);
    const account = getPayoutAccount(data.payoutAccountId);

    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={Rocket01} size="xl" color="success" theme="light" />

            <div>
                <Badge color="success" size="md">Payout Complete</Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">
                    Early Exit Complete
                </h2>
                <p className="mt-2 text-md text-tertiary">
                    {formatRWF(estimatedPayout)} has been transferred to your{" "}
                    {account?.provider ?? "payout account"}. Your investment in {inv.name} is now
                    marked as Exited.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Investment", inv.name],
                        ["Final Payout", formatRWF(estimatedPayout)],
                        [
                            "Paid To",
                            account
                                ? `${account.provider} (${account.accountNumber})`
                                : "—",
                        ],
                        ["Investment Status", "Exited"],
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

// ─── Payout Failed (reuses Section E pattern) ────────────────────────────────

export function ExitPayoutFailed({ inv, goTo }: EarlyExitFlowProps) {
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
