import type { Metadata } from "next";
import { EarlyExitFlowScreen } from "./early-exit-screen";

export const metadata: Metadata = {
    title: "Early Exit — Land Bank",
};

export default function EarlyExitPage({ params }: { params: Promise<{ id: string }> }) {
    return <EarlyExitFlowScreen params={params} />;
}
