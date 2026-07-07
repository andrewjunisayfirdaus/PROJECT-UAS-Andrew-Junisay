# Drive Save - Comprehensive Implementation Plan

## 1. Recommended File/Folder Structure

```
my-app/
├── app/
│   ├── layout.tsx                          # Root layout with ThemeProvider, Sidebar, Navbar
│   ├── page.tsx                            # Home page (/)
│   ├── globals.css                         # Tailwind v4 theme (dark mode, glassmorphism tokens)
│   ├── detection/
│   │   ├── layout.tsx                      # Detection section nested layout
│   │   ├── sleep-time/page.tsx             # /detection/sleep-time
│   │   ├── fit-drive/page.tsx              # /detection/fit-drive
│   │   ├── face-monitor/page.tsx           # /detection/face-monitor
│   │   └── voice-reminder/page.tsx         # /detection/voice-reminder
│   ├── profile/
│   │   ├── layout.tsx                      # Profile section nested layout
│   │   ├── data/page.tsx                   # /profile/data
│   │   ├── sos/page.tsx                    # /profile/sos
│   │   ├── smartwatch/page.tsx             # /profile/smartwatch
│   │   └── guide/page.tsx                  # /profile/guide
│   ├── history/
│   │   ├── layout.tsx                      # History section nested layout
│   │   ├── traffic/page.tsx                # /history/traffic
│   │   ├── maps/page.tsx                   # /history/maps
│   │   ├── vulnerable/page.tsx             # /history/vulnerable
│   │   └── health/page.tsx                 # /history/health
│   └── quest/
│       ├── layout.tsx                      # Quest section nested layout
│       ├── game/page.tsx                   # /quest/game
│       ├── sleep/page.tsx                  # /quest/sleep
│       └── facts/page.tsx                  # /quest/facts
│
├── components/
│   ├── ui/                                 # shadcn/ui primitives (button, card, input, etc.)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── tabs.tsx
│   │   ├── select.tsx
│   │   ├── switch.tsx
│   │   ├── avatar.tsx
│   │   ├── separator.tsx
│   │   ├── slider.tsx
│   │   ├── toast.tsx
│   │   └── tooltip.tsx
│   ├── layout/
│   │   ├── sidebar.tsx                     # Main sidebar navigation
│   │   ├── navbar.tsx                      # Top navbar with dark mode toggle
│   │   ├── footer.tsx                      # Footer component
│   │   ├── sidebar-item.tsx                # Single nav item with icon + active state
│   │   └── mobile-nav.tsx                  # Mobile bottom navigation
│   ├── shared/
│   │   ├── section-header.tsx              # Reusable section title + description
│   │   ├── stat-card.tsx                   # Statistics card with icon + value + label
│   │   ├── data-table.tsx                  # Simple data display table
│   │   ├── empty-state.tsx                 # Empty state placeholder
│   │   ├── loading-skeleton.tsx            # Loading skeleton shimmer
│   │   ├── page-header.tsx                 # Page title + breadcrumb + action area
│   │   └── animated-card.tsx               # Glassmorphism card with framer-motion
│   ├── home/
│   │   ├── hero.tsx                        # Hero section
│   │   ├── app-explanation.tsx             # App explanation section
│   │   ├── how-it-works.tsx                # How it works section
│   │   ├── features.tsx                    # Feature cards section
│   │   ├── statistics.tsx                  # Statistics section
│   │   └── cta.tsx                         # Call to action section
│   ├── detection/
│   │   ├── sleep-time-form.tsx             # Sleep/wake time input form
│   │   ├── sleep-history-card.tsx          # Sleep history display
│   │   ├── reaction-test.tsx               # Reaction time test game
│   │   ├── focus-test.tsx                  # Focus/concentration test
│   │   ├── sleepiness-test.tsx             # Sleepiness assessment quiz
│   │   ├── fit-score-display.tsx           # Auto score + category display
│   │   ├── webcam-feed.tsx                 # Webcam dummy display
│   │   ├── eye-status-indicator.tsx        # Eye status (open/closed)
│   │   ├── blink-counter.tsx               # Blink counter display
│   │   ├── yawn-counter.tsx                # Yawn counter display
│   │   ├── head-position-tracker.tsx       # Head position visualization
│   │   ├── driver-status-panel.tsx         # Overall driver status
│   │   ├── alarm-player.tsx                # Audio alarm test
│   │   ├── warning-popup.tsx               # Warning popup modal
│   │   ├── countdown-timer.tsx             # Countdown timer display
│   │   └── reminder-status.tsx             # Reminder status indicator
│   ├── profile/
│   │   ├── profile-form.tsx                # React Hook Form + Zod form
│   │   ├── sos-button.tsx                  # Big SOS emergency button
│   │   ├── emergency-contacts.tsx          # Emergency contacts list
│   │   ├── gps-location.tsx                # GPS/Location display
│   │   ├── smartwatch-stats.tsx            # Smartwatch data cards
│   │   ├── heart-rate-chart.tsx            # Heart rate visualization
│   │   ├── guide-article-card.tsx          # Article card with thumbnail
│   │   └── article-detail-modal.tsx        # Article detail popup
│   ├── history/
│   │   ├── traffic-chart.tsx               # Recharts traffic/activity graphs
│   │   ├── trip-history-table.tsx          # Trip history data table
│   │   ├── leaflet-map.tsx                 # React Leaflet map wrapper
│   │   ├── map-marker.tsx                  # Custom map markers
│   │   ├── heatmap-calendar.tsx            # Vulnerable time heatmap
│   │   ├── peak-hours-graph.tsx            # Peak hours bar chart
│   │   ├── activity-calendar.tsx           # Activity calendar view
│   │   ├── health-metric-card.tsx          # Health metric display card
│   │   └── health-trend-chart.tsx          # Health trend line chart
│   └── quest/
│       ├── memory-game.tsx                 # Memory card flip game
│       ├── reaction-game.tsx               # Reaction speed game
│       ├── game-leaderboard.tsx            # Game leaderboard display
│       ├── challenge-card.tsx              # Sleep challenge card
│       ├── badge-display.tsx               # Badge/achievement display
│       ├── progress-ring.tsx               # Circular progress indicator
│       └── fact-card.tsx                   # Microsleep fact info card
│
├── lib/
│   ├── utils.ts                            # cn() helper (clsx + tailwind-merge)
│   ├── constants.ts                        # App-wide constants
│   └── types.ts                            # Shared TypeScript interfaces/types
│
├── dummy/
│   ├── sleep-data.ts                       # Dummy sleep time data
│   ├── fit-test-data.ts                    # Fit-to-drive test questions/options
│   ├── face-monitor-data.ts                # Dummy webcam/face monitoring data
│   ├── profile-data.ts                     # Dummy user profile data
│   ├── sos-contacts.ts                     # Dummy emergency contacts
│   ├── smartwatch-data.ts                  # Dummy smartwatch stats
│   ├── guide-articles.ts                   # Dummy guide articles
│   ├── traffic-data.ts                     # Dummy traffic/graph data
│   ├── map-data.ts                         # Dummy map markers/locations
│   ├── vulnerable-data.ts                  # Dummy vulnerable time data
│   ├── health-data.ts                      # Dummy health metrics
│   ├── game-data.ts                        # Game scores/leaderboard data
│   ├── quest-challenges.ts                 # Dummy quest challenges/badges
│   └── facts-data.ts                       # Dummy microsleep facts
│
├── hooks/
│   ├── use-theme.ts                        # Dark mode theme hook
│   ├── use-countdown.ts                    # Countdown timer hook
│   ├── use-timer.ts                        # Stopwatch/timer hook
│   ├── use-local-storage.ts                # localStorage read/write hook
│   └── use-reaction-test.ts                # Reaction test logic hook
│
├── context/
│   ├── theme-provider.tsx                  # Theme context provider (dark/light)
│   └── sidebar-provider.tsx               # Sidebar open/collapsed state
│
├── public/
│   ├── (existing svg files)
│   ├── favicon.ico
│   └── images/                            # Placeholder images for articles/thumbnails
│       ├── guide-1.jpg
│       ├── guide-2.jpg
│       ├── guide-3.jpg
│       ├── fact-1.jpg
│       ├── fact-2.jpg
│       └── fact-3.jpg
│
├── components.json                         # shadcn/ui configuration
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## 2. Implementation Phases (Ordered Steps)

### Phase 0: Project Setup & Configuration (~30 min)

**Step 0.1: Install all dependencies**
```bash
pnpm add lucide-react clsx tailwind-merge class-variance-authority framer-motion recharts react-leaflet leaflet sonner
pnpm add -D @types/leaflet
```

**Step 0.2: Initialize shadcn/ui**
```bash
pnpm dlx shadcn@latest init
# Select: New York style, Zinc base color, CSS variables: yes
```
Then install needed components:
```bash
pnpm dlx shadcn@latest add button card input label progress badge dialog tabs select switch avatar separator slider toast tooltip
```

**Step 0.3: Create utility files**
- `lib/utils.ts` — `cn()` helper (created by shadcn init)
- `lib/types.ts` — All shared TypeScript interfaces
- `lib/constants.ts` — App name, routes, nav items, color constants

**Step 0.4: Update globals.css for dark mode + glassmorphism**
- Add dark mode CSS variables
- Add glassmorphism utility classes (`.glass`, `.glass-card`)
- Add custom theme colors for primary/accent/status colors

**Step 0.5: Update next.config.ts**
```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // needed for dummy images
  },
};
export default nextConfig;
```

---

### Phase 1: Layout & Theme Foundation (~1 hour)

**Step 1.1: Theme Provider & Context**
- Create `context/theme-provider.tsx` — Dark mode context with toggle, persists to localStorage
- Create `context/sidebar-provider.tsx` — Sidebar collapsed/expanded state

**Step 1.2: Update Root Layout (`app/layout.tsx`)**
- Wrap children with ThemeProvider and SidebarProvider
- Add metadata (title: "Drive Save", description about drowsiness detection)
- Add `dark` class to `<html>` by default
- Import `sonner` Toaster

**Step 1.3: Build Layout Components**
- `components/layout/sidebar.tsx` — Collapsible sidebar with:
  - Logo/brand at top
  - Navigation sections: Home, Detection, Profile, History, Quest
  - Each section expandable with sub-menu items
  - Icons from @tabler/icons-react
  - Active route highlighting using `usePathname()`
  - Collapse/expand toggle button
- `components/layout/navbar.tsx` — Top bar with:
  - Mobile hamburger menu
  - Page title (dynamic)
  - Dark mode toggle switch
  - User avatar placeholder
- `components/layout/footer.tsx` — Simple footer with copyright, links
- `components/layout/mobile-nav.tsx` — Bottom nav bar for mobile with 5 icons

**Step 1.4: Create Shared Components**
- `components/shared/section-header.tsx`
- `components/shared/stat-card.tsx`
- `components/shared/page-header.tsx`
- `components/shared/animated-card.tsx`
- `components/shared/loading-skeleton.tsx`
- `components/shared/empty-state.tsx`

---

### Phase 2: Dummy Data Layer (~1 hour)

**Step 2.1: Create all dummy data files**

Each file exports typed arrays/objects matching interfaces in `lib/types.ts`.

Key data structures:
- `dummy/sleep-data.ts` — Array of `{ date, sleepTime, wakeTime, duration, quality }`
- `dummy/fit-test-data.ts` — Reaction test configs, focus test questions, sleepiness quiz
- `dummy/face-monitor-data.ts` — Simulated eye states, blink counts, yawn events
- `dummy/profile-data.ts` — Default user profile object
- `dummy/sos-contacts.ts` — Emergency contact list
- `dummy/smartwatch-data.ts` — Heart rate series, sleep score, steps, stress, battery, calories
- `dummy/guide-articles.ts` — Article objects with title, summary, thumbnail, content
- `dummy/traffic-data.ts` — Weekly trips, driving hours, drowsiness levels for Recharts
- `dummy/map-data.ts` — Lat/lng markers for user, rest areas, hospitals, gas stations
- `dummy/vulnerable-data.ts` — Heatmap data (hour x day matrix), peak hours, weekly stats
- `dummy/health-data.ts` — Heart rate, sleep quality, fatigue, stress, hydration metrics
- `dummy/game-data.ts` — Memory game cards, leaderboard scores
- `dummy/quest-challenges.ts` — Daily/weekly challenges, badges, achievements
- `dummy/facts-data.ts` — Microsleep fact cards with title, category, description

**Step 2.2: Define TypeScript interfaces (`lib/types.ts`)**
- `SleepRecord`, `FitTestResult`, `FaceMonitorState`, `UserProfile`, `EmergencyContact`
- `SmartwatchData`, `GuideArticle`, `TrafficDataPoint`, `MapMarker`
- `VulnerableTimeData`, `HealthMetric`, `GameScore`, `QuestChallenge`, `MicrosleepFact`
- `NavSection`, `NavItem` for navigation

**Step 2.3: Define constants (`lib/constants.ts`)**
- `ROUTES` object with all route paths
- `NAV_ITEMS` array with sidebar navigation structure
- `CATEGORIES` for fit-to-drive (Aman/Waspada/Tidak Aman)
- `STATUS_COLORS` for status indicators

---

### Phase 3: Home Page (~1.5 hours)

**Step 3.1: Home section components**
- `components/home/hero.tsx` — Full-width hero with:
  - Gradient background (dark)
  - Headline: "Drive Safe, Stay Alert"
  - Subtitle about drowsiness detection
  - CTA buttons: "Start Detection" → /detection, "Learn More" → scroll
  - Animated illustration/icon (framer-motion fade-in)
  - Stats bar below: "10K+ Users", "50K+ Alerts", "99.2% Accuracy"

- `components/home/app-explanation.tsx` — How the app works explanation
  - 3-column layout with icons
  - "Monitor", "Detect", "Alert" pillars
  - Animated card entrance with framer-motion

- `components/home/how-it-works.tsx` — Step-by-step process
  - Numbered steps (1-2-3-4) with connecting lines
  - Step 1: Set sleep schedule
  - Step 2: Take fit-to-drive test
  - Step 3: Monitor face during driving
  - Step 4: Get voice reminders

- `components/home/features.tsx` — Feature cards grid
  - 6 feature cards in 2x3 grid (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
  - Each card: icon, title, description
  - Glassmorphism card style with hover effects

- `components/home/statistics.tsx` — Animated statistics
  - 4 big number counters with framer-motion count-up
  - Labels: "Total Users", "Driving Hours Monitored", "Drowsiness Alerts Sent", "Accidents Prevented"

- `components/home/cta.tsx` — Call to action banner
  - Gradient background, centered text
  - "Ready to drive safer?" headline
  - Get Started button

- `components/home/ → used in app/page.tsx`

**Step 3.2: Assemble `app/page.tsx`**
- Import and render all home sections in order
- Wrap in a clean layout without sidebar (full-width home)

---

### Phase 4: Detection Section (~2 hours)

**Step 4.1: Detection Layout (`app/detection/layout.tsx`)**
- Section title bar with tab-style sub-navigation
- Sub-menu: Sleep Time | Fit-to-Drive | Face Monitor | Voice Reminder

**Step 4.2: Sleep Time Page (`/detection/sleep-time`)**
Components:
- `sleep-time-form.tsx` — Time picker inputs (sleep time, wake time) with calculate button
- Duration calculation display (hours:minutes)
- Progress bar showing sleep quality (based on duration vs 8h target)
- Reminder toggle with configurable reminder time
- `sleep-history-card.tsx` — Past 7 days sleep log as cards/table

**Step 4.3: Fit-to-Drive Test Page (`/detection/fit-drive`)**
Components:
- `reaction-test.tsx` — Click when screen changes color, measures reaction time in ms
  - Start button → wait for random color change → click → display time
  - Score: <200ms Excellent, 200-400ms Good, >400ms Slow
- `focus-test.tsx` — Simple attention test (e.g., count specific items in grid)
  - Grid of numbers/shapes, count targets within time limit
- `sleepiness-test.tsx` — 5-question quiz (KSS-inspired)
  - Scale 1-9 for sleepiness, slider inputs
- `fit-score-display.tsx` — Combined auto-score
  - Calculate average from 3 tests
  - Display category: Aman (green), Waspada (yellow), Tidak Aman (red)
  - Circular progress indicator with framer-motion

**Step 4.4: Face Monitor Page (`/detection/face-monitor`)**
Components:
- `webcam-feed.tsx` — Dummy webcam display (video placeholder with border)
  - Simulated camera feed (colored gradient box as dummy)
  - Overlay with status indicators
- `eye-status-indicator.tsx` — Shows Open/Closed with icon + color
- `blink-counter.tsx` — Running blink count with increment button (simulated)
- `yawn-counter.tsx` — Running yawn count with increment button (simulated)
- `head-position-tracker.tsx` — Simple visual showing head tilt (CSS transform based on state)
- `driver-status-panel.tsx` — Overall status: Alert / Drowsy / Critical
  - Color-coded: Green / Yellow / Red
  - Auto-calculates based on eye closure + yawn frequency

**Step 4.5: Voice Reminder Page (`/detection/voice-reminder`)**
Components:
- `alarm-player.tsx` — Test alarm button (plays visual alert since no real audio)
  - Button to trigger alarm, shows animated alert ring
- `warning-popup.tsx` — Modal popup warning (shadcn Dialog)
  - Triggered by button, shows warning message with dismiss
- `countdown-timer.tsx` — Configurable countdown (5min, 10min, 15min, 30min intervals)
  - Start/pause/reset, visual circular countdown
- `reminder-status.tsx` — Status of active reminders
  - Shows: "Next reminder in X:XX", "Reminders sent today: N"
  - Toggle to enable/disable

---

### Phase 5: Profile Section (~1.5 hours)

**Step 5.1: Profile Layout (`app/profile/layout.tsx`)**

**Step 5.2: Data Diri Page (`/profile/data`)**
- `profile-form.tsx` — React Hook Form + Zod validation:
  - Fields: Name (string, required), Email (email, required), Age (number, 10-120)
  - Gender (select: Laki-laki/Perempuan), Blood Type (select: A/B/AB/O)
  - Phone (string, pattern validated)
  - Zod schema with `.refine()` for cross-field validation
  - Three buttons: Save (submit), Edit (unlock fields), Reset (clear form)
  - Form state persisted to localStorage via `use-local-storage` hook
  - Toast notification on save (sonner)

**Step 5.3: SOS Page (`/profile/sos`)**
- `sos-button.tsx` — Large red pulsing SOS button
  - Click triggers confirmation dialog
  - Shows "Emergency services contacted" message (simulated)
  - Pulsing animation with framer-motion
- `emergency-contacts.tsx` — List of emergency contacts
  - Name, phone, relationship
  - Call button for each
  - Add/remove contacts
- `gps-location.tsx` — Location display
  - Simulated GPS coordinates
  - "Share Location" button
  - Last updated timestamp

**Step 5.4: Smartwatch Page (`/profile/smartwatch`)**
- `smartwatch-stats.tsx` — Grid of stat cards:
  - Heart Rate: current BPM + mini sparkline
  - Sleep Score: 0-100 score with progress ring
  - Steps: daily count with progress bar
  - Stress Level: 1-10 scale with color indicator
  - Battery: percentage with battery icon
  - Calories: burned count
- `heart-rate-chart.tsx` — Recharts line chart of 24h heart rate data

**Step 5.5: Guide & Tips Page (`/profile/guide`)**
- `guide-article-card.tsx` — Card with:
  - Thumbnail image (placeholder/gradient)
  - Category badge
  - Title, summary text
  - "Read More" link
  - Hover scale effect
- `article-detail-modal.tsx` — Expanded article view in dialog/modal
- Grid layout: 1 col mobile, 2 col tablet, 3 col desktop

---

### Phase 6: History Section (~2 hours)

**Step 6.1: History Layout (`app/history/layout.tsx`)**

**Step 6.2: Traffic Graph Page (`/history/traffic`)**
- `traffic-chart.tsx` — Recharts components:
  - Line chart: Trips per week (8 weeks)
  - Bar chart: Daily driving hours
  - Area chart: Drowsiness level trend
  - Pie chart: Weekly activity breakdown
- `trip-history-table.tsx` — Table of recent trips
  - Columns: Date, Route, Duration, Drowsiness Level, Status
  - Styled with shadcn table-like layout
- Tabbed interface to switch between chart types (shadcn Tabs)

**Step 6.3: Maps Page (`/history/maps`)**
- `leaflet-map.tsx` — React Leaflet map wrapper
  - Center on dummy coordinates (Jakarta area)
  - Tile layer: OpenStreetMap (free, no key needed)
  - Markers for: user location, rest areas, hospitals, gas stations
  - Custom colored markers per type
- `map-marker.tsx` — Custom marker component
  - Different icons/colors per marker type
  - Popup with location name + details
- Legend panel showing marker colors
- **Note:** Requires `react-leaflet` and `leaflet` CSS import:
  ```tsx
  import "leaflet/dist/leaflet.css";
  ```
  Must be client component with `'use client'` directive.

**Step 6.4: Vulnerable Time Page (`/history/vulnerable`)**
- `heatmap-calendar.tsx` — 7x24 heatmap grid
  - Rows: days of week (Mon-Sun)
  - Columns: hours (0-23)
  - Color intensity: green (safe) → yellow → red (vulnerable)
- `peak-hours-graph.tsx` — Bar chart of peak drowsiness hours
  - Recharts bar chart
  - X-axis: hours, Y-axis: drowsiness incidents
- `activity-calendar.tsx` — Monthly calendar view with color-coded days
- Weekly stats summary cards

**Step 6.5: Health Page (`/history/health`)**
- `health-metric-card.tsx` — Individual metric display:
  - Icon, metric name, current value, trend arrow (up/down/stable)
  - Mini sparkline or progress bar
- `health-trend-chart.tsx` — Recharts line chart for trends
- Metrics displayed:
  - Heart Rate: 72 bpm (stable)
  - Sleep Quality: 78% (improving)
  - Fatigue Level: Medium (decreasing)
  - Stress: Low (stable)
  - Hydration: 65% (needs improvement)
- Grid layout with cards + expandable charts

---

### Phase 7: Quest Section (~2 hours)

**Step 7.1: Quest Layout (`app/quest/layout.tsx`)**

**Step 7.2: Mini Games Page (`/quest/game`)**
- `memory-game.tsx` — Card flip memory game:
  - 4x4 grid of 8 pairs (icons from @tabler/icons-react)
  - Click to flip, match pairs
  - Score = moves count (fewer is better)
  - Timer showing elapsed time
  - "New Game" reset button
  - Win condition: all pairs matched
- `reaction-game.tsx` — Reaction speed game:
  - "Wait for green" → screen turns green → click ASAP
  - Measures reaction time in ms
  - 5 rounds, calculate average
  - Results: Excellent (<200ms), Good (200-350ms), Needs Practice (>350ms)
- `game-leaderboard.tsx` — Top scores display
  - Tabs for Memory Game / Reaction Game
  - Rank, Name, Score, Date
  - Highlight current user's best score

**Step 7.3: Sleep Schedule Page (`/quest/sleep`)**
- `challenge-card.tsx` — Individual challenge display:
  - Challenge name, description, progress bar
  - Status: active/completed/locked
  - Reward: XP points, badge icon
- `badge-display.tsx` — Badge grid:
  - Earned badges: full color
  - Unearned badges: grayed out with lock icon
  - Badge name + description on hover
- Achievement progress:
  - Daily challenges (3 tasks)
  - Weekly challenges (5 tasks)
  - XP bar with level indicator
  - Streak counter (consecutive days)

**Step 7.4: Microsleep Facts Page (`/quest/facts`)**
- `fact-card.tsx` — Info card:
  - Category badge (e.g., "Science", "Safety", "Health")
  - Title, thumbnail (gradient placeholder)
  - Short description (2-3 lines, truncated)
  - "Read More" expand
- Detail view in modal or expandable section
- Category filter tabs
- Grid: 1 col mobile, 2 col tablet, 3 col desktop

---

### Phase 8: Animations & Polish (~1 hour)

**Step 8.1: Framer Motion Animations**
- Page transitions: fade + slide up on route change
- Card entrance: stagger children with `variants`
- Scroll-triggered animations using `whileInView`
- Hover effects on cards: subtle scale + shadow increase
- Sidebar collapse/expand animation
- SOS button pulse animation
- Memory game card flip animation
- Countdown timer animation
- Number counter animation on statistics

**Step 8.2: Responsive Design Pass**
- Mobile-first approach
- Sidebar → bottom nav on mobile (<768px)
- Grid adjustments for all card layouts
- Touch-friendly buttons (min 44px tap targets)
- Proper overflow handling on maps/charts

**Step 8.3: Dark Mode Polish**
- Ensure all components respect dark/light theme
- Glassmorphism effects in both modes
- Chart colors adjusted for dark background
- Map tiles: dark mode alternative (CartoDB Dark Matter)
- Form inputs styled for both modes

---

### Phase 9: Final Validation (~30 min)

**Step 9.1: TypeScript check**
```bash
pnpm build
```
Fix any type errors.

**Step 9.2: ESLint check**
```bash
pnpm lint
```
Fix any lint warnings/errors.

**Step 9.3: Manual testing**
- Navigate all routes
- Test all interactive elements
- Verify responsive behavior
- Check dark mode toggle
- Test form validation

---

## 3. Key Architectural Decisions

### 3.1 Layout Strategy
- **Root layout** (`app/layout.tsx`): Wraps everything with ThemeProvider, SidebarProvider, Toaster
- **Sidebar + Content**: The root layout renders a Sidebar on the left and main content area on the right
- **Home page exception**: Home page uses a full-width layout WITHOUT sidebar (landing page style). Achieved by checking pathname or having a separate layout group
- **Section layouts**: Each section (`detection/`, `profile/`, `history/`, `quest/`) has a nested layout with a horizontal sub-navigation tab bar at the top

### 3.2 Component Architecture
- **shadcn/ui** for primitives (Button, Card, Input, Dialog, etc.) — copy-pasted, fully customizable
- **Custom components** import from `@/components/ui/` for base styling
- **Page components** are in `app/*/page.tsx` and compose section-specific components
- **Section components** live in `components/{section}/` directories
- All interactive components use `'use client'` directive

### 3.3 Data Flow
- All data is **dummy** in `/dummy/` directory — typed exports
- No global state management library needed — React Context + local state sufficient
- `useLocalStorage` hook for persisting user preferences (theme, profile data, scores)
- React Query is installed but not heavily used (all data is local) — can be used for future API integration
- Form state managed by react-hook-form with zod validation

### 3.4 Styling Strategy
- **Tailwind CSS v4** utility-first approach
- **Dark mode**: Class-based (`dark:` prefix) with `dark` class on `<html>`
- **Glassmorphism**: Custom utility classes in globals.css:
  ```css
  .glass { @apply bg-white/10 backdrop-blur-xl border border-white/20; }
  .glass-card { @apply bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl; }
  ```
- **Animations**: Framer Motion for page transitions, scroll animations, and micro-interactions
- **Charts**: Recharts with custom theme matching the dark dashboard style
- **Maps**: React Leaflet with OpenStreetMap tiles

### 3.5 Type Safety
- All dummy data strongly typed via `lib/types.ts`
- All component props explicitly typed
- Zod schemas for form validation
- Strict TypeScript mode enabled

---

## 4. Component Breakdown Per Page

### Home (/)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| hero.tsx | Headline, subtitle, CTA buttons, animated bg | Yes |
| app-explanation.tsx | 3-column app pillars | Yes |
| how-it-works.tsx | 4-step numbered process | Yes |
| features.tsx | 6 feature cards grid | Yes |
| statistics.tsx | 4 animated counters | Yes |
| cta.tsx | Bottom CTA banner | Yes |

### Detection - Sleep Time (/detection/sleep-time)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| sleep-time-form.tsx | Time inputs + calculate | Yes |
| sleep-history-card.tsx | History list/table | Yes |
| (page assembles these + progress bar + reminder toggle) | | Yes |

### Detection - Fit-to-Drive (/detection/fit-drive)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| reaction-test.tsx | Color-change reaction game | Yes |
| focus-test.tsx | Attention/counting test | Yes |
| sleepiness-test.tsx | KSS-style questionnaire | Yes |
| fit-score-display.tsx | Score + category + ring | Yes |

### Detection - Face Monitor (/detection/face-monitor)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| webcam-feed.tsx | Dummy camera display | Yes |
| eye-status-indicator.tsx | Open/Closed eye status | Yes |
| blink-counter.tsx | Blink count tracker | Yes |
| yawn-counter.tsx | Yawn count tracker | Yes |
| head-position-tracker.tsx | Head tilt visualization | Yes |
| driver-status-panel.tsx | Overall status display | Yes |

### Detection - Voice Reminder (/detection/voice-reminder)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| alarm-player.tsx | Alarm trigger + visual | Yes |
| warning-popup.tsx | Warning dialog | Yes |
| countdown-timer.tsx | Configurable countdown | Yes |
| reminder-status.tsx | Active reminder status | Yes |

### Profile - Data Diri (/profile/data)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| profile-form.tsx | Full form with validation | Yes |

### Profile - SOS (/profile/sos)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| sos-button.tsx | Big SOS pulse button | Yes |
| emergency-contacts.tsx | Contacts list + add | Yes |
| gps-location.tsx | GPS display + share | Yes |

### Profile - Smartwatch (/profile/smartwatch)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| smartwatch-stats.tsx | 6 stat cards grid | Yes |
| heart-rate-chart.tsx | Recharts line chart | Yes |

### Profile - Guide & Tips (/profile/guide)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| guide-article-card.tsx | Article card | No (can be server) |
| article-detail-modal.tsx | Article detail dialog | Yes |

### History - Traffic Graph (/history/traffic)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| traffic-chart.tsx | Recharts multiple charts | Yes |
| trip-history-table.tsx | Trip data table | No |

### History - Maps (/history/maps)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| leaflet-map.tsx | Map with markers | Yes |
| map-marker.tsx | Custom marker | Yes |

### History - Vulnerable Time (/history/vulnerable)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| heatmap-calendar.tsx | 7x24 heatmap grid | Yes |
| peak-hours-graph.tsx | Recharts bar chart | Yes |
| activity-calendar.tsx | Monthly calendar view | Yes |

### History - Health (/history/health)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| health-metric-card.tsx | Individual metric card | Yes |
| health-trend-chart.tsx | Recharts line chart | Yes |

### Quest - Mini Games (/quest/game)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| memory-game.tsx | Card flip game | Yes |
| reaction-game.tsx | Speed reaction game | Yes |
| game-leaderboard.tsx | Score leaderboard | Yes |

### Quest - Sleep Schedule (/quest/sleep)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| challenge-card.tsx | Challenge display | Yes |
| badge-display.tsx | Badge/achievement grid | Yes |
| progress-ring.tsx | Circular progress | Yes |

### Quest - Microsleep Facts (/quest/facts)
| Component | Responsibility | Client? |
|-----------|---------------|---------|
| fact-card.tsx | Info card | No |

---

## 5. Dependency List

### Already Installed (keep as-is)
| Package | Version | Notes |
|---------|---------|-------|
| next | 16.2.9 | Core framework |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | DOM rendering |
| typescript | ^5 | Type system |
| tailwindcss | ^4 | CSS framework |
| @tailwindcss/postcss | ^4 | PostCSS plugin |
| react-hook-form | ^7.79.0 | Form management |
| @hookform/resolvers | ^5.4.0 | Zod resolver |
| zod | ^4.4.3 | Schema validation |
| @tanstack/react-query | ^5.101.0 | Data fetching |
| axios | ^1.18.0 | HTTP client |
| @tabler/icons-react | ^3.44.0 | Icons |

### Need to Install

**Production dependencies:**
```bash
pnpm add lucide-react clsx tailwind-merge class-variance-authority
pnpm add framer-motion
pnpm add recharts
pnpm add react-leaflet leaflet
pnpm add sonner
```

**Dev dependencies:**
```bash
pnpm add -D @types/leaflet
```

**shadcn/ui (via CLI):**
```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input label progress badge dialog tabs select switch avatar separator slider tooltip
```

### Dependency Summary
| Package | Purpose | Size Impact |
|---------|---------|-------------|
| lucide-react | Additional icons (shadcn dependency) | Small |
| clsx | Conditional classNames | Tiny |
| tailwind-merge | Merge Tailwind classes without conflicts | Tiny |
| class-variance-authority | Component variant management (shadcn) | Tiny |
| framer-motion | Animations & transitions | Medium |
| recharts | Charts & graphs | Medium |
| react-leaflet | React wrapper for Leaflet maps | Small |
| leaflet | Map library | Medium |
| sonner | Toast notifications | Small |
| @types/leaflet | TypeScript types for Leaflet | Tiny (dev) |

---

## 6. Potential Issues & Considerations

### 6.1 Next.js 16 + React 19 Compatibility
- Next.js 16 with React 19 uses the new React compiler by default
- Ensure all client components have proper `'use client'` directives
- React 19 has changes to `ref` handling (no forwardRef needed) — use `ref` as prop directly
- `useFormState` and `useFormStatus` are in `react-dom` in React 19 — prefer react-hook-form which already supports R19

### 6.2 Tailwind CSS v4 Differences
- No `tailwind.config.ts` file — configuration is in `globals.css` via `@theme`
- Custom classes must use `@theme` directive or `@layer` declarations
- Some v3 patterns (e.g., `@apply` in arbitrary places) may behave differently
- Dark mode uses `prefers-color-scheme` by default; class-based toggle requires `@custom-variant dark (&:where(.dark, .dark *));` in globals.css

### 6.3 shadcn/ui + Tailwind v4
- shadcn/ui v2+ supports Tailwind v4 natively
- Run `pnpm dlx shadcn@latest init` — it will detect v4 and configure accordingly
- CSS variables are used for theming (already in globals.css pattern)

### 6.4 React Leaflet Requires Client-Side Rendering
- `react-leaflet` components MUST be client-side only
- Use dynamic import with `ssr: false`:
  ```tsx
  import dynamic from "next/dynamic";
  const LeafletMap = dynamic(() => import("@/components/history/leaflet-map"), { ssr: false });
  ```
- Must import leaflet CSS: `import "leaflet/dist/leaflet.css";`
- Map container needs explicit height set via CSS

### 6.5 Recharts Requires Client-Side Rendering
- Similar to Leaflet, Recharts uses SVG + browser APIs
- Must be a client component
- No dynamic import needed as long as the parent page/component is client-side

### 6.6 Dark Mode Implementation
- For class-based dark mode with Tailwind v4, add to globals.css:
  ```css
  @custom-variant dark (&:where(.dark, .dark *));
  ```
- ThemeProvider must toggle the `dark` class on `<html>` element
- Persist theme choice to localStorage
- Avoid hydration mismatch: use `suppressHydrationWarning` on `<html>` and set initial theme from localStorage in a script tag or useEffect

### 6.7 Dummy Images
- Since there are no real images, use gradient backgrounds or SVG placeholders
- For article thumbnails: use colored gradient divs with overlaid icons
- For map markers: use Leaflet's L.divIcon with custom HTML/CSS
- For webcam dummy: use a gradient animation simulating camera feed

### 6.8 File Organization Anti-patterns to Avoid
- Don't put all components in a single flat `components/` directory
- Don't create giant page files — extract sub-components
- Don't mix dummy data with component logic — keep data files separate
- Don't skip TypeScript types — every prop and data structure should be typed

### 6.9 Performance Considerations
- Use `React.lazy()` or Next.js `dynamic()` for heavy components (charts, maps, games)
- Framer Motion: use `LazyMotion` + `domAnimation` feature set for smaller bundle
- Recharts: import only needed chart components, not the entire library
- Leaflet: dynamic import is essential to avoid SSR issues AND reduce initial bundle

### 6.10 Build & Deployment
- `pnpm build` must complete without errors
- ESLint must pass with the project's flat config
- No `export default` in layouts that don't need client-side rendering
- Ensure all `'use client'` directives are at the top of the file, before imports

### 6.11 Future Backend Integration Points
- React Query is pre-installed — structure data fetching to easily swap dummy data with API calls
- Use custom hooks (`useXxxData`) that currently return dummy data but can be refactored to use React Query `useQuery`
- API response types should match dummy data types in `lib/types.ts`
- Keep Axios configured for base URL swap

---

## Implementation Order Summary

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Phase 0 | ~30 min | Dependencies installed, shadcn initialized, utilities created |
| Phase 1 | ~1 hour | Theme, layout, sidebar, navbar, shared components |
| Phase 2 | ~1 hour | All dummy data files + TypeScript types |
| Phase 3 | ~1.5 hours | Complete home page with all sections |
| Phase 4 | ~2 hours | Detection section (4 pages) |
| Phase 5 | ~1.5 hours | Profile section (4 pages) |
| Phase 6 | ~2 hours | History section (4 pages with charts + maps) |
| Phase 7 | ~2 hours | Quest section (3 pages with games) |
| Phase 8 | ~1 hour | Animations, responsive polish, dark mode pass |
| Phase 9 | ~30 min | Build validation, lint fixes, manual testing |
| **Total** | **~12 hours** | **Complete Drive Save dashboard** |
