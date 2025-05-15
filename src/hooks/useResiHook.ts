import { csrFetchWithAuth } from '@/lib/fetcher';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

interface ResiHookProps {
  limit?: number;
  cursorTo?: number;
  keyword?: string;
  searching?: boolean;
  data: any
}
export const useResiHook = ({ limit = 10, cursorTo = 0, keyword, searching = false }: Omit<ResiHookProps, 'data'>) => {
  const createResi = useMutation({
    mutationFn: (data: any) =>
      csrFetchWithAuth(`http://localhost:3002/api/resi`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });

  const getAllResi = useQuery({
    queryKey: ['resi', limit, cursorTo],
    queryFn: () => csrFetchWithAuth(`http://localhost:3002/api/resi?limit=${limit}&cursor=${cursorTo}`, {
      method: 'GET',
    }),
    select: (data) => data,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 1,
    enabled: !searching,
  })

  const getFilterResi = useQuery({
    queryKey: ['resiFilter', keyword, cursorTo],
    queryFn: () => csrFetchWithAuth(`http://localhost:3002/api/resi/search?keyword=${keyword}&cursor=${cursorTo}`, {
      method: 'GET',
    }),
    select: (data) => data,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 1,
    enabled: searching,
  })

  return { createResi, getAllResi, getFilterResi };
};
