import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "usuarios", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.rol === "admin") {
          navigate("/administrador");
        } else {
          navigate("/cajero");
        }
      } else {
        setError(
          "No se encontró la información del usuario en la base de datos."
        );
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      } else if (error.code === "auth/user-not-found") {
        setError("No se encontró una cuenta con este correo.");
      } else {
        setError("Error al iniciar sesión: " + error.message);
      }
    }
  };

  const handleRedirectToRegister = () => {
    navigate("/registro");
  };

  return (
    <div className="login">
      <header className="header-principal">
        <h1 className="logo-title">Iniciar Sesión</h1>
      </header>
      <form onSubmit={handleLogin} className="register-form">
        <div className="form-group">
          <label>Email</label>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="btn">
          Iniciar Sesión
        </button>
      </form>
      <p>
        ¿No tienes cuenta? Regístrate aquí
        <h1></h1>
        <button onClick={handleRedirectToRegister}>Registrarse</button>
      </p>

    </div>
  );
};

export default Login;
