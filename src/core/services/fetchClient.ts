const BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

export type FetchResponse<T> = {
  data: T | null;
  error: string | null;
  code: string | null;
  status: number;
};

export async function fetchClient<T = any>(
  path: string,
  options?: RequestInit
): Promise<FetchResponse<T>> {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    } as Record<string, string>;

    const res = await fetch(`${BASE}${path}`, {
      credentials: 'include',
      ...options,
      headers,
    });

    const status = res.status;
    let payload: any = {};
    
    try {
      payload = await res.json();
    } catch {
      // Handle empty or non-JSON response bodies gracefully
    }

    if (!res.ok) {
      return {
        data: null,
        error: payload.error || `Request failed with status ${res.status}`,
        code: payload.code || 'HTTP_ERROR',
        status,
      };
    }

    return {
      data: payload.data !== undefined ? payload.data : payload,
      error: null,
      code: null,
      status,
    };
  } catch (err: any) {
    console.error(`[fetchClient] Network/unexpected error on ${path}:`, err);
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Network connection failure',
      code: 'NETWORK_ERROR',
      status: 0,
    };
  }
}
