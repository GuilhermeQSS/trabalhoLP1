const urlProdutos = 'http://localhost:4000/produtos';

function vitrine() {
  fetch(urlProdutos, {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((produtos) => {
      const vitrine = document.getElementById('vitrine');
      vitrine.innerHTML = '';
      produtos.forEach((produto) => {
        let card = document.createElement('div');
        card.className = 'card bg-dark text-light';
        card.style.width = '18rem';

        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text">Descrição: ${produto.cat}</p>
            <p class="card-text">Preço: R$ ${produto.preco.toFixed(2)}</p>
          </div>
        `;

        vitrine.appendChild(card);
      });
    })
    .catch((erro) => {
      alert(erro);
    });
}

vitrine();
