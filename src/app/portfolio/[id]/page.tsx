import { InvestmentDetailScreen } from "./detail-screen";

export default function InvestmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return <InvestmentDetailScreen params={params} />;
}
