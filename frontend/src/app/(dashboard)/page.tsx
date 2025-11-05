"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Plus, AlertCircle, Clock, TrendingUp } from "lucide-react";
import { getNearExpirations } from "@/services/products/getNearExpirations";
import { getDaysUntil } from "@/utils/getDaysUntil";
import { Activity, Alert, ProductTotals } from "@/lib/types";
import { getTotalProducts } from "@/services/products/getTotalProducts";
import { getRecentActivities } from "@/services/products/getRecentActivities";
import { Header } from "@/app/components/Header";
import { HospitalIcon } from "@phosphor-icons/react/dist/ssr";

export default function Dashboard() {
  const [totals, setTotals] = useState<ProductTotals>({
    total_produtos: 0,
    total_quantidade: 0
  });
  const [nearExpirations, setNearExpirations] = useState<number>(0);

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_stock':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'expiring':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'high_demand':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const refreshData = async () => {
    try {
      const [totalsData, nearExpProducts, activities] = await Promise.all([
        getTotalProducts(),
        getNearExpirations(),
        getRecentActivities()
      ]);
      
      const newAlerts: Alert[] = nearExpProducts.map(product => ({
        product: product.nome,
        message: `Vence em ${getDaysUntil(product.data_validade)} dias`,
        type: 'expiring'
      }));

      setTotals(totalsData);
      setAlerts(newAlerts);
      setNearExpirations(nearExpProducts.length);
      setRecentActivities(activities);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <main className="flex-1 p-8">
        <Header
          title="Bem-vindo ao FarmaControl"
          subtitle="Gerencie seu estoque de medicamentos de forma eficiente e segura"
          icon={HospitalIcon}
        />

        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">Produtos em Estoque</p>
                <h3 className="text-2xl font-bold">{totals.total_produtos}</h3>
                <p className="text-sm text-gray-600">
                  Quantidade total: {totals.total_quantidade} unidades
                </p>
              </div>
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
              <h3 className="text-2xl font-bold text-yellow-600">
                {nearExpirations}
              </h3>
              <span className="text-gray-500 text-xs">
                Produtos vencem em até 60 dias
              </span>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Alertas Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-3 border-b last:border-0"
                  >
                    {getAlertIcon(alert.type)}
                    <div>
                      <h4 className="font-medium">{alert.product}</h4>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                    </div>
                  </div>
                ))}
                {alerts.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    Nenhum alerta no momento
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Últimos Cadastros</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.produto}</p>
                      <p className="text-sm text-gray-600">
                        Quantidade: {activity.quantidade} unidades
                      </p>
                      {activity.detalhes && (
                        <p className="text-xs text-gray-500 mt-1">{activity.detalhes}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.data).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {recentActivities.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    Nenhum produto cadastrado recentemente
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
