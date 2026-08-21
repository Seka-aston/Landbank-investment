"use client";

import {
    ArrowRight,
    ChevronRight,
    MarkerPin01,
    TrendUp01,
    Wallet04,
    Briefcase01,
    CheckCircle,
    Clock,
    XCircle,
} from "@untitledui/icons";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { InvestorHeader } from "@/components/investor/header";
import { cx } from "@/utils/cx";
import {
    portfolioInvestments,
    getTotalPortfolioValue,
    formatRWF,
    type PortfolioInvestment,
    type PortfolioInvestmentStatus,
} from "@/lib/mock-data";

const statusConfig: Record<PortfolioInvestmentStatus, { label: string; color: "success" | "warning" | "gray"; icon: React.ComponentType<{ className?: string }> }> = {
    active: { label: "Active", color: "success", icon: TrendUp01 },
    matured: { label: "Matured", color: "warning", icon: Clock },
    exited: { label: "Exited", color: "gray", icon: XCircle },
};

function InvestmentCard({ inv }: { inv: PortfolioInvestment }) {
    const status = statusConfig[inv.status];
    const profitDisplay = inv.status === "exited"
        ? inv.currentValue - inv.principal
        : inv.accruedProfit;
    const profitIsPositive = profitDisplay >= 0;

    return (
        <a
            href={`/portfolio/${inv.id}`}
            className="flex items-center gap-4 rounded-xl border border-secondary bg-primary p-4 transition duration-100 hover:shadow-md"
        >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <MarkerPin01 className="size-5 text-fg-quaternary" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-primary">{inv.name}</p>
                    <BadgeWithDot size="sm" type="pill-color" color={status.color}>
                        {status.label}
                    </BadgeWithDot>
                </div>
                <p className="mt-0.5 text-xs text-tertiary">{inv.location}</p>
            </div>

            <div className="hidden shrink-0 text-right sm:block">
                <p className="text-sm font-semibold text-primary">{formatRWF(inv.currentValue)}</p>
                <p className={cx("text-xs font-medium", profitIsPositive ? "text-success-primary" : "text-error-primary")}>
                    {profitIsPositive ? "+" : ""}{formatRWF(profitDisplay)}
                </p>
            </div>

            <ChevronRight className="size-5 shrink-0 text-fg-quaternary" />
        </a>
    );
}

export function PortfolioOverviewScreen() {
    const totalValue = getTotalPortfolioValue();
    const activeInvestments = portfolioInvestments.filter((i) => i.status === "active");
    const totalProfit = activeInvestments.reduce((sum, i) => sum + i.accruedProfit, 0);

    return (
        <div className="flex min-h-dvh flex-col bg-secondary">
            <InvestorHeader />

            <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
                <div className="mb-6">
                    <h1 className="text-display-xs font-semibold text-primary">My Portfolio</h1>
                    <p className="mt-1 text-sm text-tertiary">Track and manage your land investments</p>
                </div>

                {/* Portfolio summary */}
                <div className="mb-6 rounded-xl border border-secondary bg-primary p-5">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                            <p className="text-xs text-tertiary">Total Portfolio Value</p>
                            <p className="mt-1 text-display-xs font-semibold text-primary">{formatRWF(totalValue)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-tertiary">Total Accrued Profit</p>
                            <p className="mt-1 text-lg font-semibold text-success-primary">+{formatRWF(totalProfit)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-tertiary">Active Investments</p>
                            <p className="mt-1 text-lg font-semibold text-primary">{activeInvestments.length}</p>
                        </div>
                    </div>
                </div>

                {/* Investment list */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-md font-semibold text-primary">Investments ({portfolioInvestments.length})</h2>
                    <Button href="/opportunities" color="link-color" size="sm" iconTrailing={ArrowRight}>
                        New Investment
                    </Button>
                </div>

                <div className="flex flex-col gap-3">
                    {portfolioInvestments.map((inv) => (
                        <InvestmentCard key={inv.id} inv={inv} />
                    ))}
                </div>

                {portfolioInvestments.length === 0 && (
                    <div className="flex flex-col items-center gap-4 rounded-xl border border-secondary bg-primary py-12 text-center">
                        <FeaturedIcon icon={Briefcase01} size="xl" color="gray" theme="light" />
                        <div>
                            <h3 className="text-md font-semibold text-primary">No investments yet</h3>
                            <p className="mt-1 text-sm text-tertiary">Browse available opportunities to make your first investment.</p>
                        </div>
                        <Button href="/opportunities" color="primary" size="md" iconTrailing={ArrowRight}>
                            Browse Opportunities
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
