// src/components/admin/charts/DailyTrendChart.tsx

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type DailyTrendData = { day: string; count: number };

export const DailyTrendChart = () => {
    const [dailyTrend, setDailyTrend] = useState<DailyTrendData[]>([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -29),
        to: new Date(),
    });

    useEffect(() => {
        const fetchTrend = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.rpc('get_daily_test_completion_trend', {
                    start_date: date?.from ? format(date.from, "yyyy-MM-dd") : format(addDays(new Date(), -29), "yyyy-MM-dd"),
                    end_date: date?.to ? format(date.to, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
                });

                if (error) throw error;
                
                // Format tanggal untuk tampilan di chart
                setDailyTrend(data.map(d => ({...d, day: format(new Date(d.day), 'MMM d')})));
            } catch (error) {
                console.error("Error fetching daily trend:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrend();
    }, [date]);

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>Tren Pengerjaan Tes Harian</CardTitle>
                        <CardDescription>Jumlah tes yang diselesaikan per hari.</CardDescription>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn("w-full sm:w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (date.to ? (<>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</>) : (format(date.from, "LLL dd, y"))) : (<span>Pilih rentang tanggal</span>)}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
                        </PopoverContent>
                    </Popover>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="h-[350px] w-full" />
                ) : (
                    <ChartContainer config={{ count: { label: "Tes", color: "hsl(var(--primary))" } }} className="h-[350px] w-full">
                        <BarChart data={dailyTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
};