"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/shared/page-header";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { defaultProfile } from "@/dummy";
import { IconUserCircle, IconDeviceFloppy, IconEdit, IconRefresh } from "@tabler/icons-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  age: z.number().min(10, "Umur minimal 10 tahun").max(120, "Umur maksimal 120 tahun"),
  gender: z.enum(["Laki-laki", "Perempuan"]),
  bloodType: z.enum(["A", "B", "AB", "O"]),
  phone: z.string().min(10, "Nomor HP minimal 10 digit"),
});

type FormData = z.infer<typeof schema>;

export default function DataDiriPage() {
  const { value: savedProfile, setValue } = useLocalStorage("user-profile", defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: savedProfile,
  });

  const onSubmit = (data: FormData) => {
    setValue(data);
    setIsEditing(false);
    toast.success("Profil berhasil disimpan!");
  };

  const handleReset = () => {
    form.reset(defaultProfile);
    setValue(defaultProfile);
    toast.info("Profil direset ke default");
  };

  return (
    <div>
      <PageHeader
        title="Data Diri"
        description="Kelola informasi profil Anda"
        breadcrumbs={[{ label: "Profile", href: "/profile" }, { label: "Data Diri" }]}
      />

      <Card className="glass-card max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconUserCircle size={20} />
            Formulir Profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  disabled={!isEditing}
                  className="mt-1"
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  disabled={!isEditing}
                  className="mt-1"
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="age">Umur</Label>
                <Input
                  id="age"
                  type="number"
                  {...form.register("age", { valueAsNumber: true })}
                  disabled={!isEditing}
                  className="mt-1"
                />
                {form.formState.errors.age && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.age.message}</p>
                )}
              </div>
              <div>
                <Label>Jenis Kelamin</Label>
                <Select
                  value={form.watch("gender")}
                  onValueChange={(v) => form.setValue("gender", v as "Laki-laki" | "Perempuan")}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Golongan Darah</Label>
                <Select
                  value={form.watch("bloodType")}
                  onValueChange={(v) => form.setValue("bloodType", v as "A" | "B" | "AB" | "O")}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="AB">AB</SelectItem>
                    <SelectItem value="O">O</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="phone">Nomor HP</Label>
                <Input
                  id="phone"
                  {...form.register("phone")}
                  disabled={!isEditing}
                  className="mt-1"
                />
                {form.formState.errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={!isEditing} className="gradient-primary text-white">
                <IconDeviceFloppy size={16} className="mr-2" />
                Simpan
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(!isEditing)}>
                <IconEdit size={16} className="mr-2" />
                {isEditing ? "Batal" : "Edit"}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                <IconRefresh size={16} className="mr-2" />
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
