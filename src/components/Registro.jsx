import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-config"; // Importa Firestore (db)
import { doc, setDoc } from "firebase/firestore"; // Importa setDoc y doc
import { useNavigate } from "react-router-dom";
import "../App.css";

const Registro = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState(""); // Nuevo campo de nombre
  const [apellido, setApellido] = useState(""); // Nuevo campo de apellido
  const [direccion, setDireccion] = useState(""); // Nuevo campo de dirección
  const [recuperacionEmail, setRecuperacionEmail] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Crear el usuario con correo y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Actualizar el perfil del usuario con nombre y apellido
      await updateProfile(user, {
        displayName: `${nombre} ${apellido}`, // Almacena el nombre completo en el perfil del usuario
      });

      // Almacenar datos adicionales del usuario en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        // Aquí se usa user.uid directamente
        nombre,
        apellido,
        email,
        direccion,
        rol: null,
      });

      alert("Usuario registrado correctamente");
      navigate("/"); // Redirigir a la página principal o donde quieras
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegresar = () => {
    navigate("/");
  };

  return (
    <div className="register">
      <header className="header-principal">
        <h1 className="logo-title">MANDI SNAP</h1>
      </header>
      <div className="register-container">
        <form onSubmit={handleRegistro} className="register-form">
          <h2>Registro de usuario</h2>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input
              type="text"
              name="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Repetir Contraseña</label>
            <input
              type="password"
              name="repetirContraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Correo de Recuperación</label>
            <input
              type="email"
              name="correoRecuperacion"
              value={recuperacionEmail}
              onChange={(e) => setRecuperacionEmail(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="btn">
            Registrarse
          </button>
          <button onClick={handleRegresar} className="btn-regresar">
            Inicio
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
