import { auth } from '@/auth';
import { getSession } from 'next-auth/react';
import { getCachedSession } from './session';

export const csrFetchWithAuth = async (
    url: string,
    options: RequestInit = {}
) => {
    const session = await getCachedSession(); 
    const token = session?.access_token ;
    // const token = 'session?.access_token' ;

    const defaultHeaders: HeadersInit = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.message ?? 'Request failed');
    }
    const responseData = await res.json()
    return responseData.data;
};

// export const ssrFetchWithAuth = async (
//     url: string,
//     options: RequestInit = {}
// ) => {
//     const session = await auth();
//     const token = session?.access_token;

//     const defaultHeaders: HeadersInit = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//     };

//     const res = await fetch(url, {
//         ...options,
//         headers: {
//             ...defaultHeaders,
//             ...(options.headers || {}),
//         },
//     });

//     if (!res.ok) {
//         const error = await res.json().catch(() => ({}));
//         throw new Error(error?.message ?? 'Request failed');
//     }
//     const responseData = await res.json()
//     return responseData.data;
// };
