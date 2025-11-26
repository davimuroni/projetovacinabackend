const express = require('express');
const router = express.Router();
const FuncionarioController = require('../controllers/funcionarioController');

// Rotas CRUD de funcionários
router.get('/', FuncionarioController.getAll);
router.get('/:id', FuncionarioController.getById);
router.post('/', FuncionarioController.create);
router.put('/:id', FuncionarioController.update);
router.delete('/:id', FuncionarioController.delete);

module.exports = router;
