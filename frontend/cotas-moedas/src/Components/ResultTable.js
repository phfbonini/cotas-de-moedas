import React from "react";
import { Table } from "react-bootstrap";

// Componente ResultTable responsável por renderizar a tabela de resultados de conversão de moedas.
// Ele recebe uma prop chamada results, que é um array de objetos contendo informações sobre as cotações das moedas.
const ResultTable = ({ results }) => {
  return (
    // Utiliza o componente Table do react-bootstrap para criar a tabela com estilo listrado e bordas.
    <Table striped bordered hover variant="dark" style={{ marginTop: '5px' }}>
      <thead>
        <tr>
          <th>Moeda</th>
          <th>Cotação</th>
        </tr>
      </thead>
      <tbody>
        {/* Cria uma nova linha na tabela para cada objeto no array results, utilizando o método map. */}
        {/* A propriedade key é definida como o índice do objeto no array para melhorar a performance de renderização. */}
        {results.map((result, index) => (
          <tr key={index}>
            {/* Cria uma coluna com o nome da moeda. */}
            <td>{result.currency}</td>
            {/* Cria uma coluna com a cotação da moeda. */}
            <td>{result.rate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ResultTable;
