# Exemplo 01 – Servidor Básico com Express

Este exemplo demonstra como criar um servidor simples com Express que:

- Exibe uma página HTML simples ao acessar a rota principal (`/`).
- Serve arquivos estáticos a partir da pasta `./public`.

---

## 📦 Pré-requisitos

- Ter o Node.js instalado.
- Ter o Express instalado no projeto (`npm install express`).
- Estrutura de pastas:
  ```
  https-node/
  ├── public/
  │   └── amongus.webp
  ├── exemplos/
  │   └── exemplo01_basico_express.js
  └── package.json
  ```

---

## 🧠 Conceitos Usados

- **Importação de módulos ES (`import`)**
- **Uso de `express.static` para arquivos públicos**
- **Resposta HTML com `.send()`**
- **Inicialização do servidor com `.listen()`**

---

## 📜 Código

```js
import e from 'express'; // Importando express como 'e'

const app = e();
const port = 3000;
const host = '0.0.0.0';

// Torna os arquivos da pasta ./public acessíveis
app.use(e.static('./public'));

// Rota principal
app.get('/', (req, res) => {
  res.send("<p>Amongus</p><img src='/amongus.webp' alt='amongus'>");
});

// Inicializa o servidor
app.listen(port, host, () => {
  console.log(`Servidor iniciado: http://localhost:${port}/`);
});
```

---

## 📝 Observações

- A imagem `amongus.webp` precisa estar dentro da pasta `public` para ser acessada.
- O HTML enviado pelo `.send()` pode ser simples como mostrado ou substituído por um arquivo `.html` real.
- O servidor é acessível no navegador por `http://localhost:3000/`.

---

## 🚀 Execução

No terminal, dentro da raiz do projeto:

```bash
node exemplos/exemplo01_basico_express.js
```

Depois, abra o navegador em:

```
http://localhost:3000/
```
