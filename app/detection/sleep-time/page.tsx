"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { sleepData } from "@/dummy";
import { IconClock, IconMoon, IconSun, IconCalendar } from "@tabler/icons-react";
import { toast } from "sonner";

export default function SleepTimePage() {
  const [sleepTime, setSleepTime] = useState("22:30");
  const [wakeTime, setWakeTime] = useState("06:30");
  const [duration, setDuration] = useState<number | null>(null);

  const calculateDuration = () => {
    const [sh, sm] = sleepTime.split(":").map(Number);
    const [wh, wm] = wakeTime.split(":").map(Number);
    const sleepMinutes = sh * 60 + sm;
    let wakeMinutes = wh * 60 + wm;
    if (wakeMinutes <= sleepMinutes) wakeMinutes += 24 * 60;
    const diff = (wakeMinutes - sleepMinutes) / 60;
    setDuration(diff);
    toast.success(`Durasi tidur: ${diff.toFixed(1)} jam`);
  };

  const qualityColor = (q: string) => {
    switch (q) {
      case "Excellent": return "text-green-500";
      case "Good": return "text-blue-500";
      case "Fair": return "text-yellow-500";
      case "Poor": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div>
      <PageHeader
        title="Atur Waktu Tidur"
        description="Monitor dan atur pola tidur Anda"
        breadcrumbs={[{ label: "Detection", href: "/detection" }, { label: "Sleep Time" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Rata-rata Tidur" value="7.1 jam" icon={<IconMoon size={20} />} trend="up" trendValue="+0.5 jam" />
        <StatCard title="Kualitas Tidur" value="Good" icon={<IconSun size={20} />} description="Minggu ini" />
        <StatCard title="Total Hari" value="7 hari" icon={<IconCalendar size={20} />} description="Data tercatat" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconClock size={20} />
              Hitung Durasi Tidur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Jam Tidur</Label>
                <Input
                  type="time"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Jam Bangun</Label>
                <Input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <Button onClick={calculateDuration} className="w-full gradient-primary text-white">
              Hitung Durasi
            </Button>
            {duration !== null && (
              <div className="p-4 rounded-lg bg-primary/10 text-center">
                <p className="text-sm text-muted-foreground">Durasi Tidur</p>
                <p className="text-3xl font-bold">{duration.toFixed(1)} jam</p>
                <Progress value={(duration / 8) * 100} className="mt-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  Target: 8 jam ({Math.round((duration / 8) * 100)}% tercapai)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Sleep History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sleepData.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{record.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {record.sleepTime} - {record.wakeTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{record.duration} jam</p>
                    <p className={`text-xs font-medium ${qualityColor(record.quality)}`}>
                      {record.quality}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
