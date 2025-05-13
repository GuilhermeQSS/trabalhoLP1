import e from "express";
import session from "express-session";
import autenticar from "./public/src/autenticar.js";

const app = e();
const port = 5000
const admin = "Rearu";

app.use(e.urlencoded({extended:true}));

app.use(session({
    secret:"myKey",
    resave: true,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000 * 60 * 15,
        httpOnly: true
    }
}))

app.use(e.static("./public"));

app.post("/register.html",(req,res) =>{
    const {username} = req.body;
    res.redirect("/login.html");
})

app.post("/login.html", (req,res) => {
    const {username} = req.body;
    if(username === "Rearu"){
        req.session.autenticado = true;
        res.redirect("/home.html")
    }else{
        req.session.autenticado = false;
        res.redirect("/login.html");
    }
})

app.use(autenticar, e.static("./private"));

app.listen(port, () => {
    console.log(`Servidor Iniciado: http://localhost:${port}/register.html`);
})
