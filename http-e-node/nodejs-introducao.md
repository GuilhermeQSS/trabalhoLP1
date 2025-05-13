# Introdução ao Node.js

## Conceitos

### O que é Node.js?

- **Node.js** é um ambiente de execução JavaScript do lado do servidor.
- Ele permite que você use JavaScript para criar aplicações de back-end, como APIs, servidores web, automações, entre outros.
- Usa o **motor V8** do Google Chrome, que é rápido e eficiente.
- Diferente do JavaScript no navegador (cliente), o Node.js roda no **servidor**.

### NPM (Node Package Manager)

- **NPM** é o gerenciador de pacotes do Node.js.
- Permite instalar bibliotecas e dependências para seu projeto.
- O comando `npm init` é usado para criar um projeto Node com um arquivo de configuração chamado `package.json`.

### Comando básico:

```bash
npm init
```

- Esse comando cria um projeto e pede informações como:
  - Nome do projeto
  - Versão
  - Descrição
  - Ponto de entrada (`index.js`, por padrão)
  - Autor
  - Licença

### Arquivo `package.json`

- Contém as informações do projeto.
- Armazena os scripts, dependências e metadados do seu app.

Exemplo de estrutura:

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Seu Nome",
  "license": "ISC"
}
```

---

## Exemplos

### Criando seu primeiro projeto Node.js

1. Crie uma pasta:

   ```bash
   mkdir meu-projeto
   cd meu-projeto
   ```

2. Inicialize o projeto:

   ```bash
   npm init
   ```

3. Crie o arquivo principal:

   ```bash
   touch index.js
   ```

4. Escreva seu primeiro servidor (exemplo simples):

   ```js
   const http = require('http');

   const server = http.createServer((req, res) => {
     res.writeHead(200, { 'Content-Type': 'text/plain' });
     res.end('Servidor Node.js funcionando!');
   });

   server.listen(3000, () => {
     console.log('Servidor rodando na porta 3000');
   });
   ```

   ```js
   // ES Modules
   import express, { response } from "express";

   // CommonJS
   // const express = require("express");
   const app = express();

   const port = 3000;

   app.listen(port, () => {
      console.log(`Servidor Iniciado`);
   })
   ```

5. Rode o servidor:

   ```bash
   node index.js
   ```

6. Acesse no navegador ou via Telnet/HTTP:
   ```
   http://localhost:3000
   ```
