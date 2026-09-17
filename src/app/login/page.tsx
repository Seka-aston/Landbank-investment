import type { Metadata } from "next";
import { LoginScreen } from "./login-screen";

export const metadata: Metadata = {
    title: "Log In — Land Bank",
};

export default function LoginPage() {
    return <LoginScreen />;
}
