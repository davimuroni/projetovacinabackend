const Registro = require('../models/Registro');
const CartaoVacina = require('../models/CartaoVacina');

class RegistroController {
  // Listar todos os registros
  static getAll(req, res, next) {
    Registro.getAll((err, registros) => {
      if (err) {
        return next(err);
      }
      res.json(registros);
    });
  }

  // Buscar registro por ID
  static getById(req, res, next) {
    const { id } = req.params;
    
    Registro.getById(id, (err, registro) => {
      if (err) {
        return next(err);
      }
      if (!registro) {
        return res.status(404).json({ error: 'Registro não encontrado' });
      }
      res.json(registro);
    });
  }

  // Criar novo registro e adicionar ao cartão de vacina
  static create(req, res, next) {
    const { funcionario, responsavel, dataAplicacao, tipoVacina, lote } = req.body;

    // Validação básica
    if (!funcionario || !responsavel || !dataAplicacao || !tipoVacina) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: funcionario, responsavel, dataAplicacao, tipoVacina' 
      });
    }

    const novoRegistro = {
      funcionario,
      responsavel,
      dataAplicacao,
      tipoVacina
    };

    // Criar registro
    Registro.create(novoRegistro, (err, registro) => {
      if (err) {
        return next(err);
      }

      // Criar entrada no cartão de vacina automaticamente
      const cartaoData = {
        tipoVacina,
        dataAplicacao,
        responsavel,
        lote: lote || null,
        funcionario,
        status: 'aplicada'
      };

      CartaoVacina.create(cartaoData, (errCartao, cartao) => {
        if (errCartao) {
          console.error('Erro ao criar entrada no cartão de vacina:', errCartao);
          // Não retorna erro, apenas registra no log
        }

        res.status(201).json({
          registro,
          cartaoVacina: cartao || null,
          message: 'Registro criado com sucesso e adicionado ao cartão de vacina'
        });
      });
    });
  }

  // Deletar registro
  static delete(req, res, next) {
    const { id } = req.params;

    Registro.delete(id, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Registro deletado com sucesso' });
    });
  }

  // Buscar registros por funcionário
  static getByFuncionario(req, res, next) {
    const { funcionario } = req.params;

    Registro.getByFuncionario(funcionario, (err, registros) => {
      if (err) {
        return next(err);
      }
      res.json(registros);
    });
  }
}

module.exports = RegistroController;
