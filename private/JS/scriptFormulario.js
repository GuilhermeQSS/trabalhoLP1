document.getElementById('formFornecedor').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const cnpj = document.getElementById('cnpj').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  const fornecedor = { nome, email, cnpj, telefone };

  fetch('/fornecedores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fornecedor),
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error('Erro ao cadastrar fornecedor');
      }
      return resposta.json();
    })
    .then(function (dados) {
      document.getElementById('mensagem').textContent = 'Fornecedor cadastrado com sucesso!';
      e.target.reset();
    })
    .catch(function (erro) {
      document.getElementById('mensagem').textContent = `Erro: ${erro.message}`;
    });
});
