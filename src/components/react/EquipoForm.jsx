import { useEffect, useState } from "react";

export default function EquipoForm({ onAgregar, equipoInicial }) {
  const [errores, setErrores] = useState({});
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
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validar()) return;

    onAgregar(form);
  };

  //Validaciones
  const validar = () => {
    const nuevosErrores = {};

    if (!form.codigo.trim()) nuevosErrores.codigo = "El código es obligatorio";
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.categoria.trim())
      nuevosErrores.categoria = "La categoría es obligatoria";
    if (!form.fecha) nuevosErrores.fecha = "La fecha es obligatoria";
    if (!form.responsable.trim())
      nuevosErrores.responsable = "El responsable es obligatorio";
    if (form.descripcion.trim().length < 10)
      nuevosErrores.descripcion =
        "La descripción debe tener al menos 10 caracteres";

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Grid principal */}
        <div className="grid grid-cols-2 gap-4">
          {/* Código */}
          <div className="flex flex-col">
            <Input
              label="Código"
              name="codigo"
              value={form.codigo}
              onChange={handleChange}
              disabled={editando}
            />
            <p className="min-h-4 text-xs text-red-500">
              {errores.codigo || ""}
            </p>
          </div>

          {/* Nombre */}
          <div className="flex flex-col">
            <Input
              label="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
            <p className="min-h-4 text-xs text-red-500">
              {errores.nombre || ""}
            </p>
          </div>

          {/* Categoría */}
          <div className="flex flex-col">
            <Input
              label="Categoría"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
            />
            <p className="min-h-4 text-xs text-red-500">
              {errores.categoria || ""}
            </p>
          </div>

          {/* Fecha */}
          <div className="flex flex-col">
            <Input
              label="Fecha"
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
            />
            <p className="min-h-4 text-xs text-red-500">
              {errores.fecha || ""}
            </p>
          </div>

          {/* Responsable */}
          <div className="flex flex-col">
            <Input
              label="Responsable"
              name="responsable"
              value={form.responsable}
              onChange={handleChange}
            />
            <p className="min-h-4 text-xs text-red-500">
              {errores.responsable || ""}
            </p>
          </div>
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
          {errores.descripcion && (
            <p className="text-xs text-red-500">{errores.descripcion}</p>
          )}
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
