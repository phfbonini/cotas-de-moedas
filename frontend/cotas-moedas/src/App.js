import React from 'react';
import './App.css'; // importando o arquivo CSS
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import CurrencyConverter from './Components/CurrencyConverter';
import SearchHistory from './Components/SearchHistory';
import QuotesAvailable from './Components/QuotesAvailable';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Cotações</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/historico">Histórico de Pesquisas</Nav.Link>
            <Nav.Link as={Link} to="/disponiveis">Moedas Disponiveis</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-4">
        <Routes>
          <Route path="/" element={<CurrencyConverter />} />
          <Route path="/historico" element={<SearchHistory />} />
          <Route path="/disponiveis" element={<QuotesAvailable />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
