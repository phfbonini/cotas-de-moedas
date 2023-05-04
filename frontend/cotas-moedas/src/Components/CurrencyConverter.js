import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Spinner, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ResultTable from "./ResultTable";


const CurrencyConverter = () => {
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrencies, setTargetCurrencies] = useState([""]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //utilizado para receber sempre os valores em MAIUSCULA
    const toUpper = (value) => value.toUpperCase();

    //validação de moedas, tratamendo na moeda de origem no placeholder
    const handleSourceCurrencyChange = (event) => {
        setSourceCurrency(toUpper(event.target.value));
    };

    //validação de moedas, tratamendo na moeda de destino no placeholder
    const handleTargetCurrencyChange = (event, index) => {
        const newTargetCurrencies = [...targetCurrencies];
        newTargetCurrencies[index] = toUpper(event.target.value);
        setTargetCurrencies(newTargetCurrencies);
    };

    //adiciona moedas de destino, utilizado no botao de add
    const handleAddTargetCurrency = () => {
        setTargetCurrencies([...targetCurrencies, ""]);
    };

    //remove moedas de destino, utilizado no botao de remover
    const handleRemoveTargetCurrency = (index) => {
        if (index === 0) {
            return;
        }
        const newTargetCurrencies = [...targetCurrencies];
        newTargetCurrencies.splice(index, 1);
        setTargetCurrencies(newTargetCurrencies);
    };

    //remove todas as moedas de destino, utilizado no botao de remover todas
    const handleRemoveAllTargetCurrencies = () => {
        setTargetCurrencies([targetCurrencies[0]]);
    };

    //validação de moedas, CASO PLACEHOLDER FOR VAZIO OU MOEDA FOR INVALIDA JUNTO DO validateCurrencies
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { validCurrencies, invalidPositions } = await validateCurrencies(sourceCurrency.toLowerCase(), targetCurrencies.map(currency => currency.toLowerCase()));
        if (!validCurrencies.source) {
            setSourceCurrency("MOEDA INVÁLIDA!!!");
        }
        if (!validCurrencies.target) {
            const newTargetCurrencies = [...targetCurrencies];
            invalidPositions.forEach((position) => {
                newTargetCurrencies[position] = "MOEDA INVÁLIDA!!!";
            });
            setTargetCurrencies(newTargetCurrencies);
        }

        console.log({ sourceCurrency, targetCurrencies });
    };

    //metodo para utilizar o endpoint /currencies
    const handleConvert = async () => {
        setIsLoading(true);
        try {
            const currencies = targetCurrencies.join(',');
            const response = await fetch(`http://localhost:3003/currencies`);
            const data = await response.json();

            // Transformar a lista de moedas em um array com os códigos das moedas
            const currencyCodes = data.map((currency) => currency.code);

            // Verificar se as moedas de origem e destino são válidas
            const isValidSourceCurrency = currencyCodes.includes(sourceCurrency);
            const areValidTargetCurrencies = targetCurrencies.every((currency) => currencyCodes.includes(currency));

            // Atualizar o estado dos placeholders
            if (!isValidSourceCurrency) {
                setSourceCurrency("MOEDA INVÁLIDA!!!");
            }
            if (!areValidTargetCurrencies) {
                const newTargetCurrencies = targetCurrencies.map((currency) =>
                    currencyCodes.includes(currency) ? currency : "MOEDA INVÁLIDA!!!"
                );
                setTargetCurrencies(newTargetCurrencies);
            }

            // Se todas as moedas são válidas, fazer a conversão
            if (isValidSourceCurrency && areValidTargetCurrencies) {
                const response = await fetch(`http://localhost:3003/compare?source=${sourceCurrency}&currencies=${currencies}`);
                const data = await response.json();

                // Transformar o objeto retornado em um array de objetos
                const resultsArray = Object.entries(data).map(([currency, rate]) => ({
                    currency,
                    rate
                }));

                // Atualizar o estado do componente com os resultados
                setResults(resultsArray);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const validateCurrencies = async (sourceCurrency, targetCurrencies) => {
        const response = await fetch('http://localhost:3003/currencies');
        const currencies = await response.json();

        const validCurrencies = {
            source: false,
            targets: targetCurrencies.map(() => false)
        };
        const invalidPositions = {
            source: '',
            targets: []
        };

        // Valida moeda de origem
        currencies.forEach(currency => {
            if (currency.code === sourceCurrency) {
                validCurrencies.source = true;
            }
        });
        if (!validCurrencies.source) {
            invalidPositions.source = 'source';
        }

        // Valida moedas de destino
        targetCurrencies.forEach((targetCurrency, index) => {
            currencies.forEach(currency => {
                if (currency.code === targetCurrency) {
                    validCurrencies.targets[index] = true;
                }
            });
            if (!validCurrencies.targets[index]) {
                invalidPositions.targets.push(index);
            }
        });

        return { validCurrencies, invalidPositions };
    };

    return (
        <Container className="my-4">
            <h1 className="text-center text-white">Consulta de Cotas</h1>
            <h3 className="text-center text-white">Utilize o Código Identificador ex: <Badge bg="secondary">BRL, USD, EUR</Badge></h3>
            <Row>
                {/*Criação dos formularios */}
                <Col md={6}>
                    {/*form de origem*/}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="sourceCurrency">
                            <Form.Label className="text-white">Moeda de Origem</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Insira a moeda de origem"
                                value={sourceCurrency}
                                onChange={handleSourceCurrencyChange}
                            />
                        </Form.Group>
                        <Button variant="dark" type="button" onClick={handleConvert} style={{ marginTop: '5px' }} className="w-100">Converter</Button>
                        {/* Tabela de resultados */}
                        {results.length > 0 && <ResultTable results={results} />}
                        {/* Spinner de carregamento */}
                        {isLoading && (
                            <div className="d-flex justify-content-center align-items-center mt-3">
                                <Spinner animation="border" variant="light" style={{ height: '3rem', width: '3rem' }} />
                            </div>
                        )}
                    </Form>
                </Col>

                <Col md={6}>
                    {/*form de destino*/}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label className="text-white">Moeda de Destino</Form.Label>
                            {targetCurrencies.map((targetCurrency, index) => (
                                <Row key={index} className="mb-2">
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder={`Insira a moeda de destino ${index + 1}`}
                                            value={targetCurrency}
                                            onChange={(event) => handleTargetCurrencyChange(event, index)}
                                        />
                                    </Col>
                                    {index > 0 && (
                                        <Col xs="auto">
                                            <Button variant="danger" onClick={() => handleRemoveTargetCurrency(index)}>X</Button>
                                        </Col>
                                    )}
                                </Row>
                            ))}
                            <Button variant="success" onClick={handleAddTargetCurrency} style={{ marginRight: '10px' }} className="w-100">Add Moeda</Button>
                            {targetCurrencies.length > 2 && (
                                <Button variant="danger" onClick={handleRemoveAllTargetCurrencies} style={{ marginTop: '5px' }} className="w-100" >Remover Todas</Button>
                            )}

                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CurrencyConverter;