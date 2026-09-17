import type { Metadata } from "next";
import { SignupScreen } from "./signup-screen";

export const metadata: Metadata = {
    title: "Sign Up — Land Bank",
};

export default function SignupPage() {
    return <SignupScreen />;
}
