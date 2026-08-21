import { MaturityFlowScreen } from "./maturity-screen";

export default function MaturityPage({ params }: { params: Promise<{ id: string }> }) {
    return <MaturityFlowScreen params={params} />;
}
