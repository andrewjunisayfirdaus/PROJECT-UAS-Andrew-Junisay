"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { vulnerableData } from "@/dummy";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { StatCard } from "@/components/shared/stat-card";
import { IconClock, IconCar, IconAlertTriangle, IconCheck } from "@tabler/icons-react";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const getHeatColor = (level: number) => {
  if (level < 30) return "bg-green-500/30";
  if (level < 60) return "bg-yellow-500/30";
  return "bg-red-500/30";
};

export default function VulnerablePage() {
  return (
    <div>
      <PageHeader
        title="Vulnerable Time"
        description="Identifikasi waktu rawan kantuk saat berkendara"
        breadcrumbs={[{ label: "History", href: "/history" }, { label: "Vulnerable Time" }]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Perjalanan" value={vulnerableData.weeklyStats.totalTrips} icon={<IconCar size={20} />} />
        <StatCard title="Rata-rata Kantuk" value={`${vulnerableData.weeklyStats.avgDrowsiness}%`} icon={<IconAlertTriangle size={20} />} />
        <StatCard title="Alert Diterima" value={vulnerableData.weeklyStats.alertsReceived} icon={<IconClock size={20} />} />
        <StatCard title="Perjalanan Aman" value={vulnerableData.weeklyStats.safeTrips} icon={<IconCheck size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Heatmap Waktu Rawan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="p-1 text-left"></th>
                    {Array.from({ length: 24 }, (_, i) => (
                      <th key={i} className="p-1 text-center">{i}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day}>
                      <td className="p-1 font-medium">{day.slice(0, 3)}</td>
                      {Array.from({ length: 24 }, (_, hour) => {
                        const data = vulnerableData.heatmap.find((d) => d.day === day && d.hour === hour);
                        return (
                          <td key={hour} className="p-0.5">
                            <div className={`w-3 h-3 rounded-sm ${getHeatColor(data?.level || 0)}`} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-green-500/30" /> Aman</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-yellow-500/30" /> Waspada</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-red-500/30" /> Rawan</div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Grafik Jam Rawan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vulnerableData.peakHours}>
                  <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="incidents" fill="oklch(0.75 0.15 80)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
