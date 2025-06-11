document.getElementById('formEntregador').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const cpf = document.getElementById('cpf').value;
  const telefone = document.getElementById('telefone').value;
  const veiculo = document.getElementById('veiculo').value;

  const entregador = { nome, email, cpf, telefone, veiculo };

  fetch('/entregadores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entregador),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        return resposta.json();
      }
    })
    .then(function (dados) {
      document.getElementById('mensagem').textContent = 'Entregador cadastrado com sucesso!';
      e.target.reset();
    })
    .catch(function (erro) {
      document.getElementById('mensagem').textContent = `Erro: ${erro.message}`;
    });
});
