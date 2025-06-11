document.getElementById('formFornecedor').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const cnpj = document.getElementById('cnpj').value;
  const telefone = document.getElementById('telefone').value;

  const fornecedor = { nome, email, cnpj, telefone };

  fetch('/fornecedores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fornecedor),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        return resposta.json();
      }
    })
    .then(function (dados) {
      document.getElementById('mensagem').textContent = 'Fornecedor cadastrado com sucesso!';
      e.target.reset();
    })
    .catch(function (erro) {
      document.getElementById('mensagem').textContent = `Erro: ${erro.message}`;
    });
});
