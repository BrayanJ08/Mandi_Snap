import React, { useState, useEffect } from "react";
import { db } from "../firebase-config"; // Asegúrate de que tienes la referencia a Firestore
import { addDoc, collection } from "firebase/firestore"; // Importa addDoc y collection
import { auth } from "../firebase-config"; // Asegúrate de que tienes la referencia a Firebase Auth

const Ventas = () => {
  const [productos, setProductos] = useState([
    { nombre: "Hamburguesas", valorUnitario: 5000 },
    { nombre: "Perros", valorUnitario: 3000 },
    { nombre: "Perras", valorUnitario: 3500 },
    { nombre: "Salchipapas", valorUnitario: 4000 },
    { nombre: "Picada", valorUnitario: 6000 },
    { nombre: "Combo 1", valorUnitario: 8000 },
    { nombre: "Combo 2", valorUnitario: 10000 },
  ]);

  const [ventas, setVentas] = useState([
    { producto: null, cantidad: 0, total: 0 },
  ]);
  const [totalVentas, setTotalVentas] = useState(0);
  const [usuarioId, setUsuarioId] = useState(""); // ID del usuario que realiza la compra

  useEffect(() => {
    const user = auth.currentUser; // Obtiene el usuario autenticado
    if (user) {
      setUsuarioId(user.uid); // Almacena el ID del usuario
    }
  }, []);

  const handleProductoChange = (index, producto) => {
    const nuevosVentas = [...ventas];
    nuevosVentas[index] = { producto, cantidad: 0, total: 0 }; // Reiniciar total al cambiar el producto
    setVentas(nuevosVentas);
  };

  const handleCantidadChange = (index, cantidad) => {
    const nuevosVentas = [...ventas];
    const producto = nuevosVentas[index].producto;
    nuevosVentas[index] = {
      producto,
      cantidad,
      total: cantidad * producto.valorUnitario,
    };
    setVentas(nuevosVentas);
    calcularTotalVentas(nuevosVentas);
  };

  const calcularTotalVentas = (nuevasVentas) => {
    const total = nuevasVentas.reduce(
      (acumulado, venta) => acumulado + venta.total,
      0
    );
    setTotalVentas(total);
  };

  const agregarVenta = () => {
    // Limpiar los valores de las casillas
    const nuevaVenta = { producto: null, cantidad: 0, total: 0 };
    setVentas([nuevaVenta]); // Reinicia la lista de ventas a una nueva venta vacía
    setTotalVentas(0); // Reinicia el total de ventas
  };

  const handleRegistrarVenta = async () => {
    try {
      // Asegurarse de que haya al menos una venta antes de registrar
      if (totalVentas > 0) {
        await addDoc(collection(db, "ventas"), {
          usuarioId, // ID del usuario que realiza la compra
          productos: ventas.map((venta) => ({
            nombre: venta.producto?.nombre || "", // Asegura que nombre sea una cadena vacía si no hay producto
            cantidad: venta.cantidad,
            total: venta.total,
          })),
          total: totalVentas,
          fecha: new Date().toISOString(),
        });
        alert("Venta registrada correctamente");
        agregarVenta(); // Llama a agregarVenta para limpiar el formulario después de registrar
      } else {
        alert("No hay ventas para registrar.");
      }
    } catch (error) {
      console.error("Error al registrar la venta:", error);
    }
  };

  return (
    <div className="ventas-diarios">
      <h2>Ventas Diarias</h2>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>CANTIDAD</th>
            <th>VALOR UNITARIO</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, index) => (
            <tr key={index}>
              <td>
                <select
                  value={venta.producto ? venta.producto.nombre : ""}
                  onChange={(e) =>
                    handleProductoChange(
                      index,
                      productos.find(
                        (producto) => producto.nombre === e.target.value
                      )
                    )
                  }
                >
                  <option value="">Seleccione un producto</option>
                  {productos.map((producto) => (
                    <option key={producto.nombre} value={producto.nombre}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={venta.cantidad}
                  onChange={(e) =>
                    handleCantidadChange(index, parseInt(e.target.value))
                  }
                />
              </td>
              <td>{venta.producto ? venta.producto.valorUnitario : ""}</td>
              <td>{venta.total}</td>
            </tr>
          ))}
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td></td>
            <td></td>
            <td>{totalVentas}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={agregarVenta}>Agregar Venta</button>
      <button onClick={handleRegistrarVenta}>Registrar Venta</button>
    </div>
  );
};

export default Ventas;