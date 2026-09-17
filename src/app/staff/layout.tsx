"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
    ShieldTick,
    CreditCard02,
    CoinsSwap01,
    LogOut01,
    Menu01,
    X,
    Home02,
} from "@untitledui/icons";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { LandBankLogoStaff, LandBankLogoMark } from "@/components/investor/landbank-logo";
import { cx } from "@/utils/cx";

const navItems = [
    {
        label: "Verification Queue",
        href: "/staff/verification",
        icon: ShieldTick,
        badge: 4,
    },
    {
        label: "Bank Transfers",
        href: "/staff/transfers",
        icon: CreditCard02,
        badge: 3,
    },
    {
        label: "Payout Queue",
        href: "/staff/payouts",
        icon: CoinsSwap01,
        badge: 2,
    },
    {
        label: "Early Exit Queue",
        href: "/staff/exits",
        icon: LogOut01,
        badge: 2,
    },
];

export default function StaffLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-dvh bg-secondary">
            {/* Desktop sidebar */}
            <aside className="hidden w-[280px] shrink-0 flex-col border-r border-secondary bg-primary lg:flex">
                <div className="px-5 pt-5 pb-4">
                    <LandBankLogoStaff />
                </div>

                <nav className="flex flex-1 flex-col gap-1 px-3 pt-2">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className={cx(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition duration-100",
                                    active
                                        ? "bg-primary_hover text-secondary"
                                        : "text-tertiary hover:bg-primary_hover hover:text-secondary",
                                )}
                            >
                                <item.icon
                                    className={cx(
                                        "size-5",
                                        active
                                            ? "text-fg-brand-secondary"
                                            : "text-fg-quaternary",
                                    )}
                                />
                                <span className="flex-1">{item.label}</span>
                                {item.badge > 0 && (
                                    <Badge
                                        size="sm"
                                        color={active ? "brand" : "gray"}
                                        type="pill-color"
                                    >
                                        {item.badge}
                                    </Badge>
                                )}
                            </a>
                        );
                    })}
                </nav>

                <div className="mt-auto border-t border-secondary px-3 py-4">
                    <a
                        href="/"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-tertiary hover:bg-primary_hover hover:text-secondary transition duration-100"
                    >
                        <Home02 className="size-5 text-fg-quaternary" />
                        Switch to Investor App
                    </a>
                    <div className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 ring-1 ring-secondary ring-inset">
                        <div className="flex size-9 items-center justify-center rounded-full bg-brand-secondary text-xs font-semibold text-brand-secondary">
                            AO
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold text-secondary">
                                Admin Operator
                            </div>
                            <div className="truncate text-xs text-tertiary">
                                admin@landbank.rw
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile header + content */}
            <div className="flex min-w-0 flex-1 flex-col">
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-secondary bg-primary px-4 lg:hidden">
                    <LandBankLogoStaff />
                    <button
                        className="rounded-lg p-2 text-fg-secondary hover:bg-primary_hover"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <X className="size-5" />
                        ) : (
                            <Menu01 className="size-5" />
                        )}
                    </button>
                </header>

                {mobileOpen && (
                    <div className="border-b border-secondary bg-primary px-4 pb-4 lg:hidden">
                        <nav className="flex flex-col gap-1 pt-2">
                            {navItems.map((item) => {
                                const active = pathname === item.href;
                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className={cx(
                                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium transition duration-100",
                                            active
                                                ? "bg-primary_hover text-secondary"
                                                : "text-tertiary hover:bg-primary_hover hover:text-secondary",
                                        )}
                                    >
                                        <item.icon className="size-5 text-fg-quaternary" />
                                        <span className="flex-1">
                                            {item.label}
                                        </span>
                                        {item.badge > 0 && (
                                            <Badge
                                                size="sm"
                                                color="gray"
                                                type="pill-color"
                                            >
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </a>
                                );
                            })}
                        </nav>
                        <div className="mt-3 border-t border-secondary pt-3">
                            <Button
                                href="/"
                                color="secondary"
                                size="sm"
                                iconLeading={Home02}
                                className="w-full"
                            >
                                Switch to Investor App
                            </Button>
                        </div>
                    </div>
                )}

                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
