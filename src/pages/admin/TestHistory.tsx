// src/pages/admin/TestHistory.tsx

import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

// Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons & Utils
import { Loader2, ArrowUpDown, Search, Eye } from "lucide-react";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Tipe data untuk hasil tes yang diambil
type TestResultItem = {
    result_id: string;
    created_at: string;
    user_email: string;
    user_full_name: string | null;
    quiz_title: string;
    quiz_slug: string;
    primary_persona_name: string | null;
    primary_persona_emoji: string | null;
    hybrid_persona_name: string | null;
    hybrid_persona_emoji: string | null;
    scores: Record<string, number> | null;
};

// Tipe untuk konfigurasi sorting
type SortConfig = {
    key: 'created_at' | 'user_email';
    direction: 'asc' | 'desc';
};

const RESULTS_PER_PAGE = 10;

// Custom hook untuk debounce (menunda eksekusi)
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
        return () => { clearTimeout(handler); };
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

const TestHistory = () => {
    const navigate = useNavigate();
    const [results, setResults] = useState<TestResultItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'created_at', direction: 'desc' });

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const fetchTestHistory = useCallback(async () => {
        setLoading(true);

        const { data: count, error: countError } = await supabase.rpc('get_all_test_results_count', {
            search_term: debouncedSearchTerm
        });
        if (countError) {
            console.error("Error fetching results count:", countError);
            setTotalResults(0);
        } else {
            setTotalResults(count || 0);
        }

        const { data, error } = await supabase.rpc('get_all_test_results', {
            page_limit: RESULTS_PER_PAGE,
            page_offset: (page - 1) * RESULTS_PER_PAGE,
            search_term: debouncedSearchTerm,
            sort_by: sortConfig.key,
            sort_direction: sortConfig.direction,
        });

        if (error) {
            console.error("Error fetching test results:", error);
            setResults([]);
        } else {
            setResults(data || []);
        }

        setLoading(false);
    }, [page, debouncedSearchTerm, sortConfig]);

    useEffect(() => {
        fetchTestHistory();
    }, [fetchTestHistory]);

    const handleSort = (key: SortConfig['key']) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setPage(1);
        setSortConfig({ key, direction });
    };

    const getMainResult = (item: TestResultItem) => {
        if (item.quiz_slug === 'data-sorcerer-test' && item.scores) {
            const sortedPillars = Object.keys(item.scores).sort((a, b) => item.scores[b] - item.scores[a]);
            const hollandCode = sortedPillars.slice(0, 3).join('');
            return `Arketipe: ${hollandCode}`;
        }
        const emoji = item.hybrid_persona_emoji || item.primary_persona_emoji || '✨';
        const name = item.hybrid_persona_name || item.primary_persona_name || 'N/A';
        return `${emoji} ${name}`;
    };

    const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
    const paginationRange = useMemo(() => generatePagination(page, totalPages), [page, totalPages]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Riwayat Tes Pengguna</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Semua Hasil Tes</CardTitle>
                    <CardDescription>
                        Menampilkan {results.length} dari total {totalResults} hasil tes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari berdasarkan email atau nama tes..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
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
                                                <Button variant="ghost" onClick={() => handleSort('user_email')}>
                                                    Pengguna <ArrowUpDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </TableHead>
                                            <TableHead>Nama Tes</TableHead>
                                            <TableHead>Hasil Utama</TableHead>
                                            <TableHead>
                                                <Button variant="ghost" onClick={() => handleSort('created_at')}>
                                                    Tanggal <ArrowUpDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {results.length > 0 ? results.map((item) => (
                                            <TableRow key={item.result_id}>
                                                <TableCell>
                                                    <div className="font-medium">{item.user_full_name || '-'}</div>
                                                    <div className="text-sm text-muted-foreground">{item.user_email}</div>
                                                </TableCell>
                                                <TableCell>{item.quiz_title}</TableCell>
                                                <TableCell>
                                                    <span className="font-mono text-sm">{getMainResult(item)}</span>
                                                </TableCell>
                                                <TableCell>
                                                    {format(new Date(item.created_at), 'd MMM yyyy, HH:mm', { locale: id })}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => navigate(`/results?id=${item.result_id}&quiz=${item.quiz_slug}`)}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" /> Lihat
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-24 text-center">
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
                                                typeof pageNumber === 'string' ? (<PaginationItem key={`${pageNumber}-${index}`}><PaginationEllipsis /></PaginationItem>) :
                                                (<PaginationItem key={pageNumber}><PaginationLink href="#" isActive={page === pageNumber} onClick={(e) => { e.preventDefault(); setPage(pageNumber); }}>{pageNumber}</PaginationLink></PaginationItem>)
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
        </div>
    );
};

export default TestHistory;