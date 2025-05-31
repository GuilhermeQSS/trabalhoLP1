let urlBase = "http://localhost:4000/fornecedores";
let listaFornecedores = [];

function obterDadosFornecedores() {
    fetch(urlBase, {
        method: "GET",
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
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
        fetch(urlBase + "/" + id, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((fornecedor) => {
                alert("Fornecedor excluído com sucesso!");
                listaFornecedores = listaFornecedores.filter((fornecedor) => {
                    return id != fornecedor.id;
                });
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
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fornecedor),
    })
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            }
        })
        .then((dados) => {
            alert(`Fornecedor incluído com sucesso! ID:${dados.id}`);
            atualizarTabela();
        })
        .catch((erro) => {
            alert("Erro ao cadastrar o fornecedor:" + erro);
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
                <td>${fornecedor.cpfcnpj}</td>
                <td>
                    <button
                        onclick="deletarCategoria('${fornecedor.id}')"
                        class="btn btn-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
            `;
    });
}
obterDadosFornecedores();
