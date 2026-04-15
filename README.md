# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## CMS (Strapi)

O projeto inclui um Strapi em `cms/` para permitir que um usuário admin edite conteúdos e imagens.

### Rodar o Strapi

- `cd cms`
- `npm run develop`
- Acesse `http://localhost:1337/admin` e crie o usuário admin

Para o front-end conseguir ler os dados, habilite permissões de leitura:

- Admin → **Settings** → **Users & Permissions** → **Roles** → **Public**
- Marque `find` e `findOne` para: `equipment`, `construction`, `portfolio-project`, `hero-page`, `company-page`, `equipments-page`, `constructions-page`, `portfolio-page`, `contact-page`

### Rodar o front-end

- Crie um `.env` baseado em `.env.example` e ajuste `VITE_CMS_URL` (por padrão `http://localhost:1337`).
- `npm run dev`

## Docker (web + CMS + Postgres)

Pré-requisitos:

- Docker Desktop instalado

### 1) Criar arquivo de ambiente

- Copie `.env.docker.example` para `.env`
- Gere valores fortes para os segredos do Strapi (exemplo com Node):
	- `node -e "const c=require('crypto'); console.log('APP_KEYS='+[1,2].map(()=>c.randomBytes(16).toString('hex')).join(','))"`
	- `node -e "const c=require('crypto'); console.log('API_TOKEN_SALT='+c.randomBytes(32).toString('hex'))"`
	- Repita para `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`

### 2) Subir os containers

- `docker compose up -d --build`

URLs:

- Site: `http://localhost:8080`
- Strapi Admin: `http://localhost:1337/admin`

### Observações importantes

- O `VITE_CMS_URL` é usado no **build** do front (Vite). Se você mudar esse valor no `.env`, rode `docker compose up -d --build` de novo.
- Banco (Postgres) e uploads (imagens) ficam persistidos em volumes do Docker.
	- Para resetar tudo (apaga dados e imagens): `docker compose down -v`
