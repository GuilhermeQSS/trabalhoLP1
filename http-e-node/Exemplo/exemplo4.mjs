import e from 'express';
import session from 'express-session';
import verificarAutenticacao from './autenticacao.js';

const app = e();
const port = 4000;

// Middleware para processar formulários
app.use(e.urlencoded({ extended: true }));

// Sessão deve vir ANTES de autenticação
app.use(
  session({
    secret: 'SUS',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    },
  }),
);

// Serve arquivos públicos
app.use(e.static('./public'));

// Protege arquivos privados com a sessão

let users = [];

app.use((req, res, next) => {
  console.log(`Requisição: ${req.method} ${req.url}`);
  console.log('Corpo:', req.body);
  next();
});

// Cadastro de usuários
app.post('/register', (req, res) => {
  console.log('Recebido POST em /register');
  const { user, password, email } = req.body;
  if (!users.find((el) => el.user === user && el.email === email)) {
    users.push({ user, password, email });
    console.log(users);
  }
  res.redirect('/login.html');
});

// Login
app.post('/login', (req, res) => {
  const { user, password } = req.body;
  let result = '';

  // Login admin
  if (user === 'admin' && password === 'admin') {
    users.forEach((el) => {
      result += `Usuário: ${el.user}, Senha: ${el.password}, Email: ${el.email}<br>`;
    });
    req.session.autenticado = true;
    return res.send(result + "<a href='/login.html'>Voltar</a>");
  }

  // Login de usuário comum
  if (users.find((el) => el.user === user && el.password === password)) {
    req.session.autenticado = true;
    return res.redirect('/homePage.html');
  }

  // Falha no login
  res.redirect('/login.html');
  res.end();
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login.html');
  res.end();
});

app.use(verificarAutenticacao, e.static('./private'));

app.listen(port, () => {
  console.log(`Servidor Iniciado: http://localhost:${port}/register.html`);
});
