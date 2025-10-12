// src/components/admin/UserDetailSheet.tsx

import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

type UserProfile = {
  id: string; email: string | undefined; full_name: string | null; role: string | null; created_at: string; email_confirmed_at: string | null; institution: string | null; major: string | null; domicile: string | null;
};

interface UserDetailSheetProps {
  user: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

const DetailRow = ({ label, value, isBadge = false, badgeVariant = "outline" }: { label: string; value: string | null; isBadge?: boolean; badgeVariant?: any }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-muted-foreground">{label}</span>
    {isBadge ? (
      <Badge variant={badgeVariant} className="capitalize">{value || "-"}</Badge>
    ) : (
      <span className="text-sm font-semibold text-foreground break-all text-right">{value || "-"}</span>
    )}
  </div>
);

const UserDetailSheet = ({ user, isOpen, onClose }: UserDetailSheetProps) => {
  if (!user) return null;

  const getInitials = (name: string | null | undefined, email: string | undefined) => {
    if (name) return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    if (email) return email.substring(0, 2).toUpperCase();
    return "??";
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {getInitials(user.full_name, user.email)}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-2xl">{user.full_name || "Pengguna Baru"}</SheetTitle>
                <SheetDescription>{user.email}</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="overflow-y-auto px-6 pb-6 flex-1">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground pt-2 pb-1">Detail Akun</h4>
              <DetailRow label="ID Pengguna" value={user.id} />
              <DetailRow
                label="Status Email"
                value={user.email_confirmed_at ? "Terverifikasi" : "Belum Verifikasi"}
                isBadge
                badgeVariant={user.email_confirmed_at ? "success" : "destructive"}
              />
               <DetailRow
                label="Peran"
                value={user.role}
                isBadge
                badgeVariant={user.role === 'admin' ? 'destructive' : 'outline'}
              />
              <DetailRow
                label="Tanggal Bergabung"
                value={format(new Date(user.created_at), 'd MMMM yyyy, HH:mm', { locale: id })}
              />
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
               <h4 className="text-sm font-medium text-muted-foreground pb-1">Data Profil</h4>
              <DetailRow label="Institusi" value={user.institution} />
              <DetailRow label="Jurusan" value={user.major} />
              <DetailRow label="Domisili" value={user.domicile} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserDetailSheet;