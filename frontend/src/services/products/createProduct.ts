import { ProductFormData } from "@/lib/types";

export async function createProduct(formData: ProductFormData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/produtos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Erro ao adicionar produto");
    return await res.json();
  }