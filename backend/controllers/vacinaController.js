import * as Vacina from "../models/vacinaModel.js";

export const listarVacinas = async (req, res) => {
  try {
    const vacinas = await Vacina.getAllVacinas();
    res.json(vacinas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const criarVacina = async (req, res) => {
  try {
    const { nome, registro } = req.body;
    if (!nome || !registro) return res.status(400).json({ erro: "Nome e registro são obrigatórios" });

    const vacina = await Vacina.createVacina({ nome, registro });
    res.status(201).json(vacina);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarVacina = async (req, res) => {
  try {
    const { nome, registro } = req.body;
    if (!nome || !registro) return res.status(400).json({ erro: "Nome e registro são obrigatórios" });

    const vacina = await Vacina.updateVacina(req.params.id, { nome, registro });
    res.json(vacina);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const deletarVacina = async (req, res) => {
  try {
    await Vacina.deleteVacina(req.params.id);
    res.json({ message: "Vacina deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
