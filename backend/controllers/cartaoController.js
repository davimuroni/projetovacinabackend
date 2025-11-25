import * as Cartao from "../models/cartaoModel.js";

export const listarCartoes = async (req, res) => {
  try {
    const cartoes = await Cartao.getAllCartoes();
    res.json(cartoes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const criarCartao = async (req, res) => {
  try {
    const cartao = await Cartao.createCartao(req.body);
    res.status(201).json(cartao);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
