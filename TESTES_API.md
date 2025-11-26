# Guia de Testes da API

Este documento contém exemplos práticos de como testar todos os endpoints da API.

## 🧪 Testando com curl

### 1. Verificar se a API está funcionando

```bash
curl http://localhost:3000/
```

**Resposta esperada:**
```json
{"message":"API de Controle de Vacinas - Funcionando!"}
```

---

## 👥 Funcionários

### Listar todos os funcionários

```bash
curl http://localhost:3000/funcionarios
```

### Buscar funcionário por ID

```bash
curl http://localhost:3000/funcionarios/1
```

### Criar novo funcionário

```bash
curl -X POST http://localhost:3000/funcionarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Paula Silva",
    "cpf": "555.666.777-88",
    "registro": "FUNC100",
    "email": "ana.paula@email.com",
    "telefone": "(21) 98888-7777",
    "secao": "Recursos Humanos"
  }'
```

### Atualizar funcionário

```bash
curl -X PUT http://localhost:3000/funcionarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Atualizado",
    "cpf": "123.456.789-00",
    "registro": "FUNC001",
    "email": "joao.novo@email.com",
    "telefone": "(11) 99999-8888",
    "secao": "TI"
  }'
```

### Deletar funcionário

```bash
curl -X DELETE http://localhost:3000/funcionarios/1
```

---

## 💉 Vacinas

### Listar todas as vacinas

```bash
curl http://localhost:3000/vacinas
```

### Buscar vacina por ID

```bash
curl http://localhost:3000/vacinas/1
```

### Criar nova vacina

```bash
curl -X POST http://localhost:3000/vacinas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Tríplice Viral",
    "registro": "REG300"
  }'
```

### Atualizar vacina parcialmente (PATCH)

```bash
curl -X PATCH http://localhost:3000/vacinas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "BCG - Atualizada"
  }'
```

### Atualizar vacina completamente (PUT)

```bash
curl -X PUT http://localhost:3000/vacinas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "BCG Completo",
    "registro": "REG213"
  }'
```

### Deletar vacina

```bash
curl -X DELETE http://localhost:3000/vacinas/1
```

---

## 📝 Registros de Aplicação

### Listar todos os registros

```bash
curl http://localhost:3000/registros
```

### Buscar registro por ID

```bash
curl http://localhost:3000/registros/REG001
```

### Criar novo registro (adiciona automaticamente ao cartão)

```bash
curl -X POST http://localhost:3000/registros \
  -H "Content-Type: application/json" \
  -d '{
    "funcionario": "Ana Paula Silva",
    "responsavel": "Dr. Carlos Mendes",
    "dataAplicacao": "2025-11-25",
    "tipoVacina": "Covid-19",
    "lote": "LOTE2025A"
  }'
```

**Resposta esperada:**
```json
{
  "registro": {
    "id": "a1b2",
    "funcionario": "Ana Paula Silva",
    "responsavel": "Dr. Carlos Mendes",
    "dataAplicacao": "2025-11-25",
    "tipoVacina": "Covid-19"
  },
  "cartaoVacina": {
    "id": 10,
    "tipoVacina": "Covid-19",
    "dataAplicacao": "2025-11-25",
    "responsavel": "Dr. Carlos Mendes",
    "lote": "LOTE2025A",
    "funcionario": "Ana Paula Silva",
    "status": "aplicada"
  },
  "message": "Registro criado com sucesso e adicionado ao cartão de vacina"
}
```

### Buscar registros por funcionário

```bash
curl http://localhost:3000/registros/funcionario/Ana%20Paula%20Silva
```

### Deletar registro

```bash
curl -X DELETE http://localhost:3000/registros/a1b2
```

---

## 📅 Agendamentos

### Listar todos os agendamentos

```bash
curl http://localhost:3000/agendamentos
```

### Buscar agendamento por ID

```bash
curl http://localhost:3000/agendamentos/6044
```

### Criar novo agendamento

```bash
curl -X POST http://localhost:3000/agendamentos \
  -H "Content-Type: application/json" \
  -d '{
    "nomePaciente": "Pedro Santos",
    "tipoVacina": "Influenza",
    "localVacinacao": "Posto de Saúde Central",
    "dataVacinacao": "2025-12-10"
  }'
```

### Buscar agendamentos por paciente

```bash
curl http://localhost:3000/agendamentos/paciente/Pedro%20Santos
```

### Deletar agendamento

```bash
curl -X DELETE http://localhost:3000/agendamentos/6044
```

---

## 💳 Cartão de Vacina

### Listar todos os registros do cartão

```bash
curl http://localhost:3000/cartaoVacina
```

### Buscar registro por ID

```bash
curl http://localhost:3000/cartaoVacina/1
```

### Criar novo registro no cartão

```bash
curl -X POST http://localhost:3000/cartaoVacina \
  -H "Content-Type: application/json" \
  -d '{
    "tipoVacina": "Hepatite B",
    "dataAplicacao": "2025-11-25",
    "responsavel": "Enfermeira Maria",
    "lote": "LOTE456",
    "funcionario": "Pedro Santos",
    "status": "aplicada"
  }'
```

### Buscar registros por funcionário

```bash
curl http://localhost:3000/cartaoVacina/funcionario/Pedro%20Santos
```

### Buscar registros por data

```bash
curl http://localhost:3000/cartaoVacina/data/2025-11-25
```

### Atualizar status

```bash
curl -X PATCH http://localhost:3000/cartaoVacina/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "pendente"
  }'
```

### Deletar registro do cartão

```bash
curl -X DELETE http://localhost:3000/cartaoVacina/1
```

---

## 🧪 Testes Completos - Fluxo de Uso

### Cenário 1: Cadastrar funcionário e aplicar vacina

```bash
# 1. Criar funcionário
curl -X POST http://localhost:3000/funcionarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos",
    "cpf": "999.888.777-66",
    "registro": "FUNC200",
    "email": "maria.santos@email.com",
    "telefone": "(11) 97777-6666",
    "secao": "Vendas"
  }'

# 2. Registrar aplicação de vacina (adiciona automaticamente ao cartão)
curl -X POST http://localhost:3000/registros \
  -H "Content-Type: application/json" \
  -d '{
    "funcionario": "Maria Santos",
    "responsavel": "Enfermeira Ana",
    "dataAplicacao": "2025-11-25",
    "tipoVacina": "Covid-19",
    "lote": "LOTE789"
  }'

# 3. Verificar cartão de vacina da funcionária
curl http://localhost:3000/cartaoVacina/funcionario/Maria%20Santos
```

### Cenário 2: Cadastrar vacina e agendar aplicação

```bash
# 1. Criar nova vacina
curl -X POST http://localhost:3000/vacinas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Febre Amarela",
    "registro": "REG400"
  }'

# 2. Criar agendamento
curl -X POST http://localhost:3000/agendamentos \
  -H "Content-Type: application/json" \
  -d '{
    "nomePaciente": "Maria Santos",
    "tipoVacina": "Febre Amarela",
    "localVacinacao": "Clínica São Paulo",
    "dataVacinacao": "2025-12-01"
  }'

# 3. Listar agendamentos
curl http://localhost:3000/agendamentos
```

---

## 🔍 Testando Validações

### Tentar criar funcionário sem campos obrigatórios

```bash
curl -X POST http://localhost:3000/funcionarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste Incompleto"
  }'
```

**Resposta esperada:**
```json
{
  "error": "Campos obrigatórios: nome, cpf, registro, email"
}
```

### Tentar criar funcionário com CPF duplicado

```bash
curl -X POST http://localhost:3000/funcionarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Outro Funcionário",
    "cpf": "999.888.777-66",
    "registro": "FUNC201",
    "email": "outro@email.com",
    "telefone": "(11) 99999-9999",
    "secao": "TI"
  }'
```

**Resposta esperada:**
```json
{
  "error": "CPF ou registro já cadastrado"
}
```

---

## 📊 Testando com Postman/Insomnia

### Importar Coleção

Crie uma nova coleção com os seguintes endpoints:

**Base URL:** `http://localhost:3000`

| Método | Endpoint | Body |
|--------|----------|------|
| GET | `/` | - |
| GET | `/funcionarios` | - |
| POST | `/funcionarios` | JSON |
| PUT | `/funcionarios/:id` | JSON |
| DELETE | `/funcionarios/:id` | - |
| GET | `/vacinas` | - |
| POST | `/vacinas` | JSON |
| PATCH | `/vacinas/:id` | JSON |
| DELETE | `/vacinas/:id` | - |
| GET | `/registros` | - |
| POST | `/registros` | JSON |
| GET | `/cartaoVacina` | - |
| GET | `/cartaoVacina/funcionario/:funcionario` | - |

---

## ✅ Checklist de Testes

- [ ] API responde na porta 3000
- [ ] Listar funcionários retorna array
- [ ] Criar funcionário retorna objeto com ID
- [ ] Atualizar funcionário funciona
- [ ] Deletar funcionário funciona
- [ ] Listar vacinas retorna array
- [ ] Criar vacina funciona
- [ ] PATCH de vacina funciona
- [ ] Deletar vacina funciona
- [ ] Criar registro adiciona ao cartão automaticamente
- [ ] Buscar cartão por funcionário funciona
- [ ] Validações de campos obrigatórios funcionam
- [ ] Validações de duplicação funcionam

---

## 🐛 Problemas Comuns

**Erro: connect ECONNREFUSED**
- O servidor não está rodando
- Execute: `npm start` no diretório backend

**Erro: 404 Not Found**
- Verifique se a rota está correta
- Verifique se o servidor está rodando

**Erro: 400 Bad Request**
- Verifique se todos os campos obrigatórios foram enviados
- Verifique se o JSON está bem formatado

**Erro: 409 Conflict**
- CPF ou registro já cadastrado
- Use valores únicos

---

## 📝 Notas

- Todos os endpoints retornam JSON
- Datas devem estar no formato `YYYY-MM-DD`
- IDs de registros e agendamentos são gerados automaticamente
- O lote é opcional ao registrar vacina
- Status padrão do cartão é "aplicada"
