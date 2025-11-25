import * as Funcionario from "../models/funcionarioModel.js";

export const listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.getAllFuncionarios();
    res.json(funcionarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const listarFuncionarioPorId = async (req, res) => {
  try {
    const funcionario = await Funcionario.getFuncionarioById(req.params.id);
    if (!funcionario) return res.status(404).json({ erro: "Funcionário não encontrado" });
    res.json(funcionario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const criarFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.createFuncionario(req.body);
    res.status(201).json(funcionario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.updateFuncionario(req.params.id, req.body);
    res.json(funcionario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const deletarFuncionario = async (req, res) => {
  try {
    await Funcionario.deleteFuncionario(req.params.id);
    res.json({ message: "Funcionário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
