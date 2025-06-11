import express from 'express';
import session from 'express-session';
import { verificacaoAdmin, verificacaoUsuario } from './seguranca/seguranca.js';

const server = express();
const host = '0.0.0.0';
const port = 3000;

const urlUsuarios = 'http://localhost:4000/usuarios';
const urlClientes = 'http://localhost:4000/clientes';
const urlFornecedores = 'http://localhost:4000/fornecedores';
const urlProdutos = 'http://localhost:4000/produtos';
const urlEntregadores = "http://localhost:4000/entregadores";
const urlCategorias = "http://localhost:4000/categorias";

function recuperarFornecedor(fornecedor) {
  return fetch(urlFornecedores, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fornecedor),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}

function cadastrarCategorias(categoria) {
  return fetch(urlCategorias, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria),
  }).then(res => {
    if (res.ok){return res.json();}
  });
}


function cadastrarEntregadores(entregador) {
  return fetch(urlEntregadores, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entregador),
  }).then(res => {
    if (res.ok){return res.json();}
  });
}

function cadastrarProdutos(produto) {
  return fetch(urlProdutos, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  }).then(res => {
    if (res.ok){return res.json();}
  });
}

function cadastrarFornecedor(fornecedor) {
  return fetch(urlFornecedores, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fornecedor),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}

function obterDadosUsuarios() {
  return fetch(urlUsuarios)
    .then((res) => (res.ok ? res.json() : []))
    .catch((erro) => {
      console.log(erro);
      return [];
    });
}

function obterDadosClientes() {
  return fetch(urlClientes)
    .then((res) => (res.ok ? res.json() : []))
    .catch((erro) => {
      console.log(erro);
      return [];
    });
}

function cadastrarUsuario(usuario) {
  return fetch(urlUsuarios, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  })
    .then((res) => (res.ok ? res.json() : null))
    .catch((erro) => {
      console.log(erro);
      return null;
    });
}

function cadastrarCliente(cliente) {
  return fetch(urlClientes, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  })
    .then((res) => (res.ok ? res.json() : null))
    .catch((erro) => {
      console.log(erro);
      return null;
    });
}

function atualizarCliente(cliente, idCliente) {
  return fetch(`${urlClientes}/${idCliente}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  })
    .then((res) => (res.ok ? res.json() : null))
    .catch((erro) => {
      console.log('Erro ao atualizar cliente:', erro);
      return null;
    });
}

server.use(
  session({
    secret: 'fdsfdsfds',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    },
  }),
);
server.use(express.urlencoded({ extended: true }));
server.use(express.static('./bibliotecas'));
server.use(express.static('./public'));

server.get('/', (req, res) => {
  res.redirect('/index.html');
});

server.post('/categorias', express.json(), (req, res) => {
  const categoria = req.body;

  cadastrarCategorias(categoria)
    .then(dados => {
      res.json(dados);
    })
    .catch(erro => {
      console.log(erro);
    });
});

server.post('/entregadores', express.json(), (req, res) => {
  const entregador = req.body;

  cadastrarEntregadores(entregador)
    .then(dados => {
      res.json(dados);
    })
    .catch(erro => {
      console.log(erro);
    });
});

server.post('/produtos', express.json(), (req, res) => {
  const produto = req.body;

  cadastrarProdutos(produto)
    .then(dados => {
      res.json(dados);
    })
    .catch(erro => {
      console.log(erro);
    });
});

server.post('/fornecedores', express.json(), (req, res) => {
  const fornecedor = req.body;

  cadastrarFornecedor(fornecedor)
    .then((dados) => {
      res.json(dados);
    })
    .catch((erro) => {
      console.log(erro);
    });
});

server.post('/fornecedores2', express.json(), (req, res) => {
  const fornecedor = req.body;

  recuperarFornecedor(fornecedor)
    .then((dados) => {
      res.json(dados);
    })
    .catch((erro) => {
      console.log(erro);
    });
});

server.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === 'admin@gmail.com' && senha === 'admin') {
    req.session.admin = true;
    res.redirect('/admin.html');
  } else {
    obterDadosUsuarios().then((usuarios) => {
      const usuario = usuarios.find(
        (u) => u.email === email && u.senha === senha,
      );
      if (usuario) {
        req.session.usuario = true;
        req.session.usuarioInfo = { email, senha };

        obterDadosClientes().then((clientes) => {
          const clienteExistente = clientes.find(
            (c) => c.idUsuario === usuario.id,
          );
          if (!clienteExistente) {
            const cliente = {
              idUsuario: usuario.id,
              nome: 'Nome',
              cep: '00000-000',
              cpf: '000.000.000-00',
              telefone: '(00) 00000-0000',
            };
            cadastrarCliente(cliente).then(() => {
              res.redirect('/indexLogado.html');
            });
          } else {
            res.redirect('/indexLogado.html');
          }
        });
      } else {
        res.redirect('/login.html');
      }
    });
  }
});

server.post('/cadastro', (req, res) => {
  const { email, senha, confirmaSenha } = req.body;

  if (senha === confirmaSenha) {
    obterDadosUsuarios().then((usuarios) => {
      const jaExiste = usuarios.some((u) => u.email === email);
      if (!jaExiste) {
        cadastrarUsuario({ email, senha }).then(() => {
          res.redirect('/login.html');
        });
      } else {
        res.redirect('/login.html');
      }
    });
  } else {
    res.redirect('/login.html');
  }
});

server.post('/editar-perfil', (req, res) => {
  const { nome, cep, cpf, telefone } = req.body;
  const { email } = req.session.usuarioInfo;

  obterDadosUsuarios().then((usuarios) => {
    const usuario = usuarios.find((u) => u.email === email);
    if (usuario) {
      obterDadosClientes().then((clientes) => {
        const cliente = clientes.find((c) => c.idUsuario === usuario.id);
        if (cliente) {
          atualizarCliente({ nome, cep, cpf, telefone }, cliente.id).then(
            () => {
              res.redirect('html/perfil.html');
            },
          );
        } else {
          res.redirect('/indexLogado.html');
        }
      });
    } else {
      res.redirect('/login.html');
    }
  });
});

server.get('/dados', (req, res) => {
  if (req.session.usuarioInfo) {
    res.json(req.session.usuarioInfo);
  }
});

server.get('/logado', (req, res) => {
  if (req.session.usuarioInfo) {
    obterDadosUsuarios().then((usuarios) => {
      const usuario = usuarios.find(
        (u) => u.email === req.session.usuarioInfo.email,
      );
      if (usuario) {
        obterDadosClientes().then((clientes) => {
          const cliente = clientes.find((c) => c.idUsuario === usuario.id);
          if (cliente) {
            res.json({
              nome: cliente.nome,
              cep: cliente.cep,
              cpf: cliente.cpf,
              telefone: cliente.telefone,
              email: usuario.email,
              senha: usuario.senha,
            });
          }
        });
      }
    });
  }
});

server.use(verificacaoUsuario, express.static('./logado'));
server.use(verificacaoAdmin, express.static('./private'));
server.get('/deslogar', (req, res) => {
  req.session.destroy();
  res.redirect('/login.html');
});

server.listen(port, host, () => {
  console.log(`http://localhost:${port}`);
});
