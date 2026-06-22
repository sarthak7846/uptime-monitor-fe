import { RealtimeProvider } from "@/contexts/realtime";
import PublicStatusPage from "./PublicStatusPage";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

const StatusPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  let data;
  let error: string | null = null;

  try {
    const res = await fetch(`${API_BASE_URL}/status-page/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) {
        error = "Status page not found.";
      } else {
        error = "Failed to load status page.";
      }
    } else {
      data = await res.json();
    }
  } catch {
    error = "Unable to connect to the status service.";
  }

  return (
    <RealtimeProvider>
      <PublicStatusPage initialData={data} error={error} />;
    </RealtimeProvider>
  );
};

export default StatusPage;
