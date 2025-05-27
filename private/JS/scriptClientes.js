let urlBase = "http://localhost:3000/clientes";
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
function cadastrarCliente(cliente){
    fetch(urlBase, {
       "method":"POST",
       "headers": {
          "Content-Type":"application/json",
       },
       "body": JSON.stringify(cliente)
    })
    .then((resposta)=>{
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((dados) =>{
        alert(`Cliente incluído com sucesso! ID:${dados.id}`);
        mostrarTabelaClientes();
    })
    .catch((erro)=>{
        alert("Erro ao cadastrar o cliente:" + erro);
    });
}
obterDadosClientes();
function atualizarTabela() {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";
    listaClientes.forEach((cliente) => {
        tabela.innerHTML += `
            <tr>
                <td scope="row">${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.login}</td>
                <td>${cliente.senha}</td>
                <td>
                    <button
                        onclick="deletar()"
                        class="btn btn-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
            `;
    });
}
