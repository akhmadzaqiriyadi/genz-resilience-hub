// src/pages/History.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { id } from 'date-fns/locale'; // Import locale Indonesia

// Tipe data untuk hasil yang akan kita ambil
type TestHistory = {
  id: string;
  created_at: string;
  primary_persona_name: string;
  primary_persona_emoji: string;
  hybrid_persona_name?: string;
  hybrid_persona_emoji?: string;
};

const History = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<TestHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchHistory = async () => {
        setLoading(true);
        // Query kompleks untuk join data dari beberapa tabel sekaligus
        const { data, error } = await supabase
          .rpc('get_test_history', { p_user_id: user.id });

        if (error) {
          console.error("Error fetching test history:", error);
        } else if (data) {
          setHistory(data);
        }
        setLoading(false);
      };

      fetchHistory();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Riwayat Tes Anda</h1>
        <p className="text-muted-foreground">Lihat kembali hasil tes yang pernah Anda ambil.</p>
      </div>

      {history.length === 0 ? (
        <Card className="text-center p-12">
          <CardHeader>
            <CardTitle>Belum Ada Riwayat</CardTitle>
            <CardDescription>Anda belum pernah menyelesaikan tes. Yuk, mulai sekarang!</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/pre-test')}>
              Mulai Tes Pertama
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <Card key={item.id} className="shadow-soft hover:shadow-card transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="grid gap-1">
                  <CardTitle className="text-2xl">
                    <span className="mr-3">{item.hybrid_persona_emoji || item.primary_persona_emoji}</span>
                    {item.hybrid_persona_name || item.primary_persona_name}
                  </CardTitle>
                  <CardDescription>
                    Tes diambil pada: {format(new Date(item.created_at), 'd MMMM yyyy, HH:mm', { locale: id })}
                  </CardDescription>
                </div>
                 {item.hybrid_persona_name && <Badge>Hybrid Persona</Badge>}
              </CardHeader>
              <CardFooter>
                 <Button variant="outline" className="ml-auto group" onClick={() => navigate(`/results?id=${item.id}`)}>
                    Lihat Detail
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
