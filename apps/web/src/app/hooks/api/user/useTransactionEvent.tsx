'use client';
import { axiosInstance } from '@/app/lib/axios';
import { useAppDispatch, useAppSelector } from '@/app/redux/hook';
import { editPoints } from '@/app/redux/slices/userSlice';
import { User } from '@/app/types/user.type';
import { AxiosError } from 'axios';

interface CreateUserTransaction {
  eventId: number;
  qty: number;
  voucherId: number | null;
  rewardId: number | null;
  userId: number | null;
  isUsePoint: number;
}

export const useCreateTransactionEvent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const createTransactionEvent = async (body: CreateUserTransaction) => {
    try {
      const response = await axiosInstance.post(
        `/user/event/transaction`,
        body,
      );
      dispatch(editPoints({ points: user.points - body.isUsePoint }));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
      }
    }
  };

  return { createTransactionEvent };
};
