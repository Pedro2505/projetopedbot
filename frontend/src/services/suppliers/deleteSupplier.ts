export async function deleteSupplier(id: number): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fornecedores/${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete supplier ${id}`);
}