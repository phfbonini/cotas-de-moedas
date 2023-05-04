# README - cotas-de-moedas

Este repositório contém uma aplicação de conversão de moedas com um DataBase em MySQL, servidor em Node.js e uma interface de usuário em React. A seguir, são fornecidas instruções sobre como executar e compilar a aplicação, bem como explicações sobre as dependências utilizadas.

## Configurando servidor data-base

Recomendase utilizar o mysql worbench para este projeto, 

1. primeiro crie MySQL Connections para depois importar ou criar o DataBase.

2. Após criar o MySQL Connections, passe as informações de Create Connection no server.js para que seja feita a conexão com o Base. No arquivo original, a conexão esta da seguinte forma:

```bash
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'cotas',
});
```

## Importando ou criando o DataBase

Para a aplicação rodar perfeitamente, deve-se rodar localmente um data-base

1. Crie ou importe o schema que esta neste repositorio
Caso for criar, utilize os seguintes comandos:

```bash
CREATE TABLE currencies (
  id INT NOT NULL AUTO_INCREMENT,
  code VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  symbol VARCHAR(10) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (code)
);

CREATE TABLE quotes (
  id INT NOT NULL AUTO_INCREMENT,
  source_currency VARCHAR(10) NOT NULL,
  quote_date DATE NOT NULL,
  rates JSON NOT NULL,
  PRIMARY KEY (id),
  INDEX (source_currency),
  INDEX (quote_date)
);

CREATE TABLE searches (
  id INT NOT NULL AUTO_INCREMENT,
  source_currency VARCHAR(10) NOT NULL,
  target_currencies JSON NOT NULL,
  search_date DATETIME NOT NULL,
  quote_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX (source_currency),
  INDEX (search_date),
  FOREIGN KEY (quote_id) REFERENCES quotes(id)
);
```
Se for utilizar o schema que esta no repositório, siga os passos:

1. Conecte-se ao servidor MySQL onde deseja importar o banco de dados.

2. Selecione a opção "Data Import/Restore" no menu "Server" ou clique no ícone correspondente na barra de ferramentas.

3. Selecione a opção "Import from Self-Contained File" (Importar de arquivo autônomo).

4. Clique no botão "..." ao lado do campo "Import from File" (Importar de arquivo) e selecione o arquivo dbfile.sql que es ta neste repositório.

5. Certifique-se de que a opção "Dump Structure and Data" (Estrutura e dados de dump) esteja selecionada.

6. Clique no botão "Start Import" (Iniciar importação) para começar a importar o backup.

7. Aguarde até que a importação seja concluída. Isso pode levar algum tempo.

8. Verifique se todas as tabelas e dados foram importados corretamente, navegando pela estrutura do banco de dados no painel lateral esquerdo do MySQL Workbench.

Se tudo estiver correto, você deve ver todas as tabelas e dados do seu banco de dados no MySQL Workbench. Caso contrário, verifique se você seguiu corretamente os passos para importá-lo.


## Executando a aplicação

Para executar a aplicação, siga os seguintes passos:

1. Clone o repositório em sua máquina local:

```bash
git clone https://github.com/phfbonini/cotas-de-moedas.git
```

2. Instale as dependências para a interface de usuário e para o servidor:

```bash
cd nome-do-repositorio/frontend/cotas-moedas
npm install

cd ../..

cd server
npm install
```

3. Verifique a disponibilidade de portas pois vamos incializa-lo em Localhost, o server vem por padrão inicializado na porta 3003, após verificar Inicie o servidor:

```bash
node server.js
```

4. Com o server rodando, inicie a interface de usuário em um novo terminal:

```bash
cd nome-do-repositorio/frontend/cotas-moedas
npm start
```

5. Abra o navegador e vá para o endereço http://localhost:3000 para acessar a aplicação.

## Dependências utilizadas

A seguir, são apresentadas as dependências utilizadas na aplicação e suas respectivas razões de uso:

### Dependências para a interface de usuário

- `axios`: biblioteca utilizada para fazer requisições HTTP para o servidor;
- `bootstrap`: biblioteca de componentes CSS e JavaScript para construir interfaces de usuário responsivas e estilizadas;
- `react`: biblioteca JavaScript para construir interfaces de usuário declarativas e componentizadas;
- `react-bootstrap`: biblioteca de componentes React que implementa o estilo do Bootstrap;
- `react-dom`: biblioteca React para manipulação do DOM;
- `react-router-dom`: biblioteca React para gerenciamento de rotas na aplicação;
- `react-scripts`: conjunto de scripts e ferramentas para compilar, executar e testar aplicações React;
- `web-vitals`: biblioteca que ajuda a medir a performance da aplicação.

### Dependências para o servidor

- `cors`: middleware para o Express que habilita o acesso à API de diferentes origens;
- `express`: framework para construção de APIs em Node.js;
- `mysql2`: biblioteca para conexão com bancos de dados MySQL;
- `node-fetch`: biblioteca para fazer requisições HTTP em Node.js.

## Conclusão

Espero que este guia tenha sido útil para compreender como executar e compilar a aplicação, bem como para entender a razão de uso de cada dependência utilizada. Caso tenha alguma dúvida, não hesite em me contatar