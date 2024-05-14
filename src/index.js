const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "seu_usuario",
  password: "sua_senha",
  database: "nome_do_banco",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conexão bem-sucedida ao banco de dados MySQL");
});

// Rota para criar um novo tenant (loja de departamentos)
app.post("/tenants", (req, res) => {
  const { nome } = req.body;
  const esquema = `store_${nome.toLowerCase().replace(/\s+/g, "_")}`; // Criando um esquema único para cada loja

  const createSchemaQuery = `CREATE SCHEMA IF NOT EXISTS ${esquema}`;

  connection.query(createSchemaQuery, (err, result) => {
    if (err) {
      console.error("Erro ao criar esquema:", err);
      res.status(500).send("Erro ao criar esquema");
      return;
    }
    console.log("Esquema criado com sucesso:", esquema);

    // Inserir informações do tenant na tabela tenants
    const insertTenantQuery = `INSERT INTO tenants (nome, esquema) VALUES (?, ?)`;
    connection.query(insertTenantQuery, [nome, esquema], (err, result) => {
      if (err) {
        console.error("Erro ao inserir dados do tenant:", err);
        res.status(500).send("Erro ao inserir dados do tenant");
        return;
      }
      console.log("Dados do tenant inseridos com sucesso");
      res.status(200).send("Tenant criado com sucesso");
    });
  });
});

// Rota para criar um novo documento fiscal
app.post("/documentos-fiscais", (req, res) => {
  const { numero_documento, tipo_documento, valor_total, tenant_id } = req.body;
  const insertQuery = `INSERT INTO documentos_fiscais (numero_documento, tipo_documento, valor_total, tenant_id) VALUES (?, ?, ?, ?)`;

  connection.query(
    insertQuery,
    [numero_documento, tipo_documento, valor_total, tenant_id],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir documento fiscal:", err);
        res.status(500).send("Erro ao inserir documento fiscal");
        return;
      }
      console.log("Documento fiscal inserido com sucesso");
      res.status(200).send("Documento fiscal criado com sucesso");
    }
  );
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
