import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../App.css";

const Administrador = () => {
  const navigate = useNavigate(); // Define el hook de navegación

  const handleVerProductos = () => {
    navigate("/productos");
  };

  const handleCerrarSesion = () => {
    navigate("/login");
  };

  const handleGastosClick = () => {
    navigate("/gastos");
  };
  const handleVentasClick = () => {
    navigate("/ventas");
  };

  return (
    <div className="administrador-page">
      <header>
        <nav>
          <ul>
            <li>
              <button onClick={handleVerProductos}>Ver Productos</button>
            </li>
            <li>
              <button onClick={handleCerrarSesion}>Cerrar Sesión</button>
            </li>
          </ul>
        </nav>
        <h1>Mandy Snap</h1>
      </header>
      <section>
        <h2>Administrador</h2>
        <div className="buttons">
          <button onClick={handleGastosClick}>Gastos</button>
          <button onClick={handleVentasClick}>Ventas</button>
          <button>Ingresos</button>
        </div>
      </section>
    </div>
  );
};

export default Administrador;
