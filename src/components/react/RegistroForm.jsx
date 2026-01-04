import { useState } from "react";
import Input from "./Input.jsx";
import BotonEnviar from "./BotonEnviar.jsx";
import LogoUleam from "../../assets/LogoUleam.png";

export default function RegistroForm() {
  // Estado de los campos
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");

  // Estado de errores
  const [errores, setErrores] = useState({});

  // Función para validar
  const validar = () => {
    const nuevoErrores = {};

    // Nombre obligatorio
    if (!/^[a-zA-Z\s]*$/.test(nombre)) nuevoErrores.nombre = "Nombre no válido";

    // Cédula: máximo 10 dígitos y solo números
    if (!/^\d{1,10}$/.test(cedula)) {
      nuevoErrores.cedula = "Cedula no válida";
    }

    // Correo institucional
    const correoRegex = new RegExp(`^e${cedula}@live\\.uleam\\.edu\\.ec$`);
    if (!correoRegex.test(correo)) {
      nuevoErrores.correo = "Correo no válido";
    }

    // Contraseña
    if (!contrasena) nuevoErrores.contrasena = "La contraseña es obligatoria";

    // Confirmar contraseña
    if (contrasena !== confirmar) {
      nuevoErrores.confirmar = "Las contraseñas no coinciden";
    }

    setErrores(nuevoErrores);

    return Object.keys(nuevoErrores).length === 0; // True si no hay errores
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      const datos = { nombre, cedula, correo, contrasena };

      alert("¡Registro correcto!");
      console.log("Enviado: ", datos);

      // Guardar en localStorage
      const registros = JSON.parse(
        localStorage.getItem("registrosUsuarios") || "[]"
      );
      registros.push(datos);
      localStorage.setItem("registrosUsuarios", JSON.stringify(registros));

      // Limpiar formulario
      setNombre("");
      setCedula("");
      setCorreo("");
      setContrasena("");
      setConfirmar("");
    }
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg flex flex-col items-center">
      <img src={LogoUleam.src} alt="Logo Uleam" className="w-60 mb-4" />
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Registro de Usuario
      </h2>

      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <Input
          label="Nombre Completo"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        {errores.nombre && (
          <p className="text-uleam-red text-xs">{errores.nombre}</p>
        )}

        <Input
          label="Número de Cédula"
          type="text"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
        {errores.cedula && (
          <p className="text-uleam-red text-xs">{errores.cedula}</p>
        )}

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

        <Input
          label="Confirmar Contraseña"
          type="password"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
        />
        {errores.confirmar && (
          <p className="text-uleam-red text-xs">{errores.confirmar}</p>
        )}

        <BotonEnviar text="Registrar" />
      </form>
    </div>
  );
}