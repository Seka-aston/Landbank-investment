"use client";

import Link from "next/link";
import {
    Clock,
    CheckCircle,
    AlertTriangle,
    XCircle,
    ArrowRight,
    RefreshCcw01,
    Mail01,
    Phone,
    File06,
    User01,
    Home02,
    Camera01,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import type { KYCFormData } from "./kyc-types";

type OutcomeId = "pending" | "approved" | "resubmission" | "rejected";

// ─── Pending (with dev switcher) ─────────────────────────────────────────────

export function OutcomePending({ onSetOutcome }: { onSetOutcome: (outcome: OutcomeId) => void }) {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <FeaturedIcon icon={Clock} size="xl" color="warning" theme="light" />

            <div>
                <h2 className="text-display-xs font-semibold text-primary">Verification Under Review</h2>
                <p className="mt-2 text-md text-tertiary">
                    Thank you for submitting your documents. Our team is reviewing your verification and you'll receive a result within
                    1–2 business days.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-5">
                <h3 className="text-sm font-semibold text-primary">What happens next?</h3>
                <ul className="mt-3 flex flex-col gap-3 text-left text-sm text-tertiary">
                    <li className="flex items-start gap-2.5">
                        <Mail01 className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                        <span>You'll receive an email notification when the review is complete</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <Clock className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                        <span>Reviews typically take 1–2 business days</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <Phone className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                        <span>Our team may contact you if additional information is needed</span>
                    </li>
                </ul>
            </div>

            <Button href="/opportunities" color="primary" size="lg" iconTrailing={ArrowRight}>
                Browse Opportunities
            </Button>

            {/* Dev-only outcome switcher */}
            <div className="mt-8 w-full rounded-xl border-2 border-dashed border-secondary bg-secondary p-4">
                <p className="mb-3 text-xs font-semibold text-quaternary uppercase tracking-wide">Dev: Simulate Outcome</p>
                <div className="flex flex-wrap justify-center gap-2">
                    <Button color="secondary" size="sm" onClick={() => onSetOutcome("approved")}>
                        Approved
                    </Button>
                    <Button color="secondary" size="sm" onClick={() => onSetOutcome("resubmission")}>
                        Resubmission Required
                    </Button>
                    <Button color="secondary" size="sm" onClick={() => onSetOutcome("rejected")}>
                        Rejected
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Approved ────────────────────────────────────────────────────────────────

export function OutcomeApproved({ returnTo }: { returnTo?: string | null }) {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <FeaturedIcon icon={CheckCircle} size="xl" color="success" theme="light" />

            <div>
                <Badge color="success" size="md">
                    Verified Investor
                </Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">Verification Approved!</h2>
                <p className="mt-2 text-md text-tertiary">
                    Congratulations! Your identity has been verified and your investor account is now active. You're ready to start
                    investing in Rwandan land.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-5">
                <h3 className="text-sm font-semibold text-primary">You can now:</h3>
                <ul className="mt-3 flex flex-col gap-3 text-left text-sm text-tertiary">
                    <li className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-fg-success-secondary" />
                        <span>Invest in any open opportunity on Land Bank</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-fg-success-secondary" />
                        <span>Track your investment portfolio and returns</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-fg-success-secondary" />
                        <span>Access exclusive investment opportunities</span>
                    </li>
                </ul>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
                {returnTo ? (
                    <Button href={`/invest/${returnTo}`} color="primary" size="lg" iconTrailing={ArrowRight} className="flex-1">
                        Continue to Investment
                    </Button>
                ) : (
                    <Button href="/opportunities" color="primary" size="lg" iconTrailing={ArrowRight} className="flex-1">
                        Start Investing
                    </Button>
                )}
                <Button href="/" color="secondary" size="lg" className="flex-1">
                    Go to Home
                </Button>
            </div>
        </div>
    );
}

// ─── Resubmission Required ───────────────────────────────────────────────────

interface RejectedField {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    reason: string;
}

export function OutcomeResubmission({ formData, onRestart }: { formData: KYCFormData; onRestart: () => void }) {
    const rejectedFields: RejectedField[] = [
        {
            icon: File06,
            label: "Identity Document",
            reason: "The uploaded image is blurry or obscured. Please upload a clear, high-resolution photo of your document.",
        },
        {
            icon: Camera01,
            label: "Selfie Verification",
            reason: "The selfie could not be matched to your identity document. Please retake the selfie with better lighting.",
        },
    ];

    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <FeaturedIcon icon={AlertTriangle} size="xl" color="warning" theme="light" />

            <div>
                <Badge color="warning" size="md">
                    Action Required
                </Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">Resubmission Required</h2>
                <p className="mt-2 text-md text-tertiary">
                    We were unable to fully verify your identity. Please review the issues below and resubmit the highlighted
                    documents.
                </p>
            </div>

            <div className="w-full space-y-3 text-left">
                {rejectedFields.map((field) => (
                    <div key={field.label} className="rounded-xl border border-error_subtle bg-error-primary p-4">
                        <div className="flex items-center gap-2.5">
                            <field.icon className="size-5 text-fg-error-secondary" />
                            <h4 className="text-sm font-semibold text-error-primary">{field.label}</h4>
                        </div>
                        <p className="mt-1.5 text-sm text-tertiary">{field.reason}</p>
                    </div>
                ))}
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4">
                <p className="text-sm text-tertiary">
                    <strong className="text-secondary">Tip:</strong> Your previously submitted information has been saved. You only
                    need to resubmit the items flagged above — all other data will remain unchanged.
                </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button
                    color="primary"
                    size="lg"
                    iconLeading={RefreshCcw01}
                    onClick={onRestart}
                    className="flex-1"
                >
                    Resubmit Documents
                </Button>
                <Button href="/opportunities" color="secondary" size="lg" className="flex-1">
                    Do This Later
                </Button>
            </div>
        </div>
    );
}

// ─── Rejected ────────────────────────────────────────────────────────────────

export function OutcomeRejected() {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <FeaturedIcon icon={XCircle} size="xl" color="error" theme="light" />

            <div>
                <Badge color="error" size="md">
                    Verification Failed
                </Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">Verification Rejected</h2>
                <p className="mt-2 text-md text-tertiary">
                    Unfortunately, we were unable to verify your identity. This may be due to inconsistencies in your submitted
                    information or documents that could not be validated.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-5">
                <h3 className="text-sm font-semibold text-primary">Possible reasons for rejection:</h3>
                <ul className="mt-3 flex flex-col gap-2.5 text-left text-sm text-tertiary">
                    <li className="flex items-start gap-2.5">
                        <XCircle className="mt-0.5 size-4 shrink-0 text-fg-error-secondary" />
                        <span>Identity documents could not be validated</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <XCircle className="mt-0.5 size-4 shrink-0 text-fg-error-secondary" />
                        <span>Information provided was inconsistent or incomplete</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <XCircle className="mt-0.5 size-4 shrink-0 text-fg-error-secondary" />
                        <span>Eligibility criteria were not met</span>
                    </li>
                </ul>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-5">
                <h3 className="text-sm font-semibold text-primary">Need help?</h3>
                <p className="mt-2 text-sm text-tertiary">
                    If you believe this decision was made in error, please contact our support team for assistance.
                </p>
                <div className="mt-4 flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-tertiary">
                        <Mail01 className="size-4 text-fg-quaternary" />
                        <span>support@landbank.rw</span>
                    </div>
                    <div className="flex items-center gap-2 text-tertiary">
                        <Phone className="size-4 text-fg-quaternary" />
                        <span>+250 788 000 000</span>
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button href="mailto:support@landbank.rw" color="primary" size="lg" iconLeading={Mail01} className="flex-1">
                    Contact Support
                </Button>
                <Button href="/" color="secondary" size="lg" className="flex-1">
                    Go to Home
                </Button>
            </div>
        </div>
    );
}
