"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { IconBook, IconArrowRight, IconAlertTriangle, IconMoon, IconClock, IconBrain } from "@tabler/icons-react";
import Link from "next/link";

const guidePages = [
  {
    id: "microsleep",
    title: "Cara Menghindari Microsleep",
    description: "Pelajari penyebab dan cara mencegah microsleep saat berkendara",
    icon: <IconAlertTriangle size={24} className="text-yellow-500" />,
    href: "/profile/guide/microsleep",
    category: "Safety",
    color: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    id: "night-driving",
    title: "Tips Berkendara Malam",
    description: "Panduan lengkap berkendara aman di malam hari",
    icon: <IconMoon size={24} className="text-indigo-500" />,
    href: "/profile/guide/night-driving",
    category: "Tips",
    color: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    id: "rest-time",
    title: "Waktu Istirahat Ideal",
    description: "Panduan waktu istirahat untuk perjalanan jarak jauh",
    icon: <IconClock size={24} className="text-blue-500" />,
    href: "/profile/guide/rest-time",
    category: "Health",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    id: "drowsy-driving",
    title: "Bahaya Mengemudi Saat Mengantuk",
    description: "Kenali tanda-tanda dan cara mengatasi kantuk saat berkendara",
    icon: <IconBrain size={24} className="text-red-500" />,
    href: "/profile/guide/drowsy-driving",
    category: "Safety",
    color: "from-red-500/20 to-red-500/5",
  },
];

export default function GuidePage() {
  return (
    <div>
      <PageHeader
        title="Guide & Tips"
        description="Panduan berkendara aman untuk Anda"
        breadcrumbs={[{ label: "Profile", href: "/profile" }, { label: "Guide & Tips" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guidePages.map((guide) => (
          <Link key={guide.id} href={guide.href}>
            <Card className="glass-card hover:scale-[1.02] transition-transform cursor-pointer h-full">
              <CardContent className="p-6">
                <div className={`h-32 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center mb-4`}>
                  {guide.icon}
                </div>
                <Badge className="mb-2">{guide.category}</Badge>
                <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Baca Selengkapnya
                  <IconArrowRight size={16} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
