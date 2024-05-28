'use client';
import { axiosInstance } from '@/app/lib/axios';
import { useAppSelector } from '@/app/redux/hook';
import { Event, Transaction } from '@/app/types/event.type';
import { useEffect, useState } from 'react';

interface Payload {
  uuid: string;
  status: string;
}

const useApprovalAction = () => {
  const { userId } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const approvalAction = async (body: Payload) => {
    setLoading(true);
    try {
      const data = await axiosInstance.post(`/organizer/transaction/approval`, {
        ...body,
        userId,
      });
      setLoading(false);
      return data;
    } catch (err) {
      throw err;
    }
  };
  return { approvalAction, loading };
};

export default useApprovalAction;
