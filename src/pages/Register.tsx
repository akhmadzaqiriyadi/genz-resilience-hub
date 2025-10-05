// src/pages/Register.tsx

import { supabase } from "@/lib/supabaseClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const registerSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal harus 6 karakter." }),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        // Menangkap error umum (misal: password terlalu lemah)
        throw error;
      }
      
      // --- PERUBAHAN LOGIKA UTAMA DI SINI ---
      // Cek apakah pengguna benar-benar baru atau sudah ada
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        // Jika identities kosong, pengguna ini sudah ada (email sudah terkonfirmasi)
        // atau kasus langka lainnya. Kita anggap email sudah digunakan.
         setError("Email ini sudah terdaftar. Silakan coba masuk.");
      } else if (data.user) {
        // Jika user object ada (dan identities tidak kosong atau null),
        // ini adalah pendaftaran baru yang berhasil.
        setSuccess(true);
        form.reset();
      } else {
        // Jika tidak ada user dan tidak ada error, ini skenario tak terduga
        throw new Error("Terjadi kesalahan saat pendaftaran. Coba lagi.");
      }
      // --- AKHIR PERUBAHAN ---

    } catch (error: any) {
      setError(error.message || "Registrasi gagal. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Buat Akun Baru</CardTitle>
          <CardDescription>Daftar untuk memulai perjalanan resiliensimu</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert variant="default" className="border-success/50 text-success [&>svg]:text-success">
              <AlertDescription>
                Pendaftaran berhasil! Silakan cek email Anda untuk link konfirmasi sebelum login.
              </AlertDescription>
            </Alert>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="kamu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Minimal 6 karakter" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : "Daftar"}
                </Button>
              </form>
            </Form>
          )}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Masuk di sini
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
