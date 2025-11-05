export async function getHighDemandProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/produtos/alta_demanda/`);
    if (!res.ok) throw new Error('Failed to fetch high demand products');
    return await res.json();
  }