export default function BuscadorEquipos({ onBuscar, onAgregar }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Buscar equipo..."
        onChange={(e) => onBuscar(e.target.value)}
        className="w-72 px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-uleam-red"
      />

      <button
        onClick={onAgregar}
        
        className="bg-uleam-red text-white px-4 py-2 rounded-md hover:opacity-90"
      >
        + Agregar Equipo
      </button>
    </div>
  );
}
