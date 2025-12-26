import { useState } from "react";
import BuscadorEquipos from "./BuscadorEquipos";
import Tabla from "./Tabla";
import KpiCard from "./KpiCard";

export default function TablaEquipos() {
  const [busqueda, setBusqueda] = useState("");

  //Datos Constantes
  const [equipos, setEquipos] = useState([
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

  const cambiarEstado = (codigo, nuevoEstado) => {
  setEquipos((prevEquipos) =>
    prevEquipos.map((equipo) =>
      equipo.codigo === codigo
        ? { ...equipo, estado: nuevoEstado }
        : equipo
    )
  );
};


  //Datos KPICards
  const totalEquipos = equipos.length;
  const operativos = equipos.filter((e) => e.estado === "Operativo").length;
  const mantenimiento = equipos.filter((e) => e.estado === "Mantenimiento").length;
  const daniados = equipos.filter((e) => e.estado === "Dañado").length;

  const equiposFiltrados = equipos.filter((equipo) =>
    Object.values(equipo)
      .join(" ")
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <section className="mt-10 mx-8">
      <div className="grid grid-cols-4 gap-6 mt-8 mb-8">
        <KpiCard title="Total Equipos" value={totalEquipos} />
        <KpiCard title="Operativos" value={operativos} />
        <KpiCard title="En Mantenimiento" value={mantenimiento} />
        <KpiCard title="Dañados" value={daniados} />
      </div>
      {/* KPIs */}
      <BuscadorEquipos onBuscar={setBusqueda} />
      <Tabla equipos={equiposFiltrados} onCambiarEstado={cambiarEstado}/>
    </section>
  );
}