import { EarlyExitFlowScreen } from "./early-exit-screen";

export default function EarlyExitPage({ params }: { params: Promise<{ id: string }> }) {
    return <EarlyExitFlowScreen params={params} />;
}
