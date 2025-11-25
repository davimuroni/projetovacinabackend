import db from "../database/db.js";

export const getAllVacinas = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM vacinas", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

export const createVacina = (vacina) => {
  return new Promise((resolve, reject) => {
    if (!vacina.nome || !vacina.registro) {
      reject(new Error("Campos 'nome' e 'registro' são obrigatórios"));
      return;
    }

    db.query("INSERT INTO vacinas (nome, registro) VALUES (?, ?)", [vacina.nome, vacina.registro], (err, results) => {
      if (err) reject(err);
      else resolve({ id: results.insertId, ...vacina });
    });
  });
};

export const updateVacina = (id, vacina) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE vacinas SET nome = ?, registro = ? WHERE id = ?", [vacina.nome, vacina.registro, id], (err) => {
      if (err) reject(err);
      else resolve({ id, ...vacina });
    });
  });
};

export const deleteVacina = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM vacinas WHERE id = ?", [id], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
