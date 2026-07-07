export const ROUTES = {
  HOME: "/",
  DETECTION: "/detection",
  SLEEP_TIME: "/detection/sleep-time",
  FIT_DRIVE: "/detection/fit-drive",
  FACE_MONITOR: "/detection/face-monitor",
  VOICE_REMINDER: "/detection/voice-reminder",
  PROFILE: "/profile",
  DATA_DIRI: "/profile/data",
  SOS: "/profile/sos",
  SMARTWATCH: "/profile/smartwatch",
  GUIDE: "/profile/guide",
  HISTORY: "/history",
  TRAFFIC: "/history/traffic",
  MAPS: "/history/maps",
  VULNERABLE: "/history/vulnerable",
  HEALTH: "/history/health",
  QUEST: "/quest",
  GAME: "/quest/game",
  SLEEP: "/quest/sleep",
  FACTS: "/quest/facts",
} as const;

export const NAV_ITEMS = [
  {
    title: "Home",
    href: ROUTES.HOME,
    icon: "IconHome",
  },
  {
    title: "Profile",
    href: ROUTES.PROFILE,
    icon: "IconUser",
    children: [
      { title: "Data Diri", href: ROUTES.DATA_DIRI, icon: "IconUserCircle" },
      { title: "SOS", href: ROUTES.SOS, icon: "IconAlertTriangle" },
      { title: "Smartwatch", href: ROUTES.SMARTWATCH, icon: "IconAlarm" },
      { title: "Guide & Tips", href: ROUTES.GUIDE, icon: "IconBook" },
    ],
  },
  {
    title: "Detection",
    href: ROUTES.DETECTION,
    icon: "IconShieldCheck",
    children: [
      { title: "Atur Waktu Tidur", href: ROUTES.SLEEP_TIME, icon: "IconMoon" },
      { title: "Fit-to-Drive Test", href: ROUTES.FIT_DRIVE, icon: "IconCar" },
      { title: "Mini Games", href: ROUTES.GAME, icon: "IconDeviceGamepad" },
      { title: "Face Monitor", href: ROUTES.FACE_MONITOR, icon: "IconCamera" },
      { title: "Voice Reminder", href: ROUTES.VOICE_REMINDER, icon: "IconBell" },
    ],
  },
  {
    title: "History",
    href: ROUTES.HISTORY,
    icon: "IconHistory",
    children: [
      { title: "Grafik Traffic", href: ROUTES.TRAFFIC, icon: "IconChartBar" },
      { title: "Maps", href: ROUTES.MAPS, icon: "IconMap" },
      { title: "Vulnerable Time", href: ROUTES.VULNERABLE, icon: "IconClock" },
      { title: "Health", href: ROUTES.HEALTH, icon: "IconHeartbeat" },
    ],
  },
  {
    title: "Quest",
    href: ROUTES.QUEST,
    icon: "IconTrophy",
    children: [
      { title: "Sleep Schedule", href: ROUTES.SLEEP, icon: "IconCalendarTime" },
      { title: "Fakta Microsleep", href: ROUTES.FACTS, icon: "IconBulb" },
    ],
  },
];

export const FIT_CATEGORIES = {
  AMAN: { label: "Aman", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30" },
  WASPAD: { label: "Waspada", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  TIDAK_AMAN: { label: "Tidak Aman", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30" },
};
