import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import "../App.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hook para navegar entre rutas
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleRedirectToCajero();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRedirectToRegister = () => {
    // Redirige al componente de registro
    navigate("/registro");
  };

  const handleRedirectToCajero = () => {
    // Redirige al componente de registro
    navigate("/cajero");
  };

  return (
    <div className="login">
      <header className="header-principal">
        <h1 className="logo-title">Iniciar Sesión</h1>
      </header>
      <form onSubmit={handleLogin} className="register-form">
        {" "}
        {/* Usando la misma clase que el registro */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {
          <div className="form-group">
            {/* <input
            type="checkbox"
            name="validacion"
            checked={validacion}
            onChange={(e) => setValidacion(e.target.checked)}
          /> */}
            <label>Validación de cuenta</label>
          </div>
        }
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="btn">
          Iniciar Sesión
        </button>
      </form>
      <p>
        ¿No tienes cuenta? Regístrate aquí
        <button onClick={handleRedirectToRegister}>Registrarse</button>
      </p>
      <p>
        <a href="#">Recuperar la contraseña</a>
      </p>
    </div>
  );
};

export default Login;
