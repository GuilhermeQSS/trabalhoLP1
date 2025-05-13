## 📄 Exemplo 04 – Cadastro de Usuários com Lista em Memória

### 🎯 Objetivo

Criar um servidor com Express que:

1. Exiba um formulário HTML para cadastrar nomes de usuários.
2. Ao enviar o formulário, salve o nome em um array.
3. Após o cadastro, exiba todos os nomes já cadastrados.

---

### 🔧 Requisitos Técnicos

- Usar `express.urlencoded({ extended: true })` para processar o corpo do formulário.
- Rota `GET /`: exibe o formulário e a lista atual de usuários.
- Rota `POST /cadastrar`: recebe o nome e salva no array, com verificação para evitar duplicados.
- Exibir os nomes no HTML com `.send()` (sem EJS, Pug ou outros motores de template).

---

### 📦 Estrutura do Código

#### 🛠️ Instalação (caso precise)

```bash
npm install express
```

#### 🧠 Lógica Central

```js
import e from 'express';
const app = e();
const port = 4000;

app.use(e.urlencoded({ extended: true }));

let users = [];

const form = `<form method="post" action="/cadastrar"> 
  <input type="text" name="user" placeholder="Insira Seu nome">
  <button type="submit">Cadastrar</button>
</form>`;
```

#### 📥 GET `/`

Retorna o formulário e a lista de usuários.

```js
app.get('/', (req, res) => {
  let result = '';
  users.forEach((el) => (result += el + '<br>'));
  res.send(form + result);
});
```

#### 📤 POST `/cadastrar`

Recebe o nome, verifica duplicatas e salva.

```js
app.post('/cadastrar', (req, res) => {
  const user = req.body.user;
  if (!users.find((el) => el === user)) users.push(user);
  res.redirect('/');
});
```

#### ▶️ Iniciar o servidor

```js
app.listen(port, () => {
  console.log(`Servidor Iniciado: http://localhost:${port}`);
});
```

---

### ⚠️ Dicas Importantes

- `res.redirect('/')`: mantém a lógica REST limpa e evita reenvio de formulário.
- `users.find(...)`: retorna `undefined` se não encontrar — ideal para verificar duplicatas.
- A concatenação com `.forEach` e `+= '<br>'` funciona bem pra montar HTML direto via `.send()`.
