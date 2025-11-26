const db = require('../config/database');

class Registro {
  // Buscar todos os registros
  static getAll(callback) {
    const sql = 'SELECT * FROM registros ORDER BY created_at DESC';
    db.all(sql, [], callback);
  }

  // Buscar registro por ID
  static getById(id, callback) {
    const sql = 'SELECT * FROM registros WHERE id = ?';
    db.get(sql, [id], callback);
  }

  // Criar novo registro
  static create(data, callback) {
    // Gerar ID único (4 caracteres hexadecimais)
    const id = data.id || Math.random().toString(16).substr(2, 4);
    
    const sql = `
      INSERT INTO registros (id, funcionario, responsavel, data_aplicacao, tipo_vacina)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      id,
      data.funcionario,
      data.responsavel,
      data.dataAplicacao,
      data.tipoVacina
    ];
    
    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { 
          id, 
          funcionario: data.funcionario,
          responsavel: data.responsavel,
          dataAplicacao: data.dataAplicacao,
          tipoVacina: data.tipoVacina
        });
      }
    });
  }

  // Deletar registro
  static delete(id, callback) {
    const sql = 'DELETE FROM registros WHERE id = ?';
    db.run(sql, [id], callback);
  }

  // Buscar registros por funcionário
  static getByFuncionario(funcionario, callback) {
    const sql = 'SELECT * FROM registros WHERE funcionario = ? ORDER BY data_aplicacao DESC';
    db.all(sql, [funcionario], callback);
  }

  // Buscar registros por data
  static getByData(data, callback) {
    const sql = 'SELECT * FROM registros WHERE data_aplicacao = ? ORDER BY created_at DESC';
    db.all(sql, [data], callback);
  }
}

module.exports = Registro;
