# 🚀 Início Rápido

Guia rápido para colocar o sistema funcionando em minutos.

## ⚡ Passos Rápidos

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Popular Banco de Dados

```bash
node seed.js
```

### 3. Iniciar Servidor

```bash
npm start
```

**Pronto!** O servidor está rodando em `http://localhost:3000`

---

## 🌐 Acessar o Frontend

### Opção 1: Abrir diretamente no navegador

```bash
# Abra o arquivo no navegador
open frontend/index.html
```

### Opção 2: Usar servidor HTTP

```bash
cd frontend
python3 -m http.server 8080
```

Acesse: `http://localhost:8080`

---

## ✅ Verificar se está funcionando

```bash
curl http://localhost:3000/
```

Deve retornar:
```json
{"message":"API de Controle de Vacinas - Funcionando!"}
```

---

## 🎯 Testar Funcionalidades

### Listar funcionários

```bash
curl http://localhost:3000/funcionarios
```

### Listar vacinas

```bash
curl http://localhost:3000/vacinas
```

### Criar novo funcionário

```bash
curl -X POST http://localhost:3000/funcionarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste Sistema",
    "cpf": "111.222.333-44",
    "registro": "FUNC999",
    "email": "teste@sistema.com",
    "telefone": "(11) 99999-9999",
    "secao": "TI"
  }'
```

### Registrar aplicação de vacina

```bash
curl -X POST http://localhost:3000/registros \
  -H "Content-Type: application/json" \
  -d '{
    "funcionario": "Teste Sistema",
    "responsavel": "Enfermeira Ana",
    "dataAplicacao": "2025-11-25",
    "tipoVacina": "Covid-19",
    "lote": "ABC123"
  }'
```

### Ver cartão de vacina

```bash
curl http://localhost:3000/cartaoVacina
```

---

## 📱 Usando o Frontend

1. Abra `frontend/index.html` no navegador
2. Navegue pelas opções do menu:
   - **Funcionários** - Cadastrar e listar funcionários
   - **Vacinas** - Cadastrar e listar vacinas
   - **Registrar Vacina** - Registrar aplicação de vacina
   - **Cartão de Vacina** - Ver histórico de vacinas aplicadas
   - **Agendamentos** - Agendar vacinações

---

## 🛠️ Script de Inicialização Automática

Use o script fornecido para iniciar tudo automaticamente:

```bash
./start.sh
```

Este script:
- Verifica se Node.js está instalado
- Instala dependências se necessário
- Popula o banco se não existir
- Inicia o servidor

---

## 📂 Estrutura Básica

```
projetovacinabackend/
├── backend/           # Backend Node.js
│   ├── src/          # Código fonte
│   ├── server.js     # Entrada da aplicação
│   └── seed.js       # Popular banco de dados
├── frontend/          # Frontend HTML/JS
│   ├── index.html    # Página inicial
│   ├── pages/        # Páginas do sistema
│   └── js/           # Scripts JavaScript
└── README.md         # Documentação completa
```

---

## 🔧 Comandos Úteis

### Backend

```bash
# Instalar dependências
npm install

# Iniciar servidor
npm start

# Iniciar em modo desenvolvimento (com nodemon)
npm run dev

# Popular banco de dados
node seed.js
```

### Testar API

```bash
# Verificar status
curl http://localhost:3000/

# Listar funcionários
curl http://localhost:3000/funcionarios

# Listar vacinas
curl http://localhost:3000/vacinas

# Listar registros
curl http://localhost:3000/registros

# Listar cartão de vacina
curl http://localhost:3000/cartaoVacina
```

---

## 🐛 Problemas?

### Porta 3000 já está em uso

```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Ou mudar a porta no arquivo .env
PORT=3001
```

### Banco de dados corrompido

```bash
# Deletar banco e recriar
rm backend/database.sqlite
node backend/seed.js
```

### Dependências não instaladas

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Próximos Passos

1. ✅ Sistema funcionando
2. 📖 Ler `README.md` para documentação completa
3. 🏗️ Ler `ARQUITETURA.md` para entender a estrutura
4. 🧪 Ler `TESTES_API.md` para exemplos de uso
5. 🎨 Personalizar o frontend conforme necessário
6. 🔐 Adicionar autenticação para produção

---

## 💡 Dicas

- O banco de dados é SQLite, arquivo `backend/database.sqlite`
- Registros de vacina são automaticamente adicionados ao cartão
- IDs de registros e agendamentos são gerados automaticamente
- Senhas padrão dos funcionários: `1234`
- Use o script `seed.js` para resetar dados de teste

---

## 📞 Ajuda

Consulte os arquivos de documentação:

- `README.md` - Documentação geral
- `ARQUITETURA.md` - Arquitetura do sistema
- `TESTES_API.md` - Exemplos de testes
- `backend/README.md` - Documentação do backend

---

**Pronto para usar! 🎉**
