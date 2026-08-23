"use client";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Wallet04,
    TrendUp01,
    CoinsStacked01,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { formatRWF } from "@/lib/mock-data";
import { cx } from "@/utils/cx";
import type { MaturityFlowProps, MaturityAction } from "./maturity-types";

// ─── Maturity Reached ────────────────────────────────────────────────────────

export function MaturityReachedScreen({ inv, goTo }: MaturityFlowProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={CheckCircle} size="xl" color="success" theme="light" />

            <div>
                <Badge color="success" size="md">Matured</Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">Investment Matured</h2>
                <p className="mt-2 text-md text-tertiary">
                    Your investment in {inv.name} has reached maturity. Choose how to handle your returns.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Principal Invested", formatRWF(inv.principal)],
                        ["Total Profit Earned", `+${formatRWF(inv.accruedProfit)}`],
                        ["Total Return", formatRWF(inv.currentValue)],
                        ["Term Completed", `${inv.term} months`],
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
                color="primary"
                size="md"
                iconTrailing={ArrowRight}
                onClick={() => goTo("choose-action")}
                className="w-full"
            >
                Choose What to Do
            </Button>
        </div>
    );
}

// ─── Choose Maturity Action ──────────────────────────────────────────────────

const actionOptions: {
    action: MaturityAction;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}[] = [
    {
        action: "payout",
        label: "Full Payout",
        description: "Receive the full maturity value to your payout account",
        icon: Wallet04,
    },
    {
        action: "reinvest",
        label: "Reinvest All",
        description: "Invest the full maturity value into a new opportunity",
        icon: TrendUp01,
    },
    {
        action: "split",
        label: "Split: Payout Profit, Reinvest Principal",
        description: "Receive profit as payout and reinvest the principal",
        icon: CoinsStacked01,
    },
];

export function ChooseActionScreen({ inv, data, updateData, goTo }: MaturityFlowProps) {
    const handleContinue = () => {
        if (!data.action) return;
        switch (data.action) {
            case "payout":
                goTo("payout-account");
                break;
            case "reinvest":
                goTo("reinvest-choose");
                break;
            case "split":
                goTo("split-payout-account");
                break;
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">What would you like to do?</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Your matured investment in {inv.name} is worth {formatRWF(inv.currentValue)}.
                    Choose how to handle your returns.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                {actionOptions.map((option) => {
                    const isSelected = data.action === option.action;
                    return (
                        <button
                            key={option.action}
                            onClick={() => updateData({ action: option.action })}
                            className={cx(
                                "flex items-start gap-4 rounded-xl border p-4 text-left transition duration-100",
                                isSelected
                                    ? "border-brand bg-brand-secondary ring-1 ring-brand"
                                    : "border-secondary bg-primary hover:bg-secondary",
                            )}
                        >
                            <div
                                className={cx(
                                    "flex size-10 shrink-0 items-center justify-center rounded-lg",
                                    isSelected ? "bg-brand-solid" : "bg-secondary",
                                )}
                            >
                                <option.icon
                                    className={cx("size-5", isSelected ? "text-fg-white" : "text-fg-quaternary")}
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-primary">{option.label}</p>
                                <p className="mt-0.5 text-sm text-tertiary">{option.description}</p>
                                {option.action === "split" && (
                                    <p className="mt-1 text-xs text-quaternary">
                                        Profit: {formatRWF(inv.accruedProfit)} → payout · Principal:{" "}
                                        {formatRWF(inv.principal)} → reinvest
                                    </p>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button
                    color="secondary"
                    size="md"
                    iconLeading={ArrowLeft}
                    onClick={() => goTo("maturity-reached")}
                >
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={handleContinue}
                    isDisabled={!data.action}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
