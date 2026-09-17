import type { Metadata } from "next";
import { InvestScreen } from "./invest-screen";

export const metadata: Metadata = {
    title: "Invest — Land Bank",
};

export default function InvestPage({ params }: { params: Promise<{ slug: string }> }) {
    return <InvestScreen params={params} />;
}
