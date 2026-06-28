# Task API

A production-ready **REST API** for managing tasks, built with modern TypeScript tooling. It features full **CRUD operations**, **OpenAPI/Swagger documentation**, **request/response validation**, structured logging, and a clean layered architecture.

---

## 🚀 Features

- **Full CRUD Operations** — Create, read, update, and delete tasks with a robust PostgreSQL backend.
- **OpenAPI 3.0 & Auto-generated Docs** — Interactive API reference powered by [Scalar](https://scalar.com/) with automatic spec generation from code.
- **Runtime Validation** — Strict request and response validation using **Zod** schemas, integrated seamlessly with Hono.
- **Type-Safe Database** — Schema-driven queries and migrations with **Drizzle ORM** and **drizzle-zod**.
- **Structured Logging** — High-performance JSON logging via **Pino** with pretty-printing in development.
- **Modern Tooling** — ESM-first, TypeScript 5.8+, **tsx** for fast development, and **ESLint** (Antfu config) for consistent code quality.
- **Error Handling** — Centralized error and 404 handling with standardized JSON responses.
- **Clean Architecture** — Routes, handlers, and schemas are neatly separated for scalability and maintainability.

---

## 🛠️ Technologies

| Technology | Purpose |
| :--- | :--- |
| [Hono](https://hono.dev/) | Ultrafast, lightweight web framework |
| [Drizzle ORM](https://orm.drizzle.team/) | Type-safe SQL-like ORM |
| [PostgreSQL](https://www.postgresql.org/) | Relational database (via Neon Serverless) |
| [Zod](https://zod.dev/) | Schema validation & type inference |
| [Pino](https://getpino.io/) | Low-overhead logging library |
| [Scalar](https://scalar.com/) | Beautiful API documentation UI |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [tsx](https://github.com/privatenumber/tsx) | Fast TypeScript execution & watch mode |

---

## 📁 Project Structure

```text
task-api-hono-drizzle-postgres/
├── src/
│   ├── db/                          # Database layer
│   │   ├── index.ts                 # Drizzle client initialization
│   │   ├── schema.ts                # Table schemas & Zod validators
│   │   └── migrations/              # Drizzle-generated SQL migrations
│   ├── helpers/                     # Reusable helper utilities
│   │   ├── https-status.ts          # HTTP status code constants
│   │   ├── json-content.ts          # OpenAPI JSON response helper
│   │   ├── json-required-content.ts # OpenAPI JSON request body helper
│   │   ├── not-found.ts             # 404 handler
│   │   ├── on-error.ts              # Global error handler
│   │   └── schema.ts                # Common Zod schemas (IdParams, etc.)
│   ├── middlewares/                 # Hono middlewares
│   │   ├── configure-api-doc.ts     # OpenAPI & Scalar reference setup
│   │   └── pino-logger.ts           # Request logging middleware
│   ├── routes/                      # API routes (feature-based)
│   │   ├── index.route.ts           # Root health check route
│   │   └── task/                    # Task feature module
│   │       ├── task.routes.ts       # OpenAPI route definitions
│   │       ├── task.handler.ts      # Route handlers (business logic)
│   │       └── task.index.ts        # Route assembly & export
│   ├── types/                       # Global TypeScript types
│   │   └── index.ts                 # App bindings, handler types, etc.
│   ├── app.ts                       # Hono app factory & router creator
│   ├── env.ts                       # Environment variable validation (Zod)
│   └── index.ts                     # Application entry point
├── drizzle.config.ts                # Drizzle Kit configuration
├── tsconfig.json                    # TypeScript compiler options
├── eslint.config.js                 # ESLint configuration (Antfu)
├── package.json                     # Dependencies & scripts
└── .env                             # Environment variables (see .env.example)
```

---

## ⚙️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v20+ (LTS recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- A PostgreSQL database (e.g., [Neon](https://neon.tech/), local Postgres, or Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-api-hono-drizzle-postgres.git
cd task-api-hono-drizzle-postgres
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env   # If an example file exists, otherwise create it manually
```

Fill in the required variables:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

> **Note:** If using **Neon**, your connection string will look like `postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/database?sslmode=require`.

### 4. Run Database Migrations

Generate and push the schema to your database:

```bash
# Generate migration files (optional, only if you modify schema.ts)
pnpm generate

# Push migrations to the database
pnpm migrate
```

### 5. Start the Development Server

```bash
pnpm dev
```

The server will start on `http://localhost:3000` with hot-reload via `tsx watch`.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `pnpm dev` | Start the server in development mode with file watching |
| `build` | `pnpm build` | Compile TypeScript to the `dist/` folder |
| `start` | `pnpm start` | Run the compiled production build |
| `lint` | `pnpm lint` | Run ESLint to check for code issues |
| `lint:fix` | `pnpm lint:fix` | Automatically fix ESLint issues |
| `generate` | `pnpm generate` | Generate Drizzle migration SQL files |
| `migrate` | `pnpm migrate` | Push schema changes directly to the database |

---

## 🔗 API Endpoints & Documentation

Once the server is running, you can explore the API interactively:

| Resource | URL | Description |
| :--- | :--- | :--- |
| API Docs (JSON) | `http://localhost:3000/doc` | Raw OpenAPI 3.0 specification |
| API Reference (UI) | `http://localhost:3000/reference` | Interactive Scalar documentation |
| Health Check | `GET /` | Returns API status |
| Tasks | `GET /task` | List all tasks |
| Tasks | `GET /task/{id}` | Get a single task by UUID |
| Tasks | `POST /task` | Create a new task |
| Tasks | `PUT /task/{id}` | Update an existing task |
| Tasks | `DELETE /task/{id}` | Delete a task |

### Example Request (Create Task)

```bash
curl -X POST http://localhost:3000/task \
  -H "Content-Type: application/json" \
  -d '{"name": "Build a REST API", "done": false}'
```

---

## 🏗️ Production Build

To build and run for production:

```bash
# 1. Compile TypeScript
pnpm build

# 2. Start the production server
pnpm start
```

Ensure your environment variables are set correctly for the production environment.

---

## 📝 License

[MIT](LICENSE)

---

## 🙌 Acknowledgements

Built with ❤️ using [Hono](https://hono.dev/), [Drizzle ORM](https://orm.drizzle.team/), and the modern TypeScript ecosystem.

</file>

<parameter name="path">README.md