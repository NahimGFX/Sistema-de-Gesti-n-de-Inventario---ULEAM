export default function Navbar() {
  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogeado");
    window.location.href = "/";
  };

  return (
    <nav className="bg-uleam-red text-white px-8 py-5 shadow-md">
      <div className="flex items-center justify-between font-semibold">
        <span className="flex items-center gap-3 text-lg tracking-wide">
          Sistema de Gestión de Inventario - ULEAM
        </span>

        <button
          className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition"
          onClick={cerrarSesion}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
