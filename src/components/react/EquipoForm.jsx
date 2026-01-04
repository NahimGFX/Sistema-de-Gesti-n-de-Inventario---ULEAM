import { useEffect, useState } from "react";

export default function EquipoForm({ onAgregar, equipoInicial }) {
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    categoria: "",
    fecha: "",
    responsable: "",
    descripcion: "",
    estado: "Operativo",
  });

  //Detectar edición
  const editando = Boolean(equipoInicial);

  //Cargar datos cuando se edita
  useEffect(() => {
    if (equipoInicial) {
      setForm(equipoInicial);
    }
  }, [equipoInicial]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregar(form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Grid principal */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Código"
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            disabled={editando}
          />

          <Input
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />

          <Input
            label="Categoría"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
          />

          <Input
            label="Fecha"
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
          />

          <Input
            label="Responsable"
            name="responsable"
            value={form.responsable}
            onChange={handleChange}
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows="3"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-uleam-red"
          />
        </div>

        {/* Estado */}
        <div>
          <label className="text-sm font-medium text-gray-700">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-uleam-red"
          >
            <option>Operativo</option>
            <option>Mantenimiento</option>
            <option>Dañado</option>
          </select>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="bg-uleam-red text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
          >
            {editando ? "Guardar Cambios" : "Agregar Equipo"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* Input reutilizable */
function Input({ label, disabled = false, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        disabled={disabled}
        className={`mt-1 rounded-lg border border-gray-300 p-2 
          focus:outline-none focus:ring-2 focus:ring-uleam-red
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      />
    </div>
  );
}
