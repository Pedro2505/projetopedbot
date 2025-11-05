import { SupplierPayload, SupplierResp } from "@/lib/types";
import { handleJson } from "@/utils/handleJson";

export async function updateSupplier(id: number, payload: Partial<SupplierPayload>): Promise<SupplierResp> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fornecedores/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}