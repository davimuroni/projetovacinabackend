const CartaoVacina = require('../models/CartaoVacina');

class CartaoVacinaController {
  // Listar todos os registros do cartão
  static getAll(req, res, next) {
    CartaoVacina.getAll((err, cartoes) => {
      if (err) {
        return next(err);
      }
      res.json(cartoes);
    });
  }

  // Buscar registro por ID
  static getById(req, res, next) {
    const { id } = req.params;
    
    CartaoVacina.getById(id, (err, cartao) => {
      if (err) {
        return next(err);
      }
      if (!cartao) {
        return res.status(404).json({ error: 'Registro não encontrado' });
      }
      res.json(cartao);
    });
  }

  // Criar novo registro no cartão
  static create(req, res, next) {
    const { tipoVacina, dataAplicacao, responsavel, lote, funcionario, status } = req.body;

    // Validação básica
    if (!tipoVacina || !dataAplicacao || !responsavel || !funcionario) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: tipoVacina, dataAplicacao, responsavel, funcionario' 
      });
    }

    const novoCartao = {
      tipoVacina,
      dataAplicacao,
      responsavel,
      lote: lote || null,
      funcionario,
      status: status || 'aplicada'
    };

    CartaoVacina.create(novoCartao, (err, cartao) => {
      if (err) {
        return next(err);
      }
      res.status(201).json(cartao);
    });
  }

  // Deletar registro do cartão
  static delete(req, res, next) {
    const { id } = req.params;

    CartaoVacina.delete(id, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Registro do cartão deletado com sucesso' });
    });
  }

  // Buscar registros por funcionário
  static getByFuncionario(req, res, next) {
    const { funcionario } = req.params;

    CartaoVacina.getByFuncionario(funcionario, (err, cartoes) => {
      if (err) {
        return next(err);
      }
      res.json(cartoes);
    });
  }

  // Buscar registros por data
  static getByData(req, res, next) {
    const { data } = req.params;

    CartaoVacina.getByData(data, (err, cartoes) => {
      if (err) {
        return next(err);
      }
      res.json(cartoes);
    });
  }

  // Atualizar status
  static updateStatus(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Campo status é obrigatório' });
    }

    CartaoVacina.updateStatus(id, status, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Status atualizado com sucesso', id, status });
    });
  }
}

module.exports = CartaoVacinaController;
