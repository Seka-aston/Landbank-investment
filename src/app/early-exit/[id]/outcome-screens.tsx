"use client";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Clock,
    XCircle,
    Mail01,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { formatRWF } from "@/lib/mock-data";
import { getExitOffer } from "./exit-types";
import type { EarlyExitFlowProps } from "./exit-types";

// ─── Request Submitted (Staff Reviewing) ─────────────────────────────────────

export function RequestSubmittedScreen({ inv, goTo }: EarlyExitFlowProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4 py-4 text-center">
                <FeaturedIcon icon={Clock} size="xl" color="warning" theme="light" />
                <div>
                    <Badge color="warning" size="md">Under Review</Badge>
                    <h2 className="mt-3 text-display-xs font-semibold text-primary">
                        Request Submitted
                    </h2>
                    <p className="mt-2 text-md text-tertiary">
                        Your early exit request for {inv.name} is being reviewed by our team. This
                        usually takes 1–3 business days.
                    </p>
                </div>
                <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                    <div className="flex flex-col gap-2.5">
                        {[
                            ["Investment", inv.name],
                            ["Principal", formatRWF(inv.principal)],
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

            {/* Dev switcher */}
            <div className="rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-quaternary">
                    Dev: Simulate Review Outcome
                </p>
                <div className="flex flex-wrap gap-1.5">
                    <Button color="primary" size="xs" onClick={() => goTo("offer")}>
                        Simulate Approved
                    </Button>
                    <Button color="secondary" size="xs" onClick={() => goTo("rejected")}>
                        Simulate Rejected
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Rejected ────────────────────────────────────────────────────────────────

export function RejectedScreen({ inv, goTo }: EarlyExitFlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={XCircle} size="xl" color="error" theme="light" />

            <div>
                <Badge color="error" size="md">Rejected</Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">
                    Request Rejected
                </h2>
                <p className="mt-2 text-md text-tertiary">
                    Your early exit request for {inv.name} has been reviewed and could not be approved
                    at this time. The investment does not meet the minimum holding period requirement
                    for early exit eligibility.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Investment", inv.name],
                        ["Decision", "Not Approved"],
                        ["Reason", "Minimum holding period not met"],
                        ["Investment Status", "Remains Active"],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button
                    href={`/portfolio/${inv.id}`}
                    color="primary"
                    size="md"
                    iconLeading={ArrowLeft}
                    className="flex-1"
                >
                    Back to Investment
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
    );
}

// ─── Early Exit Offer ────────────────────────────────────────────────────────

export function OfferScreen({ inv, goTo }: EarlyExitFlowProps) {
    const { forfeitedProfit, retainedProfit, charges, estimatedPayout } = getExitOffer(inv);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-3 text-center">
                <FeaturedIcon icon={CheckCircle} size="xl" color="success" theme="light" />
                <Badge color="success" size="md">Approved</Badge>
                <h2 className="text-display-xs font-semibold text-primary">Early Exit Offer</h2>
                <p className="text-sm text-tertiary">
                    Your early exit request has been approved. Review the offer below.
                </p>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <h4 className="mb-3 text-sm font-semibold text-primary">Offer Breakdown</h4>
                <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Principal Returned</span>
                        <span className="font-medium text-primary">{formatRWF(inv.principal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Accrued Profit</span>
                        <span className="font-medium text-success-primary">
                            +{formatRWF(inv.accruedProfit)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Forfeited Profit (50%)</span>
                        <span className="font-medium text-error-primary">
                            -{formatRWF(forfeitedProfit)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Early Exit Charge (2.5%)</span>
                        <span className="font-medium text-error-primary">
                            -{formatRWF(charges)}
                        </span>
                    </div>
                    <div className="border-t border-secondary pt-2.5">
                        <div className="flex justify-between text-sm">
                            <span className="font-semibold text-primary">Estimated Payout</span>
                            <span className="text-md font-semibold text-brand-secondary">
                                {formatRWF(estimatedPayout)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <Clock className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                <p className="text-sm text-tertiary">
                    This offer is valid for 7 days. If you decline, your investment remains active with
                    no changes.
                </p>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" onClick={() => goTo("declined")}>
                    Decline Offer
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("payout-account")}
                >
                    Accept Offer
                </Button>
            </div>
        </div>
    );
}

// ─── Offer Declined ──────────────────────────────────────────────────────────

export function DeclinedScreen({ inv }: EarlyExitFlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={ArrowLeft} size="xl" color="gray" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">
                    Early Exit Cancelled
                </h2>
                <p className="mt-2 text-md text-tertiary">
                    You've declined the early exit offer. Your investment in {inv.name} remains active
                    and continues to accrue returns as normal.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Investment", inv.name],
                        ["Status", "Active"],
                        ["Current Value", formatRWF(inv.currentValue)],
                        ["Maturity Date", inv.maturityDate],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Button
                href={`/portfolio/${inv.id}`}
                color="primary"
                size="md"
                iconTrailing={ArrowRight}
                className="w-full"
            >
                Back to Investment
            </Button>
        </div>
    );
}
