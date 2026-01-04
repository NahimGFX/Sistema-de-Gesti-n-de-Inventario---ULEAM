import FilaEquipo from "./FilaEquipo";

export default function Tabla({ equipos, onCambiarEstado, onEditar }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <table className="min-w-full border border-gray-200 text-center">
        <thead className="bg-uleam-red text-white">
          <tr>
            <th className="p-3">Código</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Categoría</th>
            <th className="p-3">Fecha</th>
            <th className="p-3">Responsable</th>
            <th className="p-3">Descripción</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {equipos.length > 0 ? (
            equipos.map((equipo, index) => (
              <FilaEquipo
                key={index}
                equipo={equipo}
                onCambiarEstado={onCambiarEstado}
                onEditar={onEditar}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-6 text-gray-500">
                No se encontraron equipos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
