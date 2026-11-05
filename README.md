# Backend

API REST em Express e TypeScript, com PostgreSQL (via Prisma) e autenticação com Better Auth.

## Pré-requisitos

- [Node.js](https://nodejs.org/) `^20.19`, `^22.12` ou `>=24.0`
- [Yarn](https://classic.yarnpkg.com/) 1.x
- [Docker](https://www.docker.com/) com Docker Compose, para subir o banco de dados

## Como rodar

### 1. Instale as dependências

```bash
yarn install
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp example.env .env
```

O `example.env` vem vazio. Preencha o `.env` com os valores abaixo, que servem para desenvolvimento local:

```env
PORT=3000
CORS_ORIGIN=http://localhost:5173
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=troque-por-um-valor-aleatorio
BETTER_AUTH_TRUSTED_ORIGINS=http://localhost:5173
BETTER_AUTH_ADMIN_USER_IDS=
SEED_ADMIN_NAME=Administrador
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=troque-esta-senha
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=backend
POSTGRES_PORT=5432
POSTGRES_HOST=localhost
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/backend?schema=public
```

Para gerar o `BETTER_AUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

| Variável | Descrição |
| --- | --- |
| `PORT` | Porta da API. |
| `CORS_ORIGIN` | Origens aceitas pelo CORS, separadas por vírgula. Use o endereço do frontend. |
| `BETTER_AUTH_URL` | URL base da API. |
| `BETTER_AUTH_SECRET` | Chave usada pelo Better Auth. |
| `BETTER_AUTH_TRUSTED_ORIGINS` | Origens confiáveis para autenticação, separadas por vírgula. |
| `BETTER_AUTH_ADMIN_USER_IDS` | IDs de usuários tratados como admin, separados por vírgula. Opcional. |
| `SEED_ADMIN_NAME`, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | Dados do administrador criado pelo seed. |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT` | Configuração do container do PostgreSQL. |
| `POSTGRES_HOST` | Host do banco. A aplicação não lê essa variável, apenas a `DATABASE_URL`. |
| `DATABASE_URL` | Conexão com o banco. Precisa bater com os valores `POSTGRES_*`. |

### 3. Suba o banco de dados

```bash
docker compose up -d
```

Aguarde alguns segundos até o PostgreSQL terminar de iniciar antes de seguir para o próximo passo.

### 4. Prepare o banco

```bash
yarn prisma:generate
yarn prisma:migrate
yarn prisma:seed
```

Esses comandos geram o Prisma Client, aplicam as migrations e criam o usuário administrador.

O seed é obrigatório no primeiro uso: o cadastro público está desativado, então esse administrador é o primeiro acesso ao sistema, e os demais usuários são criados por ele.

Se o e-mail já existir, o seed atualiza o usuário para admin, mas não altera a senha.

### 5. Inicie a API

```bash
yarn dev
```

A API fica disponível em `http://localhost:3000` e reinicia sozinha a cada alteração no código.

Para confirmar que ela está no ar:

```bash
curl http://localhost:3000/api/auth/ok
```

A resposta esperada é `{"ok":true}`.

> No PowerShell, use `curl.exe` em vez de `curl`.

## Autenticação

Todas as rotas exigem uma sessão, exceto as de `/api/auth/*`. Isso inclui `/` e `/health/db`, que respondem `401` sem login. As rotas de `/admin/users` exigem um usuário com papel `admin`.

Para fazer login e guardar o cookie da sessão:

```bash
curl -c cookies.txt -X POST http://localhost:3000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:5173" \
  -d '{"email":"admin@example.com","password":"troque-esta-senha"}'
```

Para usar a sessão nas requisições seguintes:

```bash
curl -b cookies.txt http://localhost:3000/health/db
```

## Rotas

| Rota | Recurso |
| --- | --- |
| `/api/auth/*` | Autenticação (Better Auth) |
| `/admin/users` | Usuários (somente admin) |
| `/owners` | Proprietários |
| `/plots` | Lotes |
| `/deceased` | Falecidos |
| `/burials` | Sepultamentos |
| `/deaths` | Registro de óbito |
| `/plot-owner-histories` | Histórico de proprietários dos lotes |

## Scripts

| Comando | Descrição |
| --- | --- |
| `yarn dev` | Inicia a API em modo de desenvolvimento. |
| `yarn build` | Gera o build de produção em `dist/`. |
| `yarn start` | Executa o build de `dist/`. |
| `yarn prisma:generate` | Gera o Prisma Client. |
| `yarn prisma:migrate` | Cria e aplica migrations em desenvolvimento. |
| `yarn prisma:seed` | Cria ou atualiza o usuário administrador. |
| `yarn prisma:status` | Mostra o estado das migrations. |
| `yarn prisma:studio` | Abre o Prisma Studio para visualizar os dados. |

## Build de produção

```bash
yarn install
yarn prisma:generate
npx prisma migrate deploy
yarn build
yarn start
```

Em produção, defina `NODE_ENV=production` e use valores próprios para `BETTER_AUTH_SECRET`, `SEED_ADMIN_PASSWORD` e as credenciais do banco.

## Problemas comuns

- **`DATABASE_URL nao definida no ambiente`:** o arquivo `.env` não existe ou a variável está vazia.
- **`P1001: Can't reach database server`:** o banco não está rodando. Confira se o Docker está aberto e execute `docker compose up -d`.
- **Erro de CORS no frontend:** confira se o endereço do frontend está em `CORS_ORIGIN` e em `BETTER_AUTH_TRUSTED_ORIGINS`.
