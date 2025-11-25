import db from "../database/db.js";

// Listar todos os cartões
export const getAllCartoes = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM cartoes", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Criar um cartão
export const createCartao = (cartao) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO cartoes SET ?", cartao, (err, results) => {
      if (err) reject(err);
      else resolve({ id: results.insertId, ...cartao });
    });
  });
};

// Buscar cartão por ID
export const getCartaoById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM cartoes WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};
