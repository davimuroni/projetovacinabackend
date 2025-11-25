import db from "../database/db.js";

export const getAllRegistros = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM cartao_vacina", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const createRegistro = (data) => {
  return new Promise((resolve, reject) => {
    const { cartao_id, tipoVacina, dataAplicacao, responsavel, lote, funcionario } = data;
    const query = `
      INSERT INTO cartao_vacina (cartao_id, tipoVacina, dataAplicacao, responsavel, lote, funcionario)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [cartao_id, tipoVacina, dataAplicacao, responsavel, lote, funcionario], (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, ...data });
    });
  });
};

export const getRegistrosByCartao = (cartao_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM cartao_vacina WHERE cartao_id = ?";
    db.query(query, [cartao_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
