'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { useState, useEffect, useRef } from 'react';

export const queryClientSingleton = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const PERSIST_KEY = 'REACT_QUERY_OFFLINE_CACHE';
// Bump this version whenever API response shape changes to auto-clear stale cache
const CACHE_VERSION = 'v4';

export function clearPersistedCache() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(PERSIST_KEY);
  } catch { }
  queryClientSingleton.removeQueries();
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const persisted = useRef(false);

  useEffect(() => {
    if (persisted.current) return;
    persisted.current = true;

    // Clear cache if version changed
    try {
      const stored = window.sessionStorage.getItem(PERSIST_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.cacheVersion !== CACHE_VERSION) {
          window.sessionStorage.removeItem(PERSIST_KEY);
          queryClientSingleton.removeQueries();
        }
      }
    } catch { }

    const persister = createSyncStoragePersister({
      storage: window.sessionStorage,
      key: PERSIST_KEY,
      serialize: (data) => JSON.stringify({ ...data, cacheVersion: CACHE_VERSION }),
      deserialize: (data) => {
        try {
          const parsed = JSON.parse(data);
          if (parsed?.cacheVersion !== CACHE_VERSION) return { clientState: { queries: [], mutations: [] } };
          return parsed;
        } catch { return { clientState: { queries: [], mutations: [] } }; }
      },
    });

    persistQueryClient({
      queryClient: queryClientSingleton,
      persister,
      maxAge: 1000 * 60 * 30,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClientSingleton}>
      {children}
    </QueryClientProvider>
  );
}
