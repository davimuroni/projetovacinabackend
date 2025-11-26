document.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.getElementById("historicoVacinas");
  // const cartaoId = 1; // Id do cartão que deseja mostrar - Removido, pois o frontend não tem lógica de login/usuário. Usaremos a rota de listagem completa.

  // Data atual
  const hoje = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  try {
    // 1. Rota corrigida para buscar todos os registros do cartão
    const response = await fetch(`http://localhost:3000/cartaoVacina` );
    const data = await response.json();

    tabela.innerHTML = "";

    // 2. Nomes de campos corrigidos para corresponder ao backend (data_aplicacao)
    const vacinasHoje = data.filter(vacina => vacina.data_aplicacao === hoje);

    if (vacinasHoje.length === 0) {
      tabela.innerHTML = `
        <tr>
          <td colspan="5" class="text-center">Nenhuma vacina aplicada hoje.</td>
        </tr>
      `;
      return;
    }

    vacinasHoje.forEach(vacina => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <!-- 3. Nomes de campos corrigidos (tipo_vacina e data_aplicacao) -->
        <td>${vacina.tipo_vacina}</td>
        <td>${vacina.data_aplicacao}</td>
        <td>${vacina.responsavel || "-"}</td>
        <td>${vacina.lote || "-"}</td>
        <td>${vacina.funcionario || "-"}</td>
      `;
      tabela.appendChild(tr);
    });

  } catch (error) {
    console.error("Erro ao buscar dados da vacina:", error);
    tabela.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">
          Erro ao carregar dados. Verifique o servidor.
        </td>
      </tr>
    `;
  }
});
