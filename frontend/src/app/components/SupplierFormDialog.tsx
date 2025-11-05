"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Supplier } from "@/lib/types";
import { updateSupplier } from "@/services/suppliers/updateSupplier";
import { createSupplier } from "@/services/suppliers/createSupplier";

interface Props {
  initial?: Supplier | null;
  onSaved?: () => Promise<void> | void;
  triggerLabel?: string;
}

export function SupplierFormDialog({ initial = null, onSaved, triggerLabel = "Adicionar Fornecedor" }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Supplier>({
    nome: "",
    contato: "",
    email: "",
    telefone: "",
    endereco: "",
    observacoes: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({ ...initial });
    } else {
      setForm({
        nome: "",
        contato: "",
        email: "",
        telefone: "",
        endereco: "",
        observacoes: "",
      });
    }
  }, [initial, open]);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!form.nome.trim()) {
      alert("Nome é obrigatório");
      return;
    }
    try {
      setLoading(true);
      if (initial && initial.id) {
        await updateSupplier(initial.id, form);
        alert("Fornecedor atualizado");
      } else {
        await createSupplier(form);
        alert("Fornecedor criado");
      }
      setOpen(false);
      if (onSaved) await onSaved();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar fornecedor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{initial ? "Editar Fornecedor" : "Adicionar Fornecedor"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="text-sm text-gray-700">Nome *</label>
            <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
          </div>

          <div>
            <label className="text-sm text-gray-700">Contato</label>
            <Input value={form.contato} onChange={(e) => setForm({ ...form, contato: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-700">Telefone</label>
              <Input value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Endereço</label>
            <Input value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} />
          </div>

          <div>
            <label className="text-sm text-gray-700">Observações</label>
            <Input value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancelar</Button>
            <Button type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}