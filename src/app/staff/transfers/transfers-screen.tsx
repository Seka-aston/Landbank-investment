"use client";

import { useState } from "react";
import {
    CheckCircle,
    XCircle,
    Eye,
    ChevronLeft,
    Download01,
    FileCheck02,
    CreditCard02,
    AlertCircle,
} from "@untitledui/icons";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import {
    bankTransfers,
    formatRWF,
    formatDateTime,
    getTimeAgo,
    type BankTransfer,
    type TransferStatus,
} from "@/lib/staff-mock-data";

const statusConfig: Record<
    TransferStatus,
    { label: string; color: "warning" | "success" | "error" }
> = {
    pending: { label: "Pending Verification", color: "warning" },
    approved: { label: "Verified", color: "success" },
    rejected: { label: "Rejected", color: "error" },
};

type FilterStatus = "all" | TransferStatus;

export const TransfersScreen = () => {
    const [items, setItems] = useState(bankTransfers);
    const [filter, setFilter] = useState<FilterStatus>("all");
    const [selected, setSelected] = useState<BankTransfer | null>(null);

    const filtered =
        filter === "all" ? items : items.filter((i) => i.status === filter);
    const pendingCount = items.filter((i) => i.status === "pending").length;

    const updateStatus = (
        id: string,
        status: TransferStatus,
        reason?: string,
    ) => {
        setItems((prev) =>
            prev.map((i) =>
                i.id === id
                    ? { ...i, status, rejectionReason: reason }
                    : i,
            ),
        );
        setSelected((prev) =>
            prev?.id === id
                ? { ...prev, status, rejectionReason: reason }
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
            />
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-display-xs font-semibold text-primary">
                    Bank Transfer Queue
                </h1>
                <p className="mt-1 text-sm text-tertiary">
                    Verify uploaded proof of bank transfer payments.{" "}
                    {pendingCount > 0 && (
                        <span className="font-medium text-warning-primary">
                            {pendingCount} awaiting verification
                        </span>
                    )}
                </p>
            </div>

            {/* Filters */}
            <div className="mb-4 flex flex-wrap gap-2">
                {(
                    ["all", "pending", "approved", "rejected"] as FilterStatus[]
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
                            {s === "all" ? "All" : statusConfig[s].label}{" "}
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
                                    Investor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Opportunity
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-quaternary">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Reference
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Uploaded
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Status
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
                                                {item.investorName}
                                            </div>
                                            <div className="text-sm text-tertiary">
                                                {item.investorEmail}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-tertiary">
                                            <span className="max-w-[200px] truncate block">
                                                {item.opportunityName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium text-primary">
                                            {formatRWF(item.amount)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="text-xs text-tertiary">
                                                {item.reference}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-tertiary">
                                            {getTimeAgo(item.uploadedAt)}
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
                                        colSpan={7}
                                        className="px-6 py-12 text-center text-sm text-tertiary"
                                    >
                                        No transfers match this filter.
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
}: {
    item: BankTransfer;
    onBack: () => void;
    onApprove: () => void;
    onReject: (reason: string) => void;
}) {
    const sc = statusConfig[item.status];
    const [showReject, setShowReject] = useState(false);
    const [reason, setReason] = useState("");

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
                        Transfer from {item.investorName}
                    </h1>
                    <p className="mt-1 text-sm text-tertiary">
                        {item.opportunityName} &middot;{" "}
                        {formatRWF(item.amount)}
                    </p>
                </div>
                <BadgeWithDot size="md" color={sc.color} type="pill-color">
                    {sc.label}
                </BadgeWithDot>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    {/* Transfer Details */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Transfer Details
                        </h2>
                        <dl className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="text-xs text-quaternary">
                                    Investor
                                </dt>
                                <dd className="text-sm font-medium text-secondary">
                                    {item.investorName}
                                </dd>
                                <dd className="text-xs text-tertiary">
                                    {item.investorEmail}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-quaternary">
                                    Investment
                                </dt>
                                <dd className="text-sm font-medium text-secondary">
                                    {item.opportunityName}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-quaternary">
                                    Expected Amount
                                </dt>
                                <dd className="text-lg font-semibold text-primary">
                                    {formatRWF(item.amount)}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-quaternary">
                                    Reference Code
                                </dt>
                                <dd className="font-mono text-sm font-medium text-secondary">
                                    {item.reference}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-quaternary">
                                    Source Bank
                                </dt>
                                <dd className="text-sm font-medium text-secondary">
                                    {item.bankName} ({item.accountNumber})
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-quaternary">
                                    Uploaded
                                </dt>
                                <dd className="text-sm font-medium text-secondary">
                                    {formatDateTime(item.uploadedAt)}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Proof of Payment */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Proof of Payment
                        </h2>
                        <div className="flex items-center justify-between rounded-lg border border-secondary bg-secondary p-4">
                            <div className="flex items-center gap-3">
                                <FileCheck02 className="size-8 text-fg-quaternary" />
                                <div>
                                    <div className="text-sm font-medium text-secondary">
                                        {item.proofFileName}
                                    </div>
                                    <div className="text-xs text-tertiary">
                                        {item.proofFileSize}
                                    </div>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                color="secondary"
                                iconLeading={Download01}
                            >
                                View
                            </Button>
                        </div>
                        <div className="mt-4 rounded-lg border border-secondary bg-secondary p-8 text-center">
                            <CreditCard02 className="mx-auto size-12 text-fg-quaternary" />
                            <p className="mt-2 text-sm text-tertiary">
                                Receipt preview placeholder
                            </p>
                            <p className="text-xs text-quaternary">
                                In production, the uploaded receipt image would
                                render here.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {item.status === "pending" && (
                        <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                            <h3 className="mb-3 text-md font-semibold text-primary">
                                Verification Checklist
                            </h3>
                            <div className="mb-4 space-y-2.5">
                                <ChecklistItem label="Reference code matches" />
                                <ChecklistItem label="Transfer amount matches expected amount" />
                                <ChecklistItem label="Sender bank and account match" />
                                <ChecklistItem label="Receipt appears genuine and unaltered" />
                            </div>
                            {!showReject ? (
                                <div className="flex flex-col gap-3">
                                    <Button
                                        size="md"
                                        color="primary"
                                        iconLeading={CheckCircle}
                                        onPress={onApprove}
                                        className="w-full"
                                    >
                                        Approve Transfer
                                    </Button>
                                    <Button
                                        size="md"
                                        color="primary-destructive"
                                        iconLeading={XCircle}
                                        onPress={() => {
                                            setShowReject(true);
                                            setReason("");
                                        }}
                                        className="w-full"
                                    >
                                        Reject Transfer
                                    </Button>
                                </div>
                            ) : (
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
                                            placeholder="Explain why this transfer is being rejected..."
                                            rows={3}
                                            className="w-full rounded-lg border border-primary bg-primary px-3.5 py-2.5 text-sm text-primary placeholder:text-placeholder shadow-xs focus:border-brand focus:ring-4 focus:ring-brand-secondary focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            onPress={() =>
                                                setShowReject(false)
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
                                        Transfer Verified
                                    </div>
                                    <div className="text-xs text-tertiary">
                                        This payment has been confirmed and the
                                        investment activated.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {item.status === "rejected" && item.rejectionReason && (
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
                                        Transfer Rejected
                                    </div>
                                    <div className="text-xs text-tertiary">
                                        {item.rejectionReason}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Summary */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h3 className="mb-3 text-md font-semibold text-primary">
                            Transfer Summary
                        </h3>
                        <dl className="space-y-2.5">
                            <SummaryRow
                                label="Transfer ID"
                                value={item.id.toUpperCase()}
                            />
                            <SummaryRow
                                label="Amount"
                                value={formatRWF(item.amount)}
                            />
                            <SummaryRow
                                label="Source Bank"
                                value={item.bankName}
                            />
                            <SummaryRow
                                label="File"
                                value={item.proofFileName}
                            />
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChecklistItem({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2.5">
            <div className="size-4 rounded border border-secondary" />
            <span className="text-sm text-secondary">{label}</span>
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
