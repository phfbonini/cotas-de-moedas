import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';

function SearchHistory() {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    async function fetchSearches() {
      try {
        // realiza uma requisição GET para o endpoint http://localhost:3003/history
        const response = await axios.get('http://localhost:3003/history');
        // armazena a resposta no estado searches
        setSearches(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSearches();
  }, []);

  // função chamada quando o usuário clica no cabeçalho de um item do accordion
  const handleAccordionClick = async (eventKey, id) => {
    // caso o evento seja o de fechar, não realiza nenhuma ação
    if (eventKey === '0') {
      return;
    }

    try {
      // realiza uma requisição GET para o endpoint http://localhost:3003/history/{id}
      const response = await axios.get(`http://localhost:3003/history/${id}`);
      const { source_currency, target_currencies, search_date, rates } = response.data;
      const formattedRates = {};

      // Formata o objeto rates, para deixar as cotações no formato correto
      for (const key in rates) {
        const targetCurrency = key.slice(3).toLowerCase();
        formattedRates[targetCurrency] = rates[key];
      }

      // monta o corpo do accordion com as informações da busca selecionada
      const accordionBody = (
        <Accordion.Body>
          <div>
            <p><strong>ID:</strong> {id}</p>
            <p>Moeda de Origem: {source_currency.toUpperCase()}</p>
            <p>Moedas de Destino: {target_currencies.join(', ').toUpperCase()}</p>
            <p>DATA: {new Date(search_date).toLocaleDateString()}</p>
            <p>COTAÇÕES:</p>
            <ul>
              {Object.entries(formattedRates).map(([targetCurrency, rate]) => (
                <li key={targetCurrency}>
                  {targetCurrency.toUpperCase()}: {rate}
                </li>
              ))}
            </ul>
          </div>
        </Accordion.Body>
      );

      // modifica o estado searches, para exibir ou esconder o conteúdo do accordion selecionado
      const modifiedSearches = searches.map((search) => {
        if (search.id === id) {
          search.accordionBody = accordionBody;
          search.isAccordionOpen = true;
        } else {
          search.isAccordionOpen = false;
        }
        return search;
      });

      setSearches(modifiedSearches);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // Componente Accordion do React Bootstrap, que exibe as buscas realizadas pelo usuário
    <Accordion defaultActiveKey="0">
      {searches.map((search) => (
        <Accordion.Item key={search.id} eventKey={search.isAccordionOpen ? search.id.toString() : '0'}>
          <Accordion.Header onClick={() => handleAccordionClick(search.isAccordionOpen ? '0' : search.id.toString(), search.id)}>
            {`${search.source_currency.toUpperCase()} - ${search.target_currencies.join(', ').toUpperCase()}, ${new Date(search.search_date).toLocaleDateString()}`}
          </Accordion.Header>
          {search.accordionBody}
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default SearchHistory;
