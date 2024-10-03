import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Administrador = () =>{
    return (
        <div className="administrador-page">
            <header>
                <nav>
                    <ul>
                        <li><link to="/productos">Ver Productos</link></li>
                        <li><link to="/Login">Cerrar Sesión</link></li>
                    </ul>
                </nav>
                <h1>Mandy Snap</h1>
            </header>
            <section>
                <h2>Administrador</h2>
                <div className="buttons">
                    <button>Gastos</button>
                    <button>Ventas</button>
                    <button>Ingresos</button>
                </div>
            </section>
        </div>
    );
};

export default Administrador;