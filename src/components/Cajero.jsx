import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css"; 

const Cajero = () => {
  const navigate = useNavigate();
  const handleGastosClick = () => {
    navigate("/gastos");
  };
  const handleVentasClick = () => {
    navigate("/ventas");
  };

  return (
    <div className="cajero-page">
      <header>
        <nav>
          <ul>
            <li><Link to="/productos">Ver Productos</Link></li>
            <li><Link to="/login">Cerrar Sesión</Link></li>
            {/* <li><a href="#">Contacto</a></li> */}
          </ul>
        </nav>
        <h1>Mandi Snap</h1>
      </header>

      <section>
        <h2>Cajero</h2>
       {/*  <div className="image-gallery"> */}
         {/*  <img src="https://www.simplyrecipes.com/thmb/nl9xnNJKGPdi5HlC-_80Z9hT1Ik=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Pepperoni-Pizza-LEAD-11-b97cb3caa4d14cc7b8ff6e5323328e22.jpg" alt="Pizza" /> */}
          {/* <img src="https://i.imgur.com/qMUeM60.jpg" alt="Salchipapas" /> */}
       {/*  </div> */}

        <div className="buttons">
          <button onClick={handleGastosClick}>Gastos</button>
          <button onClick={handleVentasClick}>Ventas</button>
        </div>
      </section>
    </div>
  );
};

export default Cajero;
