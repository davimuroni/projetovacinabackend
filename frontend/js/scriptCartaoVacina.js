document.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.getElementById("historicoVacinas");
  const cartaoId = 1; // Id do cartão que deseja mostrar

  // Data atual
  const hoje = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  try {
    const response = await fetch(`http://localhost:3000/cartaoVacina/${cartaoId}`);
    const data = await response.json();

    tabela.innerHTML = "";

    const vacinasHoje = data.filter(vacina => vacina.dataAplicacao === hoje);

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
        <td>${vacina.tipoVacina}</td>
        <td>${vacina.dataAplicacao}</td>
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
