import { useState } from "react";

export default function EquipoForm({ onClose }) {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    categoria: "",
    fecha: "",
    responsable: "",
    descripcion: "",
    estado: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Equipo agregado:", formData);

    // Aquí puedes enviar a tu backend o levantar evento
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2 className="text-xl font-bold mb-4">Agregar Equipo</h2>

      <label>Código</label>
      <input name="codigo" onChange={handleChange} className="input" />

      <label>Nombre</label>
      <input name="nombre" onChange={handleChange} className="input" />

      <label>Categoría</label>
      <input name="categoria" onChange={handleChange} className="input" />

      <label>Fecha</label>
      <input name="fecha" type="date" onChange={handleChange} className="input" />

      <label>Responsable</label>
      <input name="responsable" onChange={handleChange} className="input" />

      <label>Descripción</label>
      <textarea name="descripcion" onChange={handleChange} className="input" />

      <label>Estado</label>
      <select name="estado" onChange={handleChange} className="input">
        <option value="">Seleccionar</option>
        <option value="Operativo">Operativo</option>
        <option value="Mantenimiento">Mantenimiento</option>
        <option value="Dañado">Dañado</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded mt-4"
      >
        Guardar
      </button>
    </form>
  );
}
