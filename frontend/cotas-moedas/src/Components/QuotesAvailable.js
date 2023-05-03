import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function QuotesAvailable() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/currencies')
      .then(response => response.json())
      .then(data => setCurrencies(data));
  }, []);

  return (
    <Table striped bordered hover variant="dark" style={{ marginTop: '5px' }}>
      <thead>
        <tr>
          <th>Código da Moeda</th>
          <th>Nome da Moeda</th>
        </tr>
      </thead>
      <tbody>
        {currencies.map(currency => (
          <tr key={currency.id}>
            <td>{currency.code}</td>
            <td>{currency.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default QuotesAvailable;
