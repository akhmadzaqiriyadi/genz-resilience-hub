// src/pages/Profile.tsx

import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const profileSchema = z.object({
  username: z.string().min(3, { message: "Username minimal 3 karakter." }),
  full_name: z.string().min(3, { message: "Nama lengkap minimal 3 karakter." }),
  institution: z.string().optional(),
  major: z.string().optional(),
  domicile: z.string().optional(),
});

const Profile = () => {
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      full_name: "",
      institution: "",
      major: "",
      domicile: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.setValue('username', profile.username || '');
      form.setValue('full_name', profile.full_name || '');
      form.setValue('institution', profile.institution || '');
      form.setValue('major', profile.major || '');
      form.setValue('domicile', profile.domicile || '');
    }
  }, [profile, form]);

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user!.id,
        username: values.username,
        full_name: values.full_name,
        institution: values.institution,
        major: values.major,
        domicile: values.domicile,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      
      await refreshProfile(); 

      toast({ title: "Profil berhasil diperbarui!" });
      navigate("/pre-test");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Update gagal", description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getInitials = (email: string | undefined) => {
    if (!email) return "??";
    return email.substring(0, 2).toUpperCase();
  };

  if (authLoading) {
     return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-16 w-16 text-primary" /></div>;
  }

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                {getInitials(user?.email)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <CardTitle className="text-3xl">Profil Anda</CardTitle>
              <CardDescription>Lengkapi data diri Anda untuk melanjutkan.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email} disabled />
                </div>
                 <div className="space-y-2">
                  <Label>Role</Label>
                  <div>
                    {profile?.role ? (
                      <Badge variant="outline" className="capitalize text-lg py-1 px-4">{profile.role}</Badge>
                    ) : (
                      <div className="h-10 w-24 bg-muted animate-pulse rounded-full" />
                    )}
                  </div>
                </div>
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="cth: resilientkid" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="cth: Budi Perkasa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asal Kampus / Instansi</FormLabel>
                    <FormControl>
                      <Input placeholder="cth: Universitas Indonesia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="major"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jurusan</FormLabel>
                    <FormControl>
                      <Input placeholder="cth: Ilmu Komunikasi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="domicile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domisili</FormLabel>
                    <FormControl>
                      <Input placeholder="cth: Jakarta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Simpan & Lanjutkan"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;