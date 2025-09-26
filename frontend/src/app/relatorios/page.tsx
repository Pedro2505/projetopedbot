export default function Relatorios() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Relatórios</h1>
      <p className="text-gray-600 mb-6">
        Gere relatórios de estoque, vendas e fornecedores para análise detalhada.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg shadow bg-white">
          <h2 className="font-semibold">Relatório de Estoque</h2>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Gerar PDF
          </button>
        </div>
        <div className="p-4 border rounded-lg shadow bg-white">
          <h2 className="font-semibold">Relatório de Vendas</h2>
          <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
            Exportar Excel
          </button>
        </div>
        <div className="p-4 border rounded-lg shadow bg-white">
          <h2 className="font-semibold">Relatório Financeiro</h2>
          <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded">
            Visualizar
          </button>
        </div>
      </div>
    </div>
  );
}
