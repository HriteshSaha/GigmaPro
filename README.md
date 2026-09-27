# GigmaPro

[![CI](https://github.com/HriteshSaha/GigmaPro/actions/workflows/ci.yml/badge.svg)](https://github.com/HriteshSaha/GigmaPro/actions/workflows/ci.yml)

GigmaPro is a full-stack freelance marketplace — think a small-scale Upwork clone — where **clients** post projects and **freelancers** bid on them. Built with Express, EJS, and PostgreSQL (Sequelize ORM), using server-rendered views and session-based auth.

## Features

- Separate signup/login flows for **clients** and **freelancers**, with role-based route protection
- Clients can post projects (with a category and required skills), review incoming bids, and assign a freelancer (which creates a contract)
- Freelancers can browse open projects — filterable by category, paginated — and submit bids with a quotation, pitch, and delivery estimate; re-submitting updates their existing bid instead of creating a duplicate
- Role-aware dashboards with real stats (projects posted, bids received, active contracts, contract value)
- Password hashing with bcrypt, session-based authentication with `express-session`
- Server-side input validation (`express-validator`), security headers (`helmet`), and rate-limiting on auth endpoints
- Relational data model (Sequelize): users, projects, bids, contracts, and a skills taxonomy (many-to-many with both users and projects)
- Integration test suite (Jest + Supertest) covering auth, bidding, and routing, run in CI on every push

## Tech stack

| Layer      | Choice                          |
|------------|----------------------------------|
| Server     | Node.js, Express                |
| Views      | EJS (server-rendered)           |
| Database   | PostgreSQL                      |
| ORM        | Sequelize (+ `sequelize-cli` for migrations/seeders) |
| Auth       | `express-session`, `bcryptjs`   |

## Project structure

```
app.js                  # Express app entry point
config/config.js        # DB config, reads from environment variables
controllers/             # Route handlers
routes/                  # Express routers
middlewares/              # Auth + role-based authorization
models/                   # Sequelize models
migrations/               # Sequelize schema migrations
seeders/                  # Demo data seeder
views/                    # EJS templates
public/                   # Static assets (CSS/JS/images, two UI kits: marketing site + admin dashboard)
```

## Getting started

### Prerequisites

- Node.js 18+
- A local (or remote) PostgreSQL server

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your local PostgreSQL credentials:

```bash
cp .env.example .env
```

At minimum, set `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST`, and generate a `SESSION_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Create the database, run migrations, and seed demo data

```bash
createdb gigmapro
npm run db:setup
```

This runs all migrations and then seeds:
- 3 client accounts and 4 freelancer accounts
- A skills taxonomy
- 5 realistic projects (some open, one already awarded)
- Several bids and one active contract

**Demo login (any seeded account):** password `Passw0rd!123`
- Client: `ananya.sharma@nimbuscreative.io`
- Freelancer: `arjun.nair@freelance.dev`

(See `seeders/20241015001311-projectDemoData.js` for the full list of seeded accounts.)

### 4. Run the app

```bash
npm start          # production-style start
npm run dev         # auto-restart on file changes (nodemon)
```

The app runs on `http://localhost:8000` by default (configurable via `PORT` in `.env`).

## Running tests

Tests run against a separate `gigmapro_test` database (never your dev data), using Jest + Supertest for HTTP-level integration tests against the real Express app and PostgreSQL.

```bash
createdb gigmapro_test
npm run migrate:test   # applies migrations to gigmapro_test
npm test
```

Set `DB_NAME_TEST` in `.env` if you want a different test database name (see `.env.example`). CI runs this same suite against a fresh PostgreSQL service container on every push (see `.github/workflows/ci.yml`).

## Available npm scripts

| Script                | Purpose                                      |
|-----------------------|-----------------------------------------------|
| `npm start`           | Start the server                              |
| `npm run dev`         | Start with nodemon for local development      |
| `npm run migrate`     | Apply all pending Sequelize migrations         |
| `npm run migrate:test`| Apply migrations to the test database          |
| `npm run seed`        | Run the demo data seeder                      |
| `npm run db:setup`    | Migrate + seed in one step                    |
| `npm test`            | Run the Jest/Supertest test suite             |

## Deploying for free (Render)

This is a monolith (Express serves both the API and the server-rendered frontend), which makes it a good fit for a single free web-service host rather than splitting frontend/backend. The repo includes a [`render.yaml`](render.yaml) blueprint that provisions both pieces in one go:

1. Push this repo to GitHub (if you haven't already).
2. On [Render](https://render.com), choose **New > Blueprint** and point it at the repo. Render reads `render.yaml` and provisions:
   - A free **Node.js web service** (`npm install && npm run migrate` as the build step, `npm start` to run it) — the build step applies any pending Sequelize migrations before each deploy, so the schema stays current without shell access.
   - A free **PostgreSQL database**, wired to the web service via a `DATABASE_URL` environment variable Render injects automatically.
   - A generated `SESSION_SECRET`.
3. Once deployed, seed demo data once by running `npm run seed` locally against the production `DATABASE_URL` (copy it from the Render Postgres dashboard into a local `.env`, or export it inline).

Notes:
- Render's free Postgres instance expires after 90 days unless upgraded to a paid plan — fine for a demo/portfolio project, but re-check before relying on it long-term.
- The free web service spins down after 15 minutes of inactivity, so the first request after idling will be slow.
- Never commit real database credentials — this project reads all of them from environment variables (see `config/config.js` and `.env.example`).

## License

MIT — see [LICENSE](LICENSE).
