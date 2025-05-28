# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vulcan Engine (inspect-note) is an AI-powered GitHub activity analyzer that transforms commits into insightful reports for solo developers. It's a full-stack monorepo with a GraphQL API connecting a NestJS backend and Next.js frontend.

## Development Commands

### Backend (NestJS)
```bash
# Install dependencies
cd backend && yarn install

# Development
yarn start:dev        # Watch mode with hot reload
yarn start:debug      # Debug mode

# Build & Production
yarn build           # Build the application
yarn start:prod      # Run production build

# Testing
yarn test            # Run unit tests
yarn test:watch      # Run tests in watch mode
yarn test:cov        # Generate test coverage
yarn test:e2e        # Run end-to-end tests

# Code Quality
yarn lint            # Run ESLint and fix issues
yarn format          # Format code with Prettier

# Database
npx prisma migrate dev    # Run database migrations
npx prisma studio        # Open Prisma Studio (port 5555)
npx prisma generate      # Generate Prisma Client
```

### Frontend (Next.js)
```bash
# Install dependencies
cd frontend && yarn install

# Development
yarn dev             # Run development server with Turbopack

# Build & Production
yarn build           # Build for production
yarn start           # Run production server

# Code Quality
yarn lint            # Run Next.js linting

# GraphQL Code Generation
yarn compile         # Generate GraphQL types once
yarn watch          # Generate GraphQL types in watch mode
```

### Docker Development
```bash
# Start all services (database, backend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Architecture

### Backend Architecture
- **Framework**: NestJS with modular architecture
- **API Layer**: GraphQL with Apollo Server, auto-generated schema
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based with Passport.js strategies
- **Key Modules**:
  - `app.module.ts`: Root module with GraphQL configuration
  - `prisma/`: Database service and schema definitions
  - `users/`: User management with GraphQL resolvers
  - `items/`: Sample CRUD module with DTOs and entities

### Frontend Architecture
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom gradient designs
- **GraphQL Client**: Apollo Client with server-side integration
- **Code Generation**: Automated TypeScript types from GraphQL schema
- **Key Structure**:
  - `app/`: App Router pages and layouts
  - `components/`: Reusable UI components with custom Button/Input
  - `apollo/`: GraphQL client configuration and generated types
  - API Route: `/api/graphql` proxies to backend

### Database Schema
- **User Model**: Authentication with email/password, timestamps
- **Migrations**: Managed through Prisma with PostgreSQL

### Development Workflow
1. Backend runs on port 3001 (configurable via docker-compose)
2. Frontend proxies GraphQL requests through `/api/graphql`
3. Database accessible on port 5432
4. Prisma Studio available on port 5555

## Environment Variables
Backend requires:
- `DATABASE_URL`: PostgreSQL connection string
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: Database credentials

## Important Notes from Cursor Rules
- Backend endpoint is `http://localhost:3001`
- Follow existing coding patterns and directory structure
- Avoid duplicate implementations - check for existing similar features
- Do not modify UI/UX design without approval
- Maintain consistent naming conventions