function infoUsuario() {
  fetch('/logado', {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((usuario) => {
      document.getElementById('nome').value = usuario.nome;
      document.getElementById('cep').value = usuario.cep;
      document.getElementById('cpf').value = usuario.cpf;
      document.getElementById('telefone').value = usuario.telefone;
      document.getElementById('emailUsuario').value = usuario.email;
      document.getElementById('senhaUsuario').value = usuario.senha;
    })
    .catch((erro) => {
      alert(erro);
    });
}

infoUsuario();
