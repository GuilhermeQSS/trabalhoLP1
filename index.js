//set-ExecutionPolicy unrestricted
//[A] Sim para Todos
//npm init
//npm install
//npm install express
//npm install express-session
//npm install -g json-server
//node ${arquivo}.js
//json-server -p ${porta} ${arquivo}.js

import express from 'express';
import session from 'express-session';
import { verificacaoAdmin, verificacaoUsuario } from './seguranca/seguranca.js';
const server = express();
const host = '0.0.0.0';
const port = 3000;
let urlUsuarios = 'http://localhost:4000/usuarios';
let urlClientes = 'http://localhost:4000/clientes';
let dadosUsuarios = [];
let dadosClientes = [];
(function obterDadosUsuarios() {
  fetch(urlUsuarios, {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((usuarios) => {
      dadosUsuarios = usuarios;
    })
    .catch((erro) => {
      console.log(erro);
    });
})();

(function obterDadosClientes() {
  fetch(urlClientes, {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((clientes) => {
      dadosClientes = clientes;
    })
    .catch((erro) => {
      console.log(erro);
    });
})();

function cadastrarUsuario(usuario) {
  fetch(urlUsuarios, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  })
    .then((resposta) => {
      if (resposta.ok) {
        return resposta.json();
      }
    })
    .then((dados) => {
      dadosUsuarios.push(usuario);
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function cadastrarCliente(cliente) {
  fetch(urlClientes, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((dados) => {
      dadosClientes.push(dados);
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function atualizarUsuario(usuario, idUsuario) {
  fetch(`${urlUsuarios}/${idUsuario}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((dados) => {
      const index = dadosUsuarios.findIndex((u) => u.id === dados.id);
      if (index !== -1) {
        dadosUsuarios.splice(index, 1, dados);
      } else {
        dadosUsuarios.push(dados);
      }
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function atualizarCliente(cliente, idCliente) {
  fetch(`${urlClientes}/${idCliente}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((dados) => {
      const index = dadosClientes.findIndex((c) => c.id === dados.id);
      if (index !== -1) {
        dadosClientes.splice(index, 1, dados);
      } else {
        dadosClientes.push(dados);
      }
    })
    .catch((erro) => {
      console.log(erro);
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
server.post('/login', (req, res) => {
  const { email, senha } = req.body;
  if (email === 'admin@gmail.com' && senha === 'admin') {
    req.session.admin = true;
    res.redirect('/admin.html');
  } else if (
    dadosUsuarios.some(
      (usuario) => usuario.email == email && usuario.senha == senha,
    )
  ) {
    req.session.usuario = true;
    req.session.usuarioInfo = { email, senha };
    const usuario = dadosUsuarios.find(
      (u) => u.email === req.session.usuarioInfo.email,
    );

    const clienteExistente = dadosClientes.find(
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
      cadastrarCliente(cliente);
    }
    res.redirect('/indexLogado.html');
  } else {
    res.redirect('/login.html');
  }
});

server.post('/cadastro', (req, res) => {
  const { email, senha, confirmaSenha } = req.body;
  if (
    senha == confirmaSenha &&
    !dadosUsuarios.some((usuario) => usuario.email == email)
  ) {
    cadastrarUsuario({ email, senha });
  }
  res.redirect('/login.html');
});

server.post('/editar-perfil', (req, res) => {
  const { nome, cep, cpf, telefone } = req.body;
  const { email } = req.session.usuarioInfo;
  const usuarioExistente = dadosUsuarios.find((u) => u.email == email);
  const clienteExistente = dadosClientes.find(
    (c) => c.idUsuario == usuarioExistente.id,
  );
  const idCliente = clienteExistente.id;
  const cliente = {
    nome,
    cep,
    cpf,
    telefone,
  };
  atualizarCliente(cliente, idCliente);
  res.redirect('html/perfil.html');
});

server.get('/dados', (req, res) => {
  if (req.session.usuarioInfo != null) {
    res.json(req.session.usuarioInfo);
  }
});

server.get('/logado', (req, res) => {
  if (req.session.usuarioInfo != null) {
    const usuario = dadosUsuarios.find(
      (u) => u.email === req.session.usuarioInfo.email,
    );
    const cliente = dadosClientes.find((c) => c.idUsuario === usuario?.id);
    if (usuario && cliente) {
      res.json({
        nome: cliente.nome,
        cep: cliente.cep,
        cpf: cliente.cpf,
        telefone: cliente.telefone,
        email: usuario.email,
        senha: usuario.senha,
      });
    }
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
