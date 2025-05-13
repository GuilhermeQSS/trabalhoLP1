import express from 'express';

const app = express();
const port = 3002;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
      <form method="post" action="/cadastrar">
          <input type="text" name="user" placeholder="Digite seu nome">
          <button type="submit">Cadastrar</button>
      </form>`);
});

app.post('/cadastrar', (req, res) => {
  const user = req.body.user;
  res.send(`Usuário: ${user}`);
});

app.listen(port, () => {
  console.log(`Servidor iniciado: http://localhost:${port}`);
});
