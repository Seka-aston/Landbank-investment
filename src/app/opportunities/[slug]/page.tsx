import type { Metadata } from "next";
import { OpportunityDetailScreen } from "./detail-screen";

export const metadata: Metadata = {
    title: "Opportunity Details — Land Bank",
};

export default function OpportunityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    return <OpportunityDetailScreen params={params} />;
}
