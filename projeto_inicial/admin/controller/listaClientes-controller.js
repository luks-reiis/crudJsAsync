import { clienteService } from "../service/cliente-service.js";

const criaNovaLinha = (nome, email, id) => {
  const linhaNovoCliente = document.createElement("tr");
  const conteudo = `<td class="td" data-td>${nome}</td>
                      <td>${email}</td>
                      <td>
                          <ul class="tabela__botoes-controle">
                              <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                              <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                          </ul>
                      </td>`;
  linhaNovoCliente.innerHTML = conteudo;
  linhaNovoCliente.dataset.id = id;
  return linhaNovoCliente;
};

const tabela = document.querySelector("[data-tabela]");

tabela.addEventListener("click", async (evento) => {
  let ehBtnDeletar =
    evento.target.className === "botao-simples botao-simples--excluir";
  if (ehBtnDeletar) {
    try {
      const linhaCliente = evento.target.closest("[data-id]");
      let id = linhaCliente.dataset.id;
      await clienteService.removeCliente(id);
      linhaCliente.remove();
    } catch (erro) {
      console.log(erro);
      window.location.href = "../telas/erro.html";
    }
  }
});

const render = async () => {
  try {
    const data = await clienteService.listaClientes();
    data.forEach((registro) => {
      tabela.appendChild(
        criaNovaLinha(registro.nome, registro.email, registro.id)
      );
    });
  } catch (erro) {
    console.log(erro);
    window.location.href = "../telas/erro.html";
  }
};

render();
