'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './authProvider';
import { StoreProvider } from './storeProvider';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <StoreProvider>
        {children}
      </StoreProvider>
    </AuthProvider>
  );
}
