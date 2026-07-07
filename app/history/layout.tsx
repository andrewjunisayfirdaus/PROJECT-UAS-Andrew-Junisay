"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconChartBar, IconMap, IconClock, IconHeartbeat } from "@tabler/icons-react";

const tabs = [
  { label: "Grafik Traffic", href: "/history/traffic", icon: IconChartBar },
  { label: "Maps", href: "/history/maps", icon: IconMap },
  { label: "Vulnerable Time", href: "/history/vulnerable", icon: IconClock },
  { label: "Health", href: "/history/health", icon: IconHeartbeat },
];

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              <Icon size={16} />
              {tab.label}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
}
