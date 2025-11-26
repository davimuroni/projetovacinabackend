const db = require('../config/database');

class CartaoVacina {
  // Buscar todos os registros do cartão
  static getAll(callback) {
    const sql = 'SELECT * FROM cartao_vacina ORDER BY data_aplicacao DESC';
    db.all(sql, [], callback);
  }

  // Buscar registro por ID
  static getById(id, callback) {
    const sql = 'SELECT * FROM cartao_vacina WHERE id = ?';
    db.get(sql, [id], callback);
  }

  // Criar novo registro no cartão
  static create(data, callback) {
    const sql = `
      INSERT INTO cartao_vacina (tipo_vacina, data_aplicacao, responsavel, lote, funcionario, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.tipoVacina,
      data.dataAplicacao,
      data.responsavel,
      data.lote || null,
      data.funcionario,
      data.status || 'aplicada'
    ];
    
    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { 
          id: this.lastID,
          tipoVacina: data.tipoVacina,
          dataAplicacao: data.dataAplicacao,
          responsavel: data.responsavel,
          lote: data.lote,
          funcionario: data.funcionario,
          status: data.status || 'aplicada'
        });
      }
    });
  }

  // Deletar registro do cartão
  static delete(id, callback) {
    const sql = 'DELETE FROM cartao_vacina WHERE id = ?';
    db.run(sql, [id], callback);
  }

  // Buscar registros por funcionário
  static getByFuncionario(funcionario, callback) {
    const sql = 'SELECT * FROM cartao_vacina WHERE funcionario = ? ORDER BY data_aplicacao DESC';
    db.all(sql, [funcionario], callback);
  }

  // Buscar registros por data
  static getByData(data, callback) {
    const sql = 'SELECT * FROM cartao_vacina WHERE data_aplicacao = ? ORDER BY created_at DESC';
    db.all(sql, [data], callback);
  }

  // Atualizar status
  static updateStatus(id, status, callback) {
    const sql = 'UPDATE cartao_vacina SET status = ? WHERE id = ?';
    db.run(sql, [status, id], callback);
  }
}

module.exports = CartaoVacina;
