"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/sidebar-provider";
import {
  IconHome,
  IconShieldCheck,
  IconUser,
  IconHistory,
  IconTrophy,
} from "@tabler/icons-react";

const navItems = [
  { href: "/", icon: IconHome, label: "Home" },
  { href: "/detection", icon: IconShieldCheck, label: "Detect" },
  { href: "/profile", icon: IconUser, label: "Profile" },
  { href: "/history", icon: IconHistory, label: "History" },
  { href: "/quest", icon: IconTrophy, label: "Quest" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors min-w-[56px]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
