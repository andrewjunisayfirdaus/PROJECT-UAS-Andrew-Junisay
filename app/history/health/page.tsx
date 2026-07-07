"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { BluetoothConnection } from "@/components/shared/bluetooth-connection";
import { useBluetooth } from "@/context/bluetooth-provider";
import { healthData } from "@/dummy";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { IconHeartbeat, IconMoon, IconBattery, IconBrain, IconDroplet } from "@tabler/icons-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  IconHeartbeat, IconMoon, IconBattery, IconBrain, IconDroplet,
};

const trendColor = { up: "text-green-500", down: "text-red-500", stable: "text-muted-foreground" };
const trendIcon = { up: "↑", down: "↓", stable: "→" };

const defaultHeartRateData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: Math.floor(60 + Math.random() * 25),
}));

export default function HealthPage() {
  const { heartRate, heartRateHistory, isConnected } = useBluetooth();

  const displayMetrics = healthData.map((metric) => {
    if (metric.name === "Heart Rate" && isConnected && heartRate > 0) {
      const hrTrend = heartRate < 60 ? "down" : heartRate > 100 ? "up" : "stable";
      const hrTrendValue = heartRate < 60 ? "Rendah" : heartRate > 100 ? "Tinggi" : "Normal";
      return {
        ...metric,
        value: heartRate,
        trend: hrTrend as "up" | "down" | "stable",
        trendValue: hrTrendValue,
      };
    }
    return metric;
  });

  const chartData = isConnected && heartRateHistory.length > 0
    ? heartRateHistory
    : defaultHeartRateData;

  return (
    <div>
      <PageHeader
        title="Health"
        description="Monitor data kesehatan Anda"
        breadcrumbs={[{ label: "History", href: "/history" }, { label: "Health" }]}
      />

      <div className="mb-6">
        <BluetoothConnection />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayMetrics.map((metric) => {
          const Icon = iconMap[metric.icon] || IconHeartbeat;
          return (
            <Card key={metric.name} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <span className={`text-sm font-medium ${trendColor[metric.trend]}`}>
                    {trendIcon[metric.trend]} {metric.trendValue}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{metric.name}</p>
                <p className="text-3xl font-bold mt-1">
                  {metric.value}<span className="text-lg text-muted-foreground ml-1">{metric.unit}</span>
                </p>
                {metric.unit === "%" && (
                  <Progress value={metric.value} className="mt-3" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconHeartbeat size={20} className="text-red-500" />
            Heart Rate Trend
            {isConnected && (
              <span className="text-xs font-normal text-green-500 ml-2">
                ● Live
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="time" tick={{ fontSize: 12 }} interval={2} />
                <YAxis tick={{ fontSize: 12 }} domain={[50, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="oklch(0.65 0.19 155)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {!isConnected && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Hubungkan smartwatch untuk melihat data real-time
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
