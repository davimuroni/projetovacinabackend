const db = require('./src/config/database');
const fs = require('fs');
const path = require('path');

// Ler dados do db.json
const dbJsonPath = path.join(__dirname, '../frontend/api/data/db.json');
const data = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));

console.log('Iniciando população do banco de dados...');

// Popular funcionários
const funcionarios = data.funcionarios || [];
let funcionariosCount = 0;

funcionarios.forEach((func) => {
  const sql = `
    INSERT OR IGNORE INTO funcionarios (id, nome, cpf, senha, registro, email, telefone, secao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [
    func.id,
    func.nome,
    func.cpf,
    func.senha || '1234',
    func.registro,
    func.email,
    func.telefone,
    func.secao
  ], (err) => {
    if (err) {
      console.error('Erro ao inserir funcionário:', err.message);
    } else {
      funcionariosCount++;
      console.log(`Funcionário ${func.nome} inserido`);
    }
  });
});

// Popular vacinas
const vacinas = data.vacinas || [];
let vacinasCount = 0;

vacinas.forEach((vacina) => {
  const sql = `
    INSERT OR IGNORE INTO vacinas (id, nome, registro)
    VALUES (?, ?, ?)
  `;
  db.run(sql, [vacina.id, vacina.nome, vacina.registro], (err) => {
    if (err) {
      console.error('Erro ao inserir vacina:', err.message);
    } else {
      vacinasCount++;
      console.log(`Vacina ${vacina.nome} inserida`);
    }
  });
});

// Popular agendamentos
const agendamentos = data.agendamentos || [];
let agendamentosCount = 0;

agendamentos.forEach((agend) => {
  const sql = `
    INSERT OR IGNORE INTO agendamentos (id, nome_paciente, tipo_vacina, local_vacinacao, data_vacinacao)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(sql, [
    agend.id,
    agend.nomePaciente,
    agend.tipoVacina,
    agend.localVacinacao,
    agend.dataVacinacao
  ], (err) => {
    if (err) {
      console.error('Erro ao inserir agendamento:', err.message);
    } else {
      agendamentosCount++;
      console.log(`Agendamento ${agend.id} inserido`);
    }
  });
});

// Popular registros
const registros = data.registros || [];
let registrosCount = 0;

registros.forEach((reg) => {
  const sql = `
    INSERT OR IGNORE INTO registros (id, funcionario, responsavel, data_aplicacao, tipo_vacina)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(sql, [
    reg.id,
    reg.funcionario,
    reg.responsavel,
    reg.dataAplicacao,
    reg.tipoVacina
  ], (err) => {
    if (err) {
      console.error('Erro ao inserir registro:', err.message);
    } else {
      registrosCount++;
      console.log(`Registro ${reg.id} inserido`);
    }
  });
});

// Popular cartão de vacina
const cartaoVacina = data.cartaoVacina || [];
let cartaoCount = 0;

cartaoVacina.forEach((cartao) => {
  const sql = `
    INSERT OR IGNORE INTO cartao_vacina (id, tipo_vacina, data_aplicacao, responsavel, lote, funcionario, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [
    cartao.id,
    cartao.tipoVacina,
    cartao.dataAplicacao,
    cartao.responsavel,
    cartao.lote,
    cartao.funcionario,
    cartao.status
  ], (err) => {
    if (err) {
      console.error('Erro ao inserir cartão de vacina:', err.message);
    } else {
      cartaoCount++;
      console.log(`Cartão de vacina ${cartao.id} inserido`);
    }
  });
});

// Aguardar um pouco e exibir resumo
setTimeout(() => {
  console.log('\n=== RESUMO DA POPULAÇÃO ===');
  console.log(`Funcionários: ${funcionariosCount}/${funcionarios.length}`);
  console.log(`Vacinas: ${vacinasCount}/${vacinas.length}`);
  console.log(`Agendamentos: ${agendamentosCount}/${agendamentos.length}`);
  console.log(`Registros: ${registrosCount}/${registros.length}`);
  console.log(`Cartão de Vacina: ${cartaoCount}/${cartaoVacina.length}`);
  console.log('===========================\n');
  
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar banco:', err.message);
    } else {
      console.log('Banco de dados fechado');
    }
    process.exit(0);
  });
}, 2000);
