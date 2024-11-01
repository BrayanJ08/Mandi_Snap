import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Registro = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [recuperacionEmail, setRecuperacionEmail] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const tempUserId = `temp_${Date.now()}`; 

    try {
      await setDoc(doc(db, "usuarios", tempUserId), {
        nombre,
        apellido,
        email,
        direccion,
        rol: null,
      });

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        apellido,
        email,
        direccion,
        rol: null,
      });

      await updateProfile(user, {
        displayName: `${nombre} ${apellido}`,
      });

      await deleteDoc(doc(db, "usuarios", tempUserId));

      alert("Usuario registrado correctamente");
      navigate("/");
    } catch (error) {
      setError(error.message);

      await deleteDoc(doc(db, "usuarios", tempUserId)).catch((err) => {
        console.error("Error al eliminar el documento temporal:", err);
      });
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
