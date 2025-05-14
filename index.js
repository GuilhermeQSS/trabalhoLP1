import express from "express";
import session from "express-session";
import verificacaoAdmin from "./JS/seguranca.js";
const server = express();
const host = "0.0.0.0";
const port = 3000;

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

server.use(express.static("./public"));
server.get("/");
server.post("/login", (req, res) => {
    const { email, senha } = req.body;
    if (email == "admin@gmail.com" && senha == "admin") {
        req.session.verificado = true;
        res.redirect("/admin.html");
    }
    //Usuario loga no site, ou seja, seu email e sua senha coincidiram com a que esta no nosso sistema
    //if(dadosDosUsuariosNoSistema.some(usuario => usuario.email == email && usuario.senha == senha)){
    //  <código>
    //  res.redirect();
    //}
    res.redirect("/login.html");//Exibir mensagem que o usuario ou o email estão errados
});
server.get("/deslogar", (req, res) => {
    req.session.destroy();
    res.redirect("/login.html");
});

server.use(verificacaoAdmin, express.static("./private"));

server.listen(port, host, () => {
    console.log(`http://localhost:${port}`);
});
