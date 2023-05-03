import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';

function SearchHistory() {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    async function fetchSearches() {
      try {
        const response = await axios.get('http://localhost:3000/history');
        setSearches(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSearches();
  }, []);

  const handleAccordionClick = async (eventKey, id) => {
    if (eventKey === '0') {
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/history/${id}`);
      const { source_currency, target_currencies, search_date, rates } = response.data;
      const formattedRates = {};

      // Format rates object
      for (const key in rates) {
        const targetCurrency = key.slice(3).toLowerCase();
        formattedRates[targetCurrency] = rates[key];
      }

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
