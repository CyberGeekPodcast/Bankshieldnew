import { InsightsPage } from "./InsightsPage";

// Backward-compatible wrapper (Navigation/App.tsx expects BlogPage)
export function BlogPage() {
  return <InsightsPage />;
}
