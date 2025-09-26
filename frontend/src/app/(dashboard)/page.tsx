"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Bell, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      

      {/* Main */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Bem-vindo ao FarmaControl</h2>
          <div className="flex gap-3">
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" /> Notificações
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" /> Novo Item
            </Button>
          </div>
        </header>

        <p className="text-gray-600 mb-6">
          Gerencie seu estoque de medicamentos de forma eficiente e segura
        </p>

        {/* Ações rápidas */}
        <div className="flex gap-3 mb-6">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" /> Adicionar Medicamento
          </Button>
          <div className="flex items-center border rounded-lg px-3">
            <Search className="w-4 h-4 text-gray-400" />
            <Input placeholder="Buscar Produto" className="border-0 focus:ring-0" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" /> Filtrar Estoque
          </Button>
        </div>

        {/* Cards resumo */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total de Produtos</p>
              <h3 className="text-2xl font-bold">2,847</h3>
              <span className="text-green-600 text-xs">
                +12% em relação ao mês anterior
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Produtos em Falta</p>
              <h3 className="text-2xl font-bold text-red-600">23</h3>
              <span className="text-red-500 text-xs">
                Requer atenção imediata
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Vendas do Mês</p>
              <h3 className="text-2xl font-bold">R$ 45.231</h3>
              <span className="text-green-600 text-xs">
                +8.2% comparado ao mês anterior
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Vencimentos Próximos</p>
              <h3 className="text-2xl font-bold text-yellow-600">15</h3>
              <span className="text-gray-500 text-xs">
                Produtos vencem em 30 dias
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Alertas e atividades */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Alertas Importantes</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="font-medium">Paracetamol 500mg</p>
                  <p className="text-sm text-gray-600">
                    Estoque crítico: 5 unidades
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="font-medium">Dipirona 500mg</p>
                  <p className="text-sm text-gray-600">Vence em 15 dias</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="font-medium">Ibuprofeno 600mg</p>
                  <p className="text-sm text-gray-600">
                    Alta demanda detectada
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Atividade Recente</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="font-medium">Entrada de estoque:</span>{" "}
                  Amoxicilina 500mg - 100 unidades
                  <span className="text-gray-500 ml-2">2h atrás</span>
                </li>
                <li>
                  <span className="font-medium">Venda realizada:</span>{" "}
                  Paracetamol 750mg - 2 unidades
                  <span className="text-gray-500 ml-2">4h atrás</span>
                </li>
                <li>
                  <span className="font-medium">Ajuste de estoque:</span>{" "}
                  Losartana 50mg - Correção manual
                  <span className="text-gray-500 ml-2">1d atrás</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
