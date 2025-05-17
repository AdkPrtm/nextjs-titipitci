// lib/SessionTokenProvider.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

const SessionTokenContext = createContext<string | null>(null);

export const SessionTokenProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const token = session?.access_token ?? null;

  return (
    <SessionTokenContext.Provider value={token}>
      {children}
    </SessionTokenContext.Provider>
  );
};

export const useSessionToken = () => useContext(SessionTokenContext);
