document.getElementById('formProdutos').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const preco = Number(document.getElementById('preco').value);
  const qtde = document.getElementById('qtde').value;
  const cat = document.getElementById('cat').value;
  const fornecedor = document.getElementById('fornecedor').value;
  const urlBase = "http://localhost:4000/fornecedores";
  const urlBase2 = "http://localhost:4000/categorias";


  fetch(urlBase, { method: "GET" })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
    })
    .then((fornecedores) => {
      let fornecedorExiste = false;

      for (let i = 0; i < fornecedores.length; i++) {
        if (fornecedores[i].nome === fornecedor) {
          fornecedorExiste = true;
          break;
        }
      }
      if (fornecedorExiste) {
        fetch(urlBase2, { method: "GET" })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
    })
    .then((categorias) => {
      let categoriaExiste = false;

      for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].nome === cat) {
          categoriaExiste = true;
          break;
        }
      }
      if (categoriaExiste) {
        ObterDadosProd(e, { nome, preco, qtde, cat, fornecedor });
      } else {
        document.getElementById('mensagem').textContent = 'categoria não encontrado.';
      }
    })
    .catch((erro) => {
      alert(erro);
    });
      } else {
        document.getElementById('mensagem').textContent = 'Fornecedor não encontrado.';
      }
    })
    .catch((erro) => {
      alert(erro);
    });
  })
  
  function ObterDadosProd(e, produtos){
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
  }

