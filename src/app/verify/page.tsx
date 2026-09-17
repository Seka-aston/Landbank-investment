import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyScreen } from "./verify-screen";

export const metadata: Metadata = {
    title: "Identity Verification — Land Bank",
};

export default function VerifyPage() {
    return (
        <Suspense>
            <VerifyScreen />
        </Suspense>
    );
}
