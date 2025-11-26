const Agendamento = require('../models/Agendamento');

class AgendamentoController {
  // Listar todos os agendamentos
  static getAll(req, res, next) {
    Agendamento.getAll((err, agendamentos) => {
      if (err) {
        return next(err);
      }
      res.json(agendamentos);
    });
  }

  // Buscar agendamento por ID
  static getById(req, res, next) {
    const { id } = req.params;
    
    Agendamento.getById(id, (err, agendamento) => {
      if (err) {
        return next(err);
      }
      if (!agendamento) {
        return res.status(404).json({ error: 'Agendamento não encontrado' });
      }
      res.json(agendamento);
    });
  }

  // Criar novo agendamento
  static create(req, res, next) {
    const { nomePaciente, tipoVacina, localVacinacao, dataVacinacao } = req.body;

    // Validação básica
    if (!nomePaciente || !tipoVacina || !localVacinacao || !dataVacinacao) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: nomePaciente, tipoVacina, localVacinacao, dataVacinacao' 
      });
    }

    const novoAgendamento = {
      nomePaciente,
      tipoVacina,
      localVacinacao,
      dataVacinacao
    };

    Agendamento.create(novoAgendamento, (err, agendamento) => {
      if (err) {
        return next(err);
      }
      res.status(201).json(agendamento);
    });
  }

  // Deletar agendamento
  static delete(req, res, next) {
    const { id } = req.params;

    Agendamento.delete(id, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Agendamento deletado com sucesso' });
    });
  }

  // Buscar agendamentos por paciente
  static getByPaciente(req, res, next) {
    const { nomePaciente } = req.params;

    Agendamento.getByPaciente(nomePaciente, (err, agendamentos) => {
      if (err) {
        return next(err);
      }
      res.json(agendamentos);
    });
  }
}

module.exports = AgendamentoController;
