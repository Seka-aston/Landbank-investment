import type { Metadata } from "next";
import { MaturityFlowScreen } from "./maturity-screen";

export const metadata: Metadata = {
    title: "Investment Maturity — Land Bank",
};

export default function MaturityPage({ params }: { params: Promise<{ id: string }> }) {
    return <MaturityFlowScreen params={params} />;
}
