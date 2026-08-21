"use client";

import { useState, useMemo } from "react";
import { SearchMd, FilterLines, ArrowUp, ArrowDown, X } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { InvestorHeader } from "@/components/investor/header";
import { OpportunityCard } from "@/components/investor/opportunity-card";
import { opportunities } from "@/lib/mock-data";

type SortField = "annualReturn" | "minInvestment" | "term" | "fundingPct";
type SortDir = "asc" | "desc";

const statusOptions = [
    { id: "all", label: "All Statuses" },
    { id: "open", label: "Open" },
    { id: "closing-soon", label: "Closing Soon" },
    { id: "fully-funded", label: "Fully Funded" },
];

const riskOptions = [
    { id: "all", label: "All Risk Levels" },
    { id: "low", label: "Low Risk" },
    { id: "medium", label: "Medium Risk" },
    { id: "high", label: "High Risk" },
];

const districtOptions = [
    { id: "all", label: "All Districts" },
    ...Array.from(new Set(opportunities.map((o) => o.district))).map((d) => ({ id: d, label: d })),
];

const sortOptions = [
    { id: "annualReturn", label: "Return Rate" },
    { id: "minInvestment", label: "Min. Investment" },
    { id: "term", label: "Term Length" },
    { id: "fundingPct", label: "Funding Progress" },
];

export const OpportunitiesScreen = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [riskFilter, setRiskFilter] = useState("all");
    const [districtFilter, setDistrictFilter] = useState("all");
    const [sortField, setSortField] = useState<SortField>("annualReturn");
    const [sortDir, setSortDir] = useState<SortDir>("desc");

    const activeFilterCount = [statusFilter, riskFilter, districtFilter].filter((f) => f !== "all").length;

    const filtered = useMemo(() => {
        let result = [...opportunities];

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (o) => o.name.toLowerCase().includes(q) || o.location.toLowerCase().includes(q) || o.district.toLowerCase().includes(q),
            );
        }

        if (statusFilter !== "all") {
            result = result.filter((o) => o.status === statusFilter);
        }
        if (riskFilter !== "all") {
            result = result.filter((o) => o.riskLevel === riskFilter);
        }
        if (districtFilter !== "all") {
            result = result.filter((o) => o.district === districtFilter);
        }

        result.sort((a, b) => {
            let aVal: number, bVal: number;
            switch (sortField) {
                case "annualReturn":
                    aVal = a.annualReturn;
                    bVal = b.annualReturn;
                    break;
                case "minInvestment":
                    aVal = a.minInvestment;
                    bVal = b.minInvestment;
                    break;
                case "term":
                    aVal = a.term;
                    bVal = b.term;
                    break;
                case "fundingPct":
                    aVal = a.sharesSold / a.totalShares;
                    bVal = b.sharesSold / b.totalShares;
                    break;
                default:
                    return 0;
            }
            return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        });

        return result;
    }, [search, statusFilter, riskFilter, districtFilter, sortField, sortDir]);

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("all");
        setRiskFilter("all");
        setDistrictFilter("all");
    };

    return (
        <div className="flex min-h-dvh flex-col bg-secondary">
            <InvestorHeader />

            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-display-xs font-semibold text-primary sm:text-display-sm">Investment Opportunities</h1>
                    <p className="mt-1 text-md text-tertiary">
                        Browse verified land investment opportunities across Rwanda. {opportunities.length} listings available.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="mb-6 flex flex-col gap-4 rounded-xl border border-secondary bg-primary p-4 shadow-xs">
                    <div className="relative">
                        <Input
                            icon={SearchMd}
                            placeholder="Search by name, location, or district..."
                            value={search}
                            onChange={(value) => setSearch(value)}
                            size="md"
                        />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="flex-1">
                            <Select
                                label="Status"
                                selectedKey={statusFilter}
                                onSelectionChange={(key) => setStatusFilter(key as string)}
                                items={statusOptions}
                                size="sm"
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                        <div className="flex-1">
                            <Select
                                label="Risk Level"
                                selectedKey={riskFilter}
                                onSelectionChange={(key) => setRiskFilter(key as string)}
                                items={riskOptions}
                                size="sm"
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                        <div className="flex-1">
                            <Select
                                label="District"
                                selectedKey={districtFilter}
                                onSelectionChange={(key) => setDistrictFilter(key as string)}
                                items={districtOptions}
                                size="sm"
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                        <div className="flex-1">
                            <Select
                                label="Sort by"
                                selectedKey={sortField}
                                onSelectionChange={(key) => setSortField(key as SortField)}
                                items={sortOptions}
                                size="sm"
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                        <Button
                            color="tertiary"
                            size="sm"
                            iconLeading={sortDir === "asc" ? ArrowUp : ArrowDown}
                            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                            className="self-end"
                        >
                            {sortDir === "asc" ? "Asc" : "Desc"}
                        </Button>
                    </div>

                    {activeFilterCount > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-tertiary">Active filters:</span>
                            {statusFilter !== "all" && (
                                <Badge size="sm" type="pill-color" color="brand">
                                    {statusOptions.find((o) => o.id === statusFilter)?.label}
                                </Badge>
                            )}
                            {riskFilter !== "all" && (
                                <Badge size="sm" type="pill-color" color="brand">
                                    {riskOptions.find((o) => o.id === riskFilter)?.label}
                                </Badge>
                            )}
                            {districtFilter !== "all" && (
                                <Badge size="sm" type="pill-color" color="brand">
                                    {districtFilter}
                                </Badge>
                            )}
                            <Button color="link-color" size="xs" iconLeading={X} onClick={clearFilters}>
                                Clear all
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-tertiary">
                        Showing {filtered.length} of {opportunities.length} opportunities
                    </span>
                </div>

                {filtered.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((opp) => (
                            <OpportunityCard key={opp.slug} opportunity={opp} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 rounded-xl border border-secondary bg-primary py-16">
                        <FilterLines className="size-12 text-fg-quaternary" />
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-primary">No matching opportunities</h3>
                            <p className="mt-1 text-sm text-tertiary">Try adjusting your filters or search terms.</p>
                        </div>
                        <Button color="secondary" size="md" onClick={clearFilters}>
                            Clear filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
