import { Alert } from "@/lib/types";
import { getLowStockProducts } from "./getLowStockProducts";
import { getNearExpirations } from "./getNearExpirations";
import { getHighDemandProducts } from "./getHighDemandProducts";
import { getDaysUntil } from "@/utils/getDaysUntil";

export async function getAlerts(): Promise<Alert[]> {
    const [lowStock, nearExpiration, highDemand] = await Promise.all([
      getLowStockProducts(),
      getNearExpirations(),
      getHighDemandProducts()
    ]);

    return [
      ...lowStock.map(p => ({
        product: p.nome,
        message: `Estoque crítico: ${p.quantidade} unidades`,
        type: 'low_stock' as const
      })),
      ...nearExpiration.map(p => ({
        product: p.nome,
        message: `Vence em ${getDaysUntil(p.data_validade)} dias`,
        type: 'expiring' as const
      })),
      ...highDemand.map(p => ({
        product: p.nome,
        message: 'Alta demanda detectada',
        type: 'high_demand' as const
      }))
    ];
  }