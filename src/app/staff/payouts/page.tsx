import type { Metadata } from "next";
import { PayoutsScreen } from "./payouts-screen";

export const metadata: Metadata = {
    title: "Payout Queue — Land Bank Staff",
};

export default function PayoutsPage() {
    return <PayoutsScreen />;
}
