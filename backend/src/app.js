const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

// Importar rotas
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const vacinaRoutes = require('./routes/vacinaRoutes');
const registroRoutes = require('./routes/registroRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const cartaoVacinaRoutes = require('./routes/cartaoVacinaRoutes');

const app = express();

// ... no arquivo backend/src/app.js
const path = require('path');
// ...

// Servir arquivos estáticos do frontend
const frontendPath = path.join(__dirname, '..', '..', 'frontend');
app.use(express.static(frontendPath));
// ...


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/funcionarios', funcionarioRoutes);
app.use('/vacinas', vacinaRoutes);
app.use('/registros', registroRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/cartaoVacina', cartaoVacinaRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API de Controle de Vacinas - Funcionando!' });
});

// Middleware de erro (deve ser o último)
app.use(errorHandler);

module.exports = app;
