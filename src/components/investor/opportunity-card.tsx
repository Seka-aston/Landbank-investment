"use client";

import { ArrowUpRight, MarkerPin01 } from "@untitledui/icons";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import type { InvestmentOpportunity } from "@/lib/mock-data";
import { formatRWF, getFundingPercentage, getSharesRemaining } from "@/lib/mock-data";

const statusConfig = {
    open: { label: "Open", color: "success" as const },
    "closing-soon": { label: "Closing Soon", color: "warning" as const },
    "fully-funded": { label: "Fully Funded", color: "gray" as const },
};

const riskConfig = {
    low: { label: "Low Risk", color: "success" as const },
    medium: { label: "Medium Risk", color: "warning" as const },
    high: { label: "High Risk", color: "error" as const },
};

export const OpportunityCard = ({ opportunity }: { opportunity: InvestmentOpportunity }) => {
    const status = statusConfig[opportunity.status];
    const risk = riskConfig[opportunity.riskLevel];
    const fundingPct = getFundingPercentage(opportunity);
    const sharesRemaining = getSharesRemaining(opportunity);
    const isClosed = opportunity.status === "fully-funded";

    return (
        <a
            href={`/opportunities/${opportunity.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs transition duration-100 ease-linear hover:shadow-md"
        >
            <div className="relative h-48 bg-secondary sm:h-52">
                <div className="flex size-full items-center justify-center bg-tertiary">
                    <MarkerPin01 className="size-10 text-fg-quaternary" />
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                    <BadgeWithDot size="sm" type="pill-color" color={status.color}>
                        {status.label}
                    </BadgeWithDot>
                </div>
                {isClosed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/60">
                        <Badge size="lg" type="color" color="gray">
                            Fully Funded
                        </Badge>
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
                <div className="flex flex-col gap-1">
                    <h3 className="text-md font-semibold text-primary group-hover:text-brand-secondary">{opportunity.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-tertiary">
                        <MarkerPin01 className="size-3.5 text-fg-quaternary" />
                        {opportunity.location}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-tertiary">Min. Investment</span>
                        <span className="text-sm font-semibold text-primary">{formatRWF(opportunity.minInvestment)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-tertiary">Annual Return</span>
                        <span className="text-sm font-semibold text-success-primary">{opportunity.annualReturn}%</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-tertiary">Term</span>
                        <span className="text-sm font-medium text-secondary">{opportunity.term} months</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-tertiary">Plot Size</span>
                        <span className="text-sm font-medium text-secondary">{opportunity.plotSize.toLocaleString()} sqm</span>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-tertiary">{fundingPct}% funded</span>
                        <span className="text-tertiary">{sharesRemaining} shares left</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-quaternary">
                        <div
                            className={`h-full rounded-full transition-all ${isClosed ? "bg-tertiary" : "bg-brand-solid"}`}
                            style={{ width: `${fundingPct}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-secondary pt-3">
                    <div className="flex gap-2">
                        <Badge size="sm" type="pill-color" color={risk.color}>
                            {risk.label}
                        </Badge>
                    </div>
                    {!isClosed ? (
                        <Button color="link-color" size="xs" iconTrailing={ArrowUpRight}>
                            View Details
                        </Button>
                    ) : (
                        <span className="text-xs text-quaternary">Closed to new investors</span>
                    )}
                </div>
            </div>
        </a>
    );
};
