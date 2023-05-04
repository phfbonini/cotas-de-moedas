import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

// Componente QuotesAvailable que é responsável por exibir a tabela de códigos e nomes de moedas disponíveis.
function QuotesAvailable() {

  // Cria um estado com o array de moedas.
  // A função setCurrencies é utilizada para atualizar o estado das moedas.

  const [currencies, setCurrencies] = useState([]);

  // Utiliza o hook useEffect para buscar as moedas disponíveis da API quando o componente é montado.
  useEffect(() => {
    fetch('http://localhost:3003/currencies') //-Faz uma requisição HTTP GET para a URL da API.
      .then(response => response.json()) //-Converte a resposta em um objeto JavaScript.
      .then(data => setCurrencies(data)); //-Atualiza o estado das moedas com os dados da resposta.
  }, []); // O segundo parâmetro vazio indica que a função de efeito só deve ser executada uma vez, quando o componente é montado.

  // Utiliza o componente Table do react-bootstrap para criar a tabela com estilo listrado e bordas.
  return (
    <Table striped bordered hover variant="dark" style={{ marginTop: '5px' }}>
      <thead>
        <tr>
          {/* Cabeçalho da tabela com as colunas "Código da Moeda" e "Nome da Moeda". */}
          <th>Código da Moeda</th>
          <th>Nome da Moeda</th>
        </tr>
      </thead>
      <tbody>
        {/* Cria uma nova linha na tabela para cada objeto no array currencies, utilizando o método map. */}
        {/* A propriedade key é definida como o id do objeto para melhorar a performance de renderização. */}
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
