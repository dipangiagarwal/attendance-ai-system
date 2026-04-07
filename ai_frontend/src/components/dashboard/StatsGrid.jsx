'use client';
import StatCard from './StatCard';
import { Users, BookOpen, CalendarCheck, Camera, Cpu } from 'lucide-react';

const STATS = [
  {
    id: 1,
    title: 'Total Students',
    value: '2,847',
    trend: '+12%',
    up: true,
    icon: Users,
    gradient: 'from-indigo-500/20 to-indigo-600/5',
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
    glowColor: 'hover:shadow-indigo-500/20',
    borderHover: 'hover:border-indigo-500/30',
  },
  {
    id: 2,
    title: 'Active Batches',
    value: '34',
    trend: '+3',
    up: true,
    icon: BookOpen,
    gradient: 'from-violet-500/20 to-violet-600/5',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
    glowColor: 'hover:shadow-violet-500/20',
    borderHover: 'hover:border-violet-500/30',
  },
  {
    id: 3,
    title: "Today's Attendance",
    value: '91.4%',
    trend: '+2.1%',
    up: true,
    icon: CalendarCheck,
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    glowColor: 'hover:shadow-emerald-500/20',
    borderHover: 'hover:border-emerald-500/30',
  },
  {
    id: 4,
    title: 'Cameras Online',
    value: '18/20',
    trend: '-1',
    up: false,
    icon: Camera,
    gradient: 'from-sky-500/20 to-sky-600/5',
    iconBg: 'bg-sky-500/15',
    iconColor: 'text-sky-400',
    glowColor: 'hover:shadow-sky-500/20',
    borderHover: 'hover:border-sky-500/30',
  },
  {
    id: 5,
    title: 'Embeddings Processed',
    value: '1.2M',
    trend: '+48K',
    up: true,
    icon: Cpu,
    gradient: 'from-fuchsia-500/20 to-fuchsia-600/5',
    iconBg: 'bg-fuchsia-500/15',
    iconColor: 'text-fuchsia-400',
    glowColor: 'hover:shadow-fuchsia-500/20',
    borderHover: 'hover:border-fuchsia-500/30',
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5  py-2 mb-2">
      {STATS.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}