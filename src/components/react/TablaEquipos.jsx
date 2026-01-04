import { useState, useEffect } from "react";
import BuscadorEquipos from "./BuscadorEquipos";
import Tabla from "./Tabla";
import KpiCard from "./KpiCard";
import Modal from "./Modal";
import EquipoForm from "./EquipoForm";

export default function TablaEquipos() {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("equipos");

    if (datosGuardados) {
      setEquipos(JSON.parse(datosGuardados));
    } else {
      setEquipos([
        {
          codigo: "EQ-001",
          nombre: "Computadora Dell",
          categoria: "Informática",
          fecha: "2024-01-15",
          responsable: "Carlos Mendoza",
          descripcion: "Equipo en buen estado",
          estado: "Operativo",
        },
        {
          codigo: "EQ-002",
          nombre: "Impresora Epson",
          categoria: "Oficina",
          fecha: "2024-02-10",
          responsable: "Ana Torres",
          descripcion: "Requiere revisión",
          estado: "Mantenimiento",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("equipos", JSON.stringify(equipos));
  }, [equipos]);

  const cambiarEstado = (codigo, nuevoEstado) => {
    setEquipos((prev) =>
      prev.map((e) => (e.codigo === codigo ? { ...e, estado: nuevoEstado } : e))
    );
  };

  const agregarEquipo = (nuevoEquipo) => {
    setEquipos((prev) => [...prev, nuevoEquipo]);
    setMostrarModal(false);
  };

  const equiposFiltrados = equipos.filter((e) =>
    Object.values(e).join(" ").toLowerCase().includes(busqueda.toLowerCase())
  );

  const total = equipos.length;
  const operativos = equipos.filter((e) => e.estado === "Operativo").length;
  const mantenimiento = equipos.filter(
    (e) => e.estado === "Mantenimiento"
  ).length;
  const daniados = equipos.filter((e) => e.estado === "Dañado").length;

  return (
    <section className="mt-10 mx-8">
      <div className="grid grid-cols-4 gap-6 mb-8">
        <KpiCard title="Total Equipos" value={total} />
        <KpiCard title="Operativos" value={operativos} />
        <KpiCard title="Mantenimiento" value={mantenimiento} />
        <KpiCard title="Dañados" value={daniados} />
      </div>

      <BuscadorEquipos
        onBuscar={setBusqueda}
        onAgregar={() => setMostrarModal(true)}
      />

      <Tabla equipos={equiposFiltrados} onCambiarEstado={cambiarEstado} />

      {mostrarModal && (
        <Modal onClose={() => setMostrarModal(false)}>
          <h2 className="text-xl font-semibold mb-4">Agregar Equipo</h2>
          <EquipoForm
            onAgregar={agregarEquipo}
            onCancelar={() => setMostrarModal(false)}
          />
        </Modal>
      )}
    </section>
  );
}
