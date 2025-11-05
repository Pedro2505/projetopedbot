"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Supplier } from "@/lib/types";
import { SupplierFormDialog } from "@/app/components/SupplierFormDialog";
import { getSuppliers } from "@/services/suppliers/getSuppliers";
import { deleteSupplier } from "@/services/suppliers/deleteSupplier";
import { Header } from "@/app/components/Header";
import { TruckTrailerIcon } from "@phosphor-icons/react/dist/ssr";

export default function Fornecedores() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);

  async function load(q = "") {
    setLoading(true);
    try {
      const data = await getSuppliers(q);
      setList(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar fornecedores");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    await load(query.trim());
  }

  async function handleDelete(s: Supplier) {
    if (!s.id) return;
    const ok = confirm(`Remover fornecedor "${s.nome}"?`);
    if (!ok) return;
    try {
      await deleteSupplier(s.id);
      alert("Fornecedor removido");
      await load(query);
    } catch (err) {
      console.error(err);
      alert("Erro ao remover fornecedor");
    }
  }

  return (
    <div className="p-6 w-full">
      <Header
        title="Fornecedores"
        subtitle="Cadastre, edite e remova fornecedores"
        icon={TruckTrailerIcon}
      />

      <div className="flex items-center gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Buscar fornecedor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-w-[240px]"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </Button>
          <Button variant="ghost" onClick={() => { setQuery(""); load(); }}>
            Limpar
          </Button>
        </form>

        <SupplierFormDialog onSaved={() => load(query)} />
      </div>

      <div className="grid gap-4">
        {list.length === 0 ? (
          <Card>
            <CardContent className="p-4 text-sm text-gray-500">
              Nenhum fornecedor encontrado.
            </CardContent>
          </Card>
        ) : (
          list.map((s) => (
            <Card key={s.id} className="p-4 flex justify-between items-center">
              <div>
                <div className="font-medium">{s.nome}</div>
                <div className="text-xs text-gray-500">
                  {s.email ?? s.contato ?? s.telefone ?? "—"}
                </div>
                {s.endereco && (
                  <div className="text-xs text-gray-500 mt-1">{s.endereco}</div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <SupplierFormDialog
                  initial={s}
                  triggerLabel="Editar"
                  onSaved={() => load(query)}
                />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(s)}
                >
                  Remover
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
