import type { Metadata } from "next";
import { WithdrawProfitFlowScreen } from "./withdraw-screen";

export const metadata: Metadata = {
    title: "Withdraw Profit — Land Bank",
};

export default function WithdrawProfitPage({ params }: { params: Promise<{ id: string }> }) {
    return <WithdrawProfitFlowScreen params={params} />;
}
