import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Incluye los estilos aquí también

const Registro = () => {
  return (
    <div className="register">
      <header className="header-principal">
        <h1 className="logo-title">MANDI SNAP</h1>
      </header>
      <form className="register-form">
        <div className="form-group">
          <label>Usuario</label>
          <input type="text" name="usuario" />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" name="contraseña" />
        </div>
        <div className="form-group">
          <label>Repetir Contraseña</label>
          <input type="password" name="repetirContraseña" />
        </div>
        <div className="form-group">
          <label>Rol</label>
          <input type="text" name="rol" />
        </div>
        <div className="form-group">
          <label>Correo de Recuperación</label>
          <input type="email" name="correoRecuperacion" />
        </div>
        <button type="submit" className="btn">Registrarse</button>
      </form>
     {/*  <div className="image-gallery"> */}
        {/* Inserta imágenes aquí si es necesario */}
     {/*  </div> */}
    </div>
  );
};

export default Registro;
