# Backend - Sistema de Controle de Vacinas

Backend desenvolvido em Node.js com arquitetura MVC para gerenciamento de vacinas.

## 🏗️ Arquitetura MVC

### Models
Responsáveis pela lógica de dados e interação com o banco de dados SQLite.

- `Funcionario.js` - Gerenciamento de funcionários
- `Vacina.js` - Gerenciamento de vacinas
- `Registro.js` - Gerenciamento de registros de aplicação
- `Agendamento.js` - Gerenciamento de agendamentos
- `CartaoVacina.js` - Gerenciamento do cartão de vacina

### Controllers
Contêm a lógica de negócio e manipulam as requisições HTTP.

- `funcionarioController.js` - CRUD de funcionários
- `vacinaController.js` - CRUD de vacinas
- `registroController.js` - Registro de aplicação (integra com cartão)
- `agendamentoController.js` - CRUD de agendamentos
- `cartaoVacinaController.js` - Gerenciamento do cartão

### Routes
Definem as rotas da API e mapeiam para os controllers.

## 🚀 Instalação

```bash
npm install
```

## ⚙️ Configuração

O arquivo `.env` contém as configurações:

```env
PORT=3000
DB_PATH=./database.sqlite
NODE_ENV=development
```

## 🗄️ Banco de Dados

O sistema cria automaticamente as tabelas no SQLite ao iniciar.

### Popular Banco de Dados

```bash
node seed.js
```

Este comando importa os dados do arquivo `../frontend/api/data/db.json`.

## 🎯 Executar

### Modo Produção
```bash
npm start
```

### Modo Desenvolvimento (com nodemon)
```bash
npm run dev
```

## 📡 Endpoints da API

### Funcionários

**Listar todos**
```http
GET /funcionarios
```

**Buscar por ID**
```http
GET /funcionarios/:id
```

**Criar novo**
```http
POST /funcionarios
Content-Type: application/json

{
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "registro": "FUNC001",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "secao": "TI"
}
```

**Atualizar**
```http
PUT /funcionarios/:id
Content-Type: application/json

{
  "nome": "João Silva Atualizado",
  "cpf": "123.456.789-00",
  "registro": "FUNC001",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "secao": "TI"
}
```

**Deletar**
```http
DELETE /funcionarios/:id
```

### Vacinas

**Listar todas**
```http
GET /vacinas
```

**Criar nova**
```http
POST /vacinas
Content-Type: application/json

{
  "nome": "Covid-19",
  "registro": "REG001"
}
```

**Atualizar parcialmente (PATCH)**
```http
PATCH /vacinas/:id
Content-Type: application/json

{
  "nome": "Covid-19 Atualizada"
}
```

**Deletar**
```http
DELETE /vacinas/:id
```

### Registros de Aplicação

**Criar registro (adiciona automaticamente ao cartão)**
```http
POST /registros
Content-Type: application/json

{
  "funcionario": "João Silva",
  "responsavel": "Enfermeira Ana",
  "dataAplicacao": "2025-11-25",
  "tipoVacina": "Covid-19",
  "lote": "LOTE123"
}
```

**Resposta:**
```json
{
  "registro": {
    "id": "a1b2",
    "funcionario": "João Silva",
    "responsavel": "Enfermeira Ana",
    "dataAplicacao": "2025-11-25",
    "tipoVacina": "Covid-19"
  },
  "cartaoVacina": {
    "id": 1,
    "tipoVacina": "Covid-19",
    "dataAplicacao": "2025-11-25",
    "responsavel": "Enfermeira Ana",
    "lote": "LOTE123",
    "funcionario": "João Silva",
    "status": "aplicada"
  },
  "message": "Registro criado com sucesso e adicionado ao cartão de vacina"
}
```

### Cartão de Vacina

**Listar todos**
```http
GET /cartaoVacina
```

**Buscar por funcionário**
```http
GET /cartaoVacina/funcionario/:funcionario
```

**Buscar por data**
```http
GET /cartaoVacina/data/:data
```

Exemplo: `GET /cartaoVacina/data/2025-11-25`

## 🔧 Estrutura de Pastas

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração SQLite
│   ├── models/
│   │   ├── Funcionario.js
│   │   ├── Vacina.js
│   │   ├── Registro.js
│   │   ├── Agendamento.js
│   │   └── CartaoVacina.js
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
│   └── app.js
├── server.js
├── seed.js
├── package.json
└── .env
```

## 🛡️ Tratamento de Erros

O sistema possui middleware centralizado de tratamento de erros que:

- Captura erros de validação
- Trata erros de banco de dados
- Retorna mensagens amigáveis
- Registra erros no console

## 📊 Validações

### Funcionários
- Nome, CPF, registro e email são obrigatórios
- CPF e registro devem ser únicos

### Vacinas
- Nome e registro são obrigatórios
- Registro deve ser único

### Registros
- Funcionário, responsável, data e tipo de vacina são obrigatórios
- Cria automaticamente entrada no cartão de vacina

## 🔄 Integração Automática

Ao criar um registro de aplicação de vacina via `POST /registros`, o sistema:

1. Valida os dados recebidos
2. Cria o registro na tabela `registros`
3. **Automaticamente** cria uma entrada na tabela `cartao_vacina`
4. Retorna ambos os registros na resposta

Isso garante que o cartão de vacina esteja sempre sincronizado com os registros.

## 🧪 Testando a API

### Com curl

```bash
# Listar funcionários
curl http://localhost:3000/funcionarios

# Criar funcionário
curl -X POST http://localhost:3000/funcionarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","cpf":"111.222.333-44","registro":"FUNC999","email":"teste@email.com","telefone":"(11) 99999-9999","secao":"TI"}'

# Registrar vacina
curl -X POST http://localhost:3000/registros \
  -H "Content-Type: application/json" \
  -d '{"funcionario":"Teste","responsavel":"Enfermeira","dataAplicacao":"2025-11-25","tipoVacina":"Covid-19","lote":"ABC123"}'
```

### Com Postman ou Insomnia

Importe a coleção de endpoints ou crie manualmente as requisições conforme documentado acima.

## 📝 Logs

Os logs do servidor são exibidos no console. Para salvar em arquivo:

```bash
node server.js > server.log 2>&1
```

## 🔐 Segurança

**Implementado:**
- Validação de dados
- Tratamento de erros
- CORS configurado
- Prevenção de duplicação

**Recomendado para produção:**
- Autenticação JWT
- Rate limiting
- Helmet.js para headers de segurança
- Criptografia de senhas com bcrypt
- Validação com Joi ou express-validator

## 🚀 Deploy

Para deploy em produção:

1. Configure as variáveis de ambiente
2. Use PM2 para gerenciar o processo
3. Configure proxy reverso (Nginx)
4. Habilite HTTPS

```bash
npm install -g pm2
pm2 start server.js --name vacina-api
pm2 save
pm2 startup
```

## 📚 Dependências

- **express** - Framework web
- **sqlite3** - Driver do SQLite
- **cors** - Middleware CORS
- **dotenv** - Gerenciamento de variáveis de ambiente

## 🐛 Troubleshooting

**Erro: SQLITE_BUSY**
- O banco está sendo acessado por outro processo
- Feche outras conexões e tente novamente

**Erro: UNIQUE constraint failed**
- CPF ou registro já cadastrado
- Verifique os dados antes de inserir

**Erro: Cannot find module**
- Execute `npm install` novamente
- Verifique se todas as dependências foram instaladas

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação ou abra uma issue no repositório.
