import React, { useState, useEffect } from "react";
import {collection,addDoc,getDocs,updateDoc,deleteDoc,doc,} from "firebase/firestore";
import { db } from "../firebase-config"; 
import "../App.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    cantidad: "",
    valorUnitario: "",
  });
  const [editandoProducto, setEditandoProducto] = useState(null);

  const productosCollectionRef = collection(db, "inventario");

  useEffect(() => {
    const obtenerProductos = async () => {
      const data = await getDocs(productosCollectionRef);
      setProductos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    obtenerProductos();
  }, []);



  return (
<div>
      <h3>Inventario Actual</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Valor Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.valorUnitario}</td>
              <td>{producto.total}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;