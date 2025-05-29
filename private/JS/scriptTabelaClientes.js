let urlBase = "http://localhost:4000/clientes";
let listaClientes = [];

function obterDadosClientes() {
    fetch(urlBase, {
        method: "GET",
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((clientes) => {
            listaClientes = clientes;
            atualizarTabela();
        })
        .catch((erro) => {
            alert(erro);
        });
}
function deletarCliente(id) {
    if (confirm("Deseja excluir o cliente: " + id + "?")) {
        fetch(urlBase + "/" + id, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((cliente) => {
                alert("Cliente excluído com sucesso!");
                listaClientes = listaClientes.filter((cliente) => {
                    return id != cliente.id;
                });
                atualizarTabela();
            })
            .catch((erro) => {
                alert(erro);
            });
    }
}
function cadastrarCliente(cliente) {
    fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
    })
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            }
        })
        .then((dados) => {
            alert(`Cliente incluído com sucesso! ID:${dados.id}`);
            atualizarTabela();
        })
        .catch((erro) => {
            alert("Erro ao cadastrar o cliente:" + erro);
        });
}

function atualizarTabela() {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";
    listaClientes.forEach((cliente) => {
        tabela.innerHTML += `
            <tr>
                <td scope="row">${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${cliente.senha}</td>
                <td>
                    <button
                        onclick="deletarCliente('${cliente.id}')"
                        class="btn btn-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
            `;
    });
}
obterDadosClientes();
