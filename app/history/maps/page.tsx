"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

const LeafletMap = dynamic(() => import("@/components/history/leaflet-map").then(m => m.LeafletMap), {
  ssr: false,
  loading: () => <LoadingSkeleton className="h-[500px]" />,
});

export default function MapsPage() {
  return (
    <div>
      <PageHeader
        title="Maps"
        description="Lihat lokasi dan titik penting di sekitar Anda"
        breadcrumbs={[{ label: "History", href: "/history" }, { label: "Maps" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[500px]">
                <LeafletMap />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Legenda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm">Posisi Anda</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm">Rest Area</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm">Rumah Sakit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm">SPBU</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
