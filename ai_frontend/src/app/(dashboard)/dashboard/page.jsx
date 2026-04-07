import StatsGrid from '@/components/dashboard/StatsGrid';
import AttendanceFeed from '@/components/dashboard/AttendanceFeed';
import CameraGrid from '@/components/dashboard/CameraGrid';
import EmbeddingSection from '@/components/dashboard/EmbeddingSection';
import NotificationsPanel from '@/components/dashboard/NotificationsPanel';
import QuickActions from '@/components/dashboard/QuickActions';
import SystemHealth from '@/components/dashboard/SystemHealth';
import AttendChart from '@/components/dashboard/AttendChart';


export default function DashboardPage() {
  return (
    <div className="bg-[#000000] relative  pb-20 lg:pb-2">
      <div className="fixed inset-0 bg-[radial-gradient(#1e293730_1px,transparent_1px)] bg-size-[50px_50px] pointer-events-none" />
      <div className="fixed inset-0 bg-linear-to-br from-indigo-950/30 via-transparent to-violet-950/20 pointer-events-none" />

      <div className="relative p-6 lg:p-10 max-w-400 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border border-white/[0.07] rounded-2xl p-5 bg-[#0d0d1a]/80 backdrop-blur-sm">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-white">AI Attendance Dashboard</h1>
            <p className="text-slate-400 mt-1 flex items-center gap-2">
              <span className="text-emerald-400">●</span> Live • Friday, 27 March 2026
            </p>
          </div>

          <div className="px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            All Systems Operational
          </div>
        </div>

        <StatsGrid />
        <SystemHealth />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <AttendChart/>
          </div>
          <AttendanceFeed />
        </div>

        <div className="mt-6">
          <CameraGrid />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 ">
          <EmbeddingSection />
          <NotificationsPanel />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
