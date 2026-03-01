export type SportingItem = {
  id: string;
  category: string;
  title: string;
  brand?: string;
  description: string;
  condition?: string;
  price?: number;
  region?: string;
  is_regulated?: boolean;
  created_at?: string;
};

export type ListResponse = { items: SportingItem[] };

export async function listSporting(fetchFn: typeof fetch, apiBase: string, params?: {
  category?: string;
  q?: string;
  brand?: string;
  condition?: string;
  region?: string;
  priceMin?: number;
  priceMax?: number;
}): Promise<SportingItem[]> {
  const usp = new URLSearchParams();
  if (params?.category) usp.set("category", params.category);
  if (params?.q) usp.set("q", params.q);
  if (params?.brand) usp.set("brand", params.brand);
  if (params?.condition) usp.set("condition", params.condition);
  if (params?.region) usp.set("region", params.region);
  if (typeof params?.priceMin === "number") usp.set("priceMin", String(params.priceMin));
  if (typeof params?.priceMax === "number") usp.set("priceMax", String(params.priceMax));

  const url = `${apiBase}/api/v1/sporting?${usp.toString()}`;
  const r = await fetchFn(url, { method: "GET" });
  if (!r.ok) return [];
  const j = (await r.json()) as ListResponse;
  return j.items ?? [];
}

export async function getSportingItem(fetchFn: typeof fetch, apiBase: string, id: string): Promise<SportingItem | null> {
  const r = await fetchFn(`${apiBase}/api/v1/sporting/${encodeURIComponent(id)}`, { method: "GET" });
  if (!r.ok) return null;
  return (await r.json()) as SportingItem;
}