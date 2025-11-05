import { Product } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

export async function getProductByName(name: string): Promise<Product[]> {
  const q = encodeURIComponent(name.trim());
  if (!q) return [];
  const res = await fetch(`${API_BASE}/produtos/?search=${q}`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? (data as Product[]) : [];
}