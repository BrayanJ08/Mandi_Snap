import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Asegúrate de que esté importando los estilos correctos

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [validacion, setValidacion] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === '' || contraseña === '') {
      setError('Por favor, ingresa todos los campos');
    } else {
      setError(null);
      alert('Iniciaste sesión correctamente');
    }
  };

  return (
    <div className="login">
      <header className="header-principal">
        <h1 className="logo-title">Iniciar Sesión</h1>
      </header>
      <form onSubmit={handleSubmit} className="register-form"> {/* Usando la misma clase que el registro */}
        <div className="form-group">
          <label>Usuario</label>
          <input type="text" name="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" name="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="checkbox" name="validacion" checked={validacion} onChange={(e) => setValidacion(e.target.checked)} />
          <label>Validación de cuenta</label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn">Iniciar Sesión</button>
      </form>
      <p><Link to="/registro">¿No tienes cuenta? Regístrate aquí</Link></p>
      <p><a href="#">Recuperar la contraseña</a></p>
    </div>
  );
};

export default Login;
