let urlBase = "http://localhost:4000/categorias";
let listaCategorias = [];

function obterDadosCategorias() {
  fetch(urlBase, { method: "GET" })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(categorias => {
      listaCategorias = categorias;
      atualizarTabela();
    })
    .catch(erro => alert(erro.message));
}

function deletarCategoria(id) {
  if (confirm("Deseja excluir a categoria: " + id + "?")) {
    fetch(`${urlBase}/${id}`, { method: "DELETE" })
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(() => {
        alert("Categoria excluída com sucesso!");
        listaCategorias = listaCategorias.filter(categoria => categoria.id != id);
        atualizarTabela();
      })
      .catch(erro => alert(erro.message));
  }
}

function atualizarTabela() {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  listaCategorias.forEach(categoria => {
    tabela.innerHTML += `
      <tr>
        <td scope="row">${categoria.id}</td>
        <td>${categoria.nome}</td>
        <td>${categoria.descricao || ""}</td>
        <td>
          <button onclick="deletarCategoria('${categoria.id}')" class="btn btn-danger">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

obterDadosCategorias();
