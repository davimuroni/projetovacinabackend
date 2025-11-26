# Sistema de Controle de Vacinas

Sistema completo para gerenciamento de vacinas com frontend e backend integrados.

## 📋 Descrição

Sistema desenvolvido para controlar o cadastro de funcionários, vacinas, agendamentos e registros de aplicação de vacinas. O sistema possui integração automática entre o registro de aplicação e o cartão de vacina.

## 🏗️ Arquitetura

### Backend
- **Node.js** com Express
- **Arquitetura MVC** (Model-View-Controller)
- **Banco de dados SQLite**
- **API RESTful**

### Frontend
- **HTML5, CSS3, JavaScript**
- **Bootstrap 5**
- Interface responsiva e moderna

## 📁 Estrutura do Projeto

```
projetovacinabackend/
├── backend/                    # Backend Node.js
│   ├── src/
│   │   ├── config/            # Configuração do banco de dados
│   │   ├── models/            # Models (Funcionário, Vacina, Registro, etc.)
│   │   ├── controllers/       # Controllers com lógica de negócio
│   │   ├── routes/            # Rotas da API
│   │   ├── middlewares/       # Middlewares (tratamento de erros)
│   │   └── app.js             # Configuração do Express
│   ├── server.js              # Entrada da aplicação
│   ├── seed.js                # Script para popular banco de dados
│   ├── package.json
│   └── .env                   # Variáveis de ambiente
├── frontend/                   # Frontend da aplicação
│   ├── pages/                 # Páginas HTML
│   ├── js/                    # Scripts JavaScript
│   ├── style/                 # Estilos CSS
│   ├── public/                # Imagens e assets
│   └── index.html             # Página inicial
└── ARQUITETURA.md             # Documentação da arquitetura
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou pnpm

### 1. Instalar Dependências do Backend

```bash
cd backend
npm install
```

### 2. Popular o Banco de Dados (Opcional)

```bash
cd backend
node seed.js
```

Este comando irá popular o banco de dados com dados de exemplo do arquivo `frontend/api/data/db.json`.

### 3. Iniciar o Servidor Backend

```bash
cd backend
npm start
```

O servidor estará rodando em `http://localhost:3000`

### 4. Abrir o Frontend

Abra o arquivo `frontend/index.html` em um navegador web ou use um servidor local:

```bash
cd frontend
python3 -m http.server 8080
```

Acesse: `http://localhost:8080`

## 📡 API Endpoints

### Funcionários
- `GET /funcionarios` - Listar todos
- `GET /funcionarios/:id` - Buscar por ID
- `POST /funcionarios` - Criar novo
- `PUT /funcionarios/:id` - Atualizar
- `DELETE /funcionarios/:id` - Deletar

### Vacinas
- `GET /vacinas` - Listar todas
- `GET /vacinas/:id` - Buscar por ID
- `POST /vacinas` - Criar nova
- `PATCH /vacinas/:id` - Atualizar parcialmente
- `DELETE /vacinas/:id` - Deletar

### Registros de Aplicação
- `GET /registros` - Listar todos
- `GET /registros/:id` - Buscar por ID
- `POST /registros` - Criar novo (adiciona automaticamente ao cartão de vacina)
- `DELETE /registros/:id` - Deletar

### Agendamentos
- `GET /agendamentos` - Listar todos
- `GET /agendamentos/:id` - Buscar por ID
- `POST /agendamentos` - Criar novo
- `DELETE /agendamentos/:id` - Deletar

### Cartão de Vacina
- `GET /cartaoVacina` - Listar todos
- `GET /cartaoVacina/:id` - Buscar por ID
- `POST /cartaoVacina` - Criar novo
- `GET /cartaoVacina/funcionario/:funcionario` - Buscar por funcionário
- `GET /cartaoVacina/data/:data` - Buscar por data
- `DELETE /cartaoVacina/:id` - Deletar

## 🔄 Fluxo de Registro de Vacina

1. Usuário acessa a tela de **Registro de Vacina**
2. Preenche o formulário com:
   - Funcionário vacinado
   - Responsável pela aplicação
   - Data de aplicação
   - Tipo de vacina
   - Lote (opcional)
3. Ao submeter, o sistema:
   - Cria um registro na tabela `registros`
   - **Automaticamente** cria uma entrada no `cartao_vacina`
4. O cartão de vacina é atualizado em tempo real

## 💾 Banco de Dados

O sistema utiliza **SQLite** com as seguintes tabelas:

- **funcionarios** - Dados dos funcionários
- **vacinas** - Tipos de vacinas disponíveis
- **registros** - Registros de aplicação de vacinas
- **agendamentos** - Agendamentos de vacinação
- **cartao_vacina** - Histórico de vacinas aplicadas

## 🛠️ Tecnologias Utilizadas

### Backend
- Express.js
- SQLite3
- CORS
- dotenv

### Frontend
- Bootstrap 5
- JavaScript ES6+
- Fetch API

## 📝 Funcionalidades

✅ Cadastro completo de funcionários (CRUD)  
✅ Cadastro completo de vacinas (CRUD)  
✅ Registro de aplicação de vacinas  
✅ Agendamento de vacinações  
✅ Cartão de vacina com histórico completo  
✅ Integração automática entre registro e cartão  
✅ Interface responsiva e moderna  
✅ Validação de dados  
✅ Tratamento de erros  

## 🔐 Segurança

- Validação de dados no backend
- Tratamento de erros centralizado
- Prevenção de duplicação de CPF e registros
- CORS configurado

## 📚 Documentação Adicional

Consulte o arquivo `ARQUITETURA.md` para detalhes completos sobre a arquitetura do sistema.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👥 Autores

Desenvolvido para controle de vacinas em ambientes corporativos.

---

**Nota:** Este é um sistema de demonstração. Para uso em produção, considere adicionar:
- Autenticação e autorização
- Criptografia de senhas
- Backup automático do banco de dados
- Logs de auditoria
- Testes automatizados
