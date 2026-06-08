// query-shim — minimal stand-in for the subset of @tanstack/react-query the
// ported pages used (useQuery / useMutation / useQueryClient). Keeps the data
// layer working as client-only islands without pulling in a banned @tanstack/*
// dependency. Not a full cache — just fetch-on-mount with prefix invalidation.
import { useCallback, useEffect, useRef, useState } from "react";

type QueryKey = readonly unknown[];

const keyStr = (k: QueryKey) => JSON.stringify(k);

// Registry of live queries so invalidateQueries() can trigger refetches.
const listeners = new Map<string, Set<() => void>>();

function subscribe(key: string, fn: () => void) {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(fn);
  return () => {
    set!.delete(fn);
    if (set!.size === 0) listeners.delete(key);
  };
}

export function useQuery<T>({
  queryKey,
  queryFn,
}: {
  queryKey: QueryKey;
  queryFn: () => Promise<T>;
}) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const ks = keyStr(queryKey);
  const fnRef = useRef(queryFn);
  fnRef.current = queryFn;

  const run = useCallback(async () => {
    try {
      const d = await fnRef.current();
      setData(d);
      setError(null);
    } catch (e) {
      console.error(e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    const refetch = () => {
      if (alive) run();
    };
    const unsub = subscribe(ks, refetch);
    run();
    return () => {
      alive = false;
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ks]);

  return { data, isLoading, error, refetch: run };
}

export function useMutation<TData, TVars = void>({
  mutationFn,
  onSuccess,
  onError,
}: {
  mutationFn: (vars: TVars) => Promise<TData>;
  onSuccess?: (data: TData, vars: TVars) => void;
  onError?: (error: unknown, vars: TVars) => void;
}) {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    async (vars: TVars) => {
      setIsPending(true);
      try {
        const data = await mutationFn(vars);
        onSuccess?.(data, vars);
      } catch (e) {
        if (onError) onError(e, vars);
        else console.error(e);
      } finally {
        setIsPending(false);
      }
    },
    [mutationFn, onSuccess, onError],
  );

  return { mutate, isPending };
}

export function useQueryClient() {
  return {
    invalidateQueries: (opts?: { queryKey?: QueryKey }) => {
      if (!opts?.queryKey) {
        for (const set of listeners.values()) set.forEach((fn) => fn());
        return;
      }
      // Prefix match: invalidate ["documents"] refetches ["documents","all"] etc.
      const prefix = keyStr(opts.queryKey).slice(0, -1);
      for (const [k, set] of listeners) {
        if (k === keyStr(opts.queryKey) || k.startsWith(prefix + ",")) {
          set.forEach((fn) => fn());
        }
      }
    },
  };
}
