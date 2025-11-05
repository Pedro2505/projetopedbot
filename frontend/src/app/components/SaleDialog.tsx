"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/lib/types";
import { updateProductQuantity } from "@/services/products/updateProductQuantity";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSaved?: () => Promise<void> | void;
}

export function SaleDialog({ open, onOpenChange, product, onSaved }: Props) {
  const [qty, setQty] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQty(1);
  }, [product, open]);

  if (!product) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const saleQty = Math.max(0, Math.floor(qty));
    if (saleQty <= 0) {
      alert("Informe uma quantidade válida (> 0).");
      return;
    }
    if (product.quantidade - saleQty < 0) {
      alert("Quantidade insuficiente em estoque.");
      return;
    }

    try {
      setLoading(true);
      await updateProductQuantity(product.id!, product.quantidade - saleQty);
      alert("Venda registrada com sucesso.");
      onOpenChange(false);
      if (onSaved) await onSaved();
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar venda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Registrar Venda — {product.nome}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <div className="text-xs text-gray-500">Estoque atual</div>
            <div className="font-medium">{product.quantidade} unidades</div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Quantidade a vender</label>
            <Input
              type="number"
              min={1}
              max={product.quantidade}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="mt-1"
            />
            <div className="text-xs text-gray-500 mt-1">Lote: {product.lote ?? "—"} • Validade: {product.data_validade ? new Date(product.data_validade).toLocaleDateString() : "—"}</div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancelar</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrar Venda"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}