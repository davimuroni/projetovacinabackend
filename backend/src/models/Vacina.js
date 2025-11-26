const db = require('../config/database');

class Vacina {
  // Buscar todas as vacinas
  static getAll(callback) {
    const sql = 'SELECT * FROM vacinas ORDER BY id DESC';
    db.all(sql, [], callback);
  }

  // Buscar vacina por ID
  static getById(id, callback) {
    const sql = 'SELECT * FROM vacinas WHERE id = ?';
    db.get(sql, [id], callback);
  }

  // Criar nova vacina
  static create(data, callback) {
    const sql = `
      INSERT INTO vacinas (nome, registro)
      VALUES (?, ?)
    `;
    const params = [data.nome, data.registro];
    
    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID, ...data });
      }
    });
  }

  // Atualizar vacina
  static update(id, data, callback) {
    const sql = `
      UPDATE vacinas 
      SET nome = ?, registro = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const params = [data.nome, data.registro, id];
    
    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, ...data });
      }
    });
  }

  // Atualizar parcialmente (PATCH)
  static patch(id, data, callback) {
    // Construir SQL dinamicamente baseado nos campos fornecidos
    const fields = [];
    const params = [];
    
    if (data.nome !== undefined) {
      fields.push('nome = ?');
      params.push(data.nome);
    }
    if (data.registro !== undefined) {
      fields.push('registro = ?');
      params.push(data.registro);
    }
    
    if (fields.length === 0) {
      return callback(new Error('Nenhum campo para atualizar'));
    }
    
    fields.push('updated_at = CURRENT_TIMESTAMP');
    params.push(id);
    
    const sql = `UPDATE vacinas SET ${fields.join(', ')} WHERE id = ?`;
    
    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, ...data });
      }
    });
  }

  // Deletar vacina
  static delete(id, callback) {
    const sql = 'DELETE FROM vacinas WHERE id = ?';
    db.run(sql, [id], callback);
  }

  // Buscar por registro
  static getByRegistro(registro, callback) {
    const sql = 'SELECT * FROM vacinas WHERE registro = ?';
    db.get(sql, [registro], callback);
  }
}

module.exports = Vacina;
