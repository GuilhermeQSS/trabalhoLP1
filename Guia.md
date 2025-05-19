# 🧭 GUIA COMPLETO: Git e GitHub para Projetos Locais

---

## ✅ PARTE 1: Subir um projeto local para o GitHub

### 🛠️ 1. Crie o repositório no GitHub

1. Acesse: [https://github.com](https://github.com)
2. Clique em **"New repository"**
3. Preencha:

   * **Repository name:** `meu-projeto`
   * Escolha `Public` ou `Private`
   * ❌ **Desmarque** “Add a README”
4. Clique em **"Create repository"**
5. Copie a URL do repositório (HTTPS):

   ```
   https://github.com/SeuUsuario/meu-projeto.git
   ```

---

### 💻 2. No seu PC, configure o projeto

Abra o terminal no VS Code, PowerShell, CMD ou Terminal Linux.

#### Acesse a pasta do seu projeto:

```bash
cd caminho/para/sua/pasta
```

#### Inicie o Git no projeto:

```bash
git init
```

#### Adicione os arquivos para rastreamento:

```bash
git add .
```

#### Faça o primeiro commit:

```bash
git commit -m "Primeiro commit"
```

#### Conecte com o repositório remoto:

```bash
git remote add origin https://github.com/SeuUsuario/meu-projeto.git
```

#### Envie os arquivos para o GitHub:

```bash
git push -u origin main
```

📝 **Se der erro com "main", tente:**

```bash
git push -u origin master
```

---

### 🛡️ Dica: Erro de autenticação?

* Gere um token de acesso pessoal:
  👉 [https://github.com/settings/tokens](https://github.com/settings/tokens)
* Ou entre com seu usuário/senha no prompt de autenticação.

---

## 🔄 PARTE 2: Atualizar o projeto no GitHub

Sempre que fizer mudanças no projeto:

### 1. Verifique o estado atual:

```bash
git status
```

### 2. Adicione as mudanças:

```bash
git add .
```

### 3. Faça um commit descrevendo as alterações:

```bash
git commit -m "Descrição das mudanças"
```

### 4. (Opcional) Puxe mudanças remotas antes de enviar:

```bash
git pull origin main
```

🛑 *Evita conflitos se outras pessoas também alteraram o repositório.*

### 5. Envie as mudanças:

```bash
git push origin main
```

---

## 🌿 PARTE 3: Usando Branches

### Criar uma nova branch:

```bash
git branch nome-da-branch
```

### Trocar para essa branch:

```bash
git checkout nome-da-branch
```

### Criar e trocar ao mesmo tempo:

```bash
git checkout -b nome-da-branch
```

---

## 🔀 PARTE 4: Mesclar uma branch na `main`

### 1. Vá para a branch principal:

```bash
git checkout main
```

### 2. Atualize sua main:

```bash
git pull origin main
```

### 3. Mescle a branch desejada:

```bash
git merge nome-da-branch
```

🛠️ Se houver conflitos:

* Edite os arquivos conflitados
* Depois resolva com:

```bash
git add .
git commit -m "Resolvendo conflitos"
```

### 4. Envie as mudanças:

```bash
git push origin main
```

---

## 🔁 Alternativa: Usando `rebase` (histórico mais limpo)

### 1. Vá para a branch que será aplicada por cima da main:

```bash
git checkout nome-da-branch
git rebase main
```

### 2. Resolva conflitos (se houver):

```bash
git add .
git rebase --continue
```

### 3. Volte à `main` e finalize:

```bash
git checkout main
git merge nome-da-branch
git push origin main
```

---

## 🌐 PARTE 5: Trazer uma branch remota para seu PC

### 1. Buscar todas as branches remotas:

```bash
git fetch
```

### 2. Ver as branches:

```bash
git branch -a
```

### 3. Fazer checkout de uma branch remota:

```bash
git checkout -b nome-da-branch origin/nome-da-branch
```

---

## 🧹 PARTE 6: Remover branches

### 🔻 Remover branch local

```bash
git branch -d nome-da-branch
```

> Remove a branch local se ela já foi mesclada.

```bash
git branch -D nome-da-branch
```

> Força a exclusão da branch local mesmo sem mesclar.

---

### 🌐 Remover branch remota

```bash
git push origin --delete nome-da-branch
```

> Remove a branch do repositório remoto (GitHub, GitLab, etc.).

---

## 🧠 RESUMÃO DE COMANDOS ÚTEIS

| Ação                     | Comando                                  |
| ------------------------ | ---------------------------------------- |
| Ver status do projeto    | `git status`                             |
| Ver arquivos modificados | `git diff`                               |
| Adicionar mudanças       | `git add .` ou `git add nome-do-arquivo` |
| Commit                   | `git commit -m "mensagem"`               |
| Enviar pro GitHub        | `git push origin main`                   |
| Puxar atualizações       | `git pull origin main`                   |
| Clonar projeto remoto    | `git clone URL`                          |
| Criar branch             | `git branch nome`                        |
| Trocar de branch         | `git checkout nome`                      |
| Mesclar branch na main   | `git merge nome`                         |
| Rebase                   | `git rebase main`                        |