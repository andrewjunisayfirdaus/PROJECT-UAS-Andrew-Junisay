"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import {
  IconHome,
  IconShieldCheck,
  IconUser,
  IconHistory,
  IconTrophy,
  IconMoon,
  IconCar,
  IconCamera,
  IconBell,
  IconUserCircle,
  IconAlertTriangle,
  IconAlarm,
  IconBook,
  IconChartBar,
  IconMap,
  IconClock,
  IconHeartbeat,
  IconDeviceGamepad,
  IconCalendarTime,
  IconBulb,
  IconChevronDown,
  IconChevronLeft,
} from "@tabler/icons-react";
import { useState } from "react";
import { useSidebar } from "@/context/sidebar-provider";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  IconHome,
  IconShieldCheck,
  IconUser,
  IconHistory,
  IconTrophy,
  IconMoon,
  IconCar,
  IconCamera,
  IconBell,
  IconUserCircle,
  IconAlertTriangle,
  IconAlarm,
  IconBook,
  IconChartBar,
  IconMap,
  IconClock,
  IconHeartbeat,
  IconDeviceGamepad,
  IconCalendarTime,
  IconBulb,
};

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();
  const [expandedSections, setExpandedSections] = useState<string[]>(["Detection", "Profile", "History", "Quest"]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <IconShieldCheck size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg">Drive Safe</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="mx-auto">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <IconShieldCheck size={20} className="text-white" />
            </div>
          </Link>
        )}
        <button
          onClick={toggle}
          className="p-1.5 rounded-lg hover:bg-accent transition-colors"
        >
          <IconChevronLeft
            size={16}
            className={cn("transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const isExpanded = expandedSections.includes(item.title);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.title} className="mb-1">
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleSection(item.title)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {Icon && <Icon size={20} />}
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <IconChevronDown
                          size={14}
                          className={cn("transition-transform", isExpanded && "rotate-180")}
                        />
                      </>
                    )}
                  </button>
                  {!collapsed && isExpanded && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {item.children!.map((child) => {
                        const ChildIcon = iconMap[child.icon];
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                              isChildActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                          >
                            {ChildIcon && <ChildIcon size={16} />}
                            <span>{child.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {Icon && <Icon size={20} />}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
