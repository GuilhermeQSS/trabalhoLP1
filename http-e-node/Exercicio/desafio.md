### 💻 Exercício Prático — Sistema de Autenticação com Express e Sessões

#### 🎯 Objetivo:

Criar um servidor web em Node.js usando o Express que permita:

* Cadastrar usuários
* Fazer login
* Acessar uma página protegida apenas se estiver autenticado
* Fazer logout

---

### 📋 Requisitos:

#### 1. Cadastro de Usuário

* Crie uma rota `/register` que receba `user`, `email` e `password`.
* Armazene os dados dos usuários em memória (em um array).
* Verifique se o usuário já existe antes de cadastrar.

#### 2. Login

* Crie uma rota `/login` que valide o `user` e `password`.
* Se for válido, crie uma **sessão** que indique que o usuário está autenticado.
* Se for inválido, mostre uma mensagem de erro e um link para tentar de novo.

#### 3. Página Protegida

* Crie uma rota `/home` que só pode ser acessada se o usuário estiver autenticado.
* Se não estiver, redirecione para a página de login.
* Se estiver, mostre uma mensagem de boas-vindas e um botão de logout.

#### 4. Logout

* Crie uma rota `/logout` que destrua a sessão e redirecione para o login.

---

### 🗂️ Estrutura esperada (sugestão):

```
projeto/
├── public/
│   ├── login.html
│   ├── register.html
│   ├── home.html
├── server.js
```

---

### ⚙️ Tecnologias e bibliotecas

* `express`
* `express-session`
* `path` para servir arquivos HTML
* `body-parser` (opcional, mas `express.urlencoded` já resolve)

---

### ✍️ O que deve funcionar:

* [ ] Registrar novos usuários
* [ ] Impedir registro de usuários repetidos
* [ ] Login funcional
* [ ] Sessão ativa enquanto o usuário estiver logado
* [ ] Página protegida acessível apenas após login
* [ ] Logout funcionando corretamente

---

### 🔥 Extras (opcional):

* Estilize com CSS
* Crie uma página de feedback com nome do usuário
* Adicione tempo de expiração na sessão
* Use `localStorage` no front-end para lembrar algo simples