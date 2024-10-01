import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './Principal';
import Registro from './Registro';
import Login from './Login';
import Cajero from './Cajero';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cajero" element={<Cajero />} />
      </Routes>
    </Router>
  );
}

export default App;
