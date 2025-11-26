const express = require('express');
const router = express.Router();
const CartaoVacinaController = require('../controllers/cartaoVacinaController');

// Rotas do cartão de vacina
router.get('/', CartaoVacinaController.getAll);
router.get('/:id', CartaoVacinaController.getById);
router.post('/', CartaoVacinaController.create);
router.delete('/:id', CartaoVacinaController.delete);
router.get('/funcionario/:funcionario', CartaoVacinaController.getByFuncionario);
router.get('/data/:data', CartaoVacinaController.getByData);
router.patch('/:id/status', CartaoVacinaController.updateStatus);

module.exports = router;
