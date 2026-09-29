"use client";

import { use, useState } from "react";
import { ArrowLeft, AlertTriangle, Check } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { InvestorHeader } from "@/components/investor/header";
import { getPortfolioInvestment, payoutAccounts } from "@/lib/mock-data";
import { cx } from "@/utils/cx";
import {
    AmountScreen,
    AccountScreen,
    ReviewScreen,
    ProcessingScreen,
    SuccessScreen,
    FailedScreen,
    UnavailableScreen,
} from "./steps";
import { MIN_WITHDRAWAL, type WithdrawScreen, type WithdrawData } from "./withdraw-types";

const STEPS = [
    { id: "amount", label: "Amount" },
    { id: "account", label: "Account" },
    { id: "review", label: "Confirm" },
] as const;

function getStepIndex(screen: WithdrawScreen): number {
    if (screen === "amount" || screen === "unavailable") return 0;
    if (screen === "account") return 1;
    if (screen === "review") return 2;
    return 3; // processing / success / failed — all steps complete
}

function StepIndicator({ screen }: { screen: WithdrawScreen }) {
    const current = getStepIndex(screen);

    return (
        <div className="flex items-center gap-0">
            {STEPS.map((step, i) => {
                const isCompleted = i < current;
                const isCurrent = i === current;

                return (
                    <div key={step.id} className="flex items-center">
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={cx(
                                    "flex size-8 items-center justify-center rounded-full text-xs font-semibold transition duration-100",
                                    isCompleted && "bg-brand-solid text-white",
                                    isCurrent && "bg-brand-secondary text-brand-secondary ring-2 ring-brand",
                                    !isCompleted && !isCurrent && "bg-tertiary text-quaternary",
                                )}
                            >
                                {isCompleted ? <Check className="size-4" /> : i + 1}
                            </div>
                            <span
                                className={cx(
                                    "text-center text-xs leading-tight whitespace-nowrap",
                                    isCurrent ? "font-semibold text-brand-secondary" : isCompleted ? "font-medium text-secondary" : "text-quaternary",
                                )}
                            >
                                {step.label}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className={cx("mx-2 mt-[-18px] h-0.5 w-10 sm:w-16", isCompleted ? "bg-brand-solid" : "bg-tertiary")} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export function WithdrawProfitFlowScreen({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const inv = getPortfolioInvestment(id);
    const defaultAccount = payoutAccounts.find((a) => a.isDefault);

    // Dev toggle: simulate an investment whose profit was just withdrawn (below minimum)
    const [simulateLowBalance, setSimulateLowBalance] = useState(false);
    const available = inv ? (simulateLowBalance ? Math.min(inv.dailyAccrual, MIN_WITHDRAWAL - 100) : inv.accruedProfit) : 0;

    const [screen, setScreen] = useState<WithdrawScreen>(
        inv && inv.accruedProfit >= MIN_WITHDRAWAL ? "amount" : "unavailable",
    );
    const [data, setData] = useState<WithdrawData>({
        amount: inv?.accruedProfit ?? 0,
        payoutAccountId: defaultAccount?.id ?? "",
    });

    if (!inv || inv.status !== "active") {
        return (
            <div className="flex min-h-dvh flex-col bg-secondary">
                <InvestorHeader />
                <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
                    <FeaturedIcon icon={AlertTriangle} size="xl" color="warning" theme="light" />
                    <h2 className="text-display-xs font-semibold text-primary">
                        {inv ? "Profit Withdrawal Unavailable" : "Investment Not Found"}
                    </h2>
                    <p className="text-md text-tertiary">
                        {inv
                            ? "Profit can only be withdrawn from active investments. Matured investments are paid out through the maturity flow."
                            : "The investment you're looking for doesn't exist."}
                    </p>
                    <Button href={inv ? `/portfolio/${inv.id}` : "/portfolio"} color="primary" size="md" iconLeading={ArrowLeft}>
                        {inv ? "Back to Investment" : "Back to Portfolio"}
                    </Button>
                </div>
            </div>
        );
    }

    const updateData = (updates: Partial<WithdrawData>) => {
        setData((prev) => ({ ...prev, ...updates }));
    };

    const goTo = (next: WithdrawScreen) => {
        setScreen(next);
        window.scrollTo(0, 0);
    };

    const flowProps = { inv, available, data, updateData, goTo };

    const renderScreen = () => {
        switch (screen) {
            case "amount":
                return <AmountScreen {...flowProps} />;
            case "account":
                return <AccountScreen {...flowProps} />;
            case "review":
                return <ReviewScreen {...flowProps} />;
            case "processing":
                return <ProcessingScreen {...flowProps} />;
            case "success":
                return <SuccessScreen {...flowProps} />;
            case "failed":
                return <FailedScreen {...flowProps} />;
            case "unavailable":
                return <UnavailableScreen {...flowProps} />;
        }
    };

    return (
        <div className="flex min-h-dvh flex-col bg-secondary">
            <InvestorHeader />

            <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h1 className="truncate text-lg font-semibold text-primary">{inv.name} — Withdraw Profit</h1>
                    <Button href={`/portfolio/${inv.id}`} color="tertiary" size="sm" iconLeading={ArrowLeft}>
                        Back to Investment
                    </Button>
                </div>

                {screen !== "unavailable" && (
                    <div className="mb-6 flex justify-center rounded-xl border border-secondary bg-primary p-4">
                        <StepIndicator screen={screen} />
                    </div>
                )}

                <div className="rounded-xl border border-secondary bg-primary p-5 sm:p-6">{renderScreen()}</div>

                {/* Dev screen switcher */}
                <details className="mt-6">
                    <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-quaternary">
                        Dev: Jump to Screen
                    </summary>
                    <div className="mt-3 rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                        {[
                            { label: "Steps", screens: ["amount", "account", "review"] as WithdrawScreen[] },
                            { label: "Outcomes", screens: ["processing", "success", "failed"] as WithdrawScreen[] },
                        ].map((group) => (
                            <div key={group.label} className="mb-3">
                                <p className="mb-1.5 text-xs font-medium text-tertiary">{group.label}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.screens.map((s) => (
                                        <Button
                                            key={s}
                                            color={screen === s ? "primary" : "secondary"}
                                            size="xs"
                                            onClick={() => {
                                                setSimulateLowBalance(false);
                                                goTo(s);
                                            }}
                                        >
                                            {s}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div>
                            <p className="mb-1.5 text-xs font-medium text-tertiary">Balance State</p>
                            <Button
                                color={screen === "unavailable" ? "primary" : "secondary"}
                                size="xs"
                                onClick={() => {
                                    setSimulateLowBalance(true);
                                    goTo("unavailable");
                                }}
                            >
                                below minimum (already withdrew today)
                            </Button>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    );
}
