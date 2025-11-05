"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
}

export function ProductDetailDialog({ open, onOpenChange, product }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{product ? product.nome : "Detalhes do Produto"}</DialogTitle>
        </DialogHeader>

        {!product ? (
          <div className="text-sm text-gray-500">Produto não encontrado</div>
        ) : (
          <div className="mt-3 space-y-3">
            <div>
              <div className="text-xs text-gray-500">Lote</div>
              <div className="font-medium">{product.lote ?? "—"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Fornecedor</div>
              <div className="font-medium">{product.fornecedor ?? "—"}</div>
            </div>

            <div className="flex justify-between">
              <div>
                <div className="text-xs text-gray-500">Validade</div>
                <div className="font-medium">{product.data_validade ? new Date(product.data_validade).toLocaleDateString() : "—"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Quantidade</div>
                <div className="font-medium">{product.quantidade}</div>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Preço</div>
              <div className="font-medium">R$ {product.preco ?? "—"}</div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}