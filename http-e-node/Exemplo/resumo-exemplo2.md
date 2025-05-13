# Exemplo 2 - Servidor Express com Geração de Tabuada

Este exemplo mostra como criar um servidor com Express que gera uma **tabuada personalizada**, recebendo os valores através de parâmetros na URL.

## 📦 Requisitos

- Node.js
- Express

Instale o Express (caso ainda não tenha):

```bash
npm install express
```

````

## 🚀 Como executar

Salve o código em um arquivo `.js`, por exemplo: `index.js`, e execute:

```bash
node index.js
```

Acesse no navegador:

```
http://localhost:3001/tabuada?numero=5&qtd=10
```

## ✅ Funcionamento

- Rota: `/tabuada`
- Parâmetros esperados:
  - `numero`: número base da tabuada
  - `qtd`: quantidade de vezes que o número será multiplicado

### Exemplo de uso:

```
/tabuada?numero=7&qtd=12
```

Gera a tabuada do 7 até o 12:

```
7 x 1 = 7
7 x 2 = 14
...
7 x 12 = 84
```

## ❌ Erros

Se algum dos parâmetros não for válido (não for número ou for zero), o servidor retorna:

- Código: `400 - Bad Request`
- Mensagem: `"Erro 400 - Requisição Inválida"`

Exemplo de URL inválida:

```
/tabuada?numero=abc
```

## 📝 Observações

- O conteúdo é enviado em HTML diretamente pela resposta.
- O CSS inline foi usado apenas para fins ilustrativos.
- A pasta `/public` pode conter arquivos estáticos, como imagens ou CSS.
````
