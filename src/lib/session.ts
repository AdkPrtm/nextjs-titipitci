import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

let cachedSession: Session | null | undefined = undefined;

export const getCachedSession = async () => {
    if (cachedSession === undefined) {
        console.log('Fetching session...');
        cachedSession = await getSession();
    }
    console.log('Cached session:', cachedSession);
    return cachedSession;
};