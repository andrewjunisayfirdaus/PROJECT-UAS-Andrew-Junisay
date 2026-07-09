export const ROUTES = {
  HOME: "/",
  DETECTION: "/detection",
  SLEEP_TIME: "/detection/sleep-time",
  FACE_MONITOR: "/detection/face-monitor",
  VOICE_REMINDER: "/detection/voice-reminder",
  SMARTWATCH: "/detection/smartwatch",
  SOS: "/detection/sos",
  PROFILE: "/profile",
  DATA_DIRI: "/profile/data",
  HISTORY: "/history",
  MAPS: "/history/maps",
  TRAFFIC: "/history/traffic",
  HEALTH: "/history/health",
  SLEEP: "/history/sleep",
  QUEST: "/quest",
  FACTS: "/quest/facts",
  GUIDE: "/quest/guide",
  GUIDE_MICROSLEEP: "/quest/guide/microsleep",
  GUIDE_NIGHT_DRIVING: "/quest/guide/night-driving",
  GUIDE_REST_TIME: "/quest/guide/rest-time",
  GUIDE_DROWSY_DRIVING: "/quest/guide/drowsy-driving",
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
    ],
  },
  {
    title: "Detection",
    href: ROUTES.DETECTION,
    icon: "IconShieldCheck",
    children: [
      { title: "Face Monitor", href: ROUTES.FACE_MONITOR, icon: "IconCamera" },
      { title: "Smartwatch", href: ROUTES.SMARTWATCH, icon: "IconAlarm" },
      { title: "Atur Waktu Tidur", href: ROUTES.SLEEP_TIME, icon: "IconMoon" },
      { title: "Voice Reminder", href: ROUTES.VOICE_REMINDER, icon: "IconBell" },
      { title: "SOS", href: ROUTES.SOS, icon: "IconAlertTriangle" },
    ],
  },
  {
    title: "History",
    href: ROUTES.HISTORY,
    icon: "IconHistory",
    children: [
      { title: "Maps", href: ROUTES.MAPS, icon: "IconMap" },
      { title: "Sleep Schedule", href: ROUTES.SLEEP, icon: "IconCalendarTime" },
      { title: "Traffic & Vulnerable", href: ROUTES.TRAFFIC, icon: "IconChartBar" },
    ],
  },
  {
    title: "Quest",
    href: ROUTES.QUEST,
    icon: "IconTrophy",
    children: [
      { title: "Fakta Microsleep", href: ROUTES.FACTS, icon: "IconBulb" },
      { title: "Guide & Tips", href: ROUTES.GUIDE, icon: "IconBook" },
    ],
  },
];
