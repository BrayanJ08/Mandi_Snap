import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [validacion, setValidacion] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); // Hook de navegación

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === '' || contraseña === '') {
      setError('Por favor, ingresa todos los campos');
    } else {
      setError(null);
      alert('Iniciaste sesión correctamente');
      navigate('/cajero'); // Redirigir a la página de Cajero
    }
  };

  return (
    <div className="login">
      <header>
        <h1>Iniciar Sesión</h1>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/registro">Crear Cuenta</Link></li>
          </ul>
        </nav>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input type="text" name="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" name="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
        </div>
        <div>
          <input type="checkbox" name="validacion" checked={validacion} onChange={(e) => setValidacion(e.target.checked)} />
          <label>Validación de cuenta</label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p><Link to="/registro">¿No tienes cuenta? Regístrate aquí</Link></p>
      <p><a href="#">Recuperar la contraseña</a></p>
    </div>
  );
};

export default Login;
