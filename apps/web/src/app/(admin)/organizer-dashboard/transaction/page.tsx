'use client';
import useApprovalAction from '@/app/hooks/api/organizer/useApprovalAction';
import useGetTransactionApproval from '@/app/hooks/api/organizer/useGetTransactionApproval';
import { Overview } from '@/components/Dashboard/Overview';
import { OverviewBar } from '@/components/Dashboard/OverviewBar';
import MonthPicker from '@/components/MonthPicker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Check, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const DashboardTransactionPage = () => {
  const [month, setMonth] = useState(new Date());
  const { data, isLoading, refetch } = useGetTransactionApproval();
  const { approvalAction, loading } = useApprovalAction();
  const chartData = [
    {
      name: 'jan',
      data: [
        { title: 'Ticket Sales', name: 'sales', value: 12 },
        {
          title: 'Attendance',
          name: 'attendance',
          value: 10,
        },
      ],
    },
    {
      name: 'feb',
      data: [
        { title: 'Ticket Sales', name: 'sales', value: 16 },
        {
          title: 'Attendance',
          name: 'attendance',
          value: 12,
        },
      ],
    },
    {
      name: 'mar',
      data: [
        { title: 'Ticket Sales', name: 'sales', value: 33 },
        {
          title: 'Attendance',
          name: 'attendance',
          value: 28,
        },
      ],
    },
    {
      name: 'apr',
      data: [
        { title: 'Ticket Sales', name: 'sales', value: 18 },
        {
          title: 'Attendance',
          name: 'attendance',
          value: 15,
        },
      ],
    },
  ];
  const barData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const priceFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  useEffect(() => {
    refetch();
  }, [loading]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!isLoading && data)
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="flex flex-col">
                <div className="flex-1 space-y-4 md:p-8">
                  <div className="flex h-full flex-col">
                    <div className="flex-1 space-y-4 ">
                      <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">
                          Transaction History
                        </h2>
                        <div className="flex items-center space-x-2">
                          <MonthPicker
                            currentMonth={month}
                            onMonthChange={(e) => {
                              setMonth(e);
                            }}
                          />
                        </div>
                      </div>
                      <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                          <div className="flex flex-col">
                            <div className="flex-1 space-y-4">
                              {/* <TransactionList data={transactionData} /> */}
                              <Separator />
                              <Table>
                                <TableCaption>
                                  A list of your recent invoices.
                                </TableCaption>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-[100px] text-primary">
                                      Event
                                    </TableHead>
                                    <TableHead className="text-primary">
                                      UUID
                                    </TableHead>
                                    <TableHead className="text-primary">
                                      Status
                                    </TableHead>
                                    <TableHead className="text-primary">
                                      Transaction Date
                                    </TableHead>
                                    <TableHead className="text-right text-primary">
                                      Total Amount
                                    </TableHead>
                                    <TableHead className="text-primary">
                                      Acc
                                    </TableHead>
                                    <TableHead className="text-primary">
                                      Discard
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {data.map((val) => {
                                    return val.transaction.map((values) => {
                                      return (
                                        <>
                                          <TableRow key={values.uuid}>
                                            <TableCell className="font-medium">
                                              {val.title}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                              {values.uuid}
                                            </TableCell>
                                            <TableCell>
                                              {values.status}
                                            </TableCell>
                                            <TableCell>
                                              {format(
                                                values.createdAt,
                                                'dd-MM-yyyy',
                                              )}
                                            </TableCell>
                                            <TableCell>
                                              {priceFormat.format(values.total)}
                                            </TableCell>
                                            {values.status !== 'pending' ? (
                                              <>
                                                <TableCell>
                                                  <Button
                                                    disabled
                                                    className="p-4 bg-muted cursor-not-allowed"
                                                  >
                                                    <Check
                                                      className="text-muted-foreground"
                                                      width={18}
                                                      height={18}
                                                    />
                                                  </Button>
                                                </TableCell>
                                                <TableCell>
                                                  <Button
                                                    disabled
                                                    className="p-4 bg-muted cursor-not-allowed"
                                                  >
                                                    <X
                                                      width={18}
                                                      height={18}
                                                      className="text-muted-foreground"
                                                    />
                                                  </Button>
                                                </TableCell>
                                              </>
                                            ) : (
                                              <>
                                                <TableCell>
                                                  <Button
                                                    onClick={() =>
                                                      approvalAction({
                                                        uuid: values.uuid,
                                                        status: 'success',
                                                      })
                                                    }
                                                    className="p-4 bg-primary hover:bg-primary-foreground group"
                                                  >
                                                    <Check
                                                      className="text-primary-foreground group-hover:text-primary"
                                                      width={18}
                                                      height={18}
                                                    />
                                                  </Button>
                                                </TableCell>
                                                <TableCell>
                                                  <Button
                                                    onClick={() =>
                                                      approvalAction({
                                                        uuid: values.uuid,
                                                        status: 'cancelled',
                                                      })
                                                    }
                                                    className="p-4 bg-destructive group"
                                                  >
                                                    <X
                                                      width={18}
                                                      height={18}
                                                      className="text-destructive-foreground group-hover:text-destructive"
                                                    />
                                                  </Button>
                                                </TableCell>
                                              </>
                                            )}
                                          </TableRow>
                                        </>
                                      );
                                    });
                                  })}
                                </TableBody>
                                <TableFooter>
                                  <TableRow>
                                    <TableCell colSpan={4}>Total</TableCell>
                                    <TableCell className="text-left">
                                      {priceFormat.format(
                                        data.reduce(
                                          (prev, curr) =>
                                            prev +
                                            curr.transaction.reduce(
                                              (pre, cur) => pre + cur.total,
                                              0,
                                            ),
                                          0,
                                        ),
                                      )}
                                    </TableCell>
                                  </TableRow>
                                </TableFooter>
                              </Table>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="analytics">
                          <Card>
                            <CardHeader></CardHeader>
                            <CardContent className="flex flex-col gap-8">
                              <div className="flex flex-col gap-4 w-full">
                                <CardTitle>
                                  Analytic chart overall transaction
                                </CardTitle>
                                <Overview data={chartData} />
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="mt-4">
                            <CardHeader></CardHeader>
                            <CardContent className="flex flex-col gap-8">
                              <div className="flex flex-col gap-4 w-full">
                                <CardTitle>
                                  Events attendance based on ticket type{' '}
                                </CardTitle>
                                <OverviewBar data={barData} />
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
};

export default DashboardTransactionPage;
