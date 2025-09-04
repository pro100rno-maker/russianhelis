const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://api.russianhelis.com"; // пример
const STRAPI_TOKEN = process.env.STRAPI_TOKEN; // если нужен приватный доступ

export async function strapiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    ...init.headers,
  };

  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...init,
    headers,
    // ISR: обновляем раз в 60 сек (подправьте под себя)
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Strapi error:", res.status, res.statusText);
    throw new Error(`Strapi request failed: ${res.status}`);
  }
  return res.json();
}
