import { lazy, Suspense, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Occurrence } from "@/lib/mock-data";

const MapLeaflet = lazy(() => import("./MapLeaflet"));

function MapFallback() {
  return (
    <div className="grid h-full w-full place-items-center bg-muted text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}

export function MapView({ items }: { items: Occurrence[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <MapFallback />;

  return (
    <Suspense fallback={<MapFallback />}>
      <MapLeaflet items={items} />
    </Suspense>
  );
}
