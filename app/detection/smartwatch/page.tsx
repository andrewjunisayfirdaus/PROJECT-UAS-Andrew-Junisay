"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { BluetoothConnection } from "@/components/shared/bluetooth-connection";
import { CarConnection } from "@/components/shared/car-connection";
import { useBluetooth } from "@/context/bluetooth-provider";
import { useCar } from "@/context/car-provider";
import { smartwatchData, healthData } from "@/dummy";
import {
  IconHeartbeat,
  IconMoon,
  IconShoe,
  IconBrain,
  IconBattery,
  IconFlame,
  IconDroplet,
  IconGauge,
  IconEngine,
  IconThermometer,
  IconGasStation,
  IconRuler,
  IconRoute,
} from "@tabler/icons-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  IconHeartbeat, IconMoon, IconBattery, IconBrain, IconDroplet,
};

const stats = [
  { label: "Heart Rate", value: `${smartwatchData.heartRate} bpm`, icon: IconHeartbeat, color: "text-red-500" },
  { label: "Sleep Score", value: `${smartwatchData.sleepScore}/100`, icon: IconMoon, color: "text-blue-500" },
  { label: "Steps", value: `${smartwatchData.steps.toLocaleString()}`, icon: IconShoe, color: "text-green-500" },
  { label: "Stress", value: `${smartwatchData.stressLevel}/10`, icon: IconBrain, color: "text-yellow-500" },
  { label: "Battery", value: `${smartwatchData.battery}%`, icon: IconBattery, color: "text-emerald-500" },
  { label: "Calories", value: `${smartwatchData.calories}`, icon: IconFlame, color: "text-orange-500" },
];

const trendColor = { up: "text-green-500", down: "text-red-500", stable: "text-muted-foreground" };
const trendIcon = { up: "↑", down: "↓", stable: "→" };

const defaultHeartRateData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: Math.floor(60 + Math.random() * 25),
}));

export default function SmartwatchPage() {
  const { heartRate, heartRateHistory, isConnected } = useBluetooth();
  const { isConnected: isCarConnected, carData } = useCar();

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
        title="Smartwatch & Mobil"
        description="Data kesehatan dari smartwatch dan status kendaraan"
        breadcrumbs={[{ label: "Detection", href: "/detection" }, { label: "Smartwatch" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BluetoothConnection />
        <CarConnection />
      </div>

      {/* Car Data Section */}
      {isCarConnected && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <IconEngine size={20} className="text-primary" />
            Status Kendaraan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <IconGauge size={24} className="mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{carData.speed}</p>
                <p className="text-xs text-muted-foreground mt-1">km/h</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <IconEngine size={24} className="mx-auto mb-2 text-purple-500" />
                <p className="text-2xl font-bold">{carData.rpm}</p>
                <p className="text-xs text-muted-foreground mt-1">RPM</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <IconThermometer size={24} className="mx-auto mb-2 text-orange-500" />
                <p className="text-2xl font-bold">{carData.engineTemp}°C</p>
                <p className="text-xs text-muted-foreground mt-1">Suhu Mesin</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <IconGasStation size={24} className="mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold">{Math.round(carData.fuelLevel)}%</p>
                <p className="text-xs text-muted-foreground mt-1">Bahan Bakar</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <IconRuler size={24} className="mx-auto mb-2 text-cyan-500" />
                <p className="text-2xl font-bold">{carData.odometer.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">km Total</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <IconRoute size={24} className="mx-auto mb-2 text-yellow-500" />
                <p className="text-2xl font-bold">{carData.tripDistance.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground mt-1">km Trip</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Smartwatch Stats */}
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

      {/* Health Metrics */}
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconHeartbeat size={20} className="text-red-500" />
              Heart Rate 24 Jam
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
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} interval={3} />
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
            {isCarConnected && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fuel Level</span>
                  <span>{Math.round(carData.fuelLevel)}%</span>
                </div>
                <Progress value={carData.fuelLevel} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
