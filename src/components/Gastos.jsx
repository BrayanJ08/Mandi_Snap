import React, { useState, useEffect } from 'react';

const Gastos = () => {
  // Lista de productos que pueden seleccionarse
  const [productos, setProductos] = useState([
    { nombre: 'Carnes', valorUnitario: 5000 },
    { nombre: 'Servilletas', valorUnitario: 3000 },
    { nombre: 'Salchicha', valorUnitario: 4500 },
    { nombre: 'Desechables', valorUnitario: 8000 },
    { nombre: 'Panes', valorUnitario: 5500 },
    { nombre: 'Gaseosas', valorUnitario: 9000 },
    { nombre: 'Papas', valorUnitario: 7000 }
  ]);

  const [gastos, setGastos] = useState([{ producto: null, cantidad: 0, total: 0 }]);
  const [totalGastos, setTotalGastos] = useState(0);

  // Maneja la selección del producto
  const handleProductoChange = (index, producto) => {
    const nuevosGastos = [...gastos];
    nuevosGastos[index] = { producto, cantidad: 1, total: producto.valorUnitario };
    setGastos(nuevosGastos);
    calcularTotalGastos();
  };

  // Maneja el cambio de cantidad
  const handleCantidadChange = (index, cantidad) => {
    const nuevosGastos = [...gastos];
    const producto = nuevosGastos[index].producto;
    if (producto) {
      const totalGasto = cantidad * producto.valorUnitario;
      nuevosGastos[index] = { producto, cantidad, total: isNaN(totalGasto) ? 0 : totalGasto };
    } else {
      nuevosGastos[index] = { producto: null, cantidad, total: 0 };
    }
    setGastos(nuevosGastos);
    calcularTotalGastos();
  };

  // Calcula el total de gastos
  const calcularTotalGastos = () => {
    const total = gastos.reduce((acumulado, gasto) => {
      const totalGasto = gasto.total;
      return acumulado + (isNaN(totalGasto) ? 0 : totalGasto);
    }, 0);
    setTotalGastos(total);
  };

  // Agrega un nuevo gasto (nueva fila)
  const agregarGasto = () => {
    setGastos([...gastos, { producto: null, cantidad: 0, total: 0 }]);
  };

  useEffect(() => {
    calcularTotalGastos();
  }, [gastos]);

  return (
    <div className="gastos-diarios">
      <h2>Gastos Diarios</h2>
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
          {gastos.map((gasto, index) => (
            <tr key={index}>
              <td>
                <select
                  value={gasto.producto ? gasto.producto.nombre : ''}
                  onChange={(e) =>
                    handleProductoChange(index, productos.find((producto) => producto.nombre === e.target.value))
                  }
                >
                  <option value="">Seleccione un producto</option>
                  {productos.map((producto) => (
                    <option key={producto.nombre} value={producto.nombre}>{producto.nombre}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={gasto.cantidad}
                  onChange={(e) => handleCantidadChange(index, parseInt(e.target.value))}
                />
              </td>
              <td>{gasto.producto ? gasto.producto.valorUnitario : ''}</td>
              <td>{gasto.total}</td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>{totalGastos}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={agregarGasto}>Agregar gasto</button>
    </div>
  );
};

export default Gastos;
