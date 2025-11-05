import { Activity } from "@/lib/types";

export async function getRecentActivities(): Promise<Activity[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/produtos/atividades_recentes/`);
    if (!res.ok) throw new Error('Failed to fetch recent activities');
    return await res.json();
  }