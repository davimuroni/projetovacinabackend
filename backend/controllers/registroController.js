import * as Registro from "../models/registroModel.js";

// Listar todos os registros
export const listarRegistros = async (req, res) => {
  try {
    const registros = await Registro.getAllRegistros();
    res.json(registros);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Criar registro
export const criarRegistro = async (req, res) => {
  try {
    const registro = await Registro.createRegistro(req.body);
    res.status(201).json(registro);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// Listar registros por cartão
export const listarRegistrosPorCartao = async (req, res) => {
  try {
    const registros = await Registro.getRegistrosByCartao(req.params.cartaoId);
    res.json(registros);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
