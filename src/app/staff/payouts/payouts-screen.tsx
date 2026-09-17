"use client";

import { useState } from "react";
import {
    CheckCircle,
    XCircle,
    Eye,
    ChevronLeft,
    CoinsSwap01,
    AlertCircle,
    ArrowRight,
} from "@untitledui/icons";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import {
    payoutRequests,
    formatRWF,
    formatDateTime,
    getTimeAgo,
    type PayoutRequest,
    type PayoutStatus,
} from "@/lib/staff-mock-data";

const statusConfig: Record<
    PayoutStatus,
    { label: string; color: "warning" | "success" | "error" | "blue" }
> = {
    pending: { label: "Pending Review", color: "warning" },
    approved: { label: "Approved", color: "success" },
    processing: { label: "Processing", color: "blue" },
    rejected: { label: "Rejected", color: "error" },
};

type FilterStatus = "all" | PayoutStatus;

export const PayoutsScreen = () => {
    const [items, setItems] = useState(payoutRequests);
    const [filter, setFilter] = useState<FilterStatus>("all");
    const [selected, setSelected] = useState<PayoutRequest | null>(null);

    const filtered =
        filter === "all" ? items : items.filter((i) => i.status === filter);
    const pendingCount = items.filter((i) => i.status === "pending").length;

    const updateStatus = (
        id: string,
        status: PayoutStatus,
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
                onProcess={() => updateStatus(selected.id, "processing")}
                onReject={() =>
                    updateStatus(
                        selected.id,
                        "rejected",
                        "Payout account details could not be verified",
                    )
                }
            />
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-display-xs font-semibold text-primary">
                    Payout Queue
                </h1>
                <p className="mt-1 text-sm text-tertiary">
                    Verify payout accounts and process investor payouts.{" "}
                    {pendingCount > 0 && (
                        <span className="font-medium text-warning-primary">
                            {pendingCount} pending review
                        </span>
                    )}
                </p>
            </div>

            {/* Filters */}
            <div className="mb-4 flex flex-wrap gap-2">
                {(
                    [
                        "all",
                        "pending",
                        "approved",
                        "processing",
                        "rejected",
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
                                    Investment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-quaternary">
                                    Final Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Payout To
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
                                        </td>
                                        <td className="px-6 py-4 text-sm text-tertiary">
                                            <span className="max-w-[180px] truncate block">
                                                {item.investmentName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge
                                                size="sm"
                                                color={
                                                    item.type === "maturity"
                                                        ? "brand"
                                                        : "orange"
                                                }
                                                type="pill-color"
                                            >
                                                {item.type === "maturity"
                                                    ? "Maturity"
                                                    : "Early Exit"}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium text-primary">
                                            {formatRWF(item.finalAmount)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-tertiary">
                                            {item.payoutAccountProvider}
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
                                        No payouts match this filter.
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
    onProcess,
    onReject,
}: {
    item: PayoutRequest;
    onBack: () => void;
    onApprove: () => void;
    onProcess: () => void;
    onReject: () => void;
}) {
    const sc = statusConfig[item.status];

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
                    <div className="flex items-center gap-2">
                        <h1 className="text-display-xs font-semibold text-primary">
                            Payout for {item.investorName}
                        </h1>
                        <Badge
                            size="sm"
                            color={
                                item.type === "maturity" ? "brand" : "orange"
                            }
                            type="pill-color"
                        >
                            {item.type === "maturity"
                                ? "Maturity"
                                : "Early Exit"}
                        </Badge>
                    </div>
                    <p className="mt-1 text-sm text-tertiary">
                        {item.investmentName} &middot; Requested{" "}
                        {formatDateTime(item.requestedAt)}
                    </p>
                </div>
                <BadgeWithDot size="md" color={sc.color} type="pill-color">
                    {sc.label}
                </BadgeWithDot>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    {/* Payout Calculation */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Payout Calculation
                        </h2>
                        <div className="space-y-3">
                            <CalculationRow
                                label="Principal Invested"
                                value={formatRWF(item.principal)}
                            />
                            <CalculationRow
                                label="Accrued Profit"
                                value={`+ ${formatRWF(item.accruedProfit)}`}
                                positive
                            />
                            <CalculationRow
                                label="Withholding Tax (13%)"
                                value={`- ${formatRWF(item.tax)}`}
                                negative
                            />
                            <div className="border-t border-secondary pt-3">
                                <CalculationRow
                                    label="Final Payout Amount"
                                    value={formatRWF(item.finalAmount)}
                                    bold
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payout Account */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Payout Account
                        </h2>
                        <div className="flex items-center gap-4 rounded-lg border border-secondary bg-secondary p-4">
                            <FeaturedIcon
                                icon={CoinsSwap01}
                                color="brand"
                                theme="light"
                                size="md"
                            />
                            <div>
                                <div className="text-sm font-medium text-secondary">
                                    {item.payoutAccountProvider}
                                </div>
                                <div className="text-sm text-tertiary">
                                    {item.payoutAccountNumber}
                                </div>
                                <div className="text-xs text-quaternary">
                                    Type:{" "}
                                    {item.payoutAccountType === "mobile-money"
                                        ? "Mobile Money"
                                        : "Bank Account"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Investor Info */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Investor Details
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
                                    {item.investmentName}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {item.status === "pending" && (
                        <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                            <h3 className="mb-4 text-md font-semibold text-primary">
                                Review Actions
                            </h3>
                            <div className="flex flex-col gap-3">
                                <Button
                                    size="md"
                                    color="primary"
                                    iconLeading={CheckCircle}
                                    onPress={onApprove}
                                    className="w-full"
                                >
                                    Approve Payout
                                </Button>
                                <Button
                                    size="md"
                                    color="primary-destructive"
                                    iconLeading={XCircle}
                                    onPress={onReject}
                                    className="w-full"
                                >
                                    Reject Payout
                                </Button>
                            </div>
                        </div>
                    )}

                    {item.status === "approved" && (
                        <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                            <h3 className="mb-4 text-md font-semibold text-primary">
                                Process Payout
                            </h3>
                            <p className="mb-4 text-sm text-tertiary">
                                This payout has been approved. Click below to
                                initiate the transfer.
                            </p>
                            <Button
                                size="md"
                                color="primary"
                                iconTrailing={ArrowRight}
                                onPress={onProcess}
                                className="w-full"
                            >
                                Process Payout
                            </Button>
                        </div>
                    )}

                    {item.status === "processing" && (
                        <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                            <div className="flex items-center gap-3">
                                <FeaturedIcon
                                    icon={CoinsSwap01}
                                    color="brand"
                                    theme="light"
                                    size="md"
                                />
                                <div>
                                    <div className="text-sm font-semibold text-brand-secondary">
                                        Processing
                                    </div>
                                    <div className="text-xs text-tertiary">
                                        Payout is being transferred to the
                                        investor&apos;s account.
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
                                        Payout Rejected
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
                            Request Summary
                        </h3>
                        <dl className="space-y-2.5">
                            <SummaryRow
                                label="Request ID"
                                value={item.id.toUpperCase()}
                            />
                            <SummaryRow
                                label="Type"
                                value={
                                    item.type === "maturity"
                                        ? "Maturity Payout"
                                        : "Early Exit Payout"
                                }
                            />
                            <SummaryRow
                                label="Principal"
                                value={formatRWF(item.principal)}
                            />
                            <SummaryRow
                                label="Profit"
                                value={formatRWF(item.accruedProfit)}
                            />
                            <SummaryRow
                                label="Tax"
                                value={formatRWF(item.tax)}
                            />
                            <SummaryRow
                                label="Final Amount"
                                value={formatRWF(item.finalAmount)}
                            />
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CalculationRow({
    label,
    value,
    positive,
    negative,
    bold,
}: {
    label: string;
    value: string;
    positive?: boolean;
    negative?: boolean;
    bold?: boolean;
}) {
    return (
        <div className="flex justify-between">
            <span
                className={cx(
                    "text-sm",
                    bold ? "font-semibold text-primary" : "text-tertiary",
                )}
            >
                {label}
            </span>
            <span
                className={cx(
                    "text-sm",
                    bold && "text-lg font-semibold text-primary",
                    positive && "text-success-primary",
                    negative && "text-error-primary",
                    !bold && !positive && !negative && "font-medium text-secondary",
                )}
            >
                {value}
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
