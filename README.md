# Back to the Future

Aplicacao frontend em React + TypeScript criada com Vite. O repositório está numa fase inicial.

## Stack

- React
- TypeScript
- Vite
- ESLint
- GitHub Actions

## Como rodar o projeto

### Requisitos

- Node.js 20.19+ ou 22.12+
- npm

### Instalar dependencias

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Gerar build de producao

```bash
npm run build
```

### Visualizar a build localmente

```bash
npm run preview
```

### Executar lint

```bash
npm run lint
```

## CI no GitHub

O repositório inclui um workflow de GitHub Actions em `.github/workflows/ci-cd.yml` para integracao continua.

- Em `push` e `pull_request`, o workflow executa `npm ci`, `npm run lint` e `npm run build`.
- O workflow usa Node.js 22, compatível com a versao atual do Vite no projeto.

## Scripts disponiveis

- `npm run dev`: inicia o servidor de desenvolvimento com HMR.
- `npm run build`: compila TypeScript e gera a build de producao com Vite.
- `npm run preview`: sobe um servidor local para validar a build gerada.
- `npm run lint`: executa o ESLint em todo o projeto.