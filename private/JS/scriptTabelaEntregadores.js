let urlBase = "http://localhost:4000/entregadores";
let listaEntregadores = [];

function obterDadosEntregadores() {
  fetch(urlBase, { method: "GET" })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((entregadores) => {
      listaEntregadores = entregadores;
      atualizarTabela();
    })
    .catch((erro) => {
      alert(erro);
    });
}

function deletarEntregador(id) {
  if (confirm("Deseja excluir o entregador: " + id + "?")) {
    fetch(`${urlBase}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        alert("Entregador excluído com sucesso!");
        listaEntregadores = listaEntregadores.filter(
          (entregador) => entregador.id != id
        );
        atualizarTabela();
      })
      .catch((erro) => {
        alert(erro);
      });
  }
}

function cadastrarEntregador(entregador) {
  fetch(urlBase, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entregador),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((dados) => {
      alert(`Entregador incluído com sucesso! ID: ${dados.id}`);
      listaEntregadores.push(dados);
      atualizarTabela();
    })
    .catch((erro) => {
      alert("Erro ao cadastrar o entregador: " + erro);
    });
}

function atualizarTabela() {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  listaEntregadores.forEach((entregador) => {
    tabela.innerHTML += `
      <tr>
        <td scope="row">${entregador.id}</td>
        <td>${entregador.nome}</td>
        <td>${entregador.email}</td>
        <td>${entregador.cpf}</td>
        <td>${entregador.telefone}</td>
        <td>${entregador.veiculo}</td>
        <td>
          <button onclick="deletarEntregador('${entregador.id}')" class="btn btn-danger">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

obterDadosEntregadores();
