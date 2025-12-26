export default function BuscadorEquipos({ onBuscar }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder="Buscar equipo..."
        onChange={(e) => onBuscar(e.target.value)}
        className="w-72 px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-uleam-red"
      />

      <button
        className="bg-uleam-red text-white px-5 py-2 rounded-lg font-semibold
                   hover:bg-red-700 transition"
      >
        + Agregar Equipo
      </button>
    </div>
  );
}
