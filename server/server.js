import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import fetch from 'node-fetch';

//api key
const API_KEY = 'ldu0blxk7CHLVtSQ6BoOYGZ1UZieNwCu';

const app = express();

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'cotas',
});

// Verifica se houve conexão com o banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Configuração do CORS
app.use(cors());

// Configuração do body-parser
app.use(express.json());

// Endpoint de exemplo
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de cotações');
});

// Função que insere as moedas na tabela "currencies"
const insertCurrencies = async () => {
  try {
    const response = await fetch(`https://api.apilayer.com/currency_data/list?apikey=` + API_KEY);
    const data = await response.json();
    const currencies = data.currencies;
    const values = [];
    for (const code in currencies) {
      values.push([code, currencies[code]]);
    }
    const sql = `INSERT IGNORE INTO currencies (code, name) VALUES ?`;
    db.query(sql, [values], (err, result) => {
      if (err) throw err;
      console.log(`Foram inseridas ${result.affectedRows} moedas na tabela "currencies"`);
    });
  } catch (error) {
    console.error(error);
  }
};

// Chama a função para inserir as moedas na tabela "currencies"
insertCurrencies();

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

//ENDPOINTS-----------------------------

// Endpoint para comparar moedas, guardar cotação e guardar pesquisa
app.get('/compare', async (req, res) => {
  const { source, currencies } = req.query;

  try {
    // Verifica se a moeda de origem existe no banco de dados
    const checkSource = await db.promise().query('SELECT * FROM currencies WHERE code = ?', [source]);
    if (!checkSource[0].length) {
      res.status(400).send('Moeda de origem inválida');
      return;
    }

    // Verifica se as moedas de destino existem no banco de dados
    const currenciesArray = currencies.split(',');
    for (let i = 0; i < currenciesArray.length; i++) {
      const code = currenciesArray[i].trim();

      const checkCurrency = await db.promise().query('SELECT * FROM currencies WHERE code = ?', [code]);
      if (!checkCurrency[0].length) {
        res.status(400).send(`Moeda de destino ${code} inválida`);
        return;
      }
    }

    // Monta a URL da API com as moedas informadas
    const currenciesUrl = currenciesArray.join('%2C%20');
    const url = `https://api.apilayer.com/currency_data/live?source=${source}&currencies=${currenciesUrl}&apikey=${API_KEY}`;

    // Faz a requisição à API
    const response = await fetch(url);
    const data = await response.json();

    // Salva as cotações na tabela quotes
    const quoteDate = new Date().toISOString().slice(0, 10); // Pega a data atual
    const rates = data.quotes;
    const insertQuoteQuery = 'INSERT INTO quotes (source_currency, quote_date, rates) VALUES (?, ?, ?)';
    const [quoteResult] = await db.promise().query(insertQuoteQuery, [source, quoteDate, JSON.stringify(rates)]);

    // Salva a pesquisa na tabela searches
    const targetCurrencies = currenciesArray.map((code) => code.trim());
    const insertSearchQuery = 'INSERT INTO searches (source_currency, target_currencies, search_date, quote_id) VALUES (?, ?, ?, ?)';
    const [searchResult] = await db.promise().query(insertSearchQuery, [source, JSON.stringify(targetCurrencies), new Date(), quoteResult.insertId]);

    // Retorna os dados para o front-end
    res.json(rates);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao comparar as moedas');
  }
});

// busca todas as pesquisas salvas na tabela "searches" e retorná-las em uma lista
app.get('/history', async (req, res) => {
  try {
    const rows = await db.promise().query('SELECT * FROM searches ORDER BY search_date DESC');
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar histórico de pesquisas');
  }
});

// busca uma pesquisa específica pelo id
app.get('/history/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const row = await db.promise().query('SELECT * FROM searches WHERE id = ?', [id]);
    const quoteId = row[0][0].quote_id;
    const quoteRow = await db.promise().query('SELECT * FROM quotes WHERE id = ?', [quoteId]);

    res.json({
      ...row[0][0],
      rates: quoteRow[0][0].rates
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar dados da pesquisa');
  }
});
