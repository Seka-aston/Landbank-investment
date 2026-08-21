"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, LogOut01, Check } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { InvestorHeader } from "@/components/investor/header";
import { cx } from "@/utils/cx";
import {
    StepIntroduction,
    StepEligibility,
    StepPersonalInfo,
    StepIdentityDocument,
    StepSelfie,
    StepProofOfAddress,
    StepDeclarations,
    StepReview,
} from "./steps";
import { OutcomePending, OutcomeApproved, OutcomeResubmission, OutcomeRejected } from "./outcomes";
import type { KYCFormData } from "./kyc-types";

const STEPS = [
    { id: "introduction", label: "Introduction", shortLabel: "Intro" },
    { id: "eligibility", label: "Eligibility Check", shortLabel: "Eligibility" },
    { id: "personal", label: "Personal Information", shortLabel: "Personal" },
    { id: "identity", label: "Identity Document", shortLabel: "Identity" },
    { id: "selfie", label: "Selfie Verification", shortLabel: "Selfie" },
    { id: "address", label: "Proof of Address", shortLabel: "Address" },
    { id: "declarations", label: "Investor Declarations", shortLabel: "Declarations" },
    { id: "review", label: "Review & Submit", shortLabel: "Review" },
] as const;

type StepId = (typeof STEPS)[number]["id"];
type OutcomeId = "pending" | "approved" | "resubmission" | "rejected";

const initialFormData: KYCFormData = {
    nationality: "Rwandan",
    isRwandanResident: true,
    isOver18: true,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    nationalId: "",
    documentType: "national-id",
    documentNumber: "",
    documentUploaded: false,
    selfieUploaded: false,
    addressDocType: "",
    addressUploaded: false,
    addressSkipped: false,
    acceptTerms: false,
    acceptRisks: false,
    confirmAccuracy: false,
    politicallyExposed: false,
};

function Stepper({ steps, currentIndex }: { steps: typeof STEPS; currentIndex: number }) {
    return (
        <div className="w-full overflow-x-auto">
            <div className="flex min-w-max items-center gap-0">
                {steps.map((step, i) => {
                    const isCompleted = i < currentIndex;
                    const isCurrent = i === currentIndex;

                    return (
                        <div key={step.id} className="flex items-center">
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
                                        "max-w-16 text-center text-xs leading-tight whitespace-nowrap",
                                        isCurrent ? "font-semibold text-brand-secondary" : isCompleted ? "font-medium text-secondary" : "text-quaternary",
                                    )}
                                >
                                    {step.shortLabel}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={cx("mx-1 mt-[-18px] h-0.5 w-8 sm:w-12", isCompleted ? "bg-brand-solid" : "bg-tertiary")} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export const VerifyScreen = () => {
    const searchParams = useSearchParams();
    const outcomeParam = searchParams.get("outcome") as OutcomeId | null;

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [formData, setFormData] = useState<KYCFormData>(initialFormData);
    const [outcome, setOutcome] = useState<OutcomeId | null>(outcomeParam);

    const currentStep = STEPS[currentStepIndex];

    const updateForm = (updates: Partial<KYCFormData>) => {
        setFormData((prev) => ({ ...prev, ...updates }));
    };

    const goNext = () => {
        if (currentStepIndex < STEPS.length - 1) {
            setCurrentStepIndex((i) => i + 1);
            window.scrollTo(0, 0);
        }
    };

    const goBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((i) => i - 1);
            window.scrollTo(0, 0);
        }
    };

    const goToStep = (index: number) => {
        if (index <= currentStepIndex) {
            setCurrentStepIndex(index);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = () => {
        setOutcome("pending");
        window.scrollTo(0, 0);
    };

    const handleSetOutcome = (newOutcome: OutcomeId) => {
        setOutcome(newOutcome);
        window.scrollTo(0, 0);
    };

    const handleRestart = () => {
        setOutcome(null);
        setCurrentStepIndex(0);
        window.scrollTo(0, 0);
    };

    if (outcome) {
        return (
            <div className="flex min-h-dvh flex-col bg-secondary">
                <InvestorHeader />
                <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
                    {outcome === "pending" && <OutcomePending onSetOutcome={handleSetOutcome} />}
                    {outcome === "approved" && <OutcomeApproved />}
                    {outcome === "resubmission" && <OutcomeResubmission formData={formData} onRestart={handleRestart} />}
                    {outcome === "rejected" && <OutcomeRejected />}
                </div>
            </div>
        );
    }

    const renderStep = () => {
        switch (currentStep.id) {
            case "introduction":
                return <StepIntroduction />;
            case "eligibility":
                return <StepEligibility formData={formData} updateForm={updateForm} />;
            case "personal":
                return <StepPersonalInfo formData={formData} updateForm={updateForm} />;
            case "identity":
                return <StepIdentityDocument formData={formData} updateForm={updateForm} />;
            case "selfie":
                return <StepSelfie formData={formData} updateForm={updateForm} />;
            case "address":
                return <StepProofOfAddress formData={formData} updateForm={updateForm} />;
            case "declarations":
                return <StepDeclarations formData={formData} updateForm={updateForm} />;
            case "review":
                return <StepReview formData={formData} onGoToStep={goToStep} />;
        }
    };

    const isLastStep = currentStepIndex === STEPS.length - 1;

    return (
        <div className="flex min-h-dvh flex-col bg-secondary">
            <InvestorHeader />

            <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
                {/* Save & Exit */}
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-primary">Identity Verification</h1>
                    <Button href="/opportunities" color="tertiary" size="sm" iconLeading={LogOut01}>
                        Save &amp; Exit
                    </Button>
                </div>

                {/* Stepper */}
                <div className="mb-6 rounded-xl border border-secondary bg-primary p-4">
                    <Stepper steps={STEPS} currentIndex={currentStepIndex} />
                </div>

                {/* Step content */}
                <div className="rounded-xl border border-secondary bg-primary p-5 sm:p-6">
                    <div className="mb-1 text-xs font-medium text-brand-secondary">
                        Step {currentStepIndex + 1} of {STEPS.length}
                    </div>
                    <h2 className="mb-5 text-display-xs font-semibold text-primary">{currentStep.label}</h2>

                    {renderStep()}
                </div>

                {/* Navigation buttons */}
                <div className="mt-4 flex items-center justify-between">
                    <Button
                        color="secondary"
                        size="md"
                        iconLeading={ArrowLeft}
                        onClick={goBack}
                        isDisabled={currentStepIndex === 0}
                    >
                        Back
                    </Button>

                    {isLastStep ? (
                        <Button color="primary" size="md" iconTrailing={Check} onClick={handleSubmit}>
                            Submit Verification
                        </Button>
                    ) : (
                        <Button color="primary" size="md" iconTrailing={ArrowRight} onClick={goNext}>
                            Continue
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
