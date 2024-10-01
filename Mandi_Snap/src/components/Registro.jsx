import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config"; // Asegúrate de que la ruta sea correcta
import "../App.css"; // Incluye los estilos aquí también

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nueva variable de estado para confirmar la contraseña
  const [error, setError] = useState("");
  const [rol, setRol] = useState(""); // Estado para el rol
  const [recuperacionEmail, setRecuperacionEmail] = useState(""); // Estado para el correo de recuperación

  const handleRegistro = async (e) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuario registrado correctamente");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register">
      <header className="header-principal">
        <h1 className="logo-title">MANDI SNAP</h1>
      </header>
      <form onSubmit={handleRegistro} className="register-form">
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            name="usuario"
            value={rol} // Cambié para que use el estado
            onChange={(e) => setRol(e.target.value)} // Maneja el cambio
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Maneja el cambio
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Maneja el cambio
          />
        </div>
        <div className="form-group">
          <label>Repetir Contraseña</label>
          <input
            type="password"
            name="repetirContraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Maneja el cambio
          />
        </div>
        <div className="form-group">
          <label>Correo de Recuperación</label>
          <input
            type="email"
            name="correoRecuperacion"
            value={recuperacionEmail}
            onChange={(e) => setRecuperacionEmail(e.target.value)} // Maneja el cambio
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Muestra el error si existe */}
        <button type="submit" className="btn">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
