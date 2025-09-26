const activities = [
  { action: 'Entrada de estoque', detail: '50 unidades de Paracetamol 500mg', time: '2 horas atrás' },
  { action: 'Venda realizada', detail: '2 unidades de Dipirona 500mg', time: '3 horas atrás' },
  { action: 'Alerta de estoque', detail: 'Amoxicilina 500mg', time: '4 horas atrás' },
]

export default function RecentActivity() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">📋 Atividades Recentes</h3>
      <ul className="space-y-2">
        {activities.map((activity, index) => (
          <li key={index} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{activity.action}</p>
            <p className="text-sm text-gray-600">{activity.detail} – {activity.time}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
