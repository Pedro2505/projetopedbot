"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DialogForm } from "@/app/components/DialogForm";
import { ProductListDialog } from "@/app/components/ProductListDialog";
import { ProductDetailDialog } from "@/app/components/ProductDetailDialog";
import { getLowStockProducts } from "@/services/products/getLowStockProducts";
import { getNearExpirations } from "@/services/products/getNearExpirations";
import { Product, ProductTotals } from "@/lib/types";
import { getTotalProducts } from "@/services/products/getTotalProducts";
import { getProductByName } from "@/services/products/getProductByName";
import { Header } from "@/app/components/Header";
import { PackageIcon } from "@phosphor-icons/react/dist/ssr";

export default function Estoque() {
  const [totals, setTotals] = useState<ProductTotals>({ total_produtos: 0, total_quantidade: 0 });
  const [lowStock, setLowStock] = useState<Product[]>([]);
  const [nearExp, setNearExp] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [listOpen, setListOpen] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [listProducts, setListProducts] = useState<Product[]>([]);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const refresh = async () => {
    setLoading(true);
    try {
      const [totalsData, lowStockData, nearExpData] = await Promise.all([
        getTotalProducts(),
        getLowStockProducts(),
        getNearExpirations(),
      ]);
      const activeLowStock = lowStockData.filter((p) => p.quantidade > 0);
      const activeNearExp = nearExpData.filter((p) => p.quantidade > 0);

      setTotals(totalsData);
      setLowStock(activeLowStock.slice(0, 6));
      setNearExp(activeNearExp.slice(0, 6));
    } catch (err) {
      console.error("Erro ao carregar dados de estoque:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const formatDate = (d?: string) => (d ? new Date(d).toLocaleDateString() : "—");

  function openList(title: string, items: Product[]) {
    setListTitle(title);
    setListProducts(items);
    setListOpen(true);
  }

  function openDetail(p: Product) {
    setDetailProduct(p);
    setDetailOpen(true);
  }

  async function handleSearchSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const results = await getProductByName(search);
      setSearchResults(results);
      if (results.length === 0) {
        alert("Nenhum produto encontrado");
      }
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      alert("Erro ao buscar produtos");
    }
  }

  return (
    <div className="p-6 w-full">
      <Header
        title="Estoque"
        subtitle="Adicione e visualize produtos na página de estoque"
        icon={PackageIcon}
      />

      <div className="flex items-center justify-between gap-4 mb-6">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <Input
            placeholder="Buscar produto por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[240px]"
          />
          <Button type="submit">Buscar</Button>
        </form>

        <DialogForm onSaved={refresh} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total de SKUs</p>
            <h2 className="text-2xl font-bold">{totals.total_produtos}</h2>
            <p className="text-sm text-gray-600">Quantidade total em estoque: {totals.total_quantidade}</p>
          </CardContent>
        </Card>

        <Card onClick={() => openList("Itens em Baixo Estoque", lowStock)} className="cursor-pointer">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Produtos em Baixo Estoque</p>
            <h2 className="text-2xl font-bold text-red-600">{lowStock.length}</h2>
            <p className="text-sm text-gray-600">Itens com estoque crítico</p>
          </CardContent>
        </Card>

        <Card onClick={() => openList("Vencimentos Próximos", nearExp)} className="cursor-pointer">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Vencimentos Próximos</p>
            <h2 className="text-2xl font-bold text-yellow-600">{nearExp.length}</h2>
            <p className="text-sm text-gray-600">Produtos vencendo em até 60 dias</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-4 border rounded-lg bg-white">
          <h3 className="font-semibold mb-3">Itens em Baixo Estoque</h3>
          {lowStock.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum item com estoque crítico</p>
          ) : (
            <ul className="space-y-2">
              {lowStock.map((p) => (
                <li key={p.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{p.nome}</div>
                    <div className="text-xs text-gray-500">Lote: {p.lote ?? "—"} • Fornecedor: {p.fornecedor ?? "—"}</div>
                  </div>
                  <div className="text-right">
                    <button className="font-semibold text-red-600" onClick={() => openDetail(p)}> {p.quantidade} unidades</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="p-4 border rounded-lg bg-white">
          <h3 className="font-semibold mb-3">Vencimentos Próximos</h3>
          {nearExp.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum vencimento próximo</p>
          ) : (
            <ul className="space-y-2">
              {nearExp.map((p) => (
                <li key={p.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{p.nome}</div>
                    <div className="text-xs text-gray-500">Lote: {p.lote ?? "—"}</div>
                  </div>
                  <div className="text-right">
                    <button className="font-semibold" onClick={() => openDetail(p)}>{formatDate(p.data_validade)}</button>
                    <div className="text-xs text-gray-500">Qtd: {p.quantidade}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {searchResults.length > 0 && (
        <section className="mt-6 p-4 border rounded-lg bg-white">
          <h3 className="font-semibold mb-3">Resultados da Busca</h3>
          <ul className="space-y-2">
            {searchResults.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => openDetail(p)}
              >
                <div>
                  <div className="font-medium">{p.nome}</div>
                  <div className="text-xs text-gray-500">
                    Lote: {p.lote ?? "—"} • Fornecedor: {p.fornecedor ?? "—"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{p.quantidade} unidades</div>
                  <div className="text-xs text-gray-500">
                    Validade: {formatDate(p.data_validade)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ProductListDialog
        open={listOpen}
        onOpenChange={setListOpen}
        title={listTitle}
        products={listProducts}
        onSelect={(p) => {
          setListOpen(false);
          openDetail(p);
        }}
      />

      <ProductDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        product={detailProduct ?? undefined}
      />
    </div>
  );
}
