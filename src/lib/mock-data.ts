export type OpportunityStatus = "open" | "closing-soon" | "fully-funded";
export type RiskLevel = "low" | "medium" | "high";

export interface PlotUpdate {
    date: string;
    title: string;
    content: string;
}

export interface PlotDocument {
    name: string;
    type: string;
    size: string;
}

export interface InvestmentOpportunity {
    slug: string;
    name: string;
    location: string;
    district: string;
    sector: string;
    plotSize: number;
    totalValue: number;
    totalShares: number;
    sharesSold: number;
    sharePrice: number;
    minInvestment: number;
    annualReturn: number;
    term: number;
    status: OpportunityStatus;
    description: string;
    highlights: string[];
    landUse: string;
    titleDeedRef: string;
    valuationDate: string;
    valuationAmount: number;
    valuationFirm: string;
    riskLevel: RiskLevel;
    riskFactors: string[];
    documents: PlotDocument[];
    updates: PlotUpdate[];
    coordinates: { lat: number; lng: number };
    nearbyAmenities: string[];
    imageUrl: string;
}

function formatRWF(amount: number): string {
    return new Intl.NumberFormat("en-RW", {
        style: "currency",
        currency: "RWF",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export { formatRWF };

export const opportunities: InvestmentOpportunity[] = [
    {
        slug: "nyarutarama-residential-block-7",
        name: "Nyarutarama Residential Block 7",
        location: "Nyarutarama, Gasabo",
        district: "Gasabo",
        sector: "Remera",
        plotSize: 1200,
        totalValue: 180_000_000,
        totalShares: 360,
        sharesSold: 245,
        sharePrice: 500_000,
        minInvestment: 1_000_000,
        annualReturn: 16.5,
        term: 24,
        status: "open",
        description:
            "Premium residential plot in Nyarutarama, one of Kigali's most sought-after neighborhoods. Zoned for high-end residential development with approved building permits. The area has seen consistent 18-22% year-over-year land value appreciation over the past five years.",
        highlights: [
            "Prime location in Kigali's premier residential area",
            "Approved building permits for 4-story residential",
            "200m from the main Nyarutarama road",
            "All utilities connected (water, electricity, fiber)",
        ],
        landUse: "Residential (R4 — up to 4 stories)",
        titleDeedRef: "KGL/GAS/REM/2024/00847",
        valuationDate: "2026-06-15",
        valuationAmount: 185_000_000,
        valuationFirm: "Knight Frank Rwanda",
        riskLevel: "low",
        riskFactors: [
            "Market downturn could reduce property values",
            "Regulatory changes to zoning laws",
            "Construction delays in the area may affect valuations",
        ],
        documents: [
            { name: "Title Deed Certificate", type: "PDF", size: "2.4 MB" },
            { name: "Independent Valuation Report", type: "PDF", size: "5.1 MB" },
            { name: "Environmental Impact Assessment", type: "PDF", size: "3.8 MB" },
            { name: "Zoning Compliance Letter", type: "PDF", size: "1.2 MB" },
            { name: "Investment Prospectus", type: "PDF", size: "8.6 MB" },
        ],
        updates: [
            {
                date: "2026-08-10",
                title: "Road upgrade completed nearby",
                content: "The RDB-funded road connecting Nyarutarama to KBC has been completed, improving access and likely boosting land values further.",
            },
            {
                date: "2026-07-22",
                title: "68% funded — approaching target",
                content: "Investment has crossed the 68% mark. Current pace suggests full funding by mid-September.",
            },
        ],
        coordinates: { lat: -1.9403, lng: 30.1048 },
        nearbyAmenities: [
            "Kigali Golf Course (0.5 km)",
            "La Palisse Hotel (0.3 km)",
            "Green Hills Academy (1.2 km)",
            "Simba Supermarket (0.8 km)",
        ],
        imageUrl: "/images/plot-nyarutarama.jpg",
    },
    {
        slug: "masaka-east-commercial-zone",
        name: "Masaka East Commercial Zone",
        location: "Masaka, Kicukiro",
        district: "Kicukiro",
        sector: "Masaka",
        plotSize: 2500,
        totalValue: 320_000_000,
        totalShares: 640,
        sharesSold: 640,
        sharePrice: 500_000,
        minInvestment: 1_500_000,
        annualReturn: 18.0,
        term: 36,
        status: "fully-funded",
        description:
            "Large commercial plot situated along the Kigali-Huye highway corridor in Masaka. Designated for mixed-use commercial development. The Masaka sector is one of the fastest-growing areas in Kigali, with major government infrastructure investments planned through 2028.",
        highlights: [
            "Highway frontage along the Kigali-Huye corridor",
            "Part of the Masaka Special Economic Zone plan",
            "2,500 sqm — one of the largest available plots",
            "Adjacent to the planned BRT station",
        ],
        landUse: "Commercial (C2 — mixed-use)",
        titleDeedRef: "KGL/KCK/MSK/2024/01234",
        valuationDate: "2026-05-20",
        valuationAmount: 330_000_000,
        valuationFirm: "CBRE Rwanda",
        riskLevel: "medium",
        riskFactors: [
            "BRT timeline delays could affect projected appreciation",
            "Commercial market supply increase in Masaka area",
            "Infrastructure development pace depends on government funding",
        ],
        documents: [
            { name: "Title Deed Certificate", type: "PDF", size: "2.1 MB" },
            { name: "Independent Valuation Report", type: "PDF", size: "6.3 MB" },
            { name: "Master Plan Alignment Report", type: "PDF", size: "4.5 MB" },
            { name: "Investment Prospectus", type: "PDF", size: "9.2 MB" },
        ],
        updates: [
            {
                date: "2026-08-01",
                title: "Fully funded",
                content: "This investment has reached 100% funding. All share allocations are final. Investors will receive quarterly updates on development progress.",
            },
            {
                date: "2026-07-15",
                title: "BRT station location confirmed",
                content: "Rwanda Transport Authority has confirmed the BRT station placement 150m from this plot, expected to begin construction Q1 2027.",
            },
        ],
        coordinates: { lat: -1.9993, lng: 30.1285 },
        nearbyAmenities: [
            "Masaka Hospital (0.4 km)",
            "Kigali-Huye Highway (50 m)",
            "Planned BRT Station (0.15 km)",
            "Masaka Market (0.6 km)",
        ],
        imageUrl: "/images/plot-masaka.jpg",
    },
    {
        slug: "kibagabaga-hillside-plot-a",
        name: "Kibagabaga Hillside Plot A",
        location: "Kibagabaga, Gasabo",
        district: "Gasabo",
        sector: "Kimironko",
        plotSize: 800,
        totalValue: 96_000_000,
        totalShares: 192,
        sharesSold: 48,
        sharePrice: 500_000,
        minInvestment: 500_000,
        annualReturn: 14.0,
        term: 18,
        status: "open",
        description:
            "Hillside residential plot in Kibagabaga with panoramic views of the Kigali valley. The area is popular with young professionals and expatriates. Zoned for medium-density residential with strong rental yield potential.",
        highlights: [
            "Panoramic valley views",
            "Walking distance to Kibagabaga Hospital",
            "Strong rental demand from expat community",
            "Lower entry point — ideal for first-time investors",
        ],
        landUse: "Residential (R3 — up to 3 stories)",
        titleDeedRef: "KGL/GAS/KMR/2025/00312",
        valuationDate: "2026-07-01",
        valuationAmount: 98_000_000,
        valuationFirm: "Colliers Rwanda",
        riskLevel: "low",
        riskFactors: [
            "Hillside building restrictions may limit development options",
            "Expat demand fluctuates with diplomatic and NGO cycles",
        ],
        documents: [
            { name: "Title Deed Certificate", type: "PDF", size: "2.0 MB" },
            { name: "Independent Valuation Report", type: "PDF", size: "4.2 MB" },
            { name: "Topographic Survey", type: "PDF", size: "7.1 MB" },
            { name: "Investment Prospectus", type: "PDF", size: "6.8 MB" },
        ],
        updates: [
            {
                date: "2026-08-18",
                title: "New listing — now accepting investments",
                content: "This opportunity has passed due diligence and is now live for investment. Early investors receive priority allocation.",
            },
        ],
        coordinates: { lat: -1.9445, lng: 30.0986 },
        nearbyAmenities: [
            "Kibagabaga Hospital (0.3 km)",
            "Simba Supermarket (0.7 km)",
            "Car Wash Coffee (0.2 km)",
            "KG 11 Avenue (0.1 km)",
        ],
        imageUrl: "/images/plot-kibagabaga.jpg",
    },
    {
        slug: "kacyiru-diplomatic-quarter",
        name: "Kacyiru Diplomatic Quarter Plot",
        location: "Kacyiru, Gasabo",
        district: "Gasabo",
        sector: "Kacyiru",
        plotSize: 1800,
        totalValue: 270_000_000,
        totalShares: 540,
        sharesSold: 510,
        sharePrice: 500_000,
        minInvestment: 2_000_000,
        annualReturn: 15.5,
        term: 24,
        status: "closing-soon",
        description:
            "Prestigious plot in Kacyiru near the diplomatic quarter and government ministries. Surrounded by embassies, international organizations, and high-end residences. Limited supply in this area makes it a rare investment opportunity.",
        highlights: [
            "Adjacent to the diplomatic quarter",
            "500m from Kigali Convention Centre",
            "Extremely limited land supply in this area",
            "Strong institutional rental demand",
        ],
        landUse: "Mixed-use (M2 — residential/commercial)",
        titleDeedRef: "KGL/GAS/KCY/2024/00589",
        valuationDate: "2026-06-01",
        valuationAmount: 280_000_000,
        valuationFirm: "Knight Frank Rwanda",
        riskLevel: "medium",
        riskFactors: [
            "High entry price limits liquidity",
            "Political risk may affect diplomatic-area demand",
            "Longer holding period expected for optimal returns",
        ],
        documents: [
            { name: "Title Deed Certificate", type: "PDF", size: "2.3 MB" },
            { name: "Independent Valuation Report", type: "PDF", size: "5.8 MB" },
            { name: "Investment Prospectus", type: "PDF", size: "10.1 MB" },
            { name: "Soil Analysis Report", type: "PDF", size: "3.4 MB" },
        ],
        updates: [
            {
                date: "2026-08-15",
                title: "94% funded — closing soon",
                content: "Only 30 shares remain. This opportunity will close to new investors once fully subscribed. Act now to secure your allocation.",
            },
            {
                date: "2026-07-30",
                title: "Valuation update",
                content: "Updated valuation from Knight Frank shows a 3.7% increase since initial listing, reflecting continued demand in the Kacyiru area.",
            },
        ],
        coordinates: { lat: -1.9512, lng: 30.0621 },
        nearbyAmenities: [
            "Kigali Convention Centre (0.5 km)",
            "US Embassy (0.3 km)",
            "MTN Center (0.4 km)",
            "Bourbon Coffee Kacyiru (0.2 km)",
        ],
        imageUrl: "/images/plot-kacyiru.jpg",
    },
    {
        slug: "rusororo-agricultural-parcel",
        name: "Rusororo Agricultural Parcel",
        location: "Rusororo, Gasabo",
        district: "Gasabo",
        sector: "Rusororo",
        plotSize: 5000,
        totalValue: 150_000_000,
        totalShares: 300,
        sharesSold: 120,
        sharePrice: 500_000,
        minInvestment: 500_000,
        annualReturn: 12.0,
        term: 36,
        status: "open",
        description:
            "Large agricultural parcel on the outskirts of Kigali, positioned in the path of the city's northward expansion. Currently zoned agricultural but included in the 2028 master plan revision for potential reclassification to residential. A longer-term play on Kigali's growth trajectory.",
        highlights: [
            "5,000 sqm — largest plot in current offerings",
            "Included in 2028 master plan revision area",
            "Lowest price per square meter available",
            "Strong upside if rezoned to residential",
        ],
        landUse: "Agricultural (A1 — pending reclassification review)",
        titleDeedRef: "KGL/GAS/RSR/2025/00091",
        valuationDate: "2026-07-10",
        valuationAmount: 155_000_000,
        valuationFirm: "Colliers Rwanda",
        riskLevel: "high",
        riskFactors: [
            "Rezoning is not guaranteed — depends on master plan revision",
            "Agricultural land has lower baseline appreciation",
            "Further from city center — infrastructure timeline uncertain",
            "36-month term locks capital for an extended period",
        ],
        documents: [
            { name: "Title Deed Certificate", type: "PDF", size: "2.0 MB" },
            { name: "Independent Valuation Report", type: "PDF", size: "4.7 MB" },
            { name: "Master Plan Excerpt (2028 Draft)", type: "PDF", size: "12.3 MB" },
            { name: "Investment Prospectus", type: "PDF", size: "7.9 MB" },
        ],
        updates: [
            {
                date: "2026-08-05",
                title: "Master plan committee meeting scheduled",
                content: "The Kigali City Council has scheduled the 2028 master plan revision committee for October 2026. Rusororo is confirmed on the agenda for discussion.",
            },
        ],
        coordinates: { lat: -1.9001, lng: 30.1102 },
        nearbyAmenities: [
            "Rusororo Health Center (1.2 km)",
            "Main road access (0.5 km)",
            "Proposed Kigali Northern Bypass (0.8 km)",
        ],
        imageUrl: "/images/plot-rusororo.jpg",
    },
    {
        slug: "gisozi-memorial-heights",
        name: "Gisozi Memorial Heights",
        location: "Gisozi, Gasabo",
        district: "Gasabo",
        sector: "Gisozi",
        plotSize: 950,
        totalValue: 114_000_000,
        totalShares: 228,
        sharesSold: 228,
        sharePrice: 500_000,
        minInvestment: 1_000_000,
        annualReturn: 15.0,
        term: 24,
        status: "fully-funded",
        description:
            "Elevated plot in Gisozi with views across central Kigali. Located in a rapidly developing residential area with new apartments and commercial facilities. The neighborhood has transformed significantly over the past three years.",
        highlights: [
            "Elevated position with city views",
            "Near the Kigali Genocide Memorial — established area",
            "Walking distance to multiple bus routes",
            "Active construction around the plot increases area value",
        ],
        landUse: "Residential (R3 — up to 3 stories)",
        titleDeedRef: "KGL/GAS/GSZ/2024/00723",
        valuationDate: "2026-04-15",
        valuationAmount: 118_000_000,
        valuationFirm: "CBRE Rwanda",
        riskLevel: "low",
        riskFactors: [
            "Proximity to memorial site may restrict certain developments",
            "Standard market risk applies",
        ],
        documents: [
            { name: "Title Deed Certificate", type: "PDF", size: "2.2 MB" },
            { name: "Independent Valuation Report", type: "PDF", size: "4.9 MB" },
            { name: "Investment Prospectus", type: "PDF", size: "7.2 MB" },
        ],
        updates: [
            {
                date: "2026-06-20",
                title: "Fully funded",
                content: "This investment reached 100% funding ahead of schedule. Next valuation update expected in September 2026.",
            },
        ],
        coordinates: { lat: -1.9352, lng: 30.0579 },
        nearbyAmenities: [
            "Kigali Genocide Memorial (0.4 km)",
            "Gisozi Market (0.3 km)",
            "Bank of Kigali ATM (0.5 km)",
        ],
        imageUrl: "/images/plot-gisozi.jpg",
    },
];

export function getOpportunityBySlug(slug: string): InvestmentOpportunity | undefined {
    return opportunities.find((o) => o.slug === slug);
}

export function getFundingPercentage(opp: InvestmentOpportunity): number {
    return Math.round((opp.sharesSold / opp.totalShares) * 100);
}

export function getSharesRemaining(opp: InvestmentOpportunity): number {
    return opp.totalShares - opp.sharesSold;
}

// ─── Portfolio mock data ─────────────────────────────────────────────────────

export type PortfolioInvestmentStatus = "active" | "matured" | "exited";

export interface ProfitEntry {
    date: string;
    amount: number;
    cumulative: number;
}

export interface PaymentEntry {
    date: string;
    type: string;
    method: string;
    amount: number;
    reference: string;
}

export interface PortfolioInvestment {
    id: string;
    opportunitySlug: string;
    name: string;
    location: string;
    status: PortfolioInvestmentStatus;
    principal: number;
    shares: number;
    annualReturn: number;
    term: number;
    startDate: string;
    maturityDate: string;
    currentValue: number;
    accruedProfit: number;
    dailyAccrual: number;
    projectedMaturityValue: number;
    paymentMethod: string;
    profitHistory: ProfitEntry[];
    paymentHistory: PaymentEntry[];
    documents: PlotDocument[];
    updates: PlotUpdate[];
}

export const portfolioInvestments: PortfolioInvestment[] = [
    {
        id: "inv-001",
        opportunitySlug: "nyarutarama-residential-block-7",
        name: "Nyarutarama Residential Block 7",
        location: "Nyarutarama, Gasabo",
        status: "active",
        principal: 2_000_000,
        shares: 4,
        annualReturn: 16.5,
        term: 24,
        startDate: "2026-03-15",
        maturityDate: "2028-03-15",
        currentValue: 2_137_534,
        accruedProfit: 137_534,
        dailyAccrual: 904,
        projectedMaturityValue: 2_660_000,
        paymentMethod: "MTN Mobile Money",
        profitHistory: [
            { date: "2026-03-31", amount: 14_466, cumulative: 14_466 },
            { date: "2026-04-30", amount: 27_123, cumulative: 41_589 },
            { date: "2026-05-31", amount: 27_945, cumulative: 69_534 },
            { date: "2026-06-30", amount: 27_123, cumulative: 96_657 },
            { date: "2026-07-31", amount: 27_945, cumulative: 124_602 },
            { date: "2026-08-21", amount: 12_932, cumulative: 137_534 },
        ],
        paymentHistory: [
            { date: "2026-03-15", type: "Investment", method: "MTN Mobile Money", amount: 2_000_000, reference: "TXN-MM-20260315-001" },
        ],
        documents: [
            { name: "Investment Agreement", type: "PDF", size: "1.8 MB" },
            { name: "Title Deed Certificate", type: "PDF", size: "2.4 MB" },
            { name: "Independent Valuation Report", type: "PDF", size: "5.1 MB" },
            { name: "Payment Receipt", type: "PDF", size: "0.3 MB" },
        ],
        updates: [
            { date: "2026-08-10", title: "Road upgrade completed nearby", content: "The RDB-funded road connecting Nyarutarama to KBC has been completed, likely boosting land values." },
            { date: "2026-07-22", title: "Plot valuation increased 3.2%", content: "Quarterly revaluation by Knight Frank shows a 3.2% increase in land value since last assessment." },
            { date: "2026-05-01", title: "Q1 profit distributed", content: "First quarter accrued profit of RWF 41,589 has been credited to your investment." },
        ],
    },
    {
        id: "inv-002",
        opportunitySlug: "kacyiru-diplomatic-quarter",
        name: "Kacyiru Diplomatic Quarter Plot",
        location: "Kacyiru, Gasabo",
        status: "active",
        principal: 4_000_000,
        shares: 8,
        annualReturn: 15.5,
        term: 24,
        startDate: "2026-05-01",
        maturityDate: "2028-05-01",
        currentValue: 4_192_877,
        accruedProfit: 192_877,
        dailyAccrual: 1_699,
        projectedMaturityValue: 5_240_000,
        paymentMethod: "Bank Transfer",
        profitHistory: [
            { date: "2026-05-31", amount: 51_506, cumulative: 51_506 },
            { date: "2026-06-30", amount: 50_958, cumulative: 102_464 },
            { date: "2026-07-31", amount: 52_603, cumulative: 155_067 },
            { date: "2026-08-21", amount: 37_810, cumulative: 192_877 },
        ],
        paymentHistory: [
            { date: "2026-05-01", type: "Investment", method: "Bank Transfer", amount: 4_000_000, reference: "TXN-BT-20260501-002" },
        ],
        documents: [
            { name: "Investment Agreement", type: "PDF", size: "1.9 MB" },
            { name: "Title Deed Certificate", type: "PDF", size: "2.3 MB" },
            { name: "Payment Receipt", type: "PDF", size: "0.4 MB" },
        ],
        updates: [
            { date: "2026-08-15", title: "94% of opportunity funded", content: "The overall opportunity is now 94% funded. Only 30 shares remain for new investors." },
            { date: "2026-07-30", title: "Valuation update +3.7%", content: "Updated valuation from Knight Frank shows continued demand in the Kacyiru area." },
        ],
    },
    {
        id: "inv-003",
        opportunitySlug: "gisozi-memorial-heights",
        name: "Gisozi Memorial Heights",
        location: "Gisozi, Gasabo",
        status: "matured",
        principal: 1_000_000,
        shares: 2,
        annualReturn: 15.0,
        term: 24,
        startDate: "2024-08-01",
        maturityDate: "2026-08-01",
        currentValue: 1_300_000,
        accruedProfit: 300_000,
        dailyAccrual: 0,
        projectedMaturityValue: 1_300_000,
        paymentMethod: "MTN Mobile Money",
        profitHistory: [
            { date: "2024-09-30", amount: 24_657, cumulative: 24_657 },
            { date: "2024-12-31", amount: 74_384, cumulative: 99_041 },
            { date: "2025-03-31", amount: 74_384, cumulative: 173_425 },
            { date: "2025-06-30", amount: 74_384, cumulative: 247_808 },
            { date: "2025-09-30", amount: 37_808, cumulative: 285_616 },
            { date: "2025-12-31", amount: 14_384, cumulative: 300_000 },
        ],
        paymentHistory: [
            { date: "2024-08-01", type: "Investment", method: "MTN Mobile Money", amount: 1_000_000, reference: "TXN-MM-20240801-003" },
        ],
        documents: [
            { name: "Investment Agreement", type: "PDF", size: "1.7 MB" },
            { name: "Maturity Statement", type: "PDF", size: "0.6 MB" },
            { name: "Payment Receipt", type: "PDF", size: "0.3 MB" },
        ],
        updates: [
            { date: "2026-08-01", title: "Investment matured", content: "Your investment has reached maturity. Total return: RWF 1,300,000. Choose to receive payout or reinvest." },
            { date: "2026-06-20", title: "Approaching maturity", content: "Your investment matures on August 1, 2026. You'll be notified with payout and reinvestment options." },
        ],
    },
    {
        id: "inv-004",
        opportunitySlug: "rusororo-agricultural-parcel",
        name: "Rusororo Agricultural Parcel",
        location: "Rusororo, Gasabo",
        status: "exited",
        principal: 1_500_000,
        shares: 3,
        annualReturn: 12.0,
        term: 36,
        startDate: "2025-11-01",
        maturityDate: "2028-11-01",
        currentValue: 1_410_000,
        accruedProfit: 0,
        dailyAccrual: 0,
        projectedMaturityValue: 2_040_000,
        paymentMethod: "Card",
        profitHistory: [
            { date: "2025-12-31", amount: 30_000, cumulative: 30_000 },
            { date: "2026-03-31", amount: 45_000, cumulative: 75_000 },
            { date: "2026-05-15", amount: 15_000, cumulative: 90_000 },
        ],
        paymentHistory: [
            { date: "2025-11-01", type: "Investment", method: "Credit Card", amount: 1_500_000, reference: "TXN-CC-20251101-004" },
            { date: "2026-05-20", type: "Early Exit Payout", method: "MTN Mobile Money", amount: 1_410_000, reference: "TXN-EX-20260520-004" },
        ],
        documents: [
            { name: "Investment Agreement", type: "PDF", size: "1.8 MB" },
            { name: "Early Exit Approval", type: "PDF", size: "0.5 MB" },
            { name: "Payout Confirmation", type: "PDF", size: "0.3 MB" },
        ],
        updates: [
            { date: "2026-05-20", title: "Early exit completed", content: "Your early exit request has been processed. Final payout: RWF 1,410,000 (principal RWF 1,500,000 less charges of RWF 90,000)." },
            { date: "2026-05-10", title: "Early exit approved", content: "Your early exit request has been approved. Payout will be processed within 3 business days." },
        ],
    },
];

export function getPortfolioInvestment(id: string): PortfolioInvestment | undefined {
    return portfolioInvestments.find((inv) => inv.id === id);
}

export function getTotalPortfolioValue(): number {
    return portfolioInvestments
        .filter((inv) => inv.status !== "exited")
        .reduce((sum, inv) => sum + inv.currentValue, 0);
}

export function getElapsedMonths(startDate: string): number {
    const start = new Date(startDate);
    const now = new Date();
    return Math.max(0, (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()));
}

export function getRemainingMonths(maturityDate: string): number {
    const maturity = new Date(maturityDate);
    const now = new Date();
    return Math.max(0, (maturity.getFullYear() - now.getFullYear()) * 12 + (maturity.getMonth() - now.getMonth()));
}

// ─── Payout accounts mock data ──────────────────────────────────────────────

export interface PayoutAccount {
    id: string;
    type: "mobile-money" | "bank";
    provider: string;
    accountNumber: string;
    isDefault: boolean;
}

export const payoutAccounts: PayoutAccount[] = [
    { id: "pa-001", type: "mobile-money", provider: "MTN Mobile Money", accountNumber: "0788 123 456", isDefault: true },
    { id: "pa-002", type: "bank", provider: "Bank of Kigali", accountNumber: "Account ending ****4589", isDefault: false },
    { id: "pa-003", type: "mobile-money", provider: "Airtel Money", accountNumber: "0738 987 654", isDefault: false },
];

export function getPayoutAccount(id: string): PayoutAccount | undefined {
    return payoutAccounts.find((a) => a.id === id);
}
