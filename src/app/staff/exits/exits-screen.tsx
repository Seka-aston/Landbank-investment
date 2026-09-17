"use client";

import { useState } from "react";
import {
    CheckCircle,
    XCircle,
    Eye,
    ChevronLeft,
    FileCheck02,
    AlertCircle,
    Clock,
} from "@untitledui/icons";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import {
    earlyExitRequests,
    formatRWF,
    formatDateTime,
    getTimeAgo,
    type EarlyExitRequest,
    type ExitStatus,
} from "@/lib/staff-mock-data";

const statusConfig: Record<
    ExitStatus,
    { label: string; color: "warning" | "success" | "error" }
> = {
    pending: { label: "Pending Review", color: "warning" },
    approved: { label: "Approved", color: "success" },
    rejected: { label: "Rejected", color: "error" },
};

type FilterStatus = "all" | ExitStatus;

export const ExitsScreen = () => {
    const [items, setItems] = useState(earlyExitRequests);
    const [filter, setFilter] = useState<FilterStatus>("all");
    const [selected, setSelected] = useState<EarlyExitRequest | null>(null);

    const filtered =
        filter === "all" ? items : items.filter((i) => i.status === filter);
    const pendingCount = items.filter((i) => i.status === "pending").length;

    const updateStatus = (
        id: string,
        status: ExitStatus,
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
                onReject={() =>
                    updateStatus(
                        selected.id,
                        "rejected",
                        "Minimum holding period of 3 months has not been met",
                    )
                }
            />
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-display-xs font-semibold text-primary">
                    Early Exit Queue
                </h1>
                <p className="mt-1 text-sm text-tertiary">
                    Review early exit requests from investors.{" "}
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
                                    Investment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Reason
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-quaternary">
                                    Term Progress
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-quaternary">
                                    Est. Payout
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
                                const pct = Math.round(
                                    (item.elapsedMonths /
                                        item.totalTermMonths) *
                                        100,
                                );
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
                                        <td className="px-6 py-4 text-sm text-tertiary">
                                            <span className="max-w-[160px] truncate block">
                                                {item.reason}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-16 rounded-full bg-quaternary">
                                                    <div
                                                        className="h-full rounded-full bg-brand-solid"
                                                        style={{
                                                            width: `${pct}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-xs text-tertiary">
                                                    {item.elapsedMonths}/
                                                    {item.totalTermMonths}mo
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium text-primary">
                                            {formatRWF(item.estimatedPayout)}
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
                                        No exit requests match this filter.
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
    item: EarlyExitRequest;
    onBack: () => void;
    onApprove: () => void;
    onReject: () => void;
}) {
    const sc = statusConfig[item.status];
    const pct = Math.round(
        (item.elapsedMonths / item.totalTermMonths) * 100,
    );

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
                        Exit Request — {item.investorName}
                    </h1>
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
                    {/* Exit Summary */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Exit Calculation
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
                                label="Forfeited Profit (50%)"
                                value={`- ${formatRWF(item.forfeitedProfit)}`}
                                negative
                            />
                            <CalculationRow
                                label="Early Exit Charge (2.5%)"
                                value={`- ${formatRWF(item.exitCharge)}`}
                                negative
                            />
                            <div className="border-t border-secondary pt-3">
                                <CalculationRow
                                    label="Estimated Payout"
                                    value={formatRWF(item.estimatedPayout)}
                                    bold
                                />
                            </div>
                        </div>
                    </div>

                    {/* Term Progress */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Investment Term Progress
                        </h2>
                        <div className="flex items-center gap-4">
                            <FeaturedIcon
                                icon={Clock}
                                color="brand"
                                theme="light"
                                size="md"
                            />
                            <div className="flex-1">
                                <div className="mb-1 flex justify-between text-sm">
                                    <span className="text-tertiary">
                                        {item.elapsedMonths} of{" "}
                                        {item.totalTermMonths} months elapsed
                                    </span>
                                    <span className="font-medium text-secondary">
                                        {pct}%
                                    </span>
                                </div>
                                <div className="h-2 rounded-full bg-quaternary">
                                    <div
                                        className="h-full rounded-full bg-brand-solid"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <div className="mt-1 text-xs text-quaternary">
                                    {item.totalTermMonths - item.elapsedMonths}{" "}
                                    months remaining until maturity
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reason & Documents */}
                    <div className="rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                        <h2 className="mb-4 text-md font-semibold text-primary">
                            Exit Reason
                        </h2>
                        <p className="text-sm text-secondary">{item.reason}</p>

                        <h3 className="mb-3 mt-6 text-sm font-semibold text-primary">
                            Supporting Documents
                        </h3>
                        {item.hasDocuments ? (
                            <div className="flex items-center gap-3 rounded-lg border border-secondary bg-secondary p-4">
                                <FileCheck02 className="size-8 text-fg-quaternary" />
                                <div>
                                    <div className="text-sm font-medium text-secondary">
                                        supporting_documents.pdf
                                    </div>
                                    <div className="text-xs text-tertiary">
                                        1.4 MB
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-tertiary">
                                No supporting documents provided (optional
                                step).
                            </p>
                        )}
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
                            <div>
                                <dt className="text-xs text-quaternary">
                                    Principal
                                </dt>
                                <dd className="text-sm font-medium text-secondary">
                                    {formatRWF(item.principal)}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-quaternary">
                                    Accrued Profit
                                </dt>
                                <dd className="text-sm font-medium text-secondary">
                                    {formatRWF(item.accruedProfit)}
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
                            <div className="mb-4 space-y-2 text-sm text-tertiary">
                                <p>
                                    Approving this request will generate an
                                    early exit offer for the investor with the
                                    calculated payout amount above.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button
                                    size="md"
                                    color="primary"
                                    iconLeading={CheckCircle}
                                    onPress={onApprove}
                                    className="w-full"
                                >
                                    Approve Exit
                                </Button>
                                <Button
                                    size="md"
                                    color="primary-destructive"
                                    iconLeading={XCircle}
                                    onPress={onReject}
                                    className="w-full"
                                >
                                    Reject Exit
                                </Button>
                            </div>
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
                                        Exit Approved
                                    </div>
                                    <div className="text-xs text-tertiary">
                                        The investor has been sent an exit offer
                                        and can accept or decline.
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
                                        Exit Rejected
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
                                label="Principal"
                                value={formatRWF(item.principal)}
                            />
                            <SummaryRow
                                label="Forfeited"
                                value={formatRWF(item.forfeitedProfit)}
                            />
                            <SummaryRow
                                label="Exit Charge"
                                value={formatRWF(item.exitCharge)}
                            />
                            <SummaryRow
                                label="Est. Payout"
                                value={formatRWF(item.estimatedPayout)}
                            />
                            <SummaryRow
                                label="Holding Period"
                                value={`${item.elapsedMonths}/${item.totalTermMonths} months`}
                            />
                            <SummaryRow
                                label="Documents"
                                value={
                                    item.hasDocuments
                                        ? "Provided"
                                        : "None"
                                }
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
