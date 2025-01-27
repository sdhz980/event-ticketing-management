'use client';

import { Event } from '@/app/types/event.type';
import { axiosInstance } from '@/lib/axios';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface EventDetail extends Omit<Event, 'startDate' | 'endDate'> {
  startDate: Date;
  endDate: Date;
}

const useGetEvent = (id: number) => {
  const [data, setData] = useState<EventDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getEvent = async () => {
    try {
      const { data } = await axiosInstance.get(`/event/${id}`);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // TODO: replace console.log with toast
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return { event: data, isLoading, refetch: getEvent };
};

export default useGetEvent;
