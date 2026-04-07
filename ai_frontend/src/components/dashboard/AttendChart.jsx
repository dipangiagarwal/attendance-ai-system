'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';

// ✅ register once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function AttendChart() {
  const data = useMemo(() => ({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Attendance',
        data: [78, 85, 91, 76, 94],
        fill: true,
        tension: 0.4,
        borderColor: '#818cf8',
        backgroundColor: 'rgba(99,102,241,0.2)',
        pointBackgroundColor: '#a5b4fc',
      },
    ],
  }), []);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false, // 🔥 important
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
      y: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.05)' },
        min: 60,
        max: 100,
      },
    },
  }), []);

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#0a0a17]/90 p-7">
      
      <p className="text-white text-lg font-semibold mb-4">
        Attendance Analytics
      </p>

      {/* ✅ FIXED HEIGHT */}
      <div className="w-full h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}