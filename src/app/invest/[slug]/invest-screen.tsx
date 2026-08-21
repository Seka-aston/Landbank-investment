"use client";

import { use, useState } from "react";
import { LogOut01, Check } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { InvestorHeader } from "@/components/investor/header";
import { getOpportunityBySlug, formatRWF } from "@/lib/mock-data";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { AlertTriangle } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { AmountStep, ReviewStep, ConfirmStep, PaymentMethodStep } from "./steps";
import {
    MobileMoneyInput,
    MobileMoneyWaiting,
    MobileMoneyFailed,
    CardInput,
    CardProcessing,
    CardFailed,
    BankTransferInstructions,
    BankTransferUpload,
    BankTransferWaiting,
    BankTransferRejected,
    PaymentSuccess,
} from "./payment-flows";
import { ContractReady, ContractReview, ContractSign, InvestmentActivated } from "./contract-flow";
import type { FlowScreen, PaymentMethod, InvestmentData } from "./invest-types";

const PHASES = [
    { id: "investment", label: "Investment", shortLabel: "Invest" },
    { id: "payment", label: "Payment", shortLabel: "Pay" },
    { id: "contract", label: "Contract", shortLabel: "Contract" },
    { id: "complete", label: "Complete", shortLabel: "Done" },
] as const;

function getPhaseIndex(screen: FlowScreen): number {
    if (["amount", "review", "confirm"].includes(screen)) return 0;
    if (
        screen === "payment-method" ||
        screen.startsWith("mm-") ||
        screen.startsWith("card-") ||
        screen.startsWith("bt-") ||
        screen === "payment-success"
    )
        return 1;
    if (screen.startsWith("contract-")) return 2;
    return 3;
}

function PhaseIndicator({ screen }: { screen: FlowScreen }) {
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
                                    isCurrent && "bg-brand-secondary ring-2 ring-brand text-brand-secondary",
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
                                {phase.shortLabel}
                            </span>
                        </div>
                        {i < PHASES.length - 1 && (
                            <div className={cx("mx-2 mt-[-18px] h-0.5 w-10 sm:w-16", isCompleted ? "bg-brand-solid" : "bg-tertiary")} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export function InvestScreen({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const opp = getOpportunityBySlug(slug);

    const [screen, setScreen] = useState<FlowScreen>("amount");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [agreementAccepted, setAgreementAccepted] = useState(false);
    const [data, setData] = useState<InvestmentData>(() => ({
        amount: 0,
        shares: 0,
        term: opp?.term ?? 24,
        phoneNumber: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
        cardName: "",
        proofUploaded: false,
        riskAccepted: false,
        termsAccepted: false,
        lossAccepted: false,
    }));

    if (!opp) {
        return (
            <div className="flex min-h-dvh flex-col bg-secondary">
                <InvestorHeader />
                <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
                    <FeaturedIcon icon={AlertTriangle} size="xl" color="warning" theme="light" />
                    <h2 className="text-display-xs font-semibold text-primary">Opportunity Not Found</h2>
                    <p className="text-md text-tertiary">The investment opportunity you're looking for doesn't exist.</p>
                    <Button href="/opportunities" color="primary" size="md">
                        Browse Opportunities
                    </Button>
                </div>
            </div>
        );
    }

    const updateData = (updates: Partial<InvestmentData>) => {
        setData((prev) => ({ ...prev, ...updates }));
    };

    const goTo = (next: FlowScreen) => {
        setScreen(next);
        window.scrollTo(0, 0);
    };

    const flowProps = { opp, data, updateData, goTo, paymentMethod };

    const renderScreen = () => {
        switch (screen) {
            case "amount":
                return <AmountStep {...flowProps} />;
            case "review":
                return <ReviewStep {...flowProps} />;
            case "confirm":
                return <ConfirmStep {...flowProps} />;
            case "payment-method":
                return <PaymentMethodStep {...flowProps} onSelectMethod={setPaymentMethod} />;
            case "mm-input":
                return <MobileMoneyInput {...flowProps} />;
            case "mm-waiting":
                return <MobileMoneyWaiting {...flowProps} />;
            case "mm-failed":
                return <MobileMoneyFailed {...flowProps} />;
            case "mm-success":
                return <PaymentSuccess {...flowProps} />;
            case "card-input":
                return <CardInput {...flowProps} />;
            case "card-processing":
                return <CardProcessing {...flowProps} />;
            case "card-failed":
                return <CardFailed {...flowProps} />;
            case "card-success":
                return <PaymentSuccess {...flowProps} />;
            case "bt-instructions":
                return <BankTransferInstructions {...flowProps} />;
            case "bt-upload":
                return <BankTransferUpload {...flowProps} />;
            case "bt-waiting":
                return <BankTransferWaiting {...flowProps} />;
            case "bt-approved":
                return <PaymentSuccess {...flowProps} />;
            case "bt-rejected":
                return <BankTransferRejected {...flowProps} />;
            case "payment-success":
                return <PaymentSuccess {...flowProps} />;
            case "contract-ready":
                return <ContractReady {...flowProps} />;
            case "contract-review":
                return <ContractReview {...flowProps} />;
            case "contract-sign":
                return (
                    <ContractSign
                        {...flowProps}
                        agreementAccepted={agreementAccepted}
                        onToggleAgreement={setAgreementAccepted}
                    />
                );
            case "activated":
                return <InvestmentActivated {...flowProps} />;
        }
    };

    const isFullScreen = [
        "mm-waiting", "mm-failed", "mm-success",
        "card-processing", "card-failed", "card-success",
        "bt-waiting", "bt-approved", "bt-rejected",
        "payment-success", "activated",
    ].includes(screen);

    return (
        <div className="flex min-h-dvh flex-col bg-secondary">
            <InvestorHeader />

            <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="truncate text-lg font-semibold text-primary">{opp.name}</h1>
                    <Button href={`/opportunities/${opp.slug}`} color="tertiary" size="sm" iconLeading={LogOut01}>
                        Save &amp; Exit
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
                    <summary className="cursor-pointer text-xs font-semibold text-quaternary uppercase tracking-wide">
                        Dev: Jump to Screen
                    </summary>
                    <div className="mt-3 rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                        {[
                            { label: "Investment", screens: ["amount", "review", "confirm"] as FlowScreen[] },
                            {
                                label: "Payment",
                                screens: [
                                    "payment-method",
                                    "mm-input", "mm-waiting", "mm-failed",
                                    "card-input", "card-processing", "card-failed",
                                    "bt-instructions", "bt-upload", "bt-waiting", "bt-rejected",
                                    "payment-success",
                                ] as FlowScreen[],
                            },
                            { label: "Contract", screens: ["contract-ready", "contract-review", "contract-sign"] as FlowScreen[] },
                            { label: "Complete", screens: ["activated"] as FlowScreen[] },
                        ].map((group) => (
                            <div key={group.label} className="mb-3 last:mb-0">
                                <p className="mb-1.5 text-xs font-medium text-tertiary">{group.label}</p>
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
