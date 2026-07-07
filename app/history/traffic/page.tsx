"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { trafficData } from "@/dummy";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["oklch(0.65 0.19 155)", "oklch(0.65 0.15 250)", "oklch(0.75 0.15 80)", "oklch(0.6 0.2 310)"];

const pieData = [
  { name: "Work", value: 45 },
  { name: "Personal", value: 30 },
  { name: "Long Trip", value: 15 },
  { name: "Other", value: 10 },
];

export default function TrafficPage() {
  return (
    <div>
      <PageHeader
        title="Grafik Traffic"
        description="Analisis data perjalanan dan aktivitas berkendara"
        breadcrumbs={[{ label: "History", href: "/history" }, { label: "Traffic" }]}
      />

      <Tabs defaultValue="trips" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="trips">Jumlah Perjalanan</TabsTrigger>
          <TabsTrigger value="hours">Jam Berkendara</TabsTrigger>
          <TabsTrigger value="drowsiness">Tingkat Kantuk</TabsTrigger>
          <TabsTrigger value="weekly">Aktivitas Mingguan</TabsTrigger>
        </TabsList>

        <TabsContent value="trips">
          <Card className="glass-card">
            <CardHeader><CardTitle>Jumlah Perjalanan per Hari</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="trips" fill="oklch(0.65 0.19 155)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours">
          <Card className="glass-card">
            <CardHeader><CardTitle>Jam Berkendara per Hari</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="oklch(0.65 0.15 250)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drowsiness">
          <Card className="glass-card">
            <CardHeader><CardTitle>Tingkat Kantuk Mingguan</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="drowsiness" stroke="oklch(0.75 0.15 80)" fill="oklch(0.75 0.15 80)" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader><CardTitle>Aktivitas Mingguan</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficData}>
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="trips" stroke="oklch(0.65 0.19 155)" strokeWidth={2} />
                      <Line type="monotone" dataKey="hours" stroke="oklch(0.65 0.15 250)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader><CardTitle>Breakdown Perjalanan</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
