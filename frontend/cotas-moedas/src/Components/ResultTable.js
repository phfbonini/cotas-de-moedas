import React from "react";
import { Table } from "react-bootstrap";

const ResultTable = ({ results }) => {
  return (
    <Table striped bordered hover variant="dark" style={{ marginTop: '5px' }}>
      <thead>
        <tr>
          <th>Moeda</th>
          <th>Cotação</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.currency}</td>
            <td>{result.rate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ResultTable;
