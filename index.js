//set-ExecutionPolicy unrestricted
//[A] Sim para Todos
//npm init
//npm install
//npm install express
//npm install express-session
//npm install -g json-server
//node ${arquivo}.js
//json-server -p ${porta} ${arquivo}.js

import express from "express";
import session from "express-session";
import { verificacaoAdmin, verificacaoUsuario } from "./seguranca/seguranca.js";
const server = express();
const host = "0.0.0.0";
const port = 3000;
let urlUsuarios = "http://localhost:4000/usuarios";
let urlClientes = "http://localhost:4000/clientes";
let dadosUsuarios = [];
let dadosClientes = [];
(function obterDadosUsuarios() {
    fetch(urlUsuarios, {
        method: "GET",
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
            alert(erro);
        });
})();
(function obterDadosClientes() {
    fetch(urlUsuarios, {
        method: "GET",
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
            alert(erro);
        });
})();
function cadastrarUsuario(usuario) {
    fetch(urlUsuarios, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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
server.use(
    session({
        secret: "fdsfdsfds",
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
        },
    })
);
server.use(express.urlencoded({ extended: true }));
server.use(express.static("./bibliotecas"));
server.use(express.static("./public"));
server.get("/", (req, res) => {
    res.redirect("/index.html");
});
server.post("/login", (req, res) => {
    const { email, senha } = req.body;
    if (email === "admin@gmail.com" && senha === "admin") {
        req.session.admin = true;
        res.redirect("/admin.html");
    } else if (
        dadosDosUsuariosNoSistema.some(
            (usuario) => usuario.email == email && usuario.senha == senha
        )
    ) {
        req.session.usuario = true;
        req.session.usuarioInfo = { email, senha };
        res.redirect("/indexLogado.html");
    } else {
        res.redirect("/login.html");
    }
});

server.post("/cadastro", (req, res) => {
    const { email, senha, confirmaSenha } = req.body;
    if (
        senha == confirmaSenha &&
        !dadosUsuarios.some((usuario) => usuario.email == email)
    ) {
        cadastrarUsuario({ email, senha });
    }
    res.redirect("/login.html");
});

server.get("/dados", (req, res) => {
    if (req.session.usuarioInfo != null) {
        res.json(req.session.usuarioInfo);
    }
});

server.use(verificacaoUsuario, express.static("./logado"));
server.use(verificacaoAdmin, express.static("./private"));
server.get("/deslogar", (req, res) => {
    req.session.destroy();
    res.redirect("/login.html");
});

server.listen(port, host, () => {
    console.log(`http://localhost:${port}`);
});
