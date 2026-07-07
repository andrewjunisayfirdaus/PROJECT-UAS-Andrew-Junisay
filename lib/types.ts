export interface SleepRecord {
  id: string;
  date: string;
  sleepTime: string;
  wakeTime: string;
  duration: number;
  quality: "Excellent" | "Good" | "Fair" | "Poor";
}

export interface FitTestResult {
  reactionTime: number;
  focusScore: number;
  sleepinessLevel: number;
  totalScore: number;
  category: "Aman" | "Waspada" | "Tidak Aman";
}

export interface FaceMonitorState {
  eyeStatus: "Open" | "Closed";
  blinkCount: number;
  yawnCount: number;
  headPosition: "Center" | "Left" | "Right" | "Down";
  driverStatus: "Alert" | "Drowsy" | "Critical";
}

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: "Laki-laki" | "Perempuan";
  bloodType: "A" | "B" | "AB" | "O";
  phone: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface SmartwatchData {
  heartRate: number;
  heartRateHistory: { time: string; value: number }[];
  sleepScore: number;
  steps: number;
  stepsGoal: number;
  stressLevel: number;
  battery: number;
  calories: number;
}

export interface GuideArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  thumbnail: string;
}

export interface TrafficDataPoint {
  day: string;
  trips: number;
  hours: number;
  drowsiness: number;
}

export interface MapMarker {
  id: string;
  name: string;
  type: "user" | "rest-area" | "hospital" | "gas-station";
  lat: number;
  lng: number;
  address: string;
}

export interface VulnerableTimeData {
  hour: number;
  day: string;
  level: number;
}

export interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "stable";
  trendValue: string;
  icon: string;
}

export interface GameScore {
  id: string;
  name: string;
  game: "memory" | "reaction";
  score: number;
  date: string;
}

export interface QuestChallenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  status: "active" | "completed" | "locked";
  reward: string;
  type: "daily" | "weekly";
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

export interface MicrosleepFact {
  id: string;
  title: string;
  description: string;
  category: "Science" | "Safety" | "Health" | "Tips";
  thumbnail: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface BluetoothDeviceState {
  name: string;
  heartRate: number;
  batteryLevel: number;
  isConnected: boolean;
  isSupported: boolean;
  error: string | null;
  heartRateHistory: { time: string; value: number }[];
}
