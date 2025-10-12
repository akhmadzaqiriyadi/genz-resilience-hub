// src/components/admin/charts/PersonaDistributionChart.tsx

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

type PersonaDistributionData = { persona_name: string; count: number };
const PIE_CHART_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export const PersonaDistributionChart = () => {
    const [personaDist, setPersonaDist] = useState<PersonaDistributionData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDistribution = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.rpc('get_persona_distribution');
                if (error) throw error;
                setPersonaDist(data);
            } catch (error) {
                console.error("Error fetching persona distribution:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDistribution();
    }, []);

    // Fungsi untuk render label dengan nama persona dan persentase
    const renderCustomLabel = (entry: any) => {
        const total = personaDist.reduce((sum, item) => sum + item.count, 0);
        const percent = ((entry.count / total) * 100).toFixed(1);
        return `${entry.persona_name}\n${percent}%`;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Distribusi Persona Pengguna</CardTitle>
                <CardDescription>"Kepo Starter Pack" - Menunjukkan tipe persona yang paling umum.</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="h-[350px] w-full" />
                ) : (
                    <ChartContainer config={{}} className="h-[350px] w-full">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="persona_name" />} />
                            <Pie 
                                data={personaDist} 
                                dataKey="count" 
                                nameKey="persona_name" 
                                cx="50%" 
                                cy="50%" 
                                outerRadius={120}
                                label={renderCustomLabel}
                                labelLine={true}
                            >
                                {personaDist.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                                ))}
                            </Pie>
                            <ChartLegend content={<ChartLegendContent nameKey="persona_name" />} />
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
};