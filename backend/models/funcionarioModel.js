import db from "../database/db.js";


export const getAllFuncionarios = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM funcionarios", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

export const getFuncionarioById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM funcionarios WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

export const createFuncionario = (func) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO funcionarios SET ?", func, (err, results) => {
      if (err) reject(err);
      else resolve({ id: results.insertId, ...func });
    });
  });
};

export const updateFuncionario = (id, func) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE funcionarios SET ? WHERE id = ?", [func, id], (err) => {
      if (err) reject(err);
      else resolve({ id, ...func });
    });
  });
};

export const deleteFuncionario = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM funcionarios WHERE id = ?", [id], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
