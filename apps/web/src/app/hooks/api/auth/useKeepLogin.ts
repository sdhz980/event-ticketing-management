'use client';

import { axiosInstance } from '@/app/lib/axios';
import { useAppDispatch } from '@/app/redux/hook';
import { loginAction } from '@/app/redux/slices/userSlice';
import { User } from '@/app/types/user.type';
import { useRouter } from 'next/navigation';

interface KeepLoginResponse {
  message: string;
  data: User;
}

const useKeepLogin = () => {
  const dispatch = useAppDispatch();

  const keepLogin = async () => {
    try {
      const { data } =
        await axiosInstance.post<KeepLoginResponse>('/auth/keep-login');
      dispatch(loginAction(data.data));
    } catch (err) {
      throw err;
    }
  };

  return { keepLogin };
};

export default useKeepLogin;
