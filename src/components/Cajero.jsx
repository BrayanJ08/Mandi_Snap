import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css"; 

const Cajero = () => {
  const navigate = useNavigate();

  const handleVerProductos = () => {
    navigate("/Productos");
  };
  const handleVentasClick = () => {
    navigate("/ventas");
  };
  const handleContactoClick = () => {
    navigate("/contacto");
  };
  const handleSalir = () => {
  navigate("/Principal")
  };

  return (
    <div className="page">
      <header>
        <nav>
          <ul>
            <button onClick={handleSalir}>Cerrar Sesion</button>
            <button onClick={handleContactoClick}>Contacto</button>
          </ul>
        </nav>
        <h1>Mandi Snap</h1>
      </header>

      <section>
        <h2>Cajero</h2>
        <div className="buttons">
          <button onClick={handleVerProductos}>Productos</button>
          <button onClick={handleVentasClick}>Ventas</button>
        </div>
        <div>
          <img
              src="https://th.bing.com/th?q=Cajero+Supermercado+Dibujo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=es-XL&cc=CO&setlang=es&adlt=strict&t=1&mw=247"
              alt="Cajero"
              className='Cajero'
            />
        </div>
      </section>
    </div>
  );
};

export default Cajero;
