# Exemplo 03 – Formulário com Express

Este exemplo demonstra como criar um servidor com Express que:

- Exibe um formulário HTML na rota principal (`/`).
- Recebe dados do formulário via método POST em `/cadastrar`.
- Retorna o nome enviado na resposta.

---

## 📦 Pré-requisitos

- Ter o Node.js instalado.
- Ter o Express instalado (`npm install express`).
- Estrutura de pastas recomendada:

```

https-node/
├── exemplos/
│ └── exemplo03_formulario.js
└── package.json

```

---

## 🧠 Conceitos Usados

- **Importação de módulos ES (`import`)**
- **Uso de `express.urlencoded` para tratar formulários**
- **Rotas GET e POST**
- **Leitura de dados do corpo da requisição (`req.body`)**
- **Resposta com HTML dinâmico**

---

## 📜 Código

```js
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
```

---

## 📝 Observações

- A função `express.urlencoded({ extended: true })` é necessária para que o Express consiga interpretar os dados do formulário.
- A rota `POST /cadastrar` é ativada quando o usuário envia o formulário da página inicial.
- O valor inserido no input é acessado via `req.body.user`.

---

## 🚀 Execução

No terminal, dentro da raiz do projeto:

```bash
node exemplos/exemplo03_formulario.js
```

Depois, abra o navegador em:

```
http://localhost:3002/
```
