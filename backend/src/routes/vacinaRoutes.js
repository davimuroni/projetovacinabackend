const express = require('express');
const router = express.Router();
const VacinaController = require('../controllers/vacinaController');

// Rotas CRUD de vacinas
router.get('/', VacinaController.getAll);
router.get('/:id', VacinaController.getById);
router.post('/', VacinaController.create);
router.put('/:id', VacinaController.update);
router.patch('/:id', VacinaController.patch);
router.delete('/:id', VacinaController.delete);

module.exports = router;
