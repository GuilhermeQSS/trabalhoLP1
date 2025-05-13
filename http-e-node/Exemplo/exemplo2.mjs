import e from 'express';

const app = e();
const port = 3001;
const host = '0.0.0.0';

app.use(e.static('./public'));
app.use(e.urlencoded({ extended: true }))

app.get("/", (req,res) => {
  const form = `<form method="post" action="/tabuada"> 
  <input type="number" name="numero" placeholder="Insira um numero">
  <input type="number" name="qtd" placeholder="Até Quantos">
  <button type="submit">Tabuada</button>
</form>`;
res.send(form);
})

app.post('/tabuada', (req, res) => {
  const numero = req.body.numero;
  const qtd = req.body.qtd;
  if (!isNaN(numero) && numero !== 0 && !isNaN(qtd) && qtd > 0) {
    let conteudo = `
      <html>
        <head>
          <title>Tabuada do ${numero}</title>
          <a href="/">Voltar</a>
          <style>
            body { font-family: Arial; background: #f0f0f0; padding: 20px; }
            h1 { color: #333; }
            p { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>Tabuada do ${numero} até ${qtd}</h1>
    `;
    for (let i = 1; i <= qtd; i++) {
      conteudo += `<p>${numero} x ${i} = ${numero * i}</p>`;
    }

    conteudo += `
          </body>
        </html>
      `;

    res.status(200).send(conteudo);
  } else {
    res.status(400).send(`
    <html>
      <head><title>Erro</title></head>
      <body style="font-family: Arial; background: #ffe6e6; color: #a00;">
        <h1>Erro 400 - Requisição Inválida</h1>
        <p>Você precisa informar um número válido na URL. Exemplo:</p>
        <code>/tabuada?numero=5&qtd=10</code>
      </body>
    </html>
  `);
  }
});

app.listen(port, host, () => {
  console.log(`Servidor iniciado: http://localhost:${port}/`);
});
