import React from 'react';

const Gastos = () => {
  return (
    <div className="gastos-diarios">
      <h2>Gastos Diarios</h2>
      <table>
        <thead>
          <tr>
            <th>CANTIDAD</th>
            <th>VALOR UNITARIO</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" placeholder="Carnes" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="Servilletas" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="Salchicha" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="Desechables" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="Panes" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="Gaseosas" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="Papas" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td><strong>Total</strong></td>
            <td></td>
            <td><input type="text" placeholder="Total" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Gastos;
