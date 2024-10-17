import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

import "../App.css";

const Principal = () => {
  return (
    <>
      <div className="home-page">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <h2 className="subheading">
          Sabor que enamora, precios que sorprenden
        </h2>
        <div className="content-section">
          <div className="image-gallery">
            <img
              src="https://comedera.com/wp-content/uploads/sites/9/2021/07/salchipapas.jpg"
              alt="Plato 1"
            />
            <img
              src="https://www.vvsupremo.com/wp-content/uploads/2016/02/900X570_Mexican-Style-Hot-Dogs.jpg"
              alt="Plato 2"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDaQGYKmf7TREeTkzI6BveG2muTk4YCo8doQ"
              alt="Plato 3"
            />
            <img
              src="https://img.freepik.com/foto-gratis/sabrosa-hamburguesa-aislada-sobre-fondo-blanco-comida-rapida-hamburguesa-fresca-carne-queso_90220-1063.jpg"
              alt="Plato 4"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Principal;
