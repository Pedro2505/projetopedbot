export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold text-blue-600">FarmaControl</h2>
      <div className="flex gap-4 items-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Novo Item</button>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
      </div>
    </header>
  )
}
