export const SANITY_PROJECT_ID = '96ilx2qv';
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';

export interface SanityResponse<T> {
  result: T;
}

/**
 * Executes a query against the Sanity HTTP API.
 * Configured to bypass caching to guarantee near real-time updates.
 */
export async function fetchSanityQuery<T>(
  query: string,
  options: { cache?: RequestCache } = {}
): Promise<T> {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    cache: options.cache || 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`Sanity query failed: ${response.status} ${response.statusText}`);
  }

  const data: SanityResponse<T> = await response.json();
  return data.result;
}
