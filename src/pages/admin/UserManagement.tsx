// src/pages/admin/UserManagement.tsx

import { useEffect, useState, useMemo, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import * as z from "zod";

// Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EditUserDialog from "@/components/admin/EditUserDialog";
import UserDetailSheet from "@/components/admin/UserDetailSheet";
import { useToast } from "@/components/ui/use-toast";

// Icons
import { Loader2, ArrowUpDown, Search, MoreHorizontal, Pencil, Eye } from "lucide-react";

// Utils
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Tipe data untuk user profile, mencakup semua kolom yang mungkin
type UserProfile = {
  id: string;
  email: string | undefined;
  full_name: string | null;
  role: string | null;
  created_at: string;
  email_confirmed_at: string | null;
  institution: string | null;
  major: string | null;
  domicile: string | null;
};

// Tipe untuk konfigurasi sorting
type SortConfig = {
  key: 'full_name' | 'email' | 'created_at';
  direction: 'asc' | 'desc';
};

// Skema form untuk validasi (digunakan oleh dialog edit)
const formSchema = z.object({
  full_name: z.string().min(3, { message: "Nama lengkap minimal 3 karakter." }),
  role: z.enum(["user", "admin"]),
  institution: z.string().optional(),
  major: z.string().optional(),
  domicile: z.string().optional(),
});

const USERS_PER_PAGE = 10;

// Custom hook untuk debounce input pencarian
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// Fungsi helper untuk logika pagination
const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
  if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};


const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'created_at', direction: 'desc' });

  // State untuk dialog dan sheet
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [viewingUser, setViewingUser] = useState<UserProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    const commonParams = {
        search_term: debouncedSearchTerm
    };

    const { data: count, error: countError } = await supabase.rpc('get_users_count', commonParams);
    if (countError) {
        console.error("Error fetching user count:", countError);
        setLoading(false);
        return;
    }
    setTotalUsers(count || 0);

    const { data, error } = await supabase.rpc('get_all_users', {
        ...commonParams,
        page_limit: USERS_PER_PAGE,
        page_offset: (page - 1) * USERS_PER_PAGE,
        sort_by: sortConfig.key,
        sort_direction: sortConfig.direction,
    });
    if (error) {
        console.error("Error fetching users:", error);
    } else {
        setUsers(data || []);
    }
    setLoading(false);
  }, [page, debouncedSearchTerm, sortConfig]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Fungsi untuk menangani penyimpanan data dari dialog edit
  const handleUpdateUser = async (values: z.infer<typeof formSchema>) => {
    if (!editingUser) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.rpc('update_user_by_admin', {
        target_user_id: editingUser.id,
        new_full_name: values.full_name,
        new_role: values.role,
        new_institution: values.institution,
        new_major: values.major,
        new_domicile: values.domicile
      });

      if (error) throw error;

      toast({ title: "Sukses!", description: "Data pengguna berhasil diperbarui." });
      setEditingUser(null); // Tutup dialog
      await fetchUsers(); // Refresh data tabel
    } catch (error: any) {
      toast({ variant: "destructive", title: "Gagal!", description: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  // Fungsi untuk menangani klik pada header tabel untuk sorting
  const handleSort = (key: SortConfig['key']) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setPage(1); // Kembali ke halaman 1 saat sorting diubah
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
  const paginationRange = useMemo(() => generatePagination(page, totalPages), [page, totalPages]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manajemen Pengguna</h1>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
          <CardDescription>
            Menampilkan {users.length} dari total {totalUsers} pengguna.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama atau email..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Kembali ke halaman 1 saat mulai mencari
              }}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('full_name')}>
                          Nama Lengkap <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                         <Button variant="ghost" onClick={() => handleSort('email')}>
                          Email <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Peran</TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('created_at')}>
                          Tanggal Bergabung <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length > 0 ? users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.full_name || "-"}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>
                          {u.email_confirmed_at ? (
                             <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Terverifikasi</Badge>
                          ) : (
                             <Badge variant="destructive" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Belum Verifikasi</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={u.role === 'admin' ? 'destructive' : 'outline'} className="capitalize">{u.role}</Badge>
                        </TableCell>
                        <TableCell>
                          {format(new Date(u.created_at), 'd MMM yyyy, HH:mm', { locale: id })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Buka menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setViewingUser(u)}>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Lihat Detail</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setEditingUser(u)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          Tidak ada hasil ditemukan.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(p - 1, 1)); }} className={page === 1 ? "pointer-events-none opacity-50" : ""} />
                      </PaginationItem>
                      {paginationRange.map((pageNumber, index) =>
                        typeof pageNumber === 'string' ? ( <PaginationItem key={`${pageNumber}-${index}`}><PaginationEllipsis /></PaginationItem> ) : 
                        ( <PaginationItem key={pageNumber}><PaginationLink href="#" isActive={page === pageNumber} onClick={(e) => { e.preventDefault(); setPage(pageNumber); }}>{pageNumber}</PaginationLink></PaginationItem> )
                      )}
                      <PaginationItem>
                        <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(p + 1, totalPages)); }} className={page === totalPages ? "pointer-events-none opacity-50" : ""} />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Render Dialog Edit */}
      <EditUserDialog
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleUpdateUser}
        isSaving={isSaving}
      />

      {/* Render Panel Detail */}
      <UserDetailSheet
        user={viewingUser}
        isOpen={!!viewingUser}
        onClose={() => setViewingUser(null)}
      />
    </div>
  );
};

export default UserManagement;