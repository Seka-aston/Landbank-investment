import { OpportunityDetailScreen } from "./detail-screen";

export default function OpportunityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    return <OpportunityDetailScreen params={params} />;
}
