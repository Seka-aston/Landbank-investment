import { InvestScreen } from "./invest-screen";

export default function InvestPage({ params }: { params: Promise<{ slug: string }> }) {
    return <InvestScreen params={params} />;
}
