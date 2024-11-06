import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Principal from "./components/Principal";
import Cajero from "./components/Cajero";
import Gastos from "./components/Productos";
import Ventas from "./components/Ventas";
import Administrador from "./components/Administrador";
import Contacto from "./components/Contacto";
import Productos from "./components/Productos";
import Inventario from "./components/Inventario";
import OpcionesPago from "./components/Opciones_Pago";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Principal" replace />} />
        <Route path="/Principal" element={<Principal />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cajero" element={<Cajero />} />
        <Route path="/gastos" element={<Gastos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/OpcionePago" element={<OpcionesPago />} />
      </Routes>
    </Router>
  );
}

export default App;
