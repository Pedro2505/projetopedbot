const alerts = [
  { name: 'Paracetamol 500mg', type: 'Baixo estoque', info: '5 unidades restantes' },
  { name: 'Dipirona 500mg', type: 'Vencimento próximo', info: 'Expira em 2 dias' },
  { name: 'Amoxicilina 500mg', type: 'Baixo estoque', info: '8 unidades restantes' },
]

export default function Alerts() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">🔔 Alertas</h3>
      <ul className="space-y-2">
        {alerts.map((alert) => (
          <li key={alert.name} className="bg-red-100 p-4 rounded shadow">
            <p className="font-semibold">{alert.name}</p>
            <p className="text-sm text-red-700">{alert.type}: {alert.info}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
