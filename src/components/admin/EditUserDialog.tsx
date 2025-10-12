// src/components/admin/EditUserDialog.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

// Tipe data untuk user yang akan di-edit
type UserProfile = {
  id: string;
  email: string | undefined;
  full_name: string | null;
  role: string | null;
  institution?: string | null;
  major?: string | null;
  domicile?: string | null;
};

// Skema validasi form
const formSchema = z.object({
  full_name: z.string().min(3, { message: "Nama lengkap minimal 3 karakter." }),
  role: z.enum(["user", "admin"]),
  institution: z.string().optional(),
  major: z.string().optional(),
  domicile: z.string().optional(),
});

interface EditUserDialogProps {
  user: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: z.infer<typeof formSchema>) => Promise<void>;
  isSaving: boolean;
}

const EditUserDialog = ({ user, isOpen, onClose, onSave, isSaving }: EditUserDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      role: "user",
      institution: "",
      major: "",
      domicile: ""
    }
  });

  // Isi form dengan data user ketika dialog dibuka
  useEffect(() => {
    if (user) {
      form.reset({
        full_name: user.full_name || "",
        role: user.role === "admin" ? "admin" : "user",
        institution: user.institution || "",
        major: user.major || "",
        domicile: user.domicile || ""
      });
    }
  }, [user, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSave(data);
  });

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Pengguna</DialogTitle>
          <DialogDescription>
            Ubah detail untuk pengguna: {user.email}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl><Input placeholder="Nama lengkap..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peran (Role)</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih peran" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institusi</FormLabel>
                  <FormControl><Input placeholder="Nama institusi..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Tambahkan field lain jika perlu (major, domicile) */}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSaving}>Batal</Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;