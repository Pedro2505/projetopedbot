const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

export async function updateProductQuantity(id: number, quantidade: number) {
  const res = await fetch(`${API_BASE}/produtos/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantidade }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to update product (${res.status}) ${text}`);
  }
  return res.json();
}