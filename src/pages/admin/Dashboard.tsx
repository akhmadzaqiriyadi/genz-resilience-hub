// src/pages/admin/Dashboard.tsx

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, FileText, MailWarning } from "lucide-react";
import { DailyTrendChart } from "@/components/admin/charts/DailyTrendChart"; // <-- Impor chart
import { PersonaDistributionChart } from "@/components/admin/charts/PersonaDistributionChart"; // <-- Impor chart

const Dashboard = () => {
  const [stats, setStats] = useState<{ totalUsers: number | null; testsTaken: number | null; unverifiedUsers: number | null; }>({ totalUsers: null, testsTaken: null, unverifiedUsers: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [usersCount, testsCount, unverifiedCount] = await Promise.all([
          supabase.rpc('get_users_count', { search_term: '' }),
          supabase.rpc('get_tests_taken_count'),
          supabase.rpc('get_unverified_users_count'),
        ]);

        if (usersCount.error) throw usersCount.error;
        if (testsCount.error) throw testsCount.error;
        if (unverifiedCount.error) throw unverifiedCount.error;
        
        setStats({
          totalUsers: usersCount.data,
          testsTaken: testsCount.data,
          unverifiedUsers: unverifiedCount.data,
        });
      } catch (error) {
        console.error("Gagal mengambil statistik dashboard:", error);
        setStats({ totalUsers: 0, testsTaken: 0, unverifiedUsers: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Kartu Statistik Utama */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Pengguna</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent>{loading ? <Skeleton className="h-8 w-24 mt-1" /> : <div className="text-2xl font-bold">{stats.totalUsers?.toLocaleString() ?? '0'}</div>}<p className="text-xs text-muted-foreground">Jumlah pengguna terdaftar saat ini</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Tes Dikerjakan</CardTitle><FileText className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent>{loading ? <Skeleton className="h-8 w-24 mt-1" /> : <div className="text-2xl font-bold">{stats.testsTaken?.toLocaleString() ?? '0'}</div>}<p className="text-xs text-muted-foreground">Total semua tes yang telah diselesaikan</p></CardContent>
        </Card>
        <Card className="border-yellow-500/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Belum Verifikasi</CardTitle><MailWarning className="h-4 w-4 text-yellow-600" /></CardHeader>
          <CardContent>{loading ? <Skeleton className="h-8 w-24 mt-1" /> : <div className="text-2xl font-bold text-yellow-700">{stats.unverifiedUsers?.toLocaleString() ?? '0'}</div>}<p className="text-xs text-muted-foreground">Pengguna yang belum mengonfirmasi email</p></CardContent>
        </Card>
      </div>

      {/* Visualisasi Data */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <DailyTrendChart />
        <PersonaDistributionChart />
      </div>
    </div>
  );
};

export default Dashboard;