"use client";

import { use, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    BookmarkCheck,
    Share07,
    MarkerPin01,
    Clock,
    TrendUp01,
    AlertTriangle,
    File06,
    Download01,
    CheckCircle,
    XCircle,
    Calculator,
    Map01,
    ShieldTick,
    Bell01,
} from "@untitledui/icons";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Tabs } from "@/components/application/tabs/tabs";
import { InvestorHeader } from "@/components/investor/header";
import { getOpportunityBySlug, getFundingPercentage, getSharesRemaining, formatRWF } from "@/lib/mock-data";
import type { InvestmentOpportunity } from "@/lib/mock-data";

const riskConfig = {
    low: { label: "Low Risk", color: "success" as const },
    medium: { label: "Medium Risk", color: "warning" as const },
    high: { label: "High Risk", color: "error" as const },
};

const statusConfig = {
    open: { label: "Open for Investment", color: "success" as const },
    "closing-soon": { label: "Closing Soon", color: "warning" as const },
    "fully-funded": { label: "Fully Funded", color: "gray" as const },
};

function OverviewTab({ opp }: { opp: InvestmentOpportunity }) {
    const fundingPct = getFundingPercentage(opp);
    const sharesRemaining = getSharesRemaining(opp);

    return (
        <div className="flex flex-col gap-6">
            <p className="text-md text-secondary">{opp.description}</p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Share Price", value: formatRWF(opp.sharePrice) },
                    { label: "Min. Investment", value: formatRWF(opp.minInvestment) },
                    { label: "Annual Return", value: `${opp.annualReturn}%`, highlight: true },
                    { label: "Term", value: `${opp.term} months` },
                    { label: "Total Value", value: formatRWF(opp.totalValue) },
                    { label: "Total Shares", value: opp.totalShares.toLocaleString() },
                    { label: "Shares Sold", value: opp.sharesSold.toLocaleString() },
                    { label: "Shares Remaining", value: sharesRemaining.toLocaleString() },
                ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-secondary bg-secondary p-4">
                        <span className="text-xs text-tertiary">{item.label}</span>
                        <p className={`mt-0.5 text-lg font-semibold ${item.highlight ? "text-success-primary" : "text-primary"}`}>
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-secondary">Funding Progress</span>
                    <span className="text-tertiary">
                        {fundingPct}% — {sharesRemaining} shares remaining
                    </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-quaternary">
                    <div
                        className={`h-full rounded-full ${opp.status === "fully-funded" ? "bg-tertiary" : "bg-brand-solid"}`}
                        style={{ width: `${fundingPct}%` }}
                    />
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-md font-semibold text-primary">Investment Highlights</h3>
                <ul className="flex flex-col gap-2">
                    {opp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                            <CheckCircle className="mt-0.5 size-4 shrink-0 text-fg-success-secondary" />
                            {h}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function ReturnCalculatorTab({ opp }: { opp: InvestmentOpportunity }) {
    const [investAmount, setInvestAmount] = useState(opp.minInvestment.toString());
    const amount = Number(investAmount) || 0;
    const monthlyReturn = (amount * (opp.annualReturn / 100)) / 12;
    const totalReturn = amount * (opp.annualReturn / 100) * (opp.term / 12);
    const maturityValue = amount + totalReturn;

    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-secondary bg-secondary p-5">
                <h3 className="mb-4 text-md font-semibold text-primary">Estimate Your Returns</h3>
                <div className="flex flex-col gap-4">
                    <Input
                        label="Investment Amount (RWF)"
                        value={investAmount}
                        onChange={(value) => setInvestAmount(value)}
                        type="number"
                        size="md"
                        hint={`Minimum investment: ${formatRWF(opp.minInvestment)}`}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-secondary bg-primary p-4">
                            <span className="text-xs text-tertiary">Monthly Return (est.)</span>
                            <p className="mt-0.5 text-lg font-semibold text-success-primary">{formatRWF(Math.round(monthlyReturn))}</p>
                        </div>
                        <div className="rounded-lg border border-secondary bg-primary p-4">
                            <span className="text-xs text-tertiary">Total Return ({opp.term} months)</span>
                            <p className="mt-0.5 text-lg font-semibold text-success-primary">{formatRWF(Math.round(totalReturn))}</p>
                        </div>
                        <div className="rounded-lg border border-secondary bg-primary p-4">
                            <span className="text-xs text-tertiary">Maturity Value</span>
                            <p className="mt-0.5 text-lg font-semibold text-primary">{formatRWF(Math.round(maturityValue))}</p>
                        </div>
                        <div className="rounded-lg border border-secondary bg-primary p-4">
                            <span className="text-xs text-tertiary">Annual Return Rate</span>
                            <p className="mt-0.5 text-lg font-semibold text-brand-secondary">{opp.annualReturn}%</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-xs text-quaternary">
                * These are projected returns based on the stated annual rate. Actual returns may vary. Past performance does not guarantee
                future results. See the Risk tab for full disclosure.
            </p>
        </div>
    );
}

function LandLocationTab({ opp }: { opp: InvestmentOpportunity }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
                {[
                    { label: "Location", value: opp.location },
                    { label: "District", value: opp.district },
                    { label: "Sector", value: opp.sector },
                    { label: "Plot Size", value: `${opp.plotSize.toLocaleString()} sqm` },
                    { label: "Land Use Zoning", value: opp.landUse },
                    { label: "Title Deed Reference", value: opp.titleDeedRef },
                    { label: "Coordinates", value: `${opp.coordinates.lat.toFixed(4)}, ${opp.coordinates.lng.toFixed(4)}` },
                ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-0.5 rounded-lg border border-secondary bg-secondary p-4">
                        <span className="text-xs text-tertiary">{item.label}</span>
                        <span className="text-sm font-medium text-primary">{item.value}</span>
                    </div>
                ))}
            </div>

            <div className="flex h-64 items-center justify-center rounded-xl border border-secondary bg-tertiary">
                <div className="text-center">
                    <MarkerPin01 className="mx-auto size-8 text-fg-quaternary" />
                    <p className="mt-2 text-sm text-tertiary">Map view placeholder</p>
                    <p className="text-xs text-quaternary">
                        {opp.coordinates.lat.toFixed(4)}, {opp.coordinates.lng.toFixed(4)}
                    </p>
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-md font-semibold text-primary">Nearby Amenities</h3>
                <ul className="flex flex-col gap-2">
                    {opp.nearbyAmenities.map((a, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-secondary">
                            <MarkerPin01 className="size-3.5 text-fg-quaternary" />
                            {a}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function ValuationTab({ opp }: { opp: InvestmentOpportunity }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-secondary bg-secondary p-4">
                    <span className="text-xs text-tertiary">Independent Valuation</span>
                    <p className="mt-0.5 text-lg font-semibold text-primary">{formatRWF(opp.valuationAmount)}</p>
                </div>
                <div className="rounded-lg border border-secondary bg-secondary p-4">
                    <span className="text-xs text-tertiary">Valuation Firm</span>
                    <p className="mt-0.5 text-md font-medium text-primary">{opp.valuationFirm}</p>
                </div>
                <div className="rounded-lg border border-secondary bg-secondary p-4">
                    <span className="text-xs text-tertiary">Valuation Date</span>
                    <p className="mt-0.5 text-md font-medium text-primary">
                        {new Date(opp.valuationDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>
                <div className="rounded-lg border border-secondary bg-secondary p-4">
                    <span className="text-xs text-tertiary">Listing Price vs. Valuation</span>
                    <p className="mt-0.5 text-md font-medium text-primary">
                        {((opp.totalValue / opp.valuationAmount) * 100).toFixed(1)}% of valuation
                    </p>
                </div>
            </div>

            <div className="rounded-xl border border-secondary bg-secondary p-5">
                <h3 className="mb-3 text-md font-semibold text-primary">Due Diligence Summary</h3>
                <ul className="flex flex-col gap-3">
                    {[
                        { label: "Title Verification", status: "Verified", ok: true },
                        { label: "Environmental Assessment", status: "Passed", ok: true },
                        { label: "Zoning Compliance", status: "Compliant", ok: true },
                        { label: "Independent Valuation", status: "Completed", ok: true },
                        { label: "Legal Review", status: "Cleared", ok: true },
                    ].map((item) => (
                        <li key={item.label} className="flex items-center justify-between">
                            <span className="text-sm text-secondary">{item.label}</span>
                            <BadgeWithIcon
                                iconLeading={item.ok ? CheckCircle : XCircle}
                                size="sm"
                                type="pill-color"
                                color={item.ok ? "success" : "error"}
                            >
                                {item.status}
                            </BadgeWithIcon>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function RisksTab({ opp }: { opp: InvestmentOpportunity }) {
    const risk = riskConfig[opp.riskLevel];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 rounded-xl border border-secondary bg-secondary p-5">
                <FeaturedIcon icon={AlertTriangle} size="lg" color={risk.color === "success" ? "success" : risk.color === "warning" ? "warning" : "error"} theme="light" />
                <div>
                    <h3 className="text-md font-semibold text-primary">Risk Assessment: {risk.label}</h3>
                    <p className="text-sm text-tertiary">
                        This investment has been assessed as {opp.riskLevel} risk based on location, zoning, market conditions, and term
                        length.
                    </p>
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-md font-semibold text-primary">Risk Factors</h3>
                <ul className="flex flex-col gap-3">
                    {opp.riskFactors.map((rf, i) => (
                        <li key={i} className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-fg-warning-secondary" />
                            <span className="text-sm text-secondary">{rf}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="rounded-xl border border-secondary bg-secondary p-5">
                <h3 className="mb-2 text-md font-semibold text-primary">General Investment Risks</h3>
                <p className="text-sm text-tertiary">
                    Land investments are illiquid. You may not be able to sell your shares before the maturity date. The value of your
                    investment can go down as well as up. Returns are projected, not guaranteed. Early exit is subject to approval and
                    may incur penalties. Land Bank does not provide financial advice — consult a licensed financial advisor before
                    investing.
                </p>
            </div>
        </div>
    );
}

function DocumentsTab({ opp }: { opp: InvestmentOpportunity }) {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-tertiary">
                Review all documents related to this investment opportunity. All documents are independently verified.
            </p>
            {opp.documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-secondary bg-secondary p-4">
                    <div className="flex items-center gap-3">
                        <FeaturedIcon icon={File06} size="sm" color="brand" theme="light" />
                        <div>
                            <p className="text-sm font-medium text-primary">{doc.name}</p>
                            <p className="text-xs text-tertiary">
                                {doc.type} &middot; {doc.size}
                            </p>
                        </div>
                    </div>
                    <Button color="tertiary" size="sm" iconLeading={Download01}>
                        Download
                    </Button>
                </div>
            ))}
        </div>
    );
}

function PlotUpdatesTab({ opp }: { opp: InvestmentOpportunity }) {
    return (
        <div className="flex flex-col gap-4">
            {opp.updates.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12">
                    <Bell01 className="size-8 text-fg-quaternary" />
                    <p className="text-sm text-tertiary">No updates yet for this plot.</p>
                </div>
            ) : (
                opp.updates.map((update, i) => (
                    <div key={i} className="rounded-lg border border-secondary bg-secondary p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <Badge size="sm" type="modern" color="gray">
                                {new Date(update.date).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </Badge>
                        </div>
                        <h4 className="text-sm font-semibold text-primary">{update.title}</h4>
                        <p className="mt-1 text-sm text-tertiary">{update.content}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export const OpportunityDetailScreen = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params);
    const opp = getOpportunityBySlug(slug);

    if (!opp) {
        return (
            <div className="flex min-h-dvh flex-col">
                <InvestorHeader />
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
                    <FeaturedIcon icon={XCircle} size="xl" color="error" theme="light" />
                    <h1 className="text-display-xs font-semibold text-primary">Opportunity Not Found</h1>
                    <p className="text-md text-tertiary">The investment opportunity you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <Button href="/opportunities" color="primary" size="lg" iconLeading={ArrowLeft}>
                        Back to Opportunities
                    </Button>
                </div>
            </div>
        );
    }

    const [isVerified, setIsVerified] = useState(true);

    const isClosed = opp.status === "fully-funded";
    const status = statusConfig[opp.status];
    const risk = riskConfig[opp.riskLevel];
    const fundingPct = getFundingPercentage(opp);

    return (
        <div className="flex min-h-dvh flex-col bg-secondary">
            <InvestorHeader />

            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-4">
                    <Button href="/opportunities" color="link-gray" size="sm" iconLeading={ArrowLeft}>
                        All Opportunities
                    </Button>
                </div>

                {/* Hero image area */}
                <div className="relative mb-6 h-48 overflow-hidden rounded-xl bg-tertiary sm:h-64 lg:h-80">
                    <div className="flex size-full items-center justify-center">
                        <Map01 className="size-16 text-fg-quaternary" />
                    </div>
                    {isClosed && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/70">
                            <div className="flex flex-col items-center gap-2">
                                <FeaturedIcon icon={CheckCircle} size="xl" color="gray" theme="light" />
                                <span className="text-display-xs font-semibold text-primary">Fully Funded</span>
                                <p className="text-sm text-tertiary">This opportunity is closed to new investors.</p>
                            </div>
                        </div>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2">
                        <Button color="secondary" size="sm" iconLeading={BookmarkCheck}>
                            Save
                        </Button>
                        <Button color="secondary" size="sm" iconLeading={Share07}>
                            Share
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Main content */}
                    <div className="flex-1">
                        {/* Title & badges */}
                        <div className="mb-6 rounded-xl border border-secondary bg-primary p-5">
                            <div className="flex flex-wrap items-center gap-2">
                                <BadgeWithDot size="md" type="pill-color" color={status.color}>
                                    {status.label}
                                </BadgeWithDot>
                                <Badge size="md" type="pill-color" color={risk.color}>
                                    {risk.label}
                                </Badge>
                            </div>
                            <h1 className="mt-3 text-display-xs font-semibold text-primary sm:text-display-sm">{opp.name}</h1>
                            <div className="mt-1 flex items-center gap-1.5 text-md text-tertiary">
                                <MarkerPin01 className="size-4 text-fg-quaternary" />
                                {opp.location} &middot; {opp.plotSize.toLocaleString()} sqm
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="rounded-xl border border-secondary bg-primary">
                            <Tabs>
                                <div className="overflow-x-auto border-b border-secondary px-5 pt-3">
                                    <Tabs.List type="underline" size="sm">
                                        <Tabs.Item id="overview" icon={TrendUp01}>
                                            Overview
                                        </Tabs.Item>
                                        <Tabs.Item id="calculator" icon={Calculator}>
                                            Return Calculator
                                        </Tabs.Item>
                                        <Tabs.Item id="land" icon={Map01}>
                                            Land &amp; Location
                                        </Tabs.Item>
                                        <Tabs.Item id="valuation" icon={ShieldTick}>
                                            Valuation
                                        </Tabs.Item>
                                        <Tabs.Item id="risks" icon={AlertTriangle}>
                                            Risks
                                        </Tabs.Item>
                                        <Tabs.Item id="documents" icon={File06} badge={opp.documents.length}>
                                            Documents
                                        </Tabs.Item>
                                        <Tabs.Item id="updates" icon={Bell01} badge={opp.updates.length}>
                                            Updates
                                        </Tabs.Item>
                                    </Tabs.List>
                                </div>

                                <div className="p-5">
                                    <Tabs.Panel id="overview">
                                        <OverviewTab opp={opp} />
                                    </Tabs.Panel>
                                    <Tabs.Panel id="calculator">
                                        <ReturnCalculatorTab opp={opp} />
                                    </Tabs.Panel>
                                    <Tabs.Panel id="land">
                                        <LandLocationTab opp={opp} />
                                    </Tabs.Panel>
                                    <Tabs.Panel id="valuation">
                                        <ValuationTab opp={opp} />
                                    </Tabs.Panel>
                                    <Tabs.Panel id="risks">
                                        <RisksTab opp={opp} />
                                    </Tabs.Panel>
                                    <Tabs.Panel id="documents">
                                        <DocumentsTab opp={opp} />
                                    </Tabs.Panel>
                                    <Tabs.Panel id="updates">
                                        <PlotUpdatesTab opp={opp} />
                                    </Tabs.Panel>
                                </div>
                            </Tabs>
                        </div>
                    </div>

                    {/* Sidebar — invest action card */}
                    <aside className="w-full lg:w-80 lg:shrink-0">
                        <div className="sticky top-24 flex flex-col gap-4">
                            <div className="rounded-xl border border-secondary bg-primary p-5">
                                {isClosed ? (
                                    <div className="flex flex-col items-center gap-3 py-4 text-center">
                                        <FeaturedIcon icon={CheckCircle} size="lg" color="gray" theme="light" />
                                        <h3 className="text-lg font-semibold text-primary">Fully Funded</h3>
                                        <p className="text-sm text-tertiary">
                                            This opportunity has been fully subscribed. Browse other available opportunities.
                                        </p>
                                        <Button href="/opportunities" color="primary" size="md" className="w-full" iconTrailing={ArrowRight}>
                                            Browse Open Opportunities
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-lg font-semibold text-primary">Invest Now</h3>
                                        <div className="mt-4 flex flex-col gap-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-tertiary">Share Price</span>
                                                <span className="font-semibold text-primary">{formatRWF(opp.sharePrice)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-tertiary">Min. Investment</span>
                                                <span className="font-semibold text-primary">{formatRWF(opp.minInvestment)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-tertiary">Annual Return</span>
                                                <span className="font-semibold text-success-primary">{opp.annualReturn}%</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-tertiary">Term</span>
                                                <span className="font-medium text-secondary">{opp.term} months</span>
                                            </div>
                                            <hr className="border-secondary" />
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-tertiary">{fundingPct}% funded</span>
                                                    <span className="text-tertiary">{getSharesRemaining(opp)} left</span>
                                                </div>
                                                <div className="h-2 w-full overflow-hidden rounded-full bg-quaternary">
                                                    <div className="h-full rounded-full bg-brand-solid" style={{ width: `${fundingPct}%` }} />
                                                </div>
                                            </div>
                                            <Button
                                                href={isVerified ? `/invest/${opp.slug}` : `/verify?returnTo=${opp.slug}`}
                                                color="primary"
                                                size="lg"
                                                className="mt-2 w-full"
                                                iconTrailing={ArrowRight}
                                            >
                                                Start Investing
                                            </Button>
                                            <p className="text-center text-xs text-quaternary">
                                                {isVerified
                                                    ? "Proceed to select your investment amount"
                                                    : "You'll need to verify your identity before investing"}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>

                            {!isClosed && (
                                <div className="rounded-xl border border-secondary bg-secondary p-4">
                                    <div className="flex items-start gap-3">
                                        <Clock className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                                        <div>
                                            <p className="text-sm font-medium text-secondary">Investment window</p>
                                            <p className="text-xs text-tertiary">
                                                {opp.status === "closing-soon"
                                                    ? "This opportunity is closing soon. Invest before all shares are sold."
                                                    : "Shares are available on a first-come, first-served basis until fully subscribed."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!isClosed && (
                                <div className="rounded-xl border-2 border-dashed border-secondary bg-secondary p-3">
                                    <p className="mb-2 text-xs font-semibold text-quaternary uppercase tracking-wide">Dev: KYC State</p>
                                    <div className="flex gap-2">
                                        <Button color={isVerified ? "primary" : "secondary"} size="xs" onClick={() => setIsVerified(true)}>
                                            Verified
                                        </Button>
                                        <Button color={!isVerified ? "primary" : "secondary"} size="xs" onClick={() => setIsVerified(false)}>
                                            Not Verified
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};
