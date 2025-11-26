const Vacina = require('../models/Vacina');

class VacinaController {
  // Listar todas as vacinas
  static getAll(req, res, next) {
    Vacina.getAll((err, vacinas) => {
      if (err) {
        return next(err);
      }
      res.json(vacinas);
    });
  }

  // Buscar vacina por ID
  static getById(req, res, next) {
    const { id } = req.params;
    
    Vacina.getById(id, (err, vacina) => {
      if (err) {
        return next(err);
      }
      if (!vacina) {
        return res.status(404).json({ error: 'Vacina não encontrada' });
      }
      res.json(vacina);
    });
  }

  // Criar nova vacina
  static create(req, res, next) {
    const { nome, registro } = req.body;

    // Validação básica
    if (!nome || !registro) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: nome, registro' 
      });
    }

    const novaVacina = { nome, registro };

    Vacina.create(novaVacina, (err, vacina) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ 
            error: 'Registro já cadastrado' 
          });
        }
        return next(err);
      }
      res.status(201).json(vacina);
    });
  }

  // Atualizar vacina (PUT - completo)
  static update(req, res, next) {
    const { id } = req.params;
    const { nome, registro } = req.body;

    // Validação básica
    if (!nome || !registro) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: nome, registro' 
      });
    }

    const vacinaAtualizada = { nome, registro };

    Vacina.update(id, vacinaAtualizada, (err, vacina) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ 
            error: 'Registro já cadastrado para outra vacina' 
          });
        }
        return next(err);
      }
      res.json(vacina);
    });
  }

  // Atualizar vacina parcialmente (PATCH)
  static patch(req, res, next) {
    const { id } = req.params;
    const { nome, registro } = req.body;

    // Validação - pelo menos um campo deve ser fornecido
    if (!nome && !registro) {
      return res.status(400).json({ 
        error: 'Forneça pelo menos um campo para atualizar: nome ou registro' 
      });
    }

    const dadosAtualizacao = {};
    if (nome) dadosAtualizacao.nome = nome;
    if (registro) dadosAtualizacao.registro = registro;

    Vacina.patch(id, dadosAtualizacao, (err, vacina) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ 
            error: 'Registro já cadastrado para outra vacina' 
          });
        }
        return next(err);
      }
      res.json(vacina);
    });
  }

  // Deletar vacina
  static delete(req, res, next) {
    const { id } = req.params;

    Vacina.delete(id, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Vacina deletada com sucesso' });
    });
  }
}

module.exports = VacinaController;
