const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fetch = require('node-fetch');

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