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
    })
    .catch((erro) => {
      alert(erro);
    });
}

infoUsuario();
