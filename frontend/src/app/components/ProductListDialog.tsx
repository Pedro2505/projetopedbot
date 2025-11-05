"use client";

import { Fragment } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  products: Product[];
  onSelect?: (p: Product) => void;
}

export function ProductListDialog({ open, onOpenChange, title, products, onSelect }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white p-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-3 space-y-2 max-h-72 overflow-auto">
          {products.length === 0 ? (
            <div className="text-sm text-gray-500">Nenhum produto encontrado</div>
          ) : (
            products.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelect?.(p)}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex justify-between items-start"
              >
                <div>
                  <div className="font-medium text-gray-900">{p.nome}</div>
                  <div className="text-xs text-gray-500">Lote: {p.lote ?? "—"} • Fornecedor: {p.fornecedor ?? "—"}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{p.quantidade}</div>
                  <div className="text-xs text-gray-500">unidades</div>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}