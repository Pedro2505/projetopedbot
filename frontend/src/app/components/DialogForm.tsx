"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { ProductForm } from "./ProductForm";
import { createProduct } from "@/services/products/createProduct";

interface DialogFormProps {
    onSaved?: () => Promise<void> | void;
}

export function DialogForm({ onSaved }: DialogFormProps) {
    const [loading, setLoading] = useState<boolean>(false);

    const handleAddProduct = async (formData: any) => {
        try {
            setLoading(true);
            await createProduct(formData);
            alert("✅ Produto adicionado com sucesso!");
            if (onSaved) await onSaved();
        } catch (err) {
            console.error(err);
            alert("Erro ao cadastrar produto.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="w-4 h-4 mr-2" /> Adicionar Medicamento
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border shadow-lg max-w-[500px] p-6">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-bold text-gray-900">
                        Adicionar Novo Medicamento
                    </DialogTitle>
                    <p className="text-sm text-gray-500">
                        Preencha os dados do novo medicamento no estoque
                    </p>
                </DialogHeader>
                <ProductForm onSubmit={handleAddProduct} loading={loading} />
            </DialogContent>
        </Dialog>
    );
}