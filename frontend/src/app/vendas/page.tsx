export default function Vendas() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💰 Vendas</h1>
      <p className="text-gray-600 mb-6">
        Consulte suas vendas e métricas mensais.
      </p>

      <div className="p-4 border rounded-lg shadow bg-white">
        <h2 className="font-semibold">Resumo do Mês</h2>
        <p className="text-lg font-bold text-green-600">R$ 45.231</p>
        <p className="text-sm text-gray-500">+8.2% em relação ao mês anterior</p>
      </div>
    </div>
  );
}
