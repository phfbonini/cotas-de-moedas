import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const CurrencyConverter = () => {
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrencies, setTargetCurrencies] = useState([""]);

    const handleSourceCurrencyChange = (event) => {
        setSourceCurrency(event.target.value);
    };

    const handleTargetCurrencyChange = (event, index) => {
        const newTargetCurrencies = [...targetCurrencies];
        newTargetCurrencies[index] = event.target.value;
        setTargetCurrencies(newTargetCurrencies);
    };

    const handleAddTargetCurrency = () => {
        setTargetCurrencies([...targetCurrencies, ""]);
    };

    const handleRemoveTargetCurrency = (index) => {
        if (index === 0) {
            return;
        }
        const newTargetCurrencies = [...targetCurrencies];
        newTargetCurrencies.splice(index, 1);
        setTargetCurrencies(newTargetCurrencies);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ sourceCurrency, targetCurrencies });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="sourceCurrency">
                <Form.Label>Moeda de Origem</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insira a moeda de origem"
                    value={sourceCurrency}
                    onChange={handleSourceCurrencyChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Moedas de Destino</Form.Label>
                {targetCurrencies.map((targetCurrency, index) => (
                    <Row key={index} className="mb-2">

                        <Form.Control
                            type="text"
                            placeholder={`Insira a moeda de destino ${index + 1}`}
                            value={targetCurrency}
                            onChange={(event) => handleTargetCurrencyChange(event, index)}
                        />
                        {index > 0 && (
                            <Button variant="danger" onClick={() => handleRemoveTargetCurrency(index)}>Remover</Button>
                        )}

                    </Row>

                ))}


            </Form.Group>

            <Button variant="primary" type="submit">
                Converter
            </Button>

            <Button variant="success" onClick={handleAddTargetCurrency}>Adicionar Moeda</Button>
        </Form>
    );
};

export default CurrencyConverter;
