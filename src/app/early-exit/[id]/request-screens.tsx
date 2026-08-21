"use client";

import {
    ArrowLeft,
    ArrowRight,
    LogOut01,
    AlertTriangle,
    File06,
    CheckCircle,
    UploadCloud02,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import {
    formatRWF,
    getRemainingMonths,
} from "@/lib/mock-data";
import { cx } from "@/utils/cx";
import { getExitOffer } from "./exit-types";
import type { EarlyExitFlowProps } from "./exit-types";

// ─── Early Exit Information ──────────────────────────────────────────────────

export function ExitInfoScreen({ inv, goTo }: EarlyExitFlowProps) {
    const { forfeitedProfit, charges, estimatedPayout } = getExitOffer(inv);
    const remaining = getRemainingMonths(inv.maturityDate);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-3 text-center">
                <FeaturedIcon icon={LogOut01} size="xl" color="warning" theme="light" />
                <h2 className="text-display-xs font-semibold text-primary">Early Exit Information</h2>
                <p className="text-sm text-tertiary">
                    Please read the following carefully before requesting an early exit from your
                    investment in {inv.name}.
                </p>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <h4 className="mb-3 text-sm font-semibold text-primary">What happens when you exit early</h4>
                <ul className="flex flex-col gap-2.5 text-sm text-tertiary">
                    <li className="flex items-start gap-2">
                        <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-warning-solid" />
                        <span>
                            You may forfeit up to <strong className="text-primary">50%</strong> of your accrued
                            profit ({formatRWF(forfeitedProfit)} estimated)
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-warning-solid" />
                        <span>
                            An early exit charge of <strong className="text-primary">2.5%</strong> of your
                            principal applies ({formatRWF(charges)} estimated)
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-warning-solid" />
                        <span>
                            Your request is subject to staff review and may be rejected
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-warning-solid" />
                        <span>
                            You have {remaining} months remaining — holding to maturity would earn the
                            full projected return
                        </span>
                    </li>
                </ul>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <h4 className="mb-3 text-sm font-semibold text-primary">Estimated Early Exit Summary</h4>
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Principal Invested", formatRWF(inv.principal)],
                        ["Current Accrued Profit", `+${formatRWF(inv.accruedProfit)}`],
                        ["Estimated Forfeiture", `-${formatRWF(forfeitedProfit)}`],
                        ["Estimated Charges", `-${formatRWF(charges)}`],
                        ["Estimated Payout", formatRWF(estimatedPayout)],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-fg-warning-primary" />
                <p className="text-sm text-tertiary">
                    These are estimates only. The final offer will be calculated by our team based on
                    the current valuation and may differ from the amounts shown above.
                </p>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button
                    href={`/portfolio/${inv.id}`}
                    color="secondary"
                    size="md"
                    iconLeading={ArrowLeft}
                >
                    Keep Investment
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("reason")}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

// ─── Select Reason ───────────────────────────────────────────────────────────

const EXIT_REASONS = [
    "Personal financial need",
    "Found a better investment opportunity",
    "Dissatisfied with investment performance",
    "Relocating or leaving Rwanda",
    "Other personal reasons",
];

export function SelectReasonScreen({ inv, data, updateData, goTo }: EarlyExitFlowProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Select a Reason</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Please tell us why you'd like to exit your investment early. This helps us process
                    your request.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                {EXIT_REASONS.map((reason) => {
                    const isSelected = data.reason === reason;
                    return (
                        <button
                            key={reason}
                            onClick={() => updateData({ reason })}
                            className={cx(
                                "rounded-xl border p-4 text-left text-sm transition duration-100",
                                isSelected
                                    ? "border-brand bg-brand-section_subtle ring-1 ring-brand font-semibold text-primary"
                                    : "border-secondary bg-primary text-secondary hover:bg-secondary",
                            )}
                        >
                            {reason}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button
                    color="secondary"
                    size="md"
                    iconLeading={ArrowLeft}
                    onClick={() => goTo("info")}
                >
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("documents")}
                    isDisabled={!data.reason}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

// ─── Upload Supporting Documents ─────────────────────────────────────────────

export function UploadDocumentsScreen({ inv, data, updateData, goTo }: EarlyExitFlowProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Supporting Documents</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Optionally upload any documents that support your early exit request. This is not
                    required but may help speed up the review.
                </p>
            </div>

            {!data.documentsUploaded ? (
                <button
                    onClick={() => updateData({ documentsUploaded: true })}
                    className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-secondary bg-primary px-6 py-10 transition duration-100 hover:border-brand hover:bg-brand-section_subtle"
                >
                    <div className="flex size-10 items-center justify-center rounded-full bg-secondary">
                        <UploadCloud02 className="size-5 text-fg-quaternary" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-brand-secondary">
                            Click to upload
                        </p>
                        <p className="mt-0.5 text-xs text-tertiary">
                            PDF, JPG, or PNG (max 10 MB)
                        </p>
                    </div>
                </button>
            ) : (
                <div className="flex items-center gap-3 rounded-xl border border-brand bg-brand-section_subtle p-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary">
                        <File06 className="size-4.5 text-fg-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-primary">
                            supporting-document.pdf
                        </p>
                        <p className="text-xs text-tertiary">1.2 MB</p>
                    </div>
                    <CheckCircle className="size-5 text-fg-success-primary" />
                </div>
            )}

            <div className="flex items-center justify-between pt-2">
                <Button
                    color="secondary"
                    size="md"
                    iconLeading={ArrowLeft}
                    onClick={() => goTo("reason")}
                >
                    Back
                </Button>
                <div className="flex items-center gap-3">
                    {!data.documentsUploaded && (
                        <Button
                            color="link-gray"
                            size="md"
                            onClick={() => goTo("review")}
                        >
                            Skip
                        </Button>
                    )}
                    <Button
                        color="primary"
                        size="md"
                        iconTrailing={ArrowRight}
                        onClick={() => goTo("review")}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Review Request ──────────────────────────────────────────────────────────

export function ReviewRequestScreen({ inv, data, goTo }: EarlyExitFlowProps) {
    const { estimatedPayout } = getExitOffer(inv);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Review Your Request</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Please confirm the details below before submitting your early exit request.
                </p>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <h4 className="mb-3 text-sm font-semibold text-primary">Request Summary</h4>
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Investment", inv.name],
                        ["Principal", formatRWF(inv.principal)],
                        ["Accrued Profit", `+${formatRWF(inv.accruedProfit)}`],
                        ["Estimated Payout", formatRWF(estimatedPayout)],
                        ["Reason", data.reason || "—"],
                        ["Documents", data.documentsUploaded ? "1 file attached" : "None"],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-fg-warning-primary" />
                <p className="text-sm text-tertiary">
                    Once submitted, your request will be reviewed by our team within 1–3 business days.
                    You cannot cancel a pending request. The final exit offer may differ from the
                    estimate shown above.
                </p>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button
                    color="secondary"
                    size="md"
                    iconLeading={ArrowLeft}
                    onClick={() => goTo("documents")}
                >
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    onClick={() => goTo("submitted")}
                >
                    Submit Request
                </Button>
            </div>
        </div>
    );
}
