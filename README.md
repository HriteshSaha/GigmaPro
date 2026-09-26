# GigmaPro

GigmaPro is a full-stack freelance marketplace — think a small-scale Upwork clone — where **clients** post projects and **freelancers** bid on them. Built with Express, EJS, and MySQL (Sequelize ORM), using server-rendered views and session-based auth.

## Features

- Separate signup/login flows for **clients** and **freelancers**, with role-based route protection
- Clients can post projects, review incoming bids, and assign a freelancer (which creates a contract)
- Freelancers can browse open projects (paginated) and submit bids with a quotation, pitch, and delivery estimate
- Role-aware dashboards: clients see their projects and bids received; freelancers see their bid history and active contracts
- Password hashing with bcrypt, session-based authentication with `express-session`
- Relational data model (Sequelize): users, projects, bids, contracts, and a skills taxonomy (many-to-many with both users and projects)

## Tech stack

| Layer      | Choice                          |
|------------|----------------------------------|
| Server     | Node.js, Express                |
| Views      | EJS (server-rendered)           |
| Database   | MySQL                           |
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
- A local (or remote) MySQL server

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your local MySQL credentials:

```bash
cp .env.example .env
```

At minimum, set `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST`, and generate a `SESSION_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Create the database, run migrations, and seed demo data

```bash
mysql -u root -p -e "CREATE DATABASE gigmapro;"
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

## Available npm scripts

| Script              | Purpose                                    |
|---------------------|---------------------------------------------|
| `npm start`         | Start the server                            |
| `npm run dev`       | Start with nodemon for local development    |
| `npm run migrate`   | Apply all pending Sequelize migrations      |
| `npm run seed`      | Run the demo data seeder                    |
| `npm run db:setup`  | Migrate + seed in one step                  |

## Deploying for free

This is a monolith (Express serves both the API and the server-rendered frontend), which makes it a good fit for a single free web-service host rather than splitting frontend/backend:

- **[Render](https://render.com)** — free Node.js web service + a free tier for managed MySQL alternatives (or point it at PlanetScale/Railway for the DB). Set the build command to `npm install` and the start command to `npm start`, then add the environment variables from `.env.example` (`DATABASE_URL`, `SESSION_SECRET`, `NODE_ENV=production`) in the dashboard.
- **[Railway](https://railway.app)** — can host both the Node app and a MySQL instance in the same project; it injects `DATABASE_URL` automatically, which `config/config.js` already reads in production.
- After deploying, run migrations/seeders once against the production database (most hosts let you run a one-off shell command, or you can run `npm run db:setup` locally against the production `DATABASE_URL`).

Either way: never commit real database credentials — this project reads all of them from environment variables (see `config/config.js` and `.env.example`).

## License

MIT — see [LICENSE](LICENSE).
