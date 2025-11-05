"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Product } from "@/lib/types";
import { SaleDialog } from "@/app/components/SaleDialog";
import { getProductByName } from "@/services/products/getProductByName";
import { Header } from "@/app/components/Header";
import { MoneyIcon } from "@phosphor-icons/react/dist/ssr";

export default function Vendas() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [saleOpen, setSaleOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!search.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const r = await getProductByName(search);
      setResults(r);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar produtos.");
    } finally {
      setLoading(false);
    }
  }

  function openSaleFor(p: Product) {
    setSelected(p);
    setSaleOpen(true);
  }

  return (
    <div className="p-6 w-full">
      <Header
        title="Vendas"
        subtitle="Registre vendas subtraindo a quantidade do produto"
        icon={MoneyIcon}
      />

      <Card className="mb-6 p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Pesquisar produto pelo nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[320px]"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </Button>
        </form>
      </Card>

      <div className="bg-white rounded-lg border">
        <div className="grid grid-cols-5 gap-4 p-4 border-b bg-gray-50 font-medium text-sm text-gray-600">
          <div>Nome</div>
          <div>Lote</div>
          <div>Validade</div>
          <div>Quantidade</div>
          <div></div>
        </div>

        <ul className="divide-y">
          {results.length === 0 ? (
            <li className="p-4 text-sm text-gray-500 text-center">
              {loading
                ? "Buscando produtos..."
                : search.trim()
                ? "Nenhum produto encontrado com este nome."
                : "Digite o nome do produto para buscar..."}
            </li>
          ) : (
            results.map((p) => (
              <li
                key={p.id}
                className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">{p.nome}</div>
                  <div className="text-xs text-gray-500">
                    Fornecedor: {p.fornecedor ?? "—"}
                  </div>
                </div>
                <div className="text-sm">{p.lote ?? "—"}</div>
                <div className="text-sm">
                  {p.data_validade
                    ? new Date(p.data_validade).toLocaleDateString()
                    : "—"}
                </div>
                <div className="font-medium">{p.quantidade} unidades</div>
                <div>
                  <Button
                    onClick={() => openSaleFor(p)}
                    disabled={p.quantidade <= 0}
                    size="sm"
                  >
                    Registrar Venda
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <SaleDialog
        open={saleOpen}
        onOpenChange={setSaleOpen}
        product={selected ?? undefined}
        onSaved={() => {
          if (search.trim()) handleSearch();
        }}
      />
    </div>
  );
}
