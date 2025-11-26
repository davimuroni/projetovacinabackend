const db = require('../config/database');

class Agendamento {
  // Buscar todos os agendamentos
  static getAll(callback) {
    const sql = 'SELECT * FROM agendamentos ORDER BY data_vacinacao ASC';
    db.all(sql, [], callback);
  }

  // Buscar agendamento por ID
  static getById(id, callback) {
    const sql = 'SELECT * FROM agendamentos WHERE id = ?';
    db.get(sql, [id], callback);
  }

  // Criar novo agendamento
  static create(data, callback) {
    // Gerar ID único (4 caracteres hexadecimais)
    const id = data.id || Math.random().toString(16).substr(2, 4);
    
    const sql = `
      INSERT INTO agendamentos (id, nome_paciente, tipo_vacina, local_vacinacao, data_vacinacao)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      id,
      data.nomePaciente,
      data.tipoVacina,
      data.localVacinacao,
      data.dataVacinacao
    ];
    
    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { 
          id, 
          nomePaciente: data.nomePaciente,
          tipoVacina: data.tipoVacina,
          localVacinacao: data.localVacinacao,
          dataVacinacao: data.dataVacinacao
        });
      }
    });
  }

  // Deletar agendamento
  static delete(id, callback) {
    const sql = 'DELETE FROM agendamentos WHERE id = ?';
    db.run(sql, [id], callback);
  }

  // Buscar agendamentos por paciente
  static getByPaciente(nomePaciente, callback) {
    const sql = 'SELECT * FROM agendamentos WHERE nome_paciente = ? ORDER BY data_vacinacao ASC';
    db.all(sql, [nomePaciente], callback);
  }

  // Buscar agendamentos por data
  static getByData(data, callback) {
    const sql = 'SELECT * FROM agendamentos WHERE data_vacinacao = ? ORDER BY created_at DESC';
    db.all(sql, [data], callback);
  }
}

module.exports = Agendamento;
