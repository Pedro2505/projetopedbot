export async function getNearExpirations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/produtos/vencimentos_proximos/`);

    if (!res.ok) throw new Error('Failed to fetch near expirations');
    return await res.json();
  }