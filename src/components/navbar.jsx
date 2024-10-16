import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure styles are correctly applied
import "../components.css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleRedirectToRegister = () => navigate("/registro");
  const handleRedirectToLogin = () => navigate("/login");

  return (
    <div className="navbar">
      <div className="logo">
        <p>MandiSnap</p>
      </div>
      <div className="nav-links">
        <button onClick={handleRedirectToRegister} className="nav-btn">
          Crear Cuenta
        </button>
        <button onClick={handleRedirectToLogin} className="nav-btn">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Navbar;
