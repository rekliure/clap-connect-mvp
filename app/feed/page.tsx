import { AppShell } from "@/components/AppShell";
import { FeedClient } from "./FeedClient";

export default function FeedPage() {
  return (
    <AppShell title="Home Feed">
      <FeedClient />
    </AppShell>
  );
}
