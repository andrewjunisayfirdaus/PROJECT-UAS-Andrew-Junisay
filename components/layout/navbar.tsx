"use client";

import { useTheme } from "@/context/theme-provider";
import { useSidebar } from "@/context/sidebar-provider";
import { IconMenu2, IconSun, IconMoon, IconUser } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { setMobileOpen } = useSidebar();
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/") return "Home";
    const segments = pathname.split("/").filter(Boolean);
    const titles: Record<string, string> = {
      detection: "Detection",
      "sleep-time": "Atur Waktu Tidur",
      "fit-drive": "Fit-to-Drive Test",
      "face-monitor": "Face Monitor",
      "voice-reminder": "Voice Reminder",
      profile: "Profile",
      data: "Data Diri",
      sos: "SOS",
      smartwatch: "Smartwatch",
      guide: "Guide & Tips",
      history: "History",
      traffic: "Grafik Traffic",
      maps: "Maps",
      vulnerable: "Vulnerable Time",
      health: "Health",
      quest: "Quest",
      game: "Mini Games",
      sleep: "Sleep Schedule",
      facts: "Fakta Microsleep",
    };
    return titles[segments[segments.length - 1]] || segments[segments.length - 1];
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 md:px-6 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <IconMenu2 size={20} />
        </button>
        <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
        >
          {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <IconUser size={16} className="text-primary" />
        </div>
      </div>
    </header>
  );
}
