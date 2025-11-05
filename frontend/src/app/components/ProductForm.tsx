import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductFormData } from "@/services/api";

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => Promise<void>;
  loading: boolean;
}

export function ProductForm({ onSubmit, loading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    nome: "",
    lote: "",
    fornecedor: "",
    data_validade: "",
    preco: "",
    quantidade: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      nome: "",
      lote: "",
      fornecedor: "",
      data_validade: "",
      preco: "",
      quantidade: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Nome do Produto
        </label>
        <Input
          placeholder="Digite o nome do produto"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
          className="w-full bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Lote
          </label>
          <Input
            placeholder="Número do lote"
            value={formData.lote}
            onChange={(e) => setFormData({ ...formData, lote: e.target.value })}
            required
            className="w-full bg-white border-gray-300 text-gray-900"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Fornecedor
          </label>
          <Input
            placeholder="Nome do fornecedor"
            value={formData.fornecedor}
            onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
            required
            className="w-full bg-white border-gray-300 text-gray-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Data de Validade
          </label>
          <Input
            type="date"
            value={formData.data_validade}
            onChange={(e) => setFormData({ ...formData, data_validade: e.target.value })}
            required
            className="w-full bg-white border-gray-300 text-gray-900"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Preço
          </label>
          <Input
            type="number"
            step="0.01"
            placeholder="R$ 0,00"
            value={formData.preco}
            onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
            required
            className="w-full bg-white border-gray-300 text-gray-900"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Quantidade
        </label>
        <Input
          type="number"
          placeholder="Quantidade em unidades"
          value={formData.quantidade}
          onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
          required
          className="w-full bg-white border-gray-300 text-gray-900"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white mt-6 h-11"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⌛</span> Adicionando...
          </span>
        ) : (
          "Adicionar Produto"
        )}
      </Button>
    </form>
  );
}