let urlBase = "http://localhost:4000/fornecedores";
let listaFornecedores = [];

function obterDadosFornecedores() {
  fetch(urlBase, { method: "GET" })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Erro ao obter fornecedores");
      }
    })
    .then((fornecedores) => {
      listaFornecedores = fornecedores;
      atualizarTabela();
    })
    .catch((erro) => {
      alert(erro);
    });
}

function deletarFornecedor(id) {
  if (confirm("Deseja excluir o fornecedor: " + id + "?")) {
    fetch(`${urlBase}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Erro ao deletar fornecedor");
        }
      })
      .then(() => {
        alert("Fornecedor excluído com sucesso!");
        listaFornecedores = listaFornecedores.filter(
          (fornecedor) => fornecedor.id != id
        );
        atualizarTabela();
      })
      .catch((erro) => {
        alert(erro);
      });
  }
}

function cadastrarFornecedor(fornecedor) {
  fetch(urlBase, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fornecedor),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Erro ao cadastrar fornecedor");
      }
    })
    .then((dados) => {
      alert(`Fornecedor incluído com sucesso! ID: ${dados.id}`);
      listaFornecedores.push(dados);
      atualizarTabela();
    })
    .catch((erro) => {
      alert(erro);
    });
}

function atualizarTabela() {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  listaFornecedores.forEach((fornecedor) => {
    tabela.innerHTML += `
      <tr>
        <td scope="row">${fornecedor.id}</td>
        <td>${fornecedor.email}</td>
        <td>${fornecedor.telefone || ""}</td>
        <td>${fornecedor.cnpj}</td>
        <td>
          <button onclick="deletarFornecedor('${fornecedor.id}')" class="btn btn-danger">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

obterDadosFornecedores();
