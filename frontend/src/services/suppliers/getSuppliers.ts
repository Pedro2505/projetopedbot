import { SupplierResp } from "@/lib/types";

export async function getSuppliers(search = ""): Promise<SupplierResp[]> {
  const q = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fornecedores/${q}`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data as SupplierResp[] : [];
}