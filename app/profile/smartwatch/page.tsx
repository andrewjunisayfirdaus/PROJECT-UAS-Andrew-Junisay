"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { smartwatchData } from "@/dummy";
import { IconHeartbeat, IconMoon, IconShoe, IconBrain, IconBattery, IconFlame } from "@tabler/icons-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Heart Rate", value: `${smartwatchData.heartRate} bpm`, icon: IconHeartbeat, color: "text-red-500" },
  { label: "Sleep Score", value: `${smartwatchData.sleepScore}/100`, icon: IconMoon, color: "text-blue-500" },
  { label: "Steps", value: `${smartwatchData.steps.toLocaleString()}`, icon: IconShoe, color: "text-green-500" },
  { label: "Stress", value: `${smartwatchData.stressLevel}/10`, icon: IconBrain, color: "text-yellow-500" },
  { label: "Battery", value: `${smartwatchData.battery}%`, icon: IconBattery, color: "text-emerald-500" },
  { label: "Calories", value: `${smartwatchData.calories}`, icon: IconFlame, color: "text-orange-500" },
];

export default function SmartwatchPage() {
  return (
    <div>
      <PageHeader
        title="Smartwatch"
        description="Data kesehatan dari smartwatch Anda"
        breadcrumbs={[{ label: "Profile", href: "/profile" }, { label: "Smartwatch" }]}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="glass-card">
              <CardContent className="p-4 text-center">
                <Icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconHeartbeat size={20} className="text-red-500" />
              Heart Rate 24 Jam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={smartwatchData.heartRateHistory}>
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} interval={3} />
                  <YAxis tick={{ fontSize: 12 }} domain={[50, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="oklch(0.65 0.19 155)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Detail Statistik</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Steps Progress</span>
                <span>{smartwatchData.steps}/{smartwatchData.stepsGoal}</span>
              </div>
              <Progress value={(smartwatchData.steps / smartwatchData.stepsGoal) * 100} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Sleep Score</span>
                <span>{smartwatchData.sleepScore}%</span>
              </div>
              <Progress value={smartwatchData.sleepScore} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Battery</span>
                <span>{smartwatchData.battery}%</span>
              </div>
              <Progress value={smartwatchData.battery} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
