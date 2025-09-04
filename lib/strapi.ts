import 'server-only';

const RAW_BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_BASE = RAW_BASE.replace(/\/+$/, '');
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
const isProd = process.env.NODE_ENV === 'production';

function joinUrl(base: string, path: string) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function toMediaUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return joinUrl(STRAPI_BASE, url);
}

type NextFetchInit = RequestInit & {
  next?: { revalidate?: number };
  timeoutMs?: number;
};

export async function strapiFetch<T>(path: string, init: NextFetchInit = {}): Promise<T> {
  const url = joinUrl(STRAPI_BASE, path);
  const controller = new AbortController();
  const timeoutMs = init.timeoutMs ?? 15_000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
        ...init.headers,
      },
      signal: controller.signal,
      // PROD: только revalidate (ISR), DEV: no-store — без пререндеринга
      ...(isProd ? { next: { revalidate: init.next?.revalidate ?? 60 } } : { cache: 'no-store' }),
    } as RequestInit);

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Strapi ${res.status} ${res.statusText} for ${url} :: ${text.slice(0, 300)}`);
    }
    return (await res.json()) as T;
  } catch (err: any) {
    if (err?.name === 'AbortError') throw new Error(`Strapi request timeout after ${timeoutMs}ms for ${url}`);
    throw new Error(`Strapi fetch failed for ${url}: ${err?.message ?? err}`);
  } finally {
    clearTimeout(timeoutId);
  }
}
