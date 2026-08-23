"use client";

import { use, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ChevronRight,
    MarkerPin01,
    TrendUp01,
    Clock,
    Calendar,
    Wallet04,
    CoinsStacked01,
    BarChart04,
    Receipt,
    File06,
    Bell01,
    LifeBuoy01,
    LogOut01,
    Download01,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Mail01,
    Phone,
    Hourglass03,
} from "@untitledui/icons";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { InvestorHeader } from "@/components/investor/header";
import { cx } from "@/utils/cx";
import {
    getPortfolioInvestment,
    getElapsedMonths,
    getRemainingMonths,
    formatRWF,
    type PortfolioInvestment,
    type PortfolioInvestmentStatus,
} from "@/lib/mock-data";

type SubPage = "overview" | "profit" | "payments" | "documents" | "updates" | "support" | "early-exit" | "maturity";

const statusConfig: Record<PortfolioInvestmentStatus, { label: string; color: "success" | "warning" | "gray" }> = {
    active: { label: "Active", color: "success" },
    matured: { label: "Matured", color: "warning" },
    exited: { label: "Exited", color: "gray" },
};

// ─── Investment Overview (default sub-page) ──────────────────────────────────

function OverviewView({ inv, goTo }: { inv: PortfolioInvestment; goTo: (p: SubPage) => void }) {
    const status = statusConfig[inv.status];
    const elapsed = getElapsedMonths(inv.startDate);
    const remaining = getRemainingMonths(inv.maturityDate);

    const menuItems: { label: string; icon: React.ComponentType<{ className?: string }>; page: SubPage }[] = [
        { label: "Profit History", icon: BarChart04, page: "profit" },
        { label: "Payment History", icon: Receipt, page: "payments" },
        { label: "Documents & Agreement", icon: File06, page: "documents" },
        { label: "Plot Updates", icon: Bell01, page: "updates" },
        { label: "Investment Support", icon: LifeBuoy01, page: "support" },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Status + summary header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-display-xs font-semibold text-primary">{inv.name}</h2>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-tertiary">
                        <MarkerPin01 className="size-4 text-fg-quaternary" />
                        <span>{inv.location}</span>
                    </div>
                </div>
                <BadgeWithDot size="md" type="pill-color" color={status.color}>
                    {status.label}
                </BadgeWithDot>
            </div>

            {/* Key metrics card */}
            <div className="rounded-xl border border-secondary bg-primary">
                <div className="grid grid-cols-2 gap-px bg-secondary sm:grid-cols-3">
                    {[
                        { label: "Principal", value: formatRWF(inv.principal) },
                        { label: "Current Value", value: formatRWF(inv.currentValue), highlight: true },
                        { label: "Annual Return", value: `${inv.annualReturn}%` },
                        { label: "Daily Accrual", value: inv.dailyAccrual > 0 ? `+${formatRWF(inv.dailyAccrual)}/day` : "—" },
                        { label: "Accrued Profit", value: inv.accruedProfit > 0 ? `+${formatRWF(inv.accruedProfit)}` : "—", success: true },
                        { label: "Projected at Maturity", value: formatRWF(inv.projectedMaturityValue) },
                    ].map((item) => (
                        <div key={item.label} className="bg-primary p-4">
                            <p className="text-xs text-tertiary">{item.label}</p>
                            <p
                                className={cx(
                                    "mt-1 text-sm font-semibold",
                                    item.success ? "text-success-primary" : item.highlight ? "text-brand-secondary" : "text-primary",
                                )}
                            >
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Term progress */}
            <div className="rounded-xl border border-secondary bg-primary p-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-tertiary">Term Progress</span>
                    <span className="font-medium text-secondary">
                        {elapsed} of {inv.term} months
                    </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-quaternary">
                    <div
                        className={cx(
                            "h-full rounded-full",
                            inv.status === "matured" ? "bg-warning-solid" : inv.status === "exited" ? "bg-tertiary" : "bg-brand-solid",
                        )}
                        style={{ width: `${Math.min(100, (elapsed / inv.term) * 100)}%` }}
                    />
                </div>
                <div className="mt-2 flex justify-between text-xs text-tertiary">
                    <span>Started {inv.startDate}</span>
                    <span>Matures {inv.maturityDate}</span>
                </div>
            </div>

            {/* Matured banner */}
            {inv.status === "matured" && (
                <div className="flex items-start gap-3 rounded-xl border border-brand bg-brand-secondary p-4">
                    <FeaturedIcon icon={CheckCircle} size="sm" color="brand" theme="light" />
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-primary">This investment has matured</p>
                        <p className="mt-0.5 text-sm text-tertiary">
                            Your investment reached maturity on {inv.maturityDate}. Choose to receive a payout or reinvest.
                        </p>
                    </div>
                    <Button color="primary" size="sm" onClick={() => goTo("maturity")}>
                        View Options
                    </Button>
                </div>
            )}

            {/* Exited banner */}
            {inv.status === "exited" && (
                <div className="flex items-start gap-3 rounded-xl border border-secondary bg-secondary p-4">
                    <FeaturedIcon icon={XCircle} size="sm" color="gray" theme="light" />
                    <div>
                        <p className="text-sm font-semibold text-primary">This investment was exited early</p>
                        <p className="mt-0.5 text-sm text-tertiary">
                            Final payout: {formatRWF(inv.currentValue)}. See Payment History for details.
                        </p>
                    </div>
                </div>
            )}

            {/* Navigation menu */}
            <div className="flex flex-col gap-1">
                {menuItems.map((item) => (
                    <button
                        key={item.page}
                        onClick={() => goTo(item.page)}
                        className="flex items-center gap-3 rounded-lg p-3 text-left transition duration-100 hover:bg-secondary"
                    >
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <item.icon className="size-4.5 text-fg-quaternary" />
                        </div>
                        <span className="flex-1 text-sm font-medium text-secondary">{item.label}</span>
                        <ChevronRight className="size-4 text-fg-quaternary" />
                    </button>
                ))}
            </div>

            {/* Early exit action for active investments */}
            {inv.status === "active" && (
                <div className="border-t border-secondary pt-4">
                    <Button
                        color="tertiary"
                        size="sm"
                        iconLeading={LogOut01}
                        onClick={() => goTo("early-exit")}
                        className="w-full"
                    >
                        Request Early Exit
                    </Button>
                </div>
            )}
        </div>
    );
}

// ─── Profit History ──────────────────────────────────────────────────────────

function ProfitHistoryView({ inv, goTo }: { inv: PortfolioInvestment; goTo: (p: SubPage) => void }) {
    const entries = inv.profitHistory;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <button onClick={() => goTo("overview")} className="mb-2 flex items-center gap-1 text-sm text-brand-secondary hover:underline">
                    <ArrowLeft className="size-4" /> Back to Investment
                </button>
                <h2 className="text-display-xs font-semibold text-primary">Profit History</h2>
                <p className="mt-1 text-sm text-tertiary">Accrued profit over time for {inv.name}</p>
            </div>

            {/* Simple bar chart */}
            <div className="rounded-xl border border-secondary bg-primary p-4">
                <div className="flex items-end gap-1.5" style={{ height: 120 }}>
                    {entries.map((entry) => {
                        const maxAmount = Math.max(...entries.map((e) => e.amount));
                        const height = maxAmount > 0 ? (entry.amount / maxAmount) * 100 : 0;
                        return (
                            <div key={entry.date} className="flex flex-1 flex-col items-center gap-1">
                                <div
                                    className="w-full rounded-t bg-brand-solid transition-all duration-100"
                                    style={{ height: `${height}%`, minHeight: 4 }}
                                />
                                <span className="text-[10px] text-quaternary">
                                    {new Date(entry.date).toLocaleDateString("en-US", { month: "short" })}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Profit table */}
            <div className="rounded-xl border border-secondary bg-primary">
                <div className="border-b border-secondary bg-secondary px-4 py-2.5">
                    <div className="grid grid-cols-3 text-xs font-medium text-tertiary">
                        <span>Period</span>
                        <span className="text-right">Accrued</span>
                        <span className="text-right">Cumulative</span>
                    </div>
                </div>
                <div className="flex flex-col divide-y divide-secondary">
                    {entries.map((entry) => (
                        <div key={entry.date} className="grid grid-cols-3 px-4 py-3">
                            <span className="text-sm text-secondary">
                                {new Date(entry.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                            </span>
                            <span className="text-right text-sm font-medium text-success-primary">+{formatRWF(entry.amount)}</span>
                            <span className="text-right text-sm font-medium text-primary">{formatRWF(entry.cumulative)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Payment History ─────────────────────────────────────────────────────────

function PaymentHistoryView({ inv, goTo }: { inv: PortfolioInvestment; goTo: (p: SubPage) => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <button onClick={() => goTo("overview")} className="mb-2 flex items-center gap-1 text-sm text-brand-secondary hover:underline">
                    <ArrowLeft className="size-4" /> Back to Investment
                </button>
                <h2 className="text-display-xs font-semibold text-primary">Payment History</h2>
            </div>

            <div className="flex flex-col gap-3">
                {inv.paymentHistory.map((payment) => (
                    <div key={payment.reference} className="rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-semibold text-primary">{payment.type}</p>
                                <p className="mt-0.5 text-xs text-tertiary">{payment.method}</p>
                            </div>
                            <div className="text-right">
                                <p className={cx(
                                    "text-sm font-semibold",
                                    payment.type === "Investment" ? "text-primary" : "text-success-primary",
                                )}>
                                    {payment.type === "Investment" ? "" : "+"}{formatRWF(payment.amount)}
                                </p>
                                <p className="mt-0.5 text-xs text-tertiary">{payment.date}</p>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-quaternary">
                            <Receipt className="size-3" />
                            <span>{payment.reference}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Documents & Agreement ───────────────────────────────────────────────────

function DocumentsView({ inv, goTo }: { inv: PortfolioInvestment; goTo: (p: SubPage) => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <button onClick={() => goTo("overview")} className="mb-2 flex items-center gap-1 text-sm text-brand-secondary hover:underline">
                    <ArrowLeft className="size-4" /> Back to Investment
                </button>
                <h2 className="text-display-xs font-semibold text-primary">Documents & Agreement</h2>
            </div>

            <div className="flex flex-col gap-2">
                {inv.documents.map((doc) => (
                    <div key={doc.name} className="flex items-center gap-3 rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <File06 className="size-4.5 text-fg-quaternary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-primary">{doc.name}</p>
                            <p className="text-xs text-tertiary">{doc.type} · {doc.size}</p>
                        </div>
                        <Button color="tertiary" size="xs" iconLeading={Download01}>
                            Download
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Plot Updates ────────────────────────────────────────────────────────────

function PlotUpdatesView({ inv, goTo }: { inv: PortfolioInvestment; goTo: (p: SubPage) => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <button onClick={() => goTo("overview")} className="mb-2 flex items-center gap-1 text-sm text-brand-secondary hover:underline">
                    <ArrowLeft className="size-4" /> Back to Investment
                </button>
                <h2 className="text-display-xs font-semibold text-primary">Plot Updates</h2>
            </div>

            <div className="flex flex-col gap-3">
                {inv.updates.map((update) => (
                    <div key={update.date + update.title} className="rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex items-center gap-2">
                            <Bell01 className="size-4 text-fg-quaternary" />
                            <p className="text-sm font-semibold text-primary">{update.title}</p>
                        </div>
                        <p className="mt-1.5 text-sm text-tertiary">{update.content}</p>
                        <p className="mt-2 text-xs text-quaternary">{update.date}</p>
                    </div>
                ))}
            </div>

            {inv.updates.length === 0 && (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-secondary bg-primary py-10 text-center">
                    <FeaturedIcon icon={Bell01} size="lg" color="gray" theme="light" />
                    <p className="text-sm text-tertiary">No updates available for this plot yet.</p>
                </div>
            )}
        </div>
    );
}

// ─── Investment Support ──────────────────────────────────────────────────────

function SupportView({ inv, goTo }: { inv: PortfolioInvestment; goTo: (p: SubPage) => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <button onClick={() => goTo("overview")} className="mb-2 flex items-center gap-1 text-sm text-brand-secondary hover:underline">
                    <ArrowLeft className="size-4" /> Back to Investment
                </button>
                <h2 className="text-display-xs font-semibold text-primary">Investment Support</h2>
                <p className="mt-1 text-sm text-tertiary">Get help with your investment in {inv.name}</p>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-5">
                <h3 className="text-sm font-semibold text-primary">Contact Our Team</h3>
                <p className="mt-1.5 text-sm text-tertiary">
                    Our investor support team is available Monday–Friday, 8:00 AM – 6:00 PM (CAT).
                </p>
                <div className="mt-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm text-tertiary">
                        <Mail01 className="size-4 text-fg-quaternary" />
                        <span>support@landbank.rw</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-tertiary">
                        <Phone className="size-4 text-fg-quaternary" />
                        <span>+250 788 000 000</span>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-5">
                <h3 className="text-sm font-semibold text-primary">Common Questions</h3>
                <div className="mt-3 flex flex-col gap-3">
                    {[
                        "How are my returns calculated?",
                        "When will I receive my profit distribution?",
                        "Can I increase my investment in this opportunity?",
                        "What happens if land value decreases?",
                    ].map((q) => (
                        <div key={q} className="flex items-start gap-2.5 text-sm text-tertiary">
                            <LifeBuoy01 className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                            <span>{q}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button href="mailto:support@landbank.rw" color="primary" size="md" iconLeading={Mail01} className="flex-1">
                    Email Support
                </Button>
                <Button href="tel:+250788000000" color="secondary" size="md" iconLeading={Phone} className="flex-1">
                    Call Support
                </Button>
            </div>
        </div>
    );
}

// ─── Early Exit View ─────────────────────────────────────────────────────────

function EarlyExitView({ inv, goTo }: { inv: PortfolioInvestment; goTo: (p: SubPage) => void }) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={LogOut01} size="xl" color="warning" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Request Early Exit</h2>
                <p className="mt-2 text-md text-tertiary">
                    Early exit allows you to withdraw your investment before the maturity date, subject to applicable charges and
                    forfeiture of some accrued returns.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Investment", inv.name],
                        ["Principal", formatRWF(inv.principal)],
                        ["Accrued Profit", `+${formatRWF(inv.accruedProfit)}`],
                        ["Status", inv.status === "active" ? "Active" : inv.status],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex w-full flex-col gap-3">
                <Button href={`/early-exit/${inv.id}`} color="primary" size="md" iconTrailing={ArrowRight} className="w-full">
                    Begin Early Exit
                </Button>
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("overview")} className="w-full">
                    Back to Investment
                </Button>
            </div>
        </div>
    );
}

// ─── Maturity View ───────────────────────────────────────────────────────────

function MaturityView({ inv, goTo }: { inv: PortfolioInvestment; goTo: (p: SubPage) => void }) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={CheckCircle} size="xl" color="success" theme="light" />

            <div>
                <Badge color="success" size="md">Matured</Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">Investment Matured</h2>
                <p className="mt-2 text-md text-tertiary">
                    Your investment in {inv.name} has reached maturity. Your total return is {formatRWF(inv.currentValue)}.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Principal Invested", formatRWF(inv.principal)],
                        ["Total Profit Earned", `+${formatRWF(inv.accruedProfit)}`],
                        ["Total Return", formatRWF(inv.currentValue)],
                        ["Term Completed", `${inv.term} months`],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex w-full flex-col gap-3">
                <Button href={`/maturity/${inv.id}`} color="primary" size="md" iconTrailing={ArrowRight} className="w-full">
                    Choose Payout or Reinvest
                </Button>
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("overview")} className="w-full">
                    Back to Investment
                </Button>
            </div>
        </div>
    );
}

// ─── Main Detail Screen ──────────────────────────────────────────────────────

export function InvestmentDetailScreen({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const inv = getPortfolioInvestment(id);
    const [subPage, setSubPage] = useState<SubPage>("overview");

    const goTo = (page: SubPage) => {
        setSubPage(page);
        window.scrollTo(0, 0);
    };

    if (!inv) {
        return (
            <div className="flex min-h-dvh flex-col bg-secondary">
                <InvestorHeader />
                <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
                    <FeaturedIcon icon={AlertTriangle} size="xl" color="warning" theme="light" />
                    <h2 className="text-display-xs font-semibold text-primary">Investment Not Found</h2>
                    <p className="text-md text-tertiary">The investment you're looking for doesn't exist.</p>
                    <Button href="/portfolio" color="primary" size="md" iconLeading={ArrowLeft}>
                        Back to Portfolio
                    </Button>
                </div>
            </div>
        );
    }

    const renderSubPage = () => {
        switch (subPage) {
            case "overview":
                return <OverviewView inv={inv} goTo={goTo} />;
            case "profit":
                return <ProfitHistoryView inv={inv} goTo={goTo} />;
            case "payments":
                return <PaymentHistoryView inv={inv} goTo={goTo} />;
            case "documents":
                return <DocumentsView inv={inv} goTo={goTo} />;
            case "updates":
                return <PlotUpdatesView inv={inv} goTo={goTo} />;
            case "support":
                return <SupportView inv={inv} goTo={goTo} />;
            case "early-exit":
                return <EarlyExitView inv={inv} goTo={goTo} />;
            case "maturity":
                return <MaturityView inv={inv} goTo={goTo} />;
        }
    };

    return (
        <div className="flex min-h-dvh flex-col bg-secondary">
            <InvestorHeader />

            <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
                {/* Back to portfolio link */}
                {subPage === "overview" && (
                    <div className="mb-4">
                        <Button href="/portfolio" color="tertiary" size="sm" iconLeading={ArrowLeft}>
                            Back to Portfolio
                        </Button>
                    </div>
                )}

                {/* Content card */}
                <div className="rounded-xl border border-secondary bg-primary p-5 sm:p-6">
                    {renderSubPage()}
                </div>
            </div>
        </div>
    );
}
