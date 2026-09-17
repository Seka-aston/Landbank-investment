import type { Metadata } from "next";
import { InvestmentDetailScreen } from "./detail-screen";

export const metadata: Metadata = {
    title: "Investment Details — Land Bank",
};

export default function InvestmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return <InvestmentDetailScreen params={params} />;
}
