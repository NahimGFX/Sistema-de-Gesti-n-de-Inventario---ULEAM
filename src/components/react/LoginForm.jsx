import { useState, useEffect } from "react";
import Input from "./Input.jsx";
import BotonEnviar from "./BotonEnviar.jsx";
import LogoUleam from "../../assets/LogoUleam.png";

export default function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errores, setErrores] = useState({});

  // USUARIO CONSTANTE
  useEffect(() => {
    const registros = JSON.parse(
      localStorage.getItem("registrosUsuarios") || "[]"
    );

    const usuarioAdmin = {
      correo: "e1312500067@live.uleam.edu.ec",
      contrasena: "123456",
    };

    const existe = registros.some((u) => u.correo === usuarioAdmin.correo);

    if (!existe) {
      registros.push(usuarioAdmin);
      localStorage.setItem("registrosUsuarios", JSON.stringify(registros));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrores({});

    const nuevosErrores = {};

    if (!correo) nuevosErrores.correo = "El correo es obligatorio";
    if (!contrasena) nuevosErrores.contrasena = "La contraseña es obligatoria";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
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

    // REDIRECCIÓN
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
        <div>
          <Input
            label="Correo Institucional"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          {errores.correo && (
            <p className="text-uleam-red text-xs mt-1">{errores.correo}</p>
          )}
        </div>

        <div>
          <Input
            label="Contraseña"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          {errores.contrasena && (
            <p className="text-uleam-red text-xs mt-1">{errores.contrasena}</p>
          )}
        </div>

        <BotonEnviar text="Entrar" />
      </form>
    </div>
  );
}
