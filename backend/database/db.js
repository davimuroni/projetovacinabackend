import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect(err => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");

  // Tabelas
  db.query(`
    CREATE TABLE IF NOT EXISTS funcionarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100),
      cpf VARCHAR(14) UNIQUE,
      email VARCHAR(100),
      senha VARCHAR(100),
      cargo VARCHAR(100),
      registro VARCHAR(50),
      secao VARCHAR(50),
      telefone VARCHAR(20)
    )
  `);

  db.query(`
    CREATE TABLE IF NOT EXISTS vacinas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100),
      registro VARCHAR(50)
    )
  `);

  db.query(`
    CREATE TABLE IF NOT EXISTS cartoes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      paciente VARCHAR(100)
    )
  `);

  db.query(`
    CREATE TABLE IF NOT EXISTS cartao_vacina (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cartao_id INT NOT NULL,
      tipoVacina VARCHAR(100) NOT NULL,
      dataAplicacao DATE NOT NULL,
      responsavel VARCHAR(100),
      lote VARCHAR(50),
      funcionario VARCHAR(100),
      FOREIGN KEY (cartao_id) REFERENCES cartoes(id) ON DELETE CASCADE
    )
  `);

  console.log("Tabelas verificadas/criadas.");
});

export default db;
