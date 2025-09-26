export default function Estoque() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Estoque</h1>
      <p className="text-gray-600 mb-6">
        Aqui você pode gerenciar os produtos cadastrados e verificar níveis de estoque.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg shadow bg-white">
          <h2 className="font-semibold mb-2">Estoque Atual</h2>
          <p>2.847 produtos cadastrados</p>
        </div>
        <div className="p-4 border rounded-lg shadow bg-white">
          <h2 className="font-semibold mb-2">Produtos em Falta</h2>
          <p className="text-red-500 font-bold">23 itens</p>
        </div>
      </div>
    </div>
  );
}
