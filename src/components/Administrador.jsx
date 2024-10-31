import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../App.css";

const Administrador = () => {
  const navigate = useNavigate(); // Define el hook de navegación

  const handleVerProductos = () => {
    navigate("/Productos");
  };

  const handleCerrarSesion = () => {
    navigate("/Principal");
  };

  const handleVentasClick = () => {
    navigate("/ventas");
  };
  const handleInventario = () => {
   navigate ("/inventario") 
  };
  const handleContactoClick = () => {
    navigate("/contacto");
  };
  return (
    <div>
    <div className="page">
      <header>
        <nav>
          <ul>
            <li>
              <button onClick={handleContactoClick}>Contacto</button>
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
          <button onClick={handleVerProductos}>Productos</button>
          <button onClick={handleVentasClick}>Ventas</button>
          <button onClick={handleInventario}> Inventario</button>
        </div>
        <div>
        <img
              src="https://th.bing.com/th/id/OIP.wQFQco1izbZGsWcSyy9aUQHaHa?w=173&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Admin"
              className='Admin'
            />
        </div>
      </section>
    </div>
    </div>
  );
};

export default Administrador;
