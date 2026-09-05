"use client";

import { useState } from "react";
import { Home02, BarChart01, Briefcase01, User01, Menu01, X } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

const navItems = [
    { label: "Home", href: "/", icon: Home02 },
    { label: "Opportunities", href: "/opportunities", icon: BarChart01 },
    { label: "Portfolio", href: "/portfolio", icon: Briefcase01 },
];

export const InvestorHeader = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);

    return (
        <header className="sticky top-0 z-50 border-b border-secondary bg-primary">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <a href="/" className="flex items-center gap-2">
                    <img src="/brand/landbank-logo-icon.png" alt="Land Bank" className="size-8 md:hidden" />
                    <img src="/brand/landbank-logo-full.png" alt="Land Bank" className="hidden h-8 w-auto md:block" />
                </a>

                <nav className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <Button key={item.label} href={item.href} color="tertiary" size="sm" iconLeading={item.icon}>
                            {item.label}
                        </Button>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    {loggedIn ? (
                        <a href="/account" className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-primary_hover transition duration-100">
                            <div className="flex size-8 items-center justify-center rounded-full bg-brand-secondary text-xs font-semibold text-brand-secondary">
                                JM
                            </div>
                            <span className="text-sm font-medium text-secondary">Jean M.</span>
                        </a>
                    ) : (
                        <>
                            <Button href="/login" color="secondary" size="sm">
                                Log in
                            </Button>
                            <Button href="/signup" color="primary" size="sm" iconLeading={User01}>
                                Sign up
                            </Button>
                        </>
                    )}
                </div>

                <button
                    className="rounded-lg p-2 text-fg-secondary hover:bg-primary_hover md:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="size-5" /> : <Menu01 className="size-5" />}
                </button>
            </div>

            {mobileOpen && (
                <div className="border-t border-secondary bg-primary px-4 pb-4 md:hidden">
                    <nav className="flex flex-col gap-1 py-3">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium text-secondary hover:bg-primary_hover"
                            >
                                <item.icon className="size-5 text-fg-quaternary" />
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    <div className="flex flex-col gap-3 border-t border-secondary pt-3">
                        {loggedIn ? (
                            <a href="/account" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium text-secondary hover:bg-primary_hover">
                                <div className="flex size-8 items-center justify-center rounded-full bg-brand-secondary text-xs font-semibold text-brand-secondary">
                                    JM
                                </div>
                                <span>My Account</span>
                            </a>
                        ) : (
                            <>
                                <Button href="/login" color="secondary" size="md" className={cx("w-full")}>
                                    Log in
                                </Button>
                                <Button href="/signup" color="primary" size="md" className={cx("w-full")}>
                                    Sign up
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Dev toggle: logged in / logged out */}
            <div className="absolute right-2 top-17 z-50 flex items-center gap-1.5 rounded-b-lg border border-t-0 border-secondary bg-secondary px-2 py-1">
                <span className="text-[10px] font-medium text-quaternary">Auth:</span>
                <button
                    onClick={() => setLoggedIn(false)}
                    className={cx(
                        "rounded px-1.5 py-0.5 text-[10px] font-medium transition duration-100",
                        !loggedIn ? "bg-brand-solid text-white" : "text-quaternary hover:text-secondary",
                    )}
                >
                    Guest
                </button>
                <button
                    onClick={() => setLoggedIn(true)}
                    className={cx(
                        "rounded px-1.5 py-0.5 text-[10px] font-medium transition duration-100",
                        loggedIn ? "bg-brand-solid text-white" : "text-quaternary hover:text-secondary",
                    )}
                >
                    Logged in
                </button>
            </div>
        </header>
    );
};
