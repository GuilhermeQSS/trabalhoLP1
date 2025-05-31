let urlBase = "http://localhost:4000/produtos";
let listaProdutos = [];

function obterDadosProdutos() {
    fetch(urlBase, {
        method: "GET",
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((produtos) => {
            listaProdutos = produtos;
            atualizarTabela();
        })
        .catch((erro) => {
            alert(erro);
        });
}
function deletarProduto(id) {
    if (confirm("Deseja excluir o produto: " + id + "?")) {
        fetch(urlBase + "/" + id, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((produto) => {
                alert("Produto excluído com sucesso!");
                listaProdutos = listaProdutos.filter((produto) => {
                    return id != produto.id;
                });
                atualizarTabela();
            })
            .catch((erro) => {
                alert(erro);
            });
    }
}
function cadastrarProduto(produto) {
    fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
    })
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            }
        })
        .then((dados) => {
            alert(`Produto incluído com sucesso! ID:${dados.id}`);
            atualizarTabela();
        })
        .catch((erro) => {
            alert("Erro ao cadastrar o produto:" + erro);
        });
}

function atualizarTabela() {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";
    listaProdutos.forEach((produto) => {
        tabela.innerHTML += `
            <tr>
                <td scope="row">${produto.id}</td>
                <td>${produto.idCategoria}</td>
                <td>${produto.idFornecedor}</td>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td>${produto.qtde}</td>
                <td>
                    <button
                        onclick="deletarCategoria('${produto.id}')"
                        class="btn btn-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
            `;
    });
}
obterDadosProdutos();
