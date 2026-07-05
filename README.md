# Sistema de Estoque Full Stack

Projeto desenvolvido com React, Node.js, Express e MySQL para gerenciamento de estoque.

## Funcionalidades

- Login com autenticação JWT
- CRUD de produtos
- Dashboard com gráficos
- Autenticação de rotas protegidas

## Tecnologias

- React
- Node.js
- Express
- MySQL
- Chart.js
- JWT
- bcryptjs

---

# Requisitos

Antes de executar o projeto, é necessário possuir:

- Node.js **20.20 LTS** (ou superior compatível)
- npm
- MySQL Server

> **Importante:** versões antigas do Node podem não ser compatíveis com a versão do Vite utilizada no projeto.

---

# Instalação

## 1. Clonar o projeto

```bash
git clone <url-do-repositorio>
```

---

## 2. Instalar as dependências

### Backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Será criada automaticamente a pasta:

```
node_modules/
```

---

### Frontend

Acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Também será criada automaticamente a pasta:

```
node_modules/
```

---

## 3. Configurar o arquivo .env

Na pasta **backend**, crie um arquivo chamado:

```
.env
```

Com o seguinte conteúdo:

```env
PORT=3001

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=estoque

JWT_SECRET=minha_chave_super_secreta_123456
```

Caso utilize um usuário ou senha diferentes no MySQL, altere os campos conforme sua configuração.

---

## 4. Criar o banco de dados

Depois execute o script SQL do projeto para criar as tabelas necessárias.

---

## 5. Executar o Backend

Na pasta **backend**:

```bash
node server.js
```

ou

```bash
npm start
```

(se houver o script configurado.)

O servidor iniciará na porta:

```
http://localhost:3001
```

---

## 6. Executar o Frontend

Na pasta **frontend**:

```bash
npm run dev
```

O Vite iniciará normalmente em:

```
http://localhost:5173
```

---
## usuario padrão

usuario criado para primeiro login:

usuário: adm
senha: 123


# Estrutura do Projeto

```
sistema-estoque-fullstack
│
├── backend
│   ├── node_modules/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend
    ├── node_modules/
    ├── src/
    ├── public/
    └── package.json
```

---

# Arquivos ignorados pelo Git

Os seguintes arquivos e pastas **não fazem parte do repositório** e devem ser criados automaticamente ou localmente após o clone do projeto:

```
node_modules/
```

Dependências instaladas pelo npm.

```
.env
```

Arquivo de configuração contendo as variáveis de ambiente.

```
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

Arquivos de log gerados pelo npm ou Yarn.

```
build/
dist/
```

Pastas geradas durante o processo de build da aplicação.

```
.DS_Store
```

Arquivo criado automaticamente pelo macOS.

---

# Observações

- Sempre execute `npm install` tanto no **backend** quanto no **frontend** após clonar o projeto.
- O arquivo `.env` não é enviado ao repositório e deve ser criado manualmente.
- Certifique-se de que o MySQL esteja em execução antes de iniciar o backend.
- Utilize uma versão compatível do Node.js (22.x LTS ou superior recomendado).
