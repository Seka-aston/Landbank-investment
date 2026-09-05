"use client";

import { useState } from "react";
import {
    User01,
    Phone,
    Shield01,
    CreditCard02,
    Wallet04,
    Plus,
    Edit05,
    Trash01,
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    Settings01,
    Bell01,
    LogOut01,
    Building07,
    ChevronRight,
} from "@untitledui/icons";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { InvestorHeader } from "@/components/investor/header";
import { cx } from "@/utils/cx";

type SubPage = "overview" | "personal" | "payout-accounts" | "add-account" | "edit-account" | "security" | "notifications";

export const AccountScreen = () => {
    const [subPage, setSubPage] = useState<SubPage>("overview");
    const [editingAccountId, setEditingAccountId] = useState<string | null>(null);

    const goTo = (page: SubPage) => {
        setSubPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex min-h-dvh flex-col bg-secondary">
            <InvestorHeader />
            <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
                {subPage === "overview" && <OverviewView goTo={goTo} />}
                {subPage === "personal" && <PersonalInfoView goTo={goTo} />}
                {subPage === "payout-accounts" && (
                    <PayoutAccountsView
                        goTo={goTo}
                        onEdit={(id) => {
                            setEditingAccountId(id);
                            goTo("edit-account");
                        }}
                    />
                )}
                {subPage === "add-account" && <AddAccountView goTo={goTo} />}
                {subPage === "edit-account" && <EditAccountView goTo={goTo} accountId={editingAccountId} />}
                {subPage === "security" && <SecurityView goTo={goTo} />}
                {subPage === "notifications" && <NotificationsView goTo={goTo} />}
            </div>
        </div>
    );
};

// ─── Overview ────────────────────────────────────────────────────────────────

function OverviewView({ goTo }: { goTo: (p: SubPage) => void }) {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-display-xs font-semibold text-primary">My Account</h1>

            {/* Profile card */}
            <div className="rounded-xl border border-secondary bg-primary p-5">
                <div className="flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-lg font-semibold text-brand-secondary">
                        JM
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-primary">Jean Mugabo</h2>
                        <p className="text-sm text-tertiary">jean.mugabo@email.com</p>
                        <p className="text-sm text-tertiary">+250 788 123 456</p>
                    </div>
                    <BadgeWithDot color="success" size="md">Verified</BadgeWithDot>
                </div>
            </div>

            {/* Menu items */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-secondary bg-primary">
                <MenuItem
                    icon={User01}
                    label="Personal Information"
                    description="Name, date of birth, national ID, contact details"
                    onClick={() => goTo("personal")}
                />
                <MenuItem
                    icon={Shield01}
                    label="Identity Verification"
                    description="KYC status: Verified"
                    badge={<BadgeWithDot color="success" size="sm">Verified</BadgeWithDot>}
                    onClick={() => goTo("personal")}
                />
                <MenuItem
                    icon={Wallet04}
                    label="Payout Accounts"
                    description="3 accounts saved — MTN MoMo, Bank of Kigali, Airtel"
                    onClick={() => goTo("payout-accounts")}
                />
                <MenuItem
                    icon={Settings01}
                    label="Security"
                    description="Password, two-factor authentication"
                    onClick={() => goTo("security")}
                />
                <MenuItem
                    icon={Bell01}
                    label="Notifications"
                    description="Email and SMS notification preferences"
                    onClick={() => goTo("notifications")}
                    isLast
                />
            </div>

            {/* Danger zone */}
            <div className="rounded-xl border border-secondary bg-primary p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-primary">Sign out</p>
                        <p className="text-xs text-tertiary">Sign out of your Land Bank account</p>
                    </div>
                    <Button href="/login" color="secondary" size="sm" iconLeading={LogOut01}>
                        Sign out
                    </Button>
                </div>
            </div>
        </div>
    );
}

function MenuItem({
    icon: Icon,
    label,
    description,
    badge,
    onClick,
    isLast,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    description: string;
    badge?: React.ReactNode;
    onClick: () => void;
    isLast?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={cx(
                "flex items-center gap-4 px-5 py-4 text-left hover:bg-primary_hover transition duration-100",
                !isLast && "border-b border-secondary",
            )}
        >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Icon className="size-5 text-fg-quaternary" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary">{label}</p>
                <p className="text-xs text-tertiary truncate">{description}</p>
            </div>
            {badge && <div className="shrink-0">{badge}</div>}
            <ChevronRight className="size-4 shrink-0 text-fg-quaternary" />
        </button>
    );
}

// ─── Personal Information ────────────────────────────────────────────────────

function PersonalInfoView({ goTo }: { goTo: (p: SubPage) => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => goTo("overview")}>
                    Back
                </Button>
                <h1 className="text-lg font-semibold text-primary">Personal Information</h1>
            </div>

            {/* Verification status */}
            <div className="flex items-center gap-3 rounded-xl border border-secondary bg-success-primary p-4">
                <FeaturedIcon icon={CheckCircle} size="md" color="success" theme="light" />
                <div className="flex-1">
                    <p className="text-sm font-semibold text-primary">Identity Verified</p>
                    <p className="text-xs text-tertiary">Verified on 15 Aug 2026 — your KYC is approved and active.</p>
                </div>
                <Badge color="success" size="sm">Verified</Badge>
            </div>

            {/* Personal details card */}
            <div className="rounded-xl border border-secondary bg-primary p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-primary">Basic Details</h2>
                    <Button color="link-color" size="sm" iconLeading={Edit05}>
                        Edit
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    <InfoRow label="Full name" value="Jean Mugabo" />
                    <InfoRow label="Date of birth" value="15/03/1990" />
                    <InfoRow label="Nationality" value="Rwandan" />
                    <InfoRow label="National ID" value="1199080XXXXXXXX" />
                </div>
            </div>

            {/* Contact details */}
            <div className="rounded-xl border border-secondary bg-primary p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-primary">Contact Details</h2>
                    <Button color="link-color" size="sm" iconLeading={Edit05}>
                        Edit
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    <InfoRow label="Email" value="jean.mugabo@email.com" />
                    <InfoRow label="Phone" value="+250 788 123 456" />
                </div>
            </div>

            {/* Identity documents */}
            <div className="rounded-xl border border-secondary bg-primary p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-primary">Identity Documents</h2>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <CreditCard02 className="size-4 text-fg-quaternary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-primary">National ID Card</p>
                            <p className="text-xs text-tertiary">ID-1199080... — Uploaded 12 Aug 2026</p>
                        </div>
                        <Badge color="success" size="sm">Verified</Badge>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <User01 className="size-4 text-fg-quaternary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-primary">Selfie Verification</p>
                            <p className="text-xs text-tertiary">Captured 12 Aug 2026</p>
                        </div>
                        <Badge color="success" size="sm">Matched</Badge>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <Building07 className="size-4 text-fg-quaternary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-primary">Proof of Address</p>
                            <p className="text-xs text-tertiary">Utility bill — Uploaded 12 Aug 2026</p>
                        </div>
                        <Badge color="success" size="sm">Verified</Badge>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between border-b border-secondary pb-3 last:border-0 last:pb-0">
            <span className="text-sm text-tertiary">{label}</span>
            <span className="text-sm font-medium text-primary">{value}</span>
        </div>
    );
}

// ─── Payout Accounts ─────────────────────────────────────────────────────────

const mockAccounts = [
    { id: "pa-001", type: "mobile-money" as const, provider: "MTN Mobile Money", accountNumber: "0788 123 456", isDefault: true },
    { id: "pa-002", type: "bank" as const, provider: "Bank of Kigali", accountNumber: "Account ending ****4589", isDefault: false },
    { id: "pa-003", type: "mobile-money" as const, provider: "Airtel Money", accountNumber: "0738 987 654", isDefault: false },
];

function PayoutAccountsView({ goTo, onEdit }: { goTo: (p: SubPage) => void; onEdit: (id: string) => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => goTo("overview")}>
                    Back
                </Button>
                <h1 className="text-lg font-semibold text-primary">Payout Accounts</h1>
            </div>

            <p className="text-sm text-tertiary">
                Manage the accounts where you can receive investment payouts. You can add mobile money accounts or bank accounts.
            </p>

            <div className="flex flex-col gap-3">
                {mockAccounts.map((account) => {
                    const Icon = account.type === "mobile-money" ? Phone : Building07;
                    return (
                        <div
                            key={account.id}
                            className="flex items-center gap-3 rounded-xl border border-secondary bg-primary p-4"
                        >
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                                <Icon className="size-5 text-fg-quaternary" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-primary">{account.provider}</p>
                                    {account.isDefault && (
                                        <Badge color="brand" size="sm">Default</Badge>
                                    )}
                                </div>
                                <p className="text-xs text-tertiary">{account.accountNumber}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    color="tertiary"
                                    size="sm"
                                    iconLeading={Edit05}
                                    onClick={() => onEdit(account.id)}
                                />
                                {!account.isDefault && (
                                    <Button
                                        color="tertiary"
                                        size="sm"
                                        iconLeading={Trash01}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Button
                color="secondary"
                size="md"
                iconLeading={Plus}
                onClick={() => goTo("add-account")}
                className="w-full"
            >
                Add Payout Account
            </Button>
        </div>
    );
}

// ─── Add Payout Account ──────────────────────────────────────────────────────

function AddAccountView({ goTo }: { goTo: (p: SubPage) => void }) {
    const [accountType, setAccountType] = useState<"mobile-money" | "bank">("mobile-money");

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => goTo("payout-accounts")}>
                    Back
                </Button>
                <h1 className="text-lg font-semibold text-primary">Add Payout Account</h1>
            </div>

            {/* Account type selector */}
            <div>
                <p className="mb-2 text-sm font-medium text-secondary">Account type</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setAccountType("mobile-money")}
                        className={cx(
                            "flex flex-1 items-center gap-3 rounded-xl border p-4 transition duration-100",
                            accountType === "mobile-money"
                                ? "border-brand bg-brand-section_subtle ring-1 ring-brand"
                                : "border-secondary bg-primary hover:bg-secondary",
                        )}
                    >
                        <Phone className={cx("size-5", accountType === "mobile-money" ? "text-brand-secondary" : "text-fg-quaternary")} />
                        <span className="text-sm font-medium text-primary">Mobile Money</span>
                    </button>
                    <button
                        onClick={() => setAccountType("bank")}
                        className={cx(
                            "flex flex-1 items-center gap-3 rounded-xl border p-4 transition duration-100",
                            accountType === "bank"
                                ? "border-brand bg-brand-section_subtle ring-1 ring-brand"
                                : "border-secondary bg-primary hover:bg-secondary",
                        )}
                    >
                        <Building07 className={cx("size-5", accountType === "bank" ? "text-brand-secondary" : "text-fg-quaternary")} />
                        <span className="text-sm font-medium text-primary">Bank Account</span>
                    </button>
                </div>
            </div>

            {/* Form fields */}
            <div className="rounded-xl border border-secondary bg-primary p-5">
                {accountType === "mobile-money" ? (
                    <div className="flex flex-col gap-4">
                        <Select
                            label="Provider"
                            placeholder="Select provider"
                            isRequired
                            items={[
                                { id: "mtn", label: "MTN Mobile Money" },
                                { id: "airtel", label: "Airtel Money" },
                            ]}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>

                        <Input
                            label="Phone number"
                            placeholder="+250 7XX XXX XXX"
                            type="tel"
                            icon={Phone}
                            isRequired
                        />

                        <Input
                            label="Account holder name"
                            placeholder="Name as registered on the account"
                            icon={User01}
                            isRequired
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <Select
                            label="Bank"
                            placeholder="Select bank"
                            isRequired
                            items={[
                                { id: "bk", label: "Bank of Kigali" },
                                { id: "equity", label: "Equity Bank" },
                                { id: "bnr", label: "BNR" },
                                { id: "cogebanque", label: "Cogebanque" },
                                { id: "im-bank", label: "I&M Bank" },
                            ]}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>

                        <Input
                            label="Account number"
                            placeholder="Enter account number"
                            icon={CreditCard02}
                            isRequired
                        />

                        <Input
                            label="Account holder name"
                            placeholder="Name as it appears on the account"
                            icon={User01}
                            isRequired
                        />

                        <Input
                            label="Branch"
                            placeholder="e.g. Kigali Main Branch"
                            icon={Building07}
                        />
                    </div>
                )}
            </div>

            <Checkbox
                size="sm"
                label="Set as default payout account"
            />

            <div className="flex items-center justify-between pt-2">
                <Button
                    color="secondary"
                    size="md"
                    onClick={() => goTo("payout-accounts")}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("payout-accounts")}
                >
                    Save Account
                </Button>
            </div>
        </div>
    );
}

// ─── Edit Payout Account ─────────────────────────────────────────────────────

function EditAccountView({ goTo, accountId }: { goTo: (p: SubPage) => void; accountId: string | null }) {
    const account = mockAccounts.find((a) => a.id === accountId) ?? mockAccounts[0];
    const isMobile = account.type === "mobile-money";

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => goTo("payout-accounts")}>
                    Back
                </Button>
                <h1 className="text-lg font-semibold text-primary">Edit Payout Account</h1>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-5">
                {isMobile ? (
                    <div className="flex flex-col gap-4">
                        <Select
                            label="Provider"
                            placeholder="Select provider"
                            isRequired
                            defaultSelectedKey={account.provider === "MTN Mobile Money" ? "mtn" : "airtel"}
                            items={[
                                { id: "mtn", label: "MTN Mobile Money" },
                                { id: "airtel", label: "Airtel Money" },
                            ]}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>

                        <Input
                            label="Phone number"
                            placeholder="+250 7XX XXX XXX"
                            type="tel"
                            icon={Phone}
                            isRequired
                            defaultValue={account.accountNumber}
                        />

                        <Input
                            label="Account holder name"
                            placeholder="Name as registered on the account"
                            icon={User01}
                            isRequired
                            defaultValue="Jean Mugabo"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <Select
                            label="Bank"
                            placeholder="Select bank"
                            isRequired
                            defaultSelectedKey="bk"
                            items={[
                                { id: "bk", label: "Bank of Kigali" },
                                { id: "equity", label: "Equity Bank" },
                                { id: "bnr", label: "BNR" },
                                { id: "cogebanque", label: "Cogebanque" },
                                { id: "im-bank", label: "I&M Bank" },
                            ]}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>

                        <Input
                            label="Account number"
                            placeholder="Enter account number"
                            icon={CreditCard02}
                            isRequired
                            defaultValue="00012345674589"
                        />

                        <Input
                            label="Account holder name"
                            placeholder="Name as it appears on the account"
                            icon={User01}
                            isRequired
                            defaultValue="Jean Mugabo"
                        />

                        <Input
                            label="Branch"
                            placeholder="e.g. Kigali Main Branch"
                            icon={Building07}
                            defaultValue="Kigali Main Branch"
                        />
                    </div>
                )}
            </div>

            <Checkbox
                size="sm"
                label="Set as default payout account"
                isSelected={account.isDefault}
            />

            <div className="flex items-center justify-between pt-2">
                <Button
                    color="secondary"
                    size="md"
                    onClick={() => goTo("payout-accounts")}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconTrailing={ArrowRight}
                    onClick={() => goTo("payout-accounts")}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}

// ─── Security ────────────────────────────────────────────────────────────────

function SecurityView({ goTo }: { goTo: (p: SubPage) => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => goTo("overview")}>
                    Back
                </Button>
                <h1 className="text-lg font-semibold text-primary">Security</h1>
            </div>

            {/* Change password */}
            <div className="rounded-xl border border-secondary bg-primary p-5">
                <h2 className="mb-4 text-sm font-semibold text-primary">Change Password</h2>
                <div className="flex flex-col gap-4">
                    <Input
                        label="Current password"
                        placeholder="Enter current password"
                        type="password"
                    />
                    <Input
                        label="New password"
                        placeholder="Enter new password"
                        type="password"
                        hint="Must be at least 8 characters"
                    />
                    <Input
                        label="Confirm new password"
                        placeholder="Confirm new password"
                        type="password"
                    />
                    <div className="flex justify-end">
                        <Button color="primary" size="sm">
                            Update Password
                        </Button>
                    </div>
                </div>
            </div>

            {/* Two-factor authentication */}
            <div className="rounded-xl border border-secondary bg-primary p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-primary">Two-Factor Authentication</h2>
                        <p className="mt-1 text-xs text-tertiary">
                            Add an extra layer of security to your account using SMS verification.
                        </p>
                    </div>
                    <Badge color="gray" size="sm">Off</Badge>
                </div>
                <div className="mt-4">
                    <Button color="secondary" size="sm" iconLeading={Shield01}>
                        Enable 2FA
                    </Button>
                </div>
            </div>

            {/* Active sessions */}
            <div className="rounded-xl border border-secondary bg-primary p-5">
                <h2 className="mb-4 text-sm font-semibold text-primary">Active Sessions</h2>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between rounded-lg border border-secondary p-3">
                        <div>
                            <p className="text-sm font-medium text-primary">iPhone 14 — Kigali, Rwanda</p>
                            <p className="text-xs text-tertiary">Current session — last active now</p>
                        </div>
                        <Badge color="success" size="sm">Current</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-secondary p-3">
                        <div>
                            <p className="text-sm font-medium text-primary">Chrome on MacBook — Kigali, Rwanda</p>
                            <p className="text-xs text-tertiary">Last active 2 hours ago</p>
                        </div>
                        <Button color="link-destructive" size="sm">
                            Revoke
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Notifications ───────────────────────────────────────────────────────────

function NotificationsView({ goTo }: { goTo: (p: SubPage) => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => goTo("overview")}>
                    Back
                </Button>
                <h1 className="text-lg font-semibold text-primary">Notification Preferences</h1>
            </div>

            <p className="text-sm text-tertiary">
                Choose how you'd like to be notified about your investments and account activity.
            </p>

            {/* Investment notifications */}
            <div className="rounded-xl border border-secondary bg-primary p-5">
                <h2 className="mb-4 text-sm font-semibold text-primary">Investment Activity</h2>
                <div className="flex flex-col gap-4">
                    <NotifRow label="Payment confirmations" email sms />
                    <NotifRow label="Maturity reminders" email sms />
                    <NotifRow label="Profit accrual updates" email />
                    <NotifRow label="New investment opportunities" email />
                    <NotifRow label="Plot updates & news" email />
                </div>
            </div>

            {/* Account notifications */}
            <div className="rounded-xl border border-secondary bg-primary p-5">
                <h2 className="mb-4 text-sm font-semibold text-primary">Account & Security</h2>
                <div className="flex flex-col gap-4">
                    <NotifRow label="Login from new device" email sms />
                    <NotifRow label="Password changes" email sms />
                    <NotifRow label="Verification status updates" email sms />
                    <NotifRow label="Payout processing updates" email sms />
                </div>
            </div>

            <div className="flex justify-end">
                <Button color="primary" size="md">
                    Save Preferences
                </Button>
            </div>
        </div>
    );
}

function NotifRow({ label, email, sms }: { label: string; email?: boolean; sms?: boolean }) {
    return (
        <div className="flex items-center justify-between border-b border-secondary pb-3 last:border-0 last:pb-0">
            <span className="text-sm text-primary">{label}</span>
            <div className="flex items-center gap-2">
                {email && <Badge color="brand" size="sm">Email</Badge>}
                {sms && <Badge color="gray" size="sm">SMS</Badge>}
            </div>
        </div>
    );
}
