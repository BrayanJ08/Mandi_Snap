import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../firebase-config";
import "../components.css/ventas.css";
import "../components.css/navbar.css";

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
  const [usuarioId, setUsuarioId] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUsuarioId(user.uid);
    }
  }, []);

  const handleProductoChange = (index, producto) => {
    const nuevosVentas = [...ventas];
    nuevosVentas[index] = { producto, cantidad: 0, total: 0 };
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
    const nuevaVenta = { producto: null, cantidad: 0, total: 0 };
    setVentas([nuevaVenta]);
    setTotalVentas(0);
  };

  const handleRegistrarVenta = async () => {
    try {
      if (totalVentas > 0) {
        await addDoc(collection(db, "ventas"), {
          usuarioId,
          productos: ventas.map((venta) => ({
            nombre: venta.producto?.nombre || "",
            cantidad: venta.cantidad,
            total: venta.total,
          })),
          total: totalVentas,
          fecha: new Date().toISOString(),
        });
        alert("Venta registrada correctamente");
        agregarVenta();
      } else {
        alert("No hay ventas para registrar.");
      }
    } catch (error) {
      console.error("Error al registrar la venta:", error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo">Mi Tienda</div>
        <div className="menu">
          <a href="/cajero">Inicio</a>
          <a href="/Productos">Productos</a>
          <a href="/contacto">Contacto</a>
        </div>
      </div>

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
    </div>
  );
};

export default Ventas;