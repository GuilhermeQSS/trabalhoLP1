function infoUsuario() {
  fetch('/logado', {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((usuario) => {
      document.getElementById('nome').value = usuario.nome;
      document.getElementById('cep').value = usuario.cep;
      document.getElementById('cpf').value = usuario.cpf;
      document.getElementById('telefone').value = usuario.telefone;
    })
    .catch((erro) => alert(erro));
}

infoUsuario();

document.querySelector('form').addEventListener('submit', function (e) {
  let formValido = true;

  document.querySelectorAll('input').forEach(function (input) {
    input.classList.remove('is-invalid');
  });

  const nome = document.getElementById('nome');
  const cep = document.getElementById('cep');
  const cpf = document.getElementById('cpf');
  const telefone = document.getElementById('telefone');
  if (nome.value.length < 3) {
    nome.classList.add('is-invalid');
    formValido = false;
  }

  if (cep.value.length < 8) {
    cep.classList.add('is-invalid');
    formValido = false;
  }

  if (cpf.value.length < 11) {
    cpf.classList.add('is-invalid');
    formValido = false;
  }

  if (telefone.value.length < 10) {
    telefone.classList.add('is-invalid');
    formValido = false;
  }

  if (!formValido) {
    e.preventDefault();
  }
});
