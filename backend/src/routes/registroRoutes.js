const express = require('express');
const router = express.Router();
const RegistroController = require('../controllers/registroController');

// Rotas de registros de aplicação de vacinas
router.get('/', RegistroController.getAll);
router.get('/:id', RegistroController.getById);
router.post('/', RegistroController.create);
router.delete('/:id', RegistroController.delete);
router.get('/funcionario/:funcionario', RegistroController.getByFuncionario);

module.exports = router;
