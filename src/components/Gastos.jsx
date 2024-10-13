import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config"; // Asegúrate de tener Firebase configurado
import "../App.css";

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    cantidad: "",
    valorUnitario: "",
  });
  const [editandoProducto, setEditandoProducto] = useState(null);

  // Colección de Firestore donde se almacenan los productos
  const productosCollectionRef = collection(db, "inventario");

  // Cargar productos desde Firestore al cargar el componente
  useEffect(() => {
    const obtenerProductos = async () => {
      const data = await getDocs(productosCollectionRef);
      setProductos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    obtenerProductos();
  }, []);

  // Función para manejar cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({
      ...nuevoProducto,
      [name]: value,
    });
  };

  // Función para agregar un producto a Firestore
  const agregarProducto = async () => {
    const { nombre, cantidad, valorUnitario } = nuevoProducto;

    if (nombre && cantidad && valorUnitario) {
      const total = cantidad * valorUnitario;
      await addDoc(productosCollectionRef, {
        nombre,
        cantidad: parseFloat(cantidad),
        valorUnitario: parseFloat(valorUnitario),
        total: total,
      });

      // Actualiza la lista de productos con el nuevo producto
      const data = await getDocs(productosCollectionRef);
      setProductos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // Resetea el formulario
      setNuevoProducto({ nombre: "", cantidad: "", valorUnitario: "" });
    }
  };

  // Función para eliminar un producto de Firestore
  const eliminarProducto = async (id) => {
    const productoDoc = doc(db, "inventario", id);
    await deleteDoc(productoDoc);

    // Actualiza la lista de productos después de eliminar
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  // Función para seleccionar un producto para editar
  const seleccionarProductoParaEditar = (producto) => {
    setNuevoProducto({
      nombre: producto.nombre,
      cantidad: producto.cantidad,
      valorUnitario: producto.valorUnitario,
    });
    setEditandoProducto(producto.id);
  };

  // Función para actualizar un producto en Firestore
  const actualizarProducto = async () => {
    if (editandoProducto) {
      const productoDoc = doc(db, "inventario", editandoProducto);
      const { nombre, cantidad, valorUnitario } = nuevoProducto;
      const total = cantidad * valorUnitario;

      await updateDoc(productoDoc, {
        nombre,
        cantidad: parseFloat(cantidad),
        valorUnitario: parseFloat(valorUnitario),
        total: total,
      });

      // Actualiza la lista de productos después de editar
      const data = await getDocs(productosCollectionRef);
      setProductos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // Resetea el formulario
      setNuevoProducto({ nombre: "", cantidad: "", valorUnitario: "" });
      setEditandoProducto(null);
    }
  };

  return (
    <div className="inventario-page">
      <h2>Administrar Inventario</h2>
      <div className="inventario-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={nuevoProducto.nombre}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={nuevoProducto.cantidad}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="valorUnitario"
          placeholder="Valor Unitario"
          value={nuevoProducto.valorUnitario}
          onChange={handleInputChange}
        />
        {editandoProducto ? (
          <button onClick={actualizarProducto}>Actualizar Producto</button>
        ) : (
          <button onClick={agregarProducto}>Agregar Producto</button>
        )}
      </div>

      <h3>Inventario Actual</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Valor Unitario</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.valorUnitario}</td>
              <td>{producto.total}</td>
              <td>
                <button onClick={() => seleccionarProductoParaEditar(producto)}>
                  Editar
                </button>
                <button onClick={() => eliminarProducto(producto.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventario;
