# Copilot Instructions for Event Management Backend

## Project Overview
This is a Node.js backend for an event management system. The main entry point is `server.js`. The project uses Prisma ORM for database access, with schema and migrations managed in the `prisma/` and `generated/prisma/` directories.

## Architecture & Data Flow
- **Entry Point:** `server.js` initializes the server and sets up core middleware/routes.
- **Database:** Prisma is used for database access. The schema is defined in `prisma/schema.prisma`. Generated Prisma client code is in `generated/prisma/`.
- **Migrations:** Database migrations are managed in `prisma/migrations/`.
- **Service Boundaries:** Business logic is expected to be separated into route handlers and service modules (not all may be present yet).

## Developer Workflows
- **Start Server:**
  ```bash
  node server.js
  ```
- **Prisma Migrate:**
  ```bash
  npx prisma migrate dev
  ```
- **Generate Prisma Client:**
  ```bash
  npx prisma generate
  ```
- **Debugging:**
  Use `console.log` or Node.js debuggers. The main file is `server.js`.

## Conventions & Patterns
- **Directory Structure:**
  - `server.js`: Main server logic
  - `prisma/`: Database schema and migrations
  - `generated/prisma/`: Generated Prisma client code
- **Environment Variables:**
  - Database connection and other secrets should be managed via environment variables (not shown, but typical for Prisma projects).
- **External Dependencies:**
  - Prisma ORM
  - Node.js core modules

## Integration Points
- **Prisma:** All database access should use the generated Prisma client.
- **Routes & Middleware:** Add new routes/middleware in `server.js` or in dedicated modules if refactoring.

## Examples
- To add a new model, update `prisma/schema.prisma`, run migrations, and regenerate the client.
- To add a new API endpoint, define the route in `server.js` and implement logic using Prisma client.

## Key Files
- `server.js`: Main application entry
- `prisma/schema.prisma`: Database schema
- `prisma/migrations/`: Migration history
- `generated/prisma/`: Prisma client code

---
_If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions._
