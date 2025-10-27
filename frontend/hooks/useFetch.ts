import { useState, useEffect, useCallback } from 'react';

type UseFetchProps<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useFetch<T>(url: string): UseFetchProps<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error status ${response.status}`);
      }

      const json = (await response.json()) as T;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch } as const;
}
