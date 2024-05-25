'use client'
import useGetEvent from '@/app/hooks/api/event/useGetEvent';
import AttendeeList from '@/components/Dashboard/AttendeeList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React from 'react';

const AttendeeListPage = ({ params }: { params: { id: string } }) => {
  const { event, isLoading, refetch } = useGetEvent(Number(params.id));
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-128px)] w-full flex justify-center items-center">
        <Progress value={99} className="w-[40%] transition-all duration-300" />
      </div>
    );
  }
  if (!event) {
    return (
      <div className="min-h-[calc(100vh-128px)] w-full flex justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle>Oo00oooPpps......</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>We cannot find the data...</Label>
          </CardContent>
        </Card>
      </div>
    );
  }
  if (event) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="flex flex-col">
                <div className="flex-1 space-y-4 md:p-8">
                  <AttendeeList />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }
};

export default AttendeeListPage;
