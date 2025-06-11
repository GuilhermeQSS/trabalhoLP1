document.getElementById('formCategoria').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;

  const categoria = { nome, descricao };

  fetch('http://localhost:4000/categorias', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria),
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json();
      }
    })
    .then(dados => {
      document.getElementById('mensagem').textContent = 'Categoria cadastrada com sucesso!';
      e.target.reset();
    })
    .catch(erro => {
      document.getElementById('mensagem').textContent = `Erro: ${erro.message}`;
    });
});
