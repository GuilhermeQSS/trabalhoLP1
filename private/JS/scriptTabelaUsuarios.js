let urlBase = "http://localhost:4000/usuarios";
let listaUsuarios = [];

function obterDadosUsuarios() {
    fetch(urlBase, {
        method: "GET",
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((usuarios) => {
            listaUsuarios = usuarios;
            atualizarTabela();
        })
        .catch((erro) => {
            alert(erro);
        });
}
function deletarUsuario(id) {
    if (confirm("Deseja excluir o cliente: " + id + "?")) {
        fetch(urlBase + "/" + id, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((usuario) => {
                alert("Cliente excluído com sucesso!");
                listaUsuarios = listaUsuarios.filter((usuarios) => {
                    return id !== usuarios.id;
                });
                atualizarTabela();
            })
            .catch((erro) => {
                alert(erro);
            });
    }
}
function atualizarTabela() {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";
    listaUsuarios.forEach((usuario) => {
        tabela.innerHTML += `
            <tr>
                <td scope="row">${usuario.id}</td>
                <td>${usuario.email}</td>
                <td>${usuario.senha}</td>
                <td>
                    <button
                        onclick="deletarUsuario('${usuario.id}')"
                        class="btn btn-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
            `;
    });
}
obterDadosUsuarios();
