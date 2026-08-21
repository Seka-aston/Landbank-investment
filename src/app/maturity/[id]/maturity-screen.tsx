"use client";

import { use, useState } from "react";
import { ArrowLeft, Check, AlertTriangle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { InvestorHeader } from "@/components/investor/header";
import { getPortfolioInvestment } from "@/lib/mock-data";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import { MaturityReachedScreen, ChooseActionScreen } from "./steps";
import {
    PayoutAccountSelect,
    PayoutReview,
    PayoutRequested,
    PayoutProcessing,
    PayoutSuccess,
    PayoutFailed,
} from "./payout-flow";
import {
    ReinvestChoose,
    ReinvestReview,
    ReinvestConfirmed,
    SplitPayoutAccount,
    SplitChooseOpportunity,
    SplitReview,
    SplitConfirmed,
} from "./reinvest-flow";
import type { MaturityScreen as MaturityScreenId, MaturityData } from "./maturity-types";

const PHASES = [
    { id: "action", label: "Choose Action", shortLabel: "Action" },
    { id: "review", label: "Review", shortLabel: "Review" },
    { id: "complete", label: "Complete", shortLabel: "Done" },
] as const;

function getPhaseIndex(screen: MaturityScreenId): number {
    if (
        [
            "maturity-reached",
            "choose-action",
            "payout-account",
            "reinvest-choose",
            "split-payout-account",
            "split-choose-opportunity",
        ].includes(screen)
    )
        return 0;
    if (["payout-review", "reinvest-review", "split-review"].includes(screen)) return 1;
    return 2;
}

function PhaseIndicator({ screen }: { screen: MaturityScreenId }) {
    const currentPhase = getPhaseIndex(screen);

    return (
        <div className="flex items-center gap-0">
            {PHASES.map((phase, i) => {
                const isCompleted = i < currentPhase;
                const isCurrent = i === currentPhase;

                return (
                    <div key={phase.id} className="flex items-center">
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={cx(
                                    "flex size-8 items-center justify-center rounded-full text-xs font-semibold transition duration-100",
                                    isCompleted && "bg-brand-solid text-white",
                                    isCurrent &&
                                        "bg-brand-secondary ring-2 ring-brand text-brand-secondary",
                                    !isCompleted && !isCurrent && "bg-tertiary text-quaternary",
                                )}
                            >
                                {isCompleted ? <Check className="size-4" /> : i + 1}
                            </div>
                            <span
                                className={cx(
                                    "text-center text-xs leading-tight whitespace-nowrap",
                                    isCurrent
                                        ? "font-semibold text-brand-secondary"
                                        : isCompleted
                                          ? "font-medium text-secondary"
                                          : "text-quaternary",
                                )}
                            >
                                {phase.shortLabel}
                            </span>
                        </div>
                        {i < PHASES.length - 1 && (
                            <div
                                className={cx(
                                    "mx-2 mt-[-18px] h-0.5 w-10 sm:w-16",
                                    isCompleted ? "bg-brand-solid" : "bg-tertiary",
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export function MaturityFlowScreen({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const inv = getPortfolioInvestment(id);

    const [screen, setScreen] = useState<MaturityScreenId>("maturity-reached");
    const [data, setData] = useState<MaturityData>({
        action: null,
        payoutAccountId: "",
        reinvestOpportunitySlug: "",
    });

    if (!inv) {
        return (
            <div className="flex min-h-dvh flex-col bg-secondary">
                <InvestorHeader />
                <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
                    <FeaturedIcon icon={AlertTriangle} size="xl" color="warning" theme="light" />
                    <h2 className="text-display-xs font-semibold text-primary">
                        Investment Not Found
                    </h2>
                    <p className="text-md text-tertiary">
                        The investment you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Button href="/portfolio" color="primary" size="md" iconLeading={ArrowLeft}>
                        Back to Portfolio
                    </Button>
                </div>
            </div>
        );
    }

    const updateData = (updates: Partial<MaturityData>) => {
        setData((prev) => ({ ...prev, ...updates }));
    };

    const goTo = (next: MaturityScreenId) => {
        setScreen(next);
        window.scrollTo(0, 0);
    };

    const flowProps = { inv, data, updateData, goTo };

    const renderScreen = () => {
        switch (screen) {
            case "maturity-reached":
                return <MaturityReachedScreen {...flowProps} />;
            case "choose-action":
                return <ChooseActionScreen {...flowProps} />;
            case "payout-account":
                return <PayoutAccountSelect {...flowProps} />;
            case "payout-review":
                return <PayoutReview {...flowProps} />;
            case "payout-requested":
                return <PayoutRequested {...flowProps} />;
            case "payout-processing":
                return <PayoutProcessing {...flowProps} />;
            case "payout-success":
                return <PayoutSuccess {...flowProps} />;
            case "payout-failed":
                return <PayoutFailed {...flowProps} />;
            case "reinvest-choose":
                return <ReinvestChoose {...flowProps} />;
            case "reinvest-review":
                return <ReinvestReview {...flowProps} />;
            case "reinvest-confirmed":
                return <ReinvestConfirmed {...flowProps} />;
            case "split-payout-account":
                return <SplitPayoutAccount {...flowProps} />;
            case "split-choose-opportunity":
                return <SplitChooseOpportunity {...flowProps} />;
            case "split-review":
                return <SplitReview {...flowProps} />;
            case "split-confirmed":
                return <SplitConfirmed {...flowProps} />;
        }
    };

    return (
        <div className="flex min-h-dvh flex-col bg-secondary">
            <InvestorHeader />

            <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="truncate text-lg font-semibold text-primary">
                        {inv.name} — Maturity
                    </h1>
                    <Button
                        href={`/portfolio/${inv.id}`}
                        color="tertiary"
                        size="sm"
                        iconLeading={ArrowLeft}
                    >
                        Back to Investment
                    </Button>
                </div>

                <div className="mb-6 flex justify-center rounded-xl border border-secondary bg-primary p-4">
                    <PhaseIndicator screen={screen} />
                </div>

                <div className="rounded-xl border border-secondary bg-primary p-5 sm:p-6">
                    {renderScreen()}
                </div>

                {/* Dev screen switcher */}
                <details className="mt-6">
                    <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-quaternary">
                        Dev: Jump to Screen
                    </summary>
                    <div className="mt-3 rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                        {[
                            {
                                label: "Entry",
                                screens: ["maturity-reached", "choose-action"] as MaturityScreenId[],
                            },
                            {
                                label: "Payout Path",
                                screens: [
                                    "payout-account",
                                    "payout-review",
                                    "payout-requested",
                                    "payout-processing",
                                    "payout-success",
                                    "payout-failed",
                                ] as MaturityScreenId[],
                            },
                            {
                                label: "Reinvest Path",
                                screens: [
                                    "reinvest-choose",
                                    "reinvest-review",
                                    "reinvest-confirmed",
                                ] as MaturityScreenId[],
                            },
                            {
                                label: "Split Path",
                                screens: [
                                    "split-payout-account",
                                    "split-choose-opportunity",
                                    "split-review",
                                    "split-confirmed",
                                ] as MaturityScreenId[],
                            },
                        ].map((group) => (
                            <div key={group.label} className="mb-3 last:mb-0">
                                <p className="mb-1.5 text-xs font-medium text-tertiary">
                                    {group.label}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.screens.map((s) => (
                                        <Button
                                            key={s}
                                            color={screen === s ? "primary" : "secondary"}
                                            size="xs"
                                            onClick={() => goTo(s)}
                                        >
                                            {s}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </details>
            </div>
        </div>
    );
}
