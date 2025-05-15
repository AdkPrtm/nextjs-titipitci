import { csrFetchWithAuth } from '@/lib/fetcher';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface UserHookProps {
  limit?: number;
  cursorTo?: number;
  keyword?: string;
  searching?: boolean;
}
export const useUserHook = ({ limit = 10, cursorTo = 0, keyword, searching = false }: UserHookProps) => {

  const getAllUser = useQuery({
    queryKey: ['users', limit, cursorTo],
    queryFn: () => csrFetchWithAuth(`http://localhost:3002/api/user?limit=${limit}&cursor=${cursorTo}`, {
      method: 'GET',
    }),
    select: (data) => data,
    placeholderData: keepPreviousData,
    staleTime: 5000,
    enabled: !searching,
  })

  const getTotalUser = useQuery({
    queryKey: ['userTotal'],
    queryFn: () => csrFetchWithAuth(`http://localhost:3002/api/user/total`, {
      method: 'GET',
    }),
    select: (data) => data,
    placeholderData: keepPreviousData,
    staleTime: 5000,
    enabled: !searching,
  })

  const getFilterUser = useQuery({
    queryKey: ['userFilter', keyword, cursorTo],
    queryFn: () => csrFetchWithAuth(`http://localhost:3002/api/user/search?keyword=${keyword}&cursor=${cursorTo}`, {
      method: 'GET',
    }),
    select: (data) => data,
    placeholderData: keepPreviousData,
    staleTime: 5000,
    enabled: searching,
  })

  return { getAllUser, getFilterUser, getTotalUser };

};
