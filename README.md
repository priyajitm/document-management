# Document Management System

A React-based system for managing, viewing, and reordering documents with autosave functionality.

## Quick Start

### Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Visit `http://localhost:5173` in your browser

### Docker Development

1. Start the development environment with hot-reload:

```bash
npm run docker:dev
```

Or to rebuild the containers:

```bash
npm run docker:dev:build
```

2. Visit `http://localhost:5173` in your browser

### Docker Production

1. Start the production environment:

```bash
npm run docker:prod
```

Or to rebuild the containers:

```bash
npm run docker:prod:build
```

2. Visit `http://localhost:8080` in your browser

## Documentation

For full documentation, please see the [docs directory](./docs).

## Available Scripts

### Local Development
- `npm run dev` - Start development server
- `npm run build` - Build for production

### Docker Commands
- `npm run docker:dev` - Start development environment in Docker
- `npm run docker:dev:build` - Rebuild and start development environment
- `npm run docker:prod` - Start production environment in Docker
- `npm run docker:prod:build` - Rebuild and start production environment
