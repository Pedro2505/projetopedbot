import { SupplierPayload, SupplierResp } from "@/lib/types";
import { handleJson } from "@/utils/handleJson";

export async function createSupplier(payload: SupplierPayload): Promise<SupplierResp> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fornecedores/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}
