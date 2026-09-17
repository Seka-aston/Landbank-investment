import type { Metadata } from "next";
import { VerificationScreen } from "./verification-screen";

export const metadata: Metadata = {
    title: "Verification Queue — Land Bank Staff",
};

export default function VerificationPage() {
    return <VerificationScreen />;
}
