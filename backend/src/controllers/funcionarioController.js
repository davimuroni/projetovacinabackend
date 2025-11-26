const Funcionario = require('../models/Funcionario');

class FuncionarioController {
  // Listar todos os funcionários
  static getAll(req, res, next) {
    Funcionario.getAll((err, funcionarios) => {
      if (err) {
        return next(err);
      }
      res.json(funcionarios);
    });
  }

  // Buscar funcionário por ID
  static getById(req, res, next) {
    const { id } = req.params;
    
    Funcionario.getById(id, (err, funcionario) => {
      if (err) {
        return next(err);
      }
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }
      res.json(funcionario);
    });
  }

  // Criar novo funcionário
  static create(req, res, next) {
    const { nome, cpf, senha, registro, email, telefone, secao } = req.body;

    // Validação básica
    if (!nome || !cpf || !registro || !email) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: nome, cpf, registro, email' 
      });
    }

    const novoFuncionario = {
      nome,
      cpf,
      senha: senha || '1234',
      registro,
      email,
      telefone,
      secao
    };

    Funcionario.create(novoFuncionario, (err, funcionario) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ 
            error: 'CPF ou registro já cadastrado' 
          });
        }
        return next(err);
      }
      res.status(201).json(funcionario);
    });
  }

  // Atualizar funcionário
  static update(req, res, next) {
    const { id } = req.params;
    const { nome, cpf, registro, email, telefone, secao } = req.body;

    // Validação básica
    if (!nome || !cpf || !registro || !email) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: nome, cpf, registro, email' 
      });
    }

    const funcionarioAtualizado = {
      nome,
      cpf,
      registro,
      email,
      telefone,
      secao
    };

    Funcionario.update(id, funcionarioAtualizado, (err, funcionario) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ 
            error: 'CPF ou registro já cadastrado para outro funcionário' 
          });
        }
        return next(err);
      }
      res.json(funcionario);
    });
  }

  // Deletar funcionário
  static delete(req, res, next) {
    const { id } = req.params;

    Funcionario.delete(id, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Funcionário deletado com sucesso' });
    });
  }
}

module.exports = FuncionarioController;
