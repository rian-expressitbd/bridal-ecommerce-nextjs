// lib/api/products.ts
export async function getProductMetadata(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/products?_id=${id}`,
    { cache: "no-store" } // Always fresh data for SEO
  );
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data.data) ? data.data[0] : data.data;
}
