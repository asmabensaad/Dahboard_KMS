import React, { useEffect, useState } from 'react';

const SecretResult = ({ responseData }) => {
    if(!responseData) {
        return <p> NO data to display </p>
    }
   

  return (
    <div>
    <h2>Secret Data</h2>
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(responseData).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value.valueKind}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default SecretResult;