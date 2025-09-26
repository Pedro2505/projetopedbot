export default function Fornecedores() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏭 Fornecedores</h1>
      <p className="text-gray-600 mb-6">
        Cadastre e gerencie seus fornecedores de medicamentos.
      </p>

      <ul className="space-y-4">
        <li className="p-4 border rounded-lg shadow bg-white">
          <h2 className="font-semibold">Farmacorp Ltda</h2>
          <p className="text-sm text-gray-500">Contato: contato@farmacorp.com</p>
        </li>
        <li className="p-4 border rounded-lg shadow bg-white">
          <h2 className="font-semibold">Saúde+ Distribuidora</h2>
          <p className="text-sm text-gray-500">Contato: vendas@saudemais.com</p>
        </li>
      </ul>
    </div>
  );
}
