const db = require('../config/database');

class Funcionario {
  // Buscar todos os funcionários
  static getAll(callback) {
    const sql = 'SELECT * FROM funcionarios ORDER BY id DESC';
    db.all(sql, [], callback);
  }

  // Buscar funcionário por ID
  static getById(id, callback) {
    const sql = 'SELECT * FROM funcionarios WHERE id = ?';
    db.get(sql, [id], callback);
  }

  // Criar novo funcionário
  static create(data, callback) {
    const sql = `
      INSERT INTO funcionarios (nome, cpf, senha, registro, email, telefone, secao)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.nome,
      data.cpf,
      data.senha || '1234',
      data.registro,
      data.email,
      data.telefone,
      data.secao
    ];
    
    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID, ...data });
      }
    });
  }

  // Atualizar funcionário
  static update(id, data, callback) {
    const sql = `
      UPDATE funcionarios 
      SET nome = ?, cpf = ?, registro = ?, email = ?, telefone = ?, secao = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const params = [
      data.nome,
      data.cpf,
      data.registro,
      data.email,
      data.telefone,
      data.secao,
      id
    ];
    
    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, ...data });
      }
    });
  }

  // Deletar funcionário
  static delete(id, callback) {
    const sql = 'DELETE FROM funcionarios WHERE id = ?';
    db.run(sql, [id], callback);
  }

  // Buscar por CPF
  static getByCpf(cpf, callback) {
    const sql = 'SELECT * FROM funcionarios WHERE cpf = ?';
    db.get(sql, [cpf], callback);
  }

  // Buscar por registro
  static getByRegistro(registro, callback) {
    const sql = 'SELECT * FROM funcionarios WHERE registro = ?';
    db.get(sql, [registro], callback);
  }
}

module.exports = Funcionario;
