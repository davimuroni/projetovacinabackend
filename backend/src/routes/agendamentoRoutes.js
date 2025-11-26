const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/agendamentoController');

// Rotas de agendamentos
router.get('/', AgendamentoController.getAll);
router.get('/:id', AgendamentoController.getById);
router.post('/', AgendamentoController.create);
router.delete('/:id', AgendamentoController.delete);
router.get('/paciente/:nomePaciente', AgendamentoController.getByPaciente);

module.exports = router;
