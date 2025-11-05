export async function getLowStockProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/produtos/baixo_estoque/`);
    if (!res.ok) throw new Error('Failed to fetch low stock products');
    return await res.json();
  }