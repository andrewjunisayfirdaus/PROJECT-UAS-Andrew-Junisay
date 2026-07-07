"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { microsleepFacts } from "@/dummy";
import { IconBulb, IconX } from "@tabler/icons-react";

export default function FactsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFact, setSelectedFact] = useState<string | null>(null);

  const categories = ["all", "Science", "Safety", "Health", "Tips"];
  const filtered = selectedCategory === "all"
    ? microsleepFacts
    : microsleepFacts.filter((f) => f.category === selectedCategory);

  const fact = microsleepFacts.find((f) => f.id === selectedFact);

  return (
    <div>
      <PageHeader
        title="Fakta Microsleep"
        description="Pelajari fakta penting tentang microsleep"
        breadcrumbs={[{ label: "Quest", href: "/quest" }, { label: "Fakta Microsleep" }]}
      />

      {fact && (
        <Card className="glass-card mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{fact.title}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setSelectedFact(null)}>
              <IconX size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            <Badge className="mb-4">{fact.category}</Badge>
            <p className="text-muted-foreground leading-relaxed">{fact.description}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === "all" ? "Semua" : cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <Card key={item.id} className="glass-card hover:scale-[1.02] transition-transform cursor-pointer">
            <CardContent className="p-6">
              <div className="h-24 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                <IconBulb size={32} className="text-primary/50" />
              </div>
              <Badge className="mb-2">{item.category}</Badge>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
              <Button variant="outline" size="sm" onClick={() => setSelectedFact(item.id)}>
                Detail
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
