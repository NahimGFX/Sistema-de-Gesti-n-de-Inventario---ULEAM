export default function FilaEquipo({ equipo, onCambiarEstado, onEditar }) {
  return (
    <tr className="border-t border-neutral-200 hover:bg-gray-50 text-center">
      <td className="p-3">{equipo.codigo}</td>
      <td className="p-3">{equipo.nombre}</td>
      <td className="p-3">{equipo.categoria}</td>
      <td className="p-3">{equipo.fecha}</td>
      <td className="p-3">{equipo.responsable}</td>
      <td className="p-3">{equipo.descripcion}</td>
      <td className="p-3 font-semibold">{equipo.estado}</td>

      <td className="p-3 flex gap-2 justify-center">
        <button
          onClick={() => onEditar(equipo)}
          className="text-white bg-uleam-gray px-2 py-1 rounded-md hover:bg-uleam-red transition cursor-pointer"
        >
          Editar
        </button>
        <button
          onClick={() => onCambiarEstado(equipo.codigo, "Operativo")}
          className="text-white bg-uleam-gray px-2 py-1 rounded-md hover:bg-uleam-red transition cursor-pointer"
        >
          Operativo
        </button>
        <button
          onClick={() => onCambiarEstado(equipo.codigo, "Mantenimiento")}
          className="text-white bg-uleam-gray px-2 py-1 rounded-md hover:bg-uleam-red transition cursor-pointer"
        >
          Mantenimiento
        </button>
        <button
          onClick={() => onCambiarEstado(equipo.codigo, "Dañado")}
          className="text-white bg-uleam-gray px-2 py-1 rounded-md hover:bg-uleam-red transition cursor-pointer"
        >
          Dañado
        </button>
      </td>
    </tr>
  );
}
