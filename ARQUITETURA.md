# Arquitetura do Backend - Sistema de Controle de Vacinas

## Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração do banco de dados
│   ├── models/
│   │   ├── Funcionario.js       # Model de Funcionário
│   │   ├── Vacina.js            # Model de Vacina
│   │   ├── Registro.js          # Model de Registro de Aplicação
│   │   ├── Agendamento.js       # Model de Agendamento
│   │   └── CartaoVacina.js      # Model de Cartão de Vacina
│   ├── controllers/
│   │   ├── funcionarioController.js
│   │   ├── vacinaController.js
│   │   ├── registroController.js
│   │   ├── agendamentoController.js
│   │   └── cartaoVacinaController.js
│   ├── routes/
│   │   ├── funcionarioRoutes.js
│   │   ├── vacinaRoutes.js
│   │   ├── registroRoutes.js
│   │   ├── agendamentoRoutes.js
│   │   └── cartaoVacinaRoutes.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   └── app.js                   # Configuração do Express
├── server.js                    # Entrada da aplicação
├── package.json
└── .env
```

## Banco de Dados - SQLite

### Tabela: funcionarios
```sql
CREATE TABLE funcionarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  senha VARCHAR(255),
  registro VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  secao VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: vacinas
```sql
CREATE TABLE vacinas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(255) NOT NULL,
  registro VARCHAR(50) UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: registros
```sql
CREATE TABLE registros (
  id VARCHAR(50) PRIMARY KEY,
  funcionario VARCHAR(255) NOT NULL,
  responsavel VARCHAR(255) NOT NULL,
  data_aplicacao DATE NOT NULL,
  tipo_vacina VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: agendamentos
```sql
CREATE TABLE agendamentos (
  id VARCHAR(50) PRIMARY KEY,
  nome_paciente VARCHAR(255) NOT NULL,
  tipo_vacina VARCHAR(255) NOT NULL,
  local_vacinacao VARCHAR(255) NOT NULL,
  data_vacinacao DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: cartao_vacina
```sql
CREATE TABLE cartao_vacina (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo_vacina VARCHAR(255) NOT NULL,
  data_aplicacao DATE NOT NULL,
  responsavel VARCHAR(255) NOT NULL,
  lote VARCHAR(100),
  funcionario VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'aplicada',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **SQLite3** - Banco de dados relacional
- **CORS** - Middleware para permitir requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente

## Padrão MVC

### Model
Responsável pela lógica de dados e interação com o banco de dados.

### Controller
Contém a lógica de negócio e manipula as requisições HTTP.

### Routes
Define as rotas da API e mapeia para os controllers.

## API Endpoints

### Funcionários
- GET /funcionarios - Listar todos
- GET /funcionarios/:id - Buscar por ID
- POST /funcionarios - Criar novo
- PUT /funcionarios/:id - Atualizar
- DELETE /funcionarios/:id - Deletar

### Vacinas
- GET /vacinas - Listar todas
- GET /vacinas/:id - Buscar por ID
- POST /vacinas - Criar nova
- PATCH /vacinas/:id - Atualizar parcialmente
- DELETE /vacinas/:id - Deletar

### Registros
- GET /registros - Listar todos
- GET /registros/:id - Buscar por ID
- POST /registros - Criar novo

### Agendamentos
- GET /agendamentos - Listar todos
- GET /agendamentos/:id - Buscar por ID
- POST /agendamentos - Criar novo
- DELETE /agendamentos/:id - Deletar

### Cartão de Vacina
- GET /cartaoVacina - Listar todos
- GET /cartaoVacina/:id - Buscar por ID
- POST /cartaoVacina - Criar novo registro

## Fluxo de Registro de Vacina

1. Usuário preenche formulário de registro de vacina
2. POST /registros - Cria registro de aplicação
3. POST /cartaoVacina - Automaticamente cria entrada no cartão de vacina
4. GET /cartaoVacina - Exibe no cartão de vacina do funcionário
