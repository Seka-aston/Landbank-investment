import type { Metadata } from "next";
import { TransfersScreen } from "./transfers-screen";

export const metadata: Metadata = {
    title: "Bank Transfers — Land Bank Staff",
};

export default function TransfersPage() {
    return <TransfersScreen />;
}
