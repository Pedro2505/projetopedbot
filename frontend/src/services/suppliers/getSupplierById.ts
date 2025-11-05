import { SupplierResp } from "@/lib/types";
import { handleJson } from "@/utils/handleJson";

export async function getSupplierById(id: number): Promise<SupplierResp> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fornecedores/${id}/`);
  return handleJson(res);
}