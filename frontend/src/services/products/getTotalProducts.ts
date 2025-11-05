import { ProductTotals } from "@/lib/types";

export async function getTotalProducts(): Promise<ProductTotals> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/produtos/total/`);
    if (!res.ok) throw new Error('Failed to fetch totals');
    return await res.json();
  }