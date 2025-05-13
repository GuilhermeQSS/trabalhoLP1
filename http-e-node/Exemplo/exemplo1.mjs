import e from 'express';

const app = e();
const port = 3000;
const host = '0.0.0.0';

app.use(e.static('./public'));

app.get('/', (req, res) => {
  res.send('<p>Amongus<p>');
});

app.get('/amongus', (req, res) => {
  res.send("<img src='/amongus.webp' alt = 'amongus'>");
});

app.listen(port, host, () => {
  console.log(`Servidor iniciado: http://localhost:${port}/`);
});
