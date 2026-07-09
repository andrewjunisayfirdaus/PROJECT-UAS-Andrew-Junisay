"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconMoon,
  IconCamera,
  IconBell,
  IconMap,
  IconHeartbeat,
  IconArrowRight,
  IconRocket,
} from "@tabler/icons-react";

const features = [
  { icon: IconMoon, title: "Atur Waktu Tidur", desc: "Monitor pola tidur Anda", href: "/detection/sleep-time", color: "text-blue-500" },
  { icon: IconCamera, title: "Face Monitor", desc: "Deteksi wajah real-time", href: "/detection/face-monitor", color: "text-purple-500" },
  { icon: IconBell, title: "Voice Reminder", desc: "Pengingat cerdas", href: "/detection/voice-reminder", color: "text-yellow-500" },
  { icon: IconMap, title: "Maps", desc: "Peta lokasi", href: "/history/maps", color: "text-cyan-500" },
  { icon: IconHeartbeat, title: "Smartwatch", desc: "Monitor kesehatan", href: "/detection/smartwatch", color: "text-red-500" },
];

const stats = [
  { value: "10K+", label: "Pengguna Aktif" },
  { value: "50K+", label: "Alert Terkirim" },
  { value: "99.2%", label: "Akurasi Deteksi" },
  { value: "0", label: "Kecelakaan" },
];

const steps = [
  { num: 1, title: "Atur Jadwal Tidur", desc: "Tentukan waktu tidur dan bangun Anda" },
  { num: 2, title: "Monitor Wajah", desc: "Pantau status mata dan menguap saat mengemudi" },
  { num: 3, title: "Terima Peringatan", desc: "Dapatkan notifikasi jika mengantuk" },
  { num: 4, title: "Lihat Riwayat", desc: "Pantau histori perjalanan Anda" },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Drive Safe,{" "}
              <span className="text-gradient">Stay Alert</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              Sistem deteksi kantuk cerdas yang membantu Anda tetap waspada saat berkendara.
              Pantau pola tidur, uji kesiapan, dan dapatkan peringatan real-time.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/profile/data">
                <Button size="lg" className="gradient-primary text-white">
                  <IconRocket size={18} className="mr-2" />
                  Mulai Deteksi
                </Button>
              </Link>
              <Link href="/quest/guide">
                <Button size="lg" variant="outline">
                  Pelajari Lebih Lanjut
                  <IconArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">Cara Kerja</h2>
          <p className="text-muted-foreground mt-2">4 langkah sederhana untuk berkendara lebih aman</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="glass-card p-6 text-center h-full">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">Fitur Lengkap</h2>
          <p className="text-muted-foreground mt-2">Semua yang Anda butuhkan untuk berkendara aman</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={feature.href}>
                  <Card className="glass-card h-full hover:scale-[1.02] transition-transform cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`p-2 rounded-lg bg-primary/10 w-fit mb-4`}>
                        <Icon size={24} className={feature.color} />
                      </div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gradient-primary rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Siap Berkendara Lebih Aman?</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Mulai gunakan Drive Save sekarang dan jadikan perjalanan Anda lebih aman.
          </p>
          <Link href="/detection">
            <Button size="lg" variant="secondary">
              Mulai Sekarang
              <IconArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
