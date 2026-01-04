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
  const [equipoEditando, setEquipoEditando] = useState(null);

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

  const editarEquipo = (equipoActualizado) => {
    setEquipos((prev) =>
      prev.map((e) =>
        e.codigo === equipoActualizado.codigo ? equipoActualizado : e
      )
    );
    setEquipoEditando(null);
    setMostrarModal(false);
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

      <Tabla
        equipos={equiposFiltrados}
        onCambiarEstado={cambiarEstado}
        onEditar={(equipo) => {
          setEquipoEditando(equipo);
          setMostrarModal(true);
        }}
      />

      {mostrarModal && (
        <Modal
          onClose={() => {
            setMostrarModal(false);
            setEquipoEditando(null);
          }}
        >
          <h2 className="text-xl font-semibold mb-4">
            {equipoEditando ? "Editar Equipo" : "Agregar Equipo"}
          </h2>

          <EquipoForm
            equipoInicial={equipoEditando}
            onAgregar={equipoEditando ? editarEquipo : agregarEquipo}
          />
        </Modal>
      )}
    </section>
  );
}
