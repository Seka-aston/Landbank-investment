"use client";

import { ArrowRight, BarChart01, Shield01, Users01, Map01, TrendUp01, Clock } from "@untitledui/icons";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { InvestorHeader } from "@/components/investor/header";
import { OpportunityCard } from "@/components/investor/opportunity-card";
import { opportunities, formatRWF } from "@/lib/mock-data";

const stats = [
    { label: "Total Land Value Listed", value: "RWF 1.13B" },
    { label: "Active Investors", value: "2,340+" },
    { label: "Avg. Annual Return", value: "15.2%" },
    { label: "Funded Projects", value: "12" },
];

const features = [
    {
        icon: Shield01,
        title: "Verified & Due-Diligenced",
        description: "Every plot undergoes independent valuation, title verification, and environmental assessment before listing.",
    },
    {
        icon: BarChart01,
        title: "Fractional Ownership",
        description: "Invest from as little as RWF 500,000. Own shares in premium land without needing the full purchase price.",
    },
    {
        icon: Users01,
        title: "Transparent & Regulated",
        description: "All investments are structured under Rwandan law with full disclosure of risks, returns, and documentation.",
    },
    {
        icon: TrendUp01,
        title: "Strong Returns",
        description: "Kigali land values have appreciated 15-20% annually over the past 5 years. Earn returns at maturity.",
    },
];

const featuredOpportunities = opportunities.filter((o) => o.status !== "fully-funded").slice(0, 3);

export const InvestmentHome = () => {
    return (
        <div className="flex min-h-dvh flex-col">
            <InvestorHeader />

            {/* Hero */}
            <section className="bg-primary px-4 pt-16 pb-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-3xl text-center">
                        <BadgeWithDot color="brand" size="md" type="pill-color" className="mx-auto mb-4">
                            Now accepting investors
                        </BadgeWithDot>
                        <h1 className="text-display-md font-semibold text-primary sm:text-display-lg">
                            Own a piece of Rwanda&apos;s future
                        </h1>
                        <p className="mt-4 text-lg text-tertiary sm:text-xl">
                            Land Bank lets you invest in verified Rwandan land through fractional ownership. Start with as little as RWF
                            500,000, earn returns at maturity, and track your portfolio from your phone.
                        </p>
                        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                            <Button href="/opportunities" color="primary" size="xl" iconTrailing={ArrowRight}>
                                Browse Opportunities
                            </Button>
                            <Button href="/opportunities" color="secondary" size="xl">
                                How It Works
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
                                <span className="text-display-xs font-semibold text-primary sm:text-display-sm">{stat.value}</span>
                                <span className="text-sm text-tertiary">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Opportunities */}
            <section className="border-t border-secondary bg-secondary px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-display-xs font-semibold text-primary sm:text-display-sm">Featured Opportunities</h2>
                            <p className="mt-1 text-md text-tertiary">Hand-picked investment opportunities currently accepting investors.</p>
                        </div>
                        <Button href="/opportunities" color="link-color" size="md" iconTrailing={ArrowRight} className="mt-3 sm:mt-0">
                            View all opportunities
                        </Button>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredOpportunities.map((opp) => (
                            <OpportunityCard key={opp.slug} opportunity={opp} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="border-t border-secondary bg-primary px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-display-xs font-semibold text-primary sm:text-display-sm">How It Works</h2>
                        <p className="mt-2 text-md text-tertiary">Four simple steps to start building your land portfolio.</p>
                    </div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { step: "1", icon: Map01, title: "Browse & Choose", desc: "Explore verified land opportunities across Kigali and Rwanda." },
                            { step: "2", icon: Shield01, title: "Get Verified", desc: "Complete a quick KYC process to confirm your identity." },
                            { step: "3", icon: BarChart01, title: "Invest", desc: "Choose your amount, review terms, and pay via Mobile Money or bank transfer." },
                            { step: "4", icon: TrendUp01, title: "Earn Returns", desc: "Track your investment and receive returns at maturity — or reinvest." },
                        ].map((item) => (
                            <div key={item.step} className="flex flex-col items-center text-center">
                                <FeaturedIcon icon={item.icon} size="lg" color="brand" theme="light" />
                                <div className="mt-4 flex items-center gap-2">
                                    <Badge size="sm" type="pill-color" color="brand">
                                        Step {item.step}
                                    </Badge>
                                </div>
                                <h3 className="mt-2 text-lg font-semibold text-primary">{item.title}</h3>
                                <p className="mt-1 text-sm text-tertiary">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Land Bank */}
            <section className="border-t border-secondary bg-secondary px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-display-xs font-semibold text-primary sm:text-display-sm">Why Land Bank?</h2>
                        <p className="mt-2 text-md text-tertiary">
                            Built for Rwandan investors who want to participate in land ownership without the complexity.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2">
                        {features.map((feature) => (
                            <div key={feature.title} className="flex gap-4 rounded-xl border border-secondary bg-primary p-5">
                                <FeaturedIcon icon={feature.icon} size="md" color="brand" theme="light" />
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-md font-semibold text-primary">{feature.title}</h3>
                                    <p className="text-sm text-tertiary">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-secondary bg-brand-section px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-display-xs font-semibold text-primary_on-brand sm:text-display-sm">Ready to invest in land?</h2>
                    <p className="mt-2 text-md text-secondary_on-brand">
                        Join thousands of Rwandan investors growing their wealth through fractional land ownership.
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Button href="/opportunities" color="primary" size="xl" iconTrailing={ArrowRight}>
                            Start Investing
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-secondary bg-primary px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                        <div className="flex items-center gap-2">
                            <img src="/brand/landbank-logo-full.png" alt="Land Bank" className="h-8 w-auto" />
                        </div>
                        <p className="text-sm text-quaternary">&copy; 2026 Land Bank Rwanda. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
