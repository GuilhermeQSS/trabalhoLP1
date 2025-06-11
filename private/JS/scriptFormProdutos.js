document.getElementById('formProdutos').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const preco = document.getElementById('preco').value;
  const qtde = document.getElementById('qtde').value;
  const cat = document.getElementById('cat').value;
  const fornecedor = document.getElementById('fornecedor').value;

  const produtos = { nome, preco, qtde, cat, fornecedor };

  fetch('/produtos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produtos),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        return resposta.json();
      }
     
    })
    .then(function (dados) {
      document.getElementById('mensagem').textContent = 'Produto cadastrado com sucesso!';
      e.target.reset();
    })
    .catch(function (erro) {
      document.getElementById('mensagem').textContent = `Erro: ${erro.message}`;
    });
});
