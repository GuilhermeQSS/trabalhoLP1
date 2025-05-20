let urlBase = 'http://localhost:3000/Usuario'
let listaDeUsuarios = [];
function obterDadosUsuario(){
    fetch(urlBase, {
        method:"GET"
    })
    .then((res)=>{
        if(res.ok){
            return res.json();
        }
    }).then((Usuario)=>{
        listaDeUsuarios = Usuario;
        mostrarTabelaUsuario();
    })
    .catch((erro)=>{
        alert("erro ao tentar recuperar usuarios do server")
    });
}

obterDadosUsuario();