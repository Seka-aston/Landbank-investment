"use client";

import {
    ArrowLeft,
    ArrowRight,
    MarkerPin01,
    TrendUp01,
    Wallet04,
    Phone,
    Plus,
    Rocket01,
    ShieldTick,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import {
    formatRWF,
    opportunities,
    getOpportunityBySlug,
    getFundingPercentage,
    payoutAccounts,
    getPayoutAccount,
} from "@/lib/mock-data";
import { cx } from "@/utils/cx";
import type { MaturityFlowProps, MaturityScreen } from "./maturity-types";

// ─── Shared: Opportunity Picker ──────────────────────────────────────────────

function OpportunityPicker({
    selectedSlug,
    onSelect,
}: {
    selectedSlug: string;
    onSelect: (slug: string) => void;
}) {
    const available = opportunities.filter((o) => o.status !== "fully-funded");

    return (
        <div className="flex flex-col gap-2">
            {available.map((opp) => {
                const isSelected = selectedSlug === opp.slug;
                const funded = getFundingPercentage(opp);
                return (
                    <button
                        key={opp.slug}
                        onClick={() => onSelect(opp.slug)}
                        className={cx(
                            "flex items-center gap-3 rounded-xl border p-4 text-left transition duration-100",
                            isSelected
                                ? "border-brand bg-brand-secondary ring-1 ring-brand"
                                : "border-secondary bg-primary hover:bg-secondary",
                        )}
                    >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <MarkerPin01 className="size-5 text-fg-quaternary" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-primary">{opp.name}</p>
                            <p className="mt-0.5 text-xs text-tertiary">{opp.location}</p>
                            <div className="mt-1 flex items-center gap-3 text-xs text-quaternary">
                                <span>{opp.annualReturn}% annual</span>
                                <span>{opp.term} months</span>
                                <span>{funded}% funded</span>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

// ─── Reinvest: Choose Opportunity ────────────────────────────────────────────

export function ReinvestChoose({ inv, data, updateData, goTo }: MaturityFlowProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Choose a New Opportunity</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Select where to reinvest your {formatRWF(inv.currentValue)} from {inv.name}.
                </p>
            </div>

            <OpportunityPicker
                selectedSlug={data.reinvestOpportunitySlug}
                onSelect={(slug) => updateData({ reinvestOpportunitySlug: slug })}
            />

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
                    onClick={() => goTo("reinvest-review")}
                    isDisabled={!data.reinvestOpportunitySlug}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

// ─── Reinvest: Review ────────────────────────────────────────────────────────

export function ReinvestReview({ inv, data, goTo }: MaturityFlowProps) {
    const newOpp = getOpportunityBySlug(data.reinvestOpportunitySlug);
    const reinvestAmount = inv.currentValue;
    const shares = newOpp ? Math.floor(reinvestAmount / newOpp.sharePrice) : 0;
    const actualAmount = newOpp ? shares * newOpp.sharePrice : 0;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Review Reinvestment</h2>
                <p className="mt-1 text-sm text-tertiary">Confirm the details of your reinvestment.</p>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tertiary">
                    From (Matured)
                </h4>
                <div className="flex flex-col gap-2">
                    {[
                        ["Investment", inv.name],
                        ["Maturity Value", formatRWF(inv.currentValue)],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-brand bg-brand-secondary p-4">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-secondary">
                    To (New Investment)
                </h4>
                <div className="flex flex-col gap-2">
                    {[
                        ["Opportunity", newOpp?.name ?? "—"],
                        ["Location", newOpp?.location ?? "—"],
                        ["Amount", formatRWF(actualAmount)],
                        ["Shares", shares.toString()],
                        ["Annual Return", `${newOpp?.annualReturn ?? 0}%`],
                        ["Term", `${newOpp?.term ?? 0} months`],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {actualAmount < inv.currentValue && (
                <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                    <ShieldTick className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                    <p className="text-sm text-tertiary">
                        Remainder of {formatRWF(inv.currentValue - actualAmount)} (not enough for a full
                        share) will be returned to your default payout account.
                    </p>
                </div>
            )}

            <div className="flex items-center justify-between pt-2">
                <Button
                    color="secondary"
                    size="md"
                    iconLeading={ArrowLeft}
                    onClick={() => goTo("reinvest-choose")}
                >
                    Back
                </Button>
                <Button color="primary" size="md" onClick={() => goTo("reinvest-confirmed")}>
                    Confirm Reinvestment
                </Button>
            </div>
        </div>
    );
}

// ─── Reinvest: Confirmed ─────────────────────────────────────────────────────

export function ReinvestConfirmed({ inv, data }: MaturityFlowProps) {
    const newOpp = getOpportunityBySlug(data.reinvestOpportunitySlug);

    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={Rocket01} size="xl" color="success" theme="light" />

            <div>
                <Badge color="success" size="md">Reinvested</Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">
                    Reinvestment Confirmed!
                </h2>
                <p className="mt-2 text-md text-tertiary">
                    Your matured return from {inv.name} has been reinvested into{" "}
                    {newOpp?.name ?? "a new opportunity"}.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Previous Investment", inv.name],
                        ["Maturity Value", formatRWF(inv.currentValue)],
                        ["New Investment", newOpp?.name ?? "—"],
                        ["Annual Return", `${newOpp?.annualReturn ?? 0}%`],
                        ["Term", `${newOpp?.term ?? 0} months`],
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
                    href="/portfolio"
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    className="flex-1"
                >
                    View in Portfolio
                </Button>
                <Button href="/opportunities" color="secondary" size="md" className="flex-1">
                    Browse Opportunities
                </Button>
            </div>
        </div>
    );
}

// ─── Split: Select Payout Account ────────────────────────────────────────────

export function SplitPayoutAccount({ inv, data, updateData, goTo }: MaturityFlowProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Select Payout Account</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Your profit of {formatRWF(inv.accruedProfit)} will be paid out. Choose where to
                    receive it.
                </p>
            </div>

            <div className="rounded-xl border border-secondary bg-secondary p-3">
                <div className="flex justify-between text-sm">
                    <span className="text-tertiary">Profit → Payout</span>
                    <span className="font-semibold text-success-primary">
                        +{formatRWF(inv.accruedProfit)}
                    </span>
                </div>
                <div className="mt-1 flex justify-between text-sm">
                    <span className="text-tertiary">Principal → Reinvest</span>
                    <span className="font-semibold text-brand-secondary">
                        {formatRWF(inv.principal)}
                    </span>
                </div>
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
                                    className={cx(
                                        "size-4.5",
                                        isSelected ? "text-fg-white" : "text-fg-quaternary",
                                    )}
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
                    onClick={() => goTo("split-choose-opportunity")}
                    isDisabled={!data.payoutAccountId}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

// ─── Split: Choose Opportunity ───────────────────────────────────────────────

export function SplitChooseOpportunity({ inv, data, updateData, goTo }: MaturityFlowProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">
                    Choose Opportunity for Principal
                </h2>
                <p className="mt-1 text-sm text-tertiary">
                    Select where to reinvest your principal of {formatRWF(inv.principal)}.
                </p>
            </div>

            <OpportunityPicker
                selectedSlug={data.reinvestOpportunitySlug}
                onSelect={(slug) => updateData({ reinvestOpportunitySlug: slug })}
            />

            <div className="flex items-center justify-between pt-2">
                <Button
                    color="secondary"
                    size="md"
                    iconLeading={ArrowLeft}
                    onClick={() => goTo("split-payout-account")}
                >
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("split-review")}
                    isDisabled={!data.reinvestOpportunitySlug}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

// ─── Split: Review ───────────────────────────────────────────────────────────

export function SplitReview({ inv, data, goTo }: MaturityFlowProps) {
    const account = getPayoutAccount(data.payoutAccountId);
    const newOpp = getOpportunityBySlug(data.reinvestOpportunitySlug);
    const shares = newOpp ? Math.floor(inv.principal / newOpp.sharePrice) : 0;
    const actualReinvest = newOpp ? shares * newOpp.sharePrice : 0;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">
                    Review Split Transaction
                </h2>
                <p className="mt-1 text-sm text-tertiary">
                    Confirm both parts of your split transaction.
                </p>
            </div>

            {/* Payout portion */}
            <div className="rounded-xl border border-secondary bg-primary p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                    <Wallet04 className="size-4 text-fg-quaternary" />
                    Payout (Profit)
                </h4>
                <div className="flex flex-col gap-2">
                    {[
                        ["Amount", formatRWF(inv.accruedProfit)],
                        [
                            "Account",
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

            {/* Reinvest portion */}
            <div className="rounded-xl border border-brand bg-brand-secondary p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand-secondary">
                    <TrendUp01 className="size-4" />
                    Reinvestment (Principal)
                </h4>
                <div className="flex flex-col gap-2">
                    {[
                        ["Amount", formatRWF(actualReinvest)],
                        ["Opportunity", newOpp?.name ?? "—"],
                        ["Shares", shares.toString()],
                        ["Annual Return", `${newOpp?.annualReturn ?? 0}%`],
                        ["Term", `${newOpp?.term ?? 0} months`],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {actualReinvest < inv.principal && (
                <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                    <ShieldTick className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                    <p className="text-sm text-tertiary">
                        Remainder of {formatRWF(inv.principal - actualReinvest)} will be added to your
                        payout.
                    </p>
                </div>
            )}

            <div className="flex items-center justify-between pt-2">
                <Button
                    color="secondary"
                    size="md"
                    iconLeading={ArrowLeft}
                    onClick={() => goTo("split-choose-opportunity")}
                >
                    Back
                </Button>
                <Button color="primary" size="md" onClick={() => goTo("split-confirmed")}>
                    Confirm Split Transaction
                </Button>
            </div>
        </div>
    );
}

// ─── Split: Confirmed ────────────────────────────────────────────────────────

export function SplitConfirmed({ inv, data }: MaturityFlowProps) {
    const account = getPayoutAccount(data.payoutAccountId);
    const newOpp = getOpportunityBySlug(data.reinvestOpportunitySlug);

    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={Rocket01} size="xl" color="success" theme="light" />

            <div>
                <Badge color="success" size="md">Complete</Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">
                    Split Transaction Complete!
                </h2>
                <p className="mt-2 text-md text-tertiary">
                    Your profit has been paid out and your principal has been reinvested.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-tertiary">
                    Profit Payout
                </h4>
                <div className="flex flex-col gap-2">
                    {[
                        ["Amount", `+${formatRWF(inv.accruedProfit)}`],
                        ["Paid To", account ? account.provider : "—"],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-success-primary">{value}</span>
                        </div>
                    ))}
                </div>
                <div className="my-3 border-t border-secondary" />
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-tertiary">
                    Principal Reinvested
                </h4>
                <div className="flex flex-col gap-2">
                    {[
                        ["Amount", formatRWF(inv.principal)],
                        ["New Investment", newOpp?.name ?? "—"],
                        ["Term", `${newOpp?.term ?? 0} months`],
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
                    href="/portfolio"
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    className="flex-1"
                >
                    View in Portfolio
                </Button>
                <Button href="/opportunities" color="secondary" size="md" className="flex-1">
                    Browse Opportunities
                </Button>
            </div>
        </div>
    );
}
