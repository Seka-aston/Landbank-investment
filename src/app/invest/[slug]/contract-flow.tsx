"use client";

import {
    ArrowLeft,
    ArrowRight,
    File06,
    CheckCircle,
    PenTool02,
    ShieldTick,
    Rocket01,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { formatRWF } from "@/lib/mock-data";
import type { FlowProps } from "./invest-types";

function getProjectedReturn(amount: number, annualReturn: number, termMonths: number) {
    return Math.round(amount * (annualReturn / 100) * (termMonths / 12));
}

function getMaturityDate(termMonths: number) {
    const d = new Date();
    d.setMonth(d.getMonth() + termMonths);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// ─── Agreement Ready ─────────────────────────────────────────────────────────

export function ContractReady({ opp, data, goTo }: FlowProps) {
    const actualInvestment = data.shares * opp.sharePrice;
    const projectedProfit = getProjectedReturn(actualInvestment, opp.annualReturn, data.term);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Agreement Ready</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Your payment has been confirmed. Review and sign the investment agreement to activate your investment.
                </p>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-brand bg-brand-section_subtle p-4">
                <FeaturedIcon icon={File06} size="md" color="brand" theme="light" />
                <div>
                    <p className="text-sm font-semibold text-primary">Investment Agreement</p>
                    <p className="text-xs text-tertiary">
                        {opp.name} — {formatRWF(actualInvestment)} · {data.shares} shares · {data.term} months
                    </p>
                </div>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <h4 className="text-sm font-semibold text-primary">Agreement Summary</h4>
                <div className="mt-3 flex flex-col gap-2.5">
                    {[
                        ["Investor", "Jean Mugabo (verified)"],
                        ["Opportunity", opp.name],
                        ["Investment", `${formatRWF(actualInvestment)} (${data.shares} shares)`],
                        ["Term", `${data.term} months`],
                        ["Annual Return", `${opp.annualReturn}%`],
                        ["Projected Profit", `+${formatRWF(projectedProfit)}`],
                        ["Maturity Date", getMaturityDate(data.term)],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("payment-success")}>
                    Back
                </Button>
                <Button color="primary" size="md" iconTrailing={ArrowRight} onClick={() => goTo("contract-review")}>
                    Review Agreement
                </Button>
            </div>
        </div>
    );
}

// ─── Review Agreement ────────────────────────────────────────────────────────

export function ContractReview({ opp, data, updateData, goTo }: FlowProps) {
    const actualInvestment = data.shares * opp.sharePrice;
    const projectedProfit = getProjectedReturn(actualInvestment, opp.annualReturn, data.term);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Review Agreement</h2>
                <p className="mt-1 text-sm text-tertiary">Please read the full agreement before signing.</p>
            </div>

            <div className="max-h-96 overflow-y-auto rounded-xl border border-secondary bg-secondary p-5 text-sm text-tertiary">
                <h3 className="mb-3 text-md font-semibold text-primary">INVESTMENT AGREEMENT</h3>
                <p className="mb-2 font-medium text-secondary">Land Bank Rwanda Ltd — Fractional Land Investment</p>

                <h4 className="mb-1 mt-4 font-semibold text-secondary">1. Parties</h4>
                <p className="mb-3">
                    This Investment Agreement ("Agreement") is entered into between Land Bank Rwanda Ltd, a company registered under
                    the laws of the Republic of Rwanda ("Land Bank"), and the Investor identified through the completed KYC verification
                    process ("Investor").
                </p>

                <h4 className="mb-1 mt-4 font-semibold text-secondary">2. Investment Details</h4>
                <p className="mb-3">
                    Opportunity: {opp.name}<br />
                    Location: {opp.location}<br />
                    Investment Amount: {formatRWF(actualInvestment)}<br />
                    Number of Shares: {data.shares}<br />
                    Share Price: {formatRWF(opp.sharePrice)}<br />
                    Investment Term: {data.term} months<br />
                    Annual Return Rate: {opp.annualReturn}%<br />
                    Projected Return at Maturity: {formatRWF(actualInvestment + projectedProfit)}
                </p>

                <h4 className="mb-1 mt-4 font-semibold text-secondary">3. Returns & Distribution</h4>
                <p className="mb-3">
                    Returns are calculated on a daily accrual basis at the stated annual rate of {opp.annualReturn}%. Accrued returns
                    are distributed to the Investor at the maturity date. Land Bank does not guarantee the stated return rate; actual
                    returns may vary based on market conditions and land value appreciation.
                </p>

                <h4 className="mb-1 mt-4 font-semibold text-secondary">4. Risks</h4>
                <p className="mb-3">
                    The Investor acknowledges that fractional land investment carries inherent risks, including but not limited to:
                    loss of capital, market value fluctuation, regulatory changes, liquidity risk, and force majeure events. The stated
                    return rate is a projection based on historical data and current market analysis, not a guarantee.
                </p>

                <h4 className="mb-1 mt-4 font-semibold text-secondary">5. Early Exit</h4>
                <p className="mb-3">
                    The Investor may request an early exit before the maturity date, subject to Land Bank's Early Exit Policy. Early
                    exits may incur charges and forfeiture of accrued returns. Approval is at Land Bank's discretion.
                </p>

                <h4 className="mb-1 mt-4 font-semibold text-secondary">6. Maturity Actions</h4>
                <p className="mb-3">
                    Upon maturity, the Investor may choose to: (a) receive a full payout of principal plus accrued returns, (b)
                    reinvest into a new opportunity, or (c) split the maturity value between payout and reinvestment.
                </p>

                <h4 className="mb-1 mt-4 font-semibold text-secondary">7. Governing Law</h4>
                <p>
                    This Agreement is governed by and construed in accordance with the laws of the Republic of Rwanda. Any disputes
                    arising from this Agreement shall be resolved through arbitration in Kigali.
                </p>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("contract-ready")}>
                    Back
                </Button>
                <Button color="primary" size="md" iconTrailing={ArrowRight} onClick={() => goTo("contract-sign")}>
                    Continue to Sign
                </Button>
            </div>
        </div>
    );
}

// ─── Sign Agreement ──────────────────────────────────────────────────────────

interface ContractSignProps extends FlowProps {
    agreementAccepted: boolean;
    onToggleAgreement: (v: boolean) => void;
}

export function ContractSign({ opp, data, goTo, agreementAccepted, onToggleAgreement }: ContractSignProps) {
    const actualInvestment = data.shares * opp.sharePrice;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-display-xs font-semibold text-primary">Sign Agreement</h2>
                <p className="mt-1 text-sm text-tertiary">
                    By signing, you confirm that you have read and understood the Investment Agreement.
                </p>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-4">
                <div className="flex items-center gap-3">
                    <FeaturedIcon icon={File06} size="sm" color="brand" theme="light" />
                    <div>
                        <p className="text-sm font-semibold text-primary">{opp.name}</p>
                        <p className="text-xs text-tertiary">
                            {formatRWF(actualInvestment)} · {data.shares} shares · {data.term} months
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-secondary p-4">
                <Checkbox
                    isSelected={agreementAccepted}
                    onChange={onToggleAgreement}
                    size="md"
                    label="I agree to the Investment Agreement"
                    hint="I have read and understood the Investment Agreement in full, including all risks, terms, early exit policy, and governing law. I consent to sign this agreement electronically."
                />
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-secondary bg-secondary p-4">
                <ShieldTick className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                <p className="text-sm text-tertiary">
                    Your electronic signature is legally binding under Rwandan law. A copy of the signed agreement will be available in
                    your portfolio.
                </p>
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button color="secondary" size="md" iconLeading={ArrowLeft} onClick={() => goTo("contract-review")}>
                    Back
                </Button>
                <Button
                    color="primary"
                    size="md"
                    iconLeading={PenTool02}
                    onClick={() => goTo("activated")}
                    isDisabled={!agreementAccepted}
                >
                    Sign & Activate Investment
                </Button>
            </div>
        </div>
    );
}

// ─── Investment Activated ────────────────────────────────────────────────────

export function InvestmentActivated({ opp, data }: FlowProps) {
    const actualInvestment = data.shares * opp.sharePrice;
    const projectedProfit = getProjectedReturn(actualInvestment, opp.annualReturn, data.term);
    const totalReturn = actualInvestment + projectedProfit;

    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <FeaturedIcon icon={Rocket01} size="xl" color="success" theme="light" />

            <div>
                <Badge color="success" size="md">Investment Active</Badge>
                <h2 className="mt-3 text-display-xs font-semibold text-primary">Investment Activated!</h2>
                <p className="mt-2 text-md text-tertiary">
                    Congratulations! Your investment in {opp.name} is now active. Returns begin accruing from today.
                </p>
            </div>

            <div className="w-full rounded-xl border border-secondary bg-primary p-4 text-left">
                <h4 className="mb-3 text-sm font-semibold text-primary">Your Investment</h4>
                <div className="flex flex-col gap-2.5">
                    {[
                        ["Opportunity", opp.name],
                        ["Amount Invested", formatRWF(actualInvestment)],
                        ["Shares", data.shares.toString()],
                        ["Term", `${data.term} months`],
                        ["Annual Return", `${opp.annualReturn}%`],
                        ["Projected Maturity Value", formatRWF(totalReturn)],
                        ["Maturity Date", getMaturityDate(data.term)],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-tertiary">{label}</span>
                            <span className="font-medium text-primary">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button href="/portfolio" color="primary" size="lg" iconTrailing={ArrowRight} className="flex-1">
                    View My Portfolio
                </Button>
                <Button href="/opportunities" color="secondary" size="lg" className="flex-1">
                    Browse More Opportunities
                </Button>
            </div>
        </div>
    );
}
