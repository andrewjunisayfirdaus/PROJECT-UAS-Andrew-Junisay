"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { trafficData, vulnerableData } from "@/dummy";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { IconCar, IconAlertTriangle, IconCheck, IconClock } from "@tabler/icons-react";

const totalTrips = trafficData.reduce((a, b) => a + b.trips, 0);
const totalHours = trafficData.reduce((a, b) => a + b.hours, 0);
const avgDrowsiness = Math.round(trafficData.reduce((a, b) => a + b.drowsiness, 0) / trafficData.length);
const safeTrips = vulnerableData.weeklyStats.safeTrips;

const getRiskColor = (level: number) => {
  if (level < 30) return "text-green-500";
  if (level < 60) return "text-yellow-500";
  return "text-red-500";
};

const getRiskBg = (level: number) => {
  if (level < 30) return "bg-green-500";
  if (level < 60) return "bg-yellow-500";
  return "bg-red-500";
};

export default function TrafficPage() {
  const [activeTab, setActiveTab] = useState<"weekly" | "hourly">("weekly");

  const mostDangerousDay = [...trafficData].sort((a, b) => b.drowsiness - a.drowsiness)[0];
  const mostDangerousHour = [...vulnerableData.peakHours].sort((a, b) => b.incidents - a.incidents)[0];

  return (
    <div>
      <PageHeader
        title="Traffic & Vulnerable"
        description="Grafik traffic dan analisis titik rawan perjalanan"
        breadcrumbs={[{ label: "History", href: "/history" }, { label: "Traffic" }]}
      />

      {/* Ringkasan Singkat */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <IconCar size={24} className="mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{totalTrips}</p>
            <p className="text-xs text-muted-foreground">Total Perjalanan</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <IconClock size={24} className="mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">{totalHours}j</p>
            <p className="text-xs text-muted-foreground">Jam Berkendara</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <IconAlertTriangle size={24} className="mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{avgDrowsiness}%</p>
            <p className="text-xs text-muted-foreground">Rata-rata Kantuk</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <IconCheck size={24} className="mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{safeTrips}</p>
            <p className="text-xs text-muted-foreground">Perjalanan Aman</p>
          </CardContent>
        </Card>
      </div>

      {/* Peringatan Penting */}
      <Card className="glass-card mb-6 border-yellow-500/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-500/10">
              <IconAlertTriangle size={24} className="text-yellow-500" />
            </div>
            <div>
              <p className="font-medium">Hari Paling Rawan: {mostDangerousDay.day}</p>
              <p className="text-sm text-muted-foreground">Jam Paling Rawan: {mostDangerousHour.hour} ({mostDangerousHour.incidents} insiden)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("weekly")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "weekly"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          Mingguan
        </button>
        <button
          onClick={() => setActiveTab("hourly")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "hourly"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          Per Jam
        </button>
      </div>

      {activeTab === "weekly" ? (
        <>
          {/* Grafik Mingguan */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-4">Perjalanan & Jam Berkendara</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="trips" name="Perjalanan" fill="oklch(0.65 0.19 155)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="hours" name="Jam" fill="oklch(0.65 0.15 250)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Grafik Jam Rawan */}
          <Card className="glass-card mb-6">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-4">Insiden per Jam</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vulnerableData.peakHours}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="incidents" name="Insiden" fill="oklch(0.7 0.18 25)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Heatmap Sederhana */}
          <Card className="glass-card mb-6">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-4">Heatmap Risiko</h3>
              <div className="grid grid-cols-8 gap-1 mb-3">
                <div />
                {["00-03", "03-06", "06-09", "09-12", "12-15", "15-18", "18-21", "21-00"].map((h) => (
                  <div key={h} className="text-[10px] text-muted-foreground text-center">{h}</div>
                ))}
              </div>
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day, i) => (
                <div key={day} className="grid grid-cols-8 gap-1 mb-1">
                  <div className="text-[10px] text-muted-foreground flex items-center">{day}</div>
                  {Array.from({ length: 8 }).map((_, j) => {
                    const level = Math.floor(Math.random() * 100);
                    return (
                      <div
                        key={j}
                        className={`h-6 rounded ${getRiskBg(level)} opacity-60`}
                        title={`${day} - Risiko: ${level}%`}
                      />
                    );
                  })}
                </div>
              ))}
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500" /><span className="text-[10px] text-muted-foreground">Aman</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-500" /><span className="text-[10px] text-muted-foreground">Waspada</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500" /><span className="text-[10px] text-muted-foreground">Bahaya</span></div>
              </div>
            </CardContent>
          </Card>

          {/* List Jam Rawan */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-4">Jam Paling Rawan</h3>
              <div className="space-y-2">
                {vulnerableData.peakHours
                  .sort((a, b) => b.incidents - a.incidents)
                  .slice(0, 4)
                  .map((item) => (
                    <div key={item.hour} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm font-medium">{item.hour}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getRiskBg(item.incidents)}`}
                            style={{ width: `${(item.incidents / 70) * 100}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getRiskColor(item.incidents)}`}>
                          {item.incidents}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
