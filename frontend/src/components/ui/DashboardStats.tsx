const stats = [
  { label: 'Produtos em Estoque', value: 2847 },
  { label: 'Produtos em Falta', value: 23 },
  { label: 'Valor em Estoque', value: 'R$ 45.231' },
  { label: 'Vacinas/Produtos Pulsantes', value: 10 },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="text-xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}