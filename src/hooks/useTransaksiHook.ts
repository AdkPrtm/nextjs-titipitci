import { csrFetchWithAuth } from '@/lib/fetcher';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface TransaksiHookProps {
  limit?: number;
  cursorTo?: number;
  keyword?: string;
  searching?: boolean;
}
export const useTransaksiHook = ({ limit = 10, cursorTo = 0, keyword, searching = false }: TransaksiHookProps) => {

  const getAllTransactions = useQuery({
    queryKey: ['transactions', limit, cursorTo],
    queryFn: () => csrFetchWithAuth(`http://localhost:3002/api/transaksi?limit=${limit}&cursor=${cursorTo}`, {
      method: 'GET',
    }),
    select: (data) => data,
    placeholderData: keepPreviousData,
    staleTime: 5000,
    enabled: !searching,
  })

//   const getTotalTransactions = useQuery({
//     queryKey: ['transactionAll'],
//     queryFn: () => csrFetchWithAuth(`http://localhost:3002/api/transaksi/total`, {
//       method: 'GET',
//     }),
//     select: (data) => data,
//     placeholderData: keepPreviousData,
//     staleTime: 5000,
//     enabled: !searching,
//   })

  const getFilterTransactions = useQuery({
    queryKey: ['transactionFilter', keyword, cursorTo],
    queryFn: () => csrFetchWithAuth(`http://localhost:3002/api/transaksi/search?keyword=${keyword}&cursor=${cursorTo}`, {
      method: 'GET',
    }),
    select: (data) => data,
    placeholderData: keepPreviousData,
    staleTime: 5000,
    enabled: searching,
  })

  return { getAllTransactions, getFilterTransactions };

};
