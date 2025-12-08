import { useState } from "react";
import Input from "./Input.jsx";
import BotonEnviar from "./BotonEnviar.jsx";
import LogoUleam from "../../assets/LogoUleam.png";

export default function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errores, setErrores] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();

    const nuevoErrores = {};

    if (!correo) nuevoErrores.correo = "El correo es obligatorio";
    if (!contrasena) nuevoErrores.contrasena = "La contraseña es obligatoria";

    if (Object.keys(nuevoErrores).length > 0) {
      setErrores(nuevoErrores);
      return;
    }

    const registros = JSON.parse(
      localStorage.getItem("registrosUsuarios") || "[]"
    );

    const usuario = registros.find((u) => u.correo === correo);

    if (!usuario) {
      setErrores({ correo: "El usuario no existe" });
      return;
    }

    if (usuario.contrasena !== contrasena) {
      setErrores({ contrasena: "Contraseña incorrecta" });
      return;
    }

    alert("Inicio de sesión exitoso");
    console.log("Usuario logueado:", usuario);

    // REDIRECCIÓN AL DASHBOARD
    window.location.href = "/dashboard";

    // Limpieza
    setCorreo("");
    setContrasena("");
    setErrores({});
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg flex flex-col items-center">
      <img src={LogoUleam.src} alt="Logo Uleam" className="w-60 mb-4" />
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Iniciar Sesión
      </h2>

      <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
        <Input
          label="Correo Institucional"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        {errores.correo && (
          <p className="text-uleam-red text-xs">{errores.correo}</p>
        )}

        <Input
          label="Contraseña"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        {errores.contrasena && (
          <p className="text-uleam-red text-xs">{errores.contrasena}</p>
        )}

        <BotonEnviar text="Entrar" />
      </form>
    </div>
  );
}