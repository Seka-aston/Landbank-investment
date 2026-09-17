import type { Metadata } from "next";
import { ExitsScreen } from "./exits-screen";

export const metadata: Metadata = {
    title: "Early Exit Queue — Land Bank Staff",
};

export default function ExitsPage() {
    return <ExitsScreen />;
}
