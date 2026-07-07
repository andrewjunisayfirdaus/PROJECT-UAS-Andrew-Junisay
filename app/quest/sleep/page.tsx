"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { questChallenges, badges } from "@/dummy";
import { IconCalendarTime, IconTrophy, IconLock, IconCheck, IconStar } from "@tabler/icons-react";

export default function SleepPage() {
  const totalXP = questChallenges
    .filter((c) => c.status === "completed")
    .reduce((acc, c) => acc + parseInt(c.reward), 0);

  return (
    <div>
      <PageHeader
        title="Sleep Schedule"
        description="Tantangan dan pencapaian tidur Anda"
        breadcrumbs={[{ label: "Quest", href: "/quest" }, { label: "Sleep Schedule" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <IconStar size={32} className="mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{totalXP} XP</p>
            <p className="text-sm text-muted-foreground">Total XP</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <IconTrophy size={32} className="mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{badges.filter((b) => b.earned).length}/{badges.length}</p>
            <p className="text-sm text-muted-foreground">Badge</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <IconCalendarTime size={32} className="mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Streak Hari</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Challenges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questChallenges.map((challenge) => (
              <div key={challenge.id} className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {challenge.status === "completed" ? (
                      <IconCheck size={16} className="text-green-500" />
                    ) : challenge.status === "locked" ? (
                      <IconLock size={16} className="text-muted-foreground" />
                    ) : (
                      <IconCalendarTime size={16} className="text-primary" />
                    )}
                    <span className="font-medium text-sm">{challenge.title}</span>
                  </div>
                  <Badge variant={challenge.status === "completed" ? "default" : "secondary"}>
                    {challenge.reward}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                {challenge.status !== "locked" && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{challenge.progress}/{challenge.target}</span>
                      <span>{Math.round((challenge.progress / challenge.target) * 100)}%</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.target) * 100} />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl text-center transition-all ${
                    badge.earned
                      ? "bg-primary/10 hover:scale-105"
                      : "bg-muted/30 opacity-50"
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                    badge.earned ? "gradient-primary" : "bg-muted"
                  }`}>
                    <IconTrophy size={24} className={badge.earned ? "text-white" : "text-muted-foreground"} />
                  </div>
                  <p className="text-sm font-medium">{badge.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  {badge.earned && <Badge className="mt-2" variant="default">Earned</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
