'use client';
import {
  BadgeDollarSign,
  CalendarCheck2,
  LineChart,
  Ticket,
} from 'lucide-react';
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CalendarDateRangePicker } from '@/components/Dashboard/DateRangePicker';
import { Overview } from '@/components/Dashboard/Overview';
import { RecentEvent } from '@/components/Dashboard/RecentEvent';
import useGetOrganizerDataStatistic from '@/app/hooks/api/organizer/useGetOrganizerDataStatistic';
import { useEffect } from 'react';

const OrganizerDashboardPage = () => {
  const { data, isLoading } = useGetOrganizerDataStatistic();
  const priceFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  const chartData = [
    {
      name: 'jan',
      data: [
        { title: 'Ticket Sales', name: 'sales', value: 0 },
        { title: 'Ticket Sales', name: 'sales', value: 0 },
      ],
    },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between gap-4 space-y-2">
          <h2 className="md:text-3xl text-2xl font-bold tracking-tight">
            Dashboard
          </h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker className="" />
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ticket Revenue
                  </CardTitle>
                  <BadgeDollarSign />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.data.data.ticketRevenue._sum.total
                      ? priceFormat.format(
                          data.data.data.ticketRevenue._sum.total,
                        )
                      : '0'}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Ticket Price
                  </CardTitle>
                  <LineChart />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {priceFormat.format(
                      data.data.data.averageTicketPrice._avg.price,
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +21% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ticket Sold
                  </CardTitle>
                  <Ticket />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.data.data.ticketSoldOverall}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Events
                  </CardTitle>
                  <CalendarCheck2 />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.data.data.totalEvents}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    5 events since this month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Total Ticket Sold in This Month</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* Chart Statistic */}
                  <Overview
                    data={
                      data.data.data.chartStatisticData.length > 1
                        ? data.data.data.chartStatisticData
                        : chartData
                    }
                  />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Transaction History */}
                  <RecentEvent />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default OrganizerDashboardPage;
