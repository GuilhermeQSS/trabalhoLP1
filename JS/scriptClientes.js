let urlBase = 'http://localhost:3000/Usuario'
let listaDeUsuarios = [];
async function obterDadosUsuario(){
    await fetch(urlBase, {
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