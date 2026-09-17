"use client";

import { useState } from "react";
import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Eye,
    ChevronLeft,
    User01,
    Mail01,
    Phone01,
    FileCheck02,
    AlertCircle,
} from "@untitledui/icons";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import {
    kycSubmissions,
    formatDateTime,
    getTimeAgo,
    type KycSubmission,
    type KycStatus,
} from "@/lib/staff-mock-data";

const statusConfig: Record<
    KycStatus,
    { label: string; color: "warning" | "success" | "error" | "orange" }
> = {
    pending: { label: "Pending Review", color: "warning" },
    approved: { label: "Approved", color: "success" },
    rejected: { label: "Rejected", color: "error" },
    resubmission: { label: "Resubmission Requested", color: "orange" },
};

type FilterStatus = "all" | KycStatus;

export const VerificationScreen = () => {
    const [items, setItems] = useState(kycSubmissions);
    const [filter, setFilter] = useState<FilterStatus>("all");
    const [selected, setSelected] = useState<KycSubmission | null>(null);

    const filtered =
        filter === "all" ? items : items.filter((i) => i.status === filter);
    const pendingCount = items.filter((i) => i.status === "pending").length;

    const updateStatus = (
        id: string,
        status: KycStatus,
        reason?: string,
        fields?: string[],
    ) => {
        setItems((prev) =>
            prev.map((i) =>
                i.id === id
                    ? {
                          ...i,
                          status,
                          rejectionReason: reason,
                          rejectedFields: fields,
                      }
                    : i,
            ),
        );
        setSelected((prev) =>
            prev?.id === id
                ? {
                      ...prev,
                      status,
                      rejectionReason: reason,
                      rejectedFields: fields,
                  }
                : prev,
        );
    };

    if (selected) {
        return (
            <DetailView
                item={selected}
                onBack={() => setSelected(null)}
                onApprove={() => updateStatus(selected.id, "approved")}
                onReject={(reason) =>
                    updateStatus(selected.id, "rejected", reason)
                }
                onResubmit={(reason, fields) =>
                    updateStatus(
                        selected.id,
                        "resubmission",
                        reason,
                        fields,
                    )
                }
            />
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-display-xs font-semibold text-primary">
                    Verification Queue
                </h1>
                <p className="mt-1 text-sm text-tertiary">
                    Review pending KYC submissions from investors.{" "}
                    {pendingCount > 0 && (
                        <span className="font-medium text-warning-primary">
                            {pendingCount} pending review
                        </span>
                    )}
                </p>
            </div>

            {/* Filter tabs */}
            <div className="mb-4 flex flex-wrap gap-2">
                {(
                    [
                        "all",
                        "pending",
                        "approved",
                        "rejected",
                        "resubmission",
                    ] as FilterStatus[]
                ).map((s) => {
                    const count =
                        s === "all"
                            ? items.length
                            : items.filter((i) => i.status === s).length;
                    return (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={cx(
                                "rounded-lg px-3 py-1.5 text-sm font-medium transition duration-100",
                                filter === s
                                    ? "bg-primary_hover text-secondary shadow-xs ring-1 ring-primary ring-inset"
                                    : "text-tertiary hover:bg-primary_hover hover:text-secondary",
                            )}
                        >
                            {s === "all"
                                ? "All"
                                : statusConfig[s].label}{" "}
                            <span className="text-quaternary">({count})</span>
                        </button>
                    );
                })}
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl bg-primary shadow-xs ring-1 ring-secondary">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-secondary bg-secondary">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Applicant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Document
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Submitted
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Flags
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-quaternary" />
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item) => {
                                const sc = statusConfig[item.status];
                                return (
                                    <tr
                                        key={item.id}
                                        className="border-b border-secondary last:border-b-0 hover:bg-secondary transition duration-100"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-primary">
                                                {item.applicantName}
                                            </div>
                                            <div className="text-sm text-tertiary">
                                                {item.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-tertiary">
                                            {item.documentType}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-tertiary">
                                                {getTimeAgo(item.submittedAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <BadgeWithDot
                                                size="sm"
                                                color={sc.color}
                                                type="pill-color"
                                            >
                                                {sc.label}
                                            </BadgeWithDot>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1.5">
                                                {item.isPEP && (
                                                    <BadgeWithDot
                                                        size="sm"
                                                        color="error"
                                                        type="pill-color"
                                                    >
                                                        PEP
                                                    </BadgeWithDot>
                                                )}
                                                {!item.hasProofOfAddress && (
                                                    <BadgeWithDot
                                                        size="sm"
                                                        color="gray"
                                                        type="pill-color"
                                                    >
                                                        No address
                                                    </BadgeWithDot>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button
                                                size="sm"
                                                color="link-color"
                                                iconLeading={Eye}
                                                onPress={() =>
                                                    setSelected(item)
                                                }
                                            >
                                                Review
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filtered.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-12 text-center text-sm text-tertiary"
                                    >
                                        No submissions match this filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

function DetailView({
    item,
    onBack,
    onApprove,
    onReject,
    onResubmit,
}: {
    item: KycSubmission;
    onBack: () => void;
    onApprove: () => void;
    onReject: (reason: string) => void;
    onResubmit: (reason: string, fields: string[]) => void;
}) {
    const sc = statusConfig[item.status];
    const [actionMode, setActionMode] = useState<
        "idle" | "resubmit" | "reject"
    >("idle");
    const [reason, setReason] = useState("");
    const [selectedFields, setSelectedFields] = useState<string[]>([]);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <button
                onClick={onBack}
                className="mb-4 flex items-center gap-1.5 text-sm font-medium text-tertiary hover:text-secondary transition duration-100"
            >
                <ChevronLeft className="size-4" />
                Back to Queue
            </button>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-display-xs font-semibold text-primary">
                        {item.applicantName}
                    </h1>
                    <p className="mt-1 text-sm text-tertiary">
                        Submitted {formatDateTime(item.submittedAt)}
                    </p>
                </div>
                <BadgeWithDot size="md" color={sc.color} type="pill-color">
                    {sc.label}
                </BadgeWithDot>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main info */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Personal Information */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Personal Information
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <InfoRow
                                icon={User01}
                                label="Full Name"
                                value={item.applicantName}
                            />
                            <InfoRow
                                icon={Mail01}
                                label="Email"
                                value={item.email}
                            />
                            <InfoRow
                                icon={Phone01}
                                label="Phone"
                                value={item.phone}
                            />
                            <InfoRow
                                icon={User01}
                                label="Nationality"
                                value={item.nationality}
                            />
                            <InfoRow
                                icon={User01}
                                label="Date of Birth"
                                value={item.dateOfBirth}
                            />
                            <InfoRow
                                icon={User01}
                                label="National ID"
                                value={item.nationalId}
                            />
                        </div>
                    </div>

                    {/* Identity Verification */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Identity Verification
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <InfoRow
                                icon={FileCheck02}
                                label="Document Type"
                                value={item.documentType}
                            />
                            <InfoRow
                                icon={FileCheck02}
                                label="Document Number"
                                value={item.documentNumber}
                            />
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            <DocumentPreview
                                label="ID Front"
                                available
                            />
                            {item.documentType !== "Passport" && (
                                <DocumentPreview
                                    label="ID Back"
                                    available
                                />
                            )}
                            <DocumentPreview
                                label="Selfie"
                                available
                            />
                        </div>
                    </div>

                    {/* Proof of Address */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Proof of Address
                        </h2>
                        {item.hasProofOfAddress ? (
                            <DocumentPreview
                                label="Proof of Address Document"
                                available
                            />
                        ) : (
                            <p className="text-sm text-tertiary">
                                Applicant skipped proof of address (optional
                                step).
                            </p>
                        )}
                    </div>

                    {/* Declarations */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Investor Declarations
                        </h2>
                        <div className="space-y-3">
                            <DeclarationRow
                                label="Accepted Terms & Conditions"
                                checked
                            />
                            <DeclarationRow
                                label="Acknowledged Investment Risks"
                                checked
                            />
                            <DeclarationRow
                                label="Confirmed Information Accuracy"
                                checked
                            />
                            <DeclarationRow
                                label="Politically Exposed Person (PEP)"
                                checked={item.isPEP}
                                warning={item.isPEP}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar actions */}
                <div className="space-y-6">
                    {(item.status === "pending" || item.status === "resubmission") && (
                        <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                            <h3 className="mb-4 text-md font-semibold text-primary">
                                Review Actions
                            </h3>

                            {actionMode === "idle" && (
                                <div className="flex flex-col gap-3">
                                    <Button
                                        size="md"
                                        color="primary"
                                        iconLeading={CheckCircle}
                                        onPress={onApprove}
                                        className="w-full"
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        size="md"
                                        color="secondary"
                                        iconLeading={AlertTriangle}
                                        onPress={() => {
                                            setActionMode("resubmit");
                                            setReason("");
                                            setSelectedFields([]);
                                        }}
                                        className="w-full"
                                    >
                                        Request Resubmission
                                    </Button>
                                    <Button
                                        size="md"
                                        color="primary-destructive"
                                        iconLeading={XCircle}
                                        onPress={() => {
                                            setActionMode("reject");
                                            setReason("");
                                        }}
                                        className="w-full"
                                    >
                                        Reject
                                    </Button>
                                </div>
                            )}

                            {actionMode === "resubmit" && (
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-secondary">
                                            Fields to resubmit
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                "Identity Document",
                                                "Selfie Verification",
                                                "Proof of Address",
                                                "Personal Information",
                                            ].map((field) => (
                                                <label
                                                    key={field}
                                                    className="flex items-center gap-2.5 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFields.includes(
                                                            field,
                                                        )}
                                                        onChange={(e) =>
                                                            setSelectedFields(
                                                                (prev) =>
                                                                    e.target
                                                                        .checked
                                                                        ? [
                                                                              ...prev,
                                                                              field,
                                                                          ]
                                                                        : prev.filter(
                                                                              (f) =>
                                                                                  f !==
                                                                                  field,
                                                                          ),
                                                            )
                                                        }
                                                        className="size-4 rounded border-primary accent-brand-600"
                                                    />
                                                    <span className="text-sm text-secondary">
                                                        {field}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-secondary">
                                            Reason for resubmission
                                        </label>
                                        <textarea
                                            value={reason}
                                            onChange={(e) =>
                                                setReason(e.target.value)
                                            }
                                            placeholder="Explain what needs to be corrected..."
                                            rows={3}
                                            className="w-full rounded-lg border border-primary bg-primary px-3.5 py-2.5 text-sm text-primary placeholder:text-placeholder shadow-xs focus:border-brand focus:ring-4 focus:ring-brand-secondary focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            onPress={() =>
                                                setActionMode("idle")
                                            }
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="primary"
                                            iconLeading={AlertTriangle}
                                            isDisabled={
                                                !reason.trim() ||
                                                selectedFields.length === 0
                                            }
                                            onPress={() =>
                                                onResubmit(
                                                    reason.trim(),
                                                    selectedFields,
                                                )
                                            }
                                            className="flex-1"
                                        >
                                            Request
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {actionMode === "reject" && (
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-secondary">
                                            Rejection reason
                                        </label>
                                        <textarea
                                            value={reason}
                                            onChange={(e) =>
                                                setReason(e.target.value)
                                            }
                                            placeholder="Explain why this application is being rejected..."
                                            rows={3}
                                            className="w-full rounded-lg border border-primary bg-primary px-3.5 py-2.5 text-sm text-primary placeholder:text-placeholder shadow-xs focus:border-brand focus:ring-4 focus:ring-brand-secondary focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            onPress={() =>
                                                setActionMode("idle")
                                            }
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="primary-destructive"
                                            iconLeading={XCircle}
                                            isDisabled={!reason.trim()}
                                            onPress={() =>
                                                onReject(reason.trim())
                                            }
                                            className="flex-1"
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {item.status !== "pending" && item.rejectionReason && (
                        <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                            <h3 className="mb-2 text-md font-semibold text-primary">
                                {item.status === "rejected"
                                    ? "Rejection Reason"
                                    : "Resubmission Reason"}
                            </h3>
                            <p className="text-sm text-tertiary">
                                {item.rejectionReason}
                            </p>
                            {item.rejectedFields && (
                                <div className="mt-2">
                                    <span className="text-xs font-medium text-quaternary">
                                        Affected fields:{" "}
                                    </span>
                                    <span className="text-xs text-tertiary">
                                        {item.rejectedFields.join(", ")}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {item.status === "approved" && (
                        <div className="rounded-xl bg-success-secondary p-6 shadow-xs ring-1 ring-secondary">
                            <div className="flex items-center gap-3">
                                <FeaturedIcon
                                    icon={CheckCircle}
                                    color="success"
                                    theme="light"
                                    size="md"
                                />
                                <div>
                                    <div className="text-sm font-semibold text-success-primary">
                                        Verified
                                    </div>
                                    <div className="text-xs text-tertiary">
                                        This applicant has been approved.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Risk flags */}
                    {item.isPEP && (
                        <div className="rounded-xl bg-error-secondary p-6 shadow-xs ring-1 ring-secondary">
                            <div className="flex items-center gap-3">
                                <FeaturedIcon
                                    icon={AlertCircle}
                                    color="error"
                                    theme="light"
                                    size="md"
                                />
                                <div>
                                    <div className="text-sm font-semibold text-error-primary">
                                        PEP Flag
                                    </div>
                                    <div className="text-xs text-tertiary">
                                        Applicant declared as a Politically
                                        Exposed Person. Enhanced due diligence
                                        may be required.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submission summary */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h3 className="mb-3 text-md font-semibold text-primary">
                            Submission Summary
                        </h3>
                        <dl className="space-y-2.5">
                            <SummaryRow
                                label="Submission ID"
                                value={item.id.toUpperCase()}
                            />
                            <SummaryRow
                                label="Submitted"
                                value={formatDateTime(item.submittedAt)}
                            />
                            <SummaryRow
                                label="Document Type"
                                value={item.documentType}
                            />
                            <SummaryRow
                                label="Proof of Address"
                                value={
                                    item.hasProofOfAddress
                                        ? "Provided"
                                        : "Skipped"
                                }
                            />
                            <SummaryRow
                                label="PEP"
                                value={item.isPEP ? "Yes" : "No"}
                            />
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: React.FC<{ className?: string }>;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <Icon className="mt-0.5 size-4 text-fg-quaternary" />
            <div>
                <div className="text-xs text-quaternary">{label}</div>
                <div className="text-sm font-medium text-secondary">
                    {value}
                </div>
            </div>
        </div>
    );
}

function DocumentPreview({
    label,
    available,
}: {
    label: string;
    available: boolean;
}) {
    return (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-secondary bg-secondary p-4">
            <FileCheck02 className="size-8 text-fg-quaternary" />
            <span className="text-xs font-medium text-tertiary">{label}</span>
            {available ? (
                <span className="text-xs text-success-primary">Uploaded</span>
            ) : (
                <span className="text-xs text-quaternary">Not provided</span>
            )}
        </div>
    );
}

function DeclarationRow({
    label,
    checked,
    warning,
}: {
    label: string;
    checked: boolean;
    warning?: boolean;
}) {
    return (
        <div className="flex items-center gap-3">
            {checked ? (
                <CheckCircle
                    className={cx(
                        "size-5",
                        warning
                            ? "text-fg-warning-primary"
                            : "text-fg-success-primary",
                    )}
                />
            ) : (
                <XCircle className="size-5 text-fg-quaternary" />
            )}
            <span
                className={cx(
                    "text-sm",
                    warning ? "font-medium text-warning-primary" : "text-secondary",
                )}
            >
                {label}
            </span>
        </div>
    );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between">
            <dt className="text-sm text-tertiary">{label}</dt>
            <dd className="text-sm font-medium text-secondary">{value}</dd>
        </div>
    );
}
