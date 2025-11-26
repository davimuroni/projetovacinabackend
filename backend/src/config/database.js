const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

// Criar tabelas se não existirem
db.serialize(() => {
  // Tabela de funcionários
  db.run(`
    CREATE TABLE IF NOT EXISTS funcionarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(255) NOT NULL,
      cpf VARCHAR(14) UNIQUE NOT NULL,
      senha VARCHAR(255),
      registro VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(255) NOT NULL,
      telefone VARCHAR(20),
      secao VARCHAR(100),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de vacinas
  db.run(`
    CREATE TABLE IF NOT EXISTS vacinas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(255) NOT NULL,
      registro VARCHAR(50) UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de registros
  db.run(`
    CREATE TABLE IF NOT EXISTS registros (
      id VARCHAR(50) PRIMARY KEY,
      funcionario VARCHAR(255) NOT NULL,
      responsavel VARCHAR(255) NOT NULL,
      data_aplicacao DATE NOT NULL,
      tipo_vacina VARCHAR(255) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de agendamentos
  db.run(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id VARCHAR(50) PRIMARY KEY,
      nome_paciente VARCHAR(255) NOT NULL,
      tipo_vacina VARCHAR(255) NOT NULL,
      local_vacinacao VARCHAR(255) NOT NULL,
      data_vacinacao DATE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de cartão de vacina
  db.run(`
    CREATE TABLE IF NOT EXISTS cartao_vacina (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo_vacina VARCHAR(255) NOT NULL,
      data_aplicacao DATE NOT NULL,
      responsavel VARCHAR(255) NOT NULL,
      lote VARCHAR(100),
      funcionario VARCHAR(255) NOT NULL,
      status VARCHAR(50) DEFAULT 'aplicada',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Tabelas criadas ou já existentes');
});

module.exports = db;
