export default function QuickActions() {
  return (
    <div className="flex gap-4 mt-6">
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Adicionar Medicamento</button>
      <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Buscar Produtos</button>
      <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Filtrar Estoque</button>
    </div>
  )
}