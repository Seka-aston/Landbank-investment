import type { Metadata } from "next";
import { AccountScreen } from "./account-screen";

export const metadata: Metadata = {
    title: "My Account — Land Bank",
};

export default function AccountPage() {
    return <AccountScreen />;
}
