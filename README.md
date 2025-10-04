# Portfolio Backend (Express + TypeScript + Prisma)

This repository contains the backend for the Portfolio project: a minimal, secure, and extendable API built with **Node.js, Express, TypeScript, Prisma, and PostgreSQL**. It includes authentication (JWT + bcrypt), CRUD for `User`, `Post`, and `Project`, plus migration and seeding setup.

---

## Features

- TypeScript + Express REST API
- Prisma ORM with PostgreSQL (recommended)
- JWT-based authentication and `requireAuth` middleware
- Bcrypt password hashing
- Seed script to create an initial `OWNER` user
- Routes for Posts and Projects (owner-only create/update/delete)
- Example of ISR-friendly endpoints for Next.js frontend

---

## Quickstart (local)

> Tested with Node 18+/bun or npm/yarn. Adjust commands if you use pnpm.

1. Clone this repo and install dependencies:

```bash
cd backend
npm install
# or
# bun install
```

2. Create a `.env` file at the project root (copy `.env.example` if provided) and set values:

```
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db?schema=public"
JWT_SECRET="a_long_random_secret_here"
PORT=9000
```

3. Generate Prisma client & run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. (Optional) Seed the database with an admin user:

```bash
npm run seed
```

5. Start dev server:

```bash
npm run dev
# or with bun
# bun run dev
```

API will default to `http://localhost:9000` (or `PORT` in `.env`).

---

## Important .env variables

| Key            | Purpose                                                      |
| -------------- | ------------------------------------------------------------ |
| `DATABASE_URL` | Postgres connection string used by Prisma                    |
| `JWT_SECRET`   | Secret for signing JWTs (use a secure random string in prod) |
| `PORT`         | Server listen port                                           |

---

## Scripts

- `dev` — run the TypeScript dev server with hot reload (`ts-node-dev`).
- `build` — compile TypeScript to JavaScript (`tsc`).
- `start` — run compiled output (`node dist/server.js`).
- `prisma:generate` — generate Prisma client.
- `prisma:migrate` — apply migrations.
- `seed` — run seed script to create default OWNER user & sample data.

Example:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

---

## Database & Prisma notes

- The project assumes PostgreSQL for best compatibility with Prisma features (e.g., `String[]` arrays). If you use SQLite, convert array fields to `Json`.

- Common troubleshooting:

  - `P2002 Unique constraint failed` — means a record with that unique field (like `email`) already exists. Use `upsert` or check before creating.
  - `EPERM` rename errors on Windows when running `prisma generate` or migrations — typically caused by file locks. Close editors/servers, run terminal as Administrator, or remove `node_modules/.prisma/client/*` and regenerate.
  - If migrations exist on DB but are missing locally, you can run `npx prisma migrate reset` in development (this drops all data).

---

## API endpoints (examples)

> Base URL: `{{baseUrl}} = http://localhost:9000`

### Auth

- `POST /api/auth/login` — login with `{ email, password }` → returns `{ token, user }`

### Users

- `POST /api/users` — create user (owner/admin only usually)
- `GET /api/users` — list users
- `PUT /api/users/:id` — update user
- `DELETE /api/users/:id` — delete user

### Posts

- `GET /api/posts` — list published posts
- `GET /api/posts/:slug` — get post by slug
- `POST /api/posts` — create post (protected)
- `PUT /api/posts/:id` — update post (protected)
- `DELETE /api/posts/:id` — delete post (protected)

### Projects

- `GET /api/projects` — list projects
- `POST /api/projects` — create project (protected)
- `PUT /api/projects/:id` — update project (protected)
- `DELETE /api/projects/:id` — delete project (protected)

> Protect owner-only routes with `Authorization: Bearer <token>` header.

---

## Postman / Testing

- Create a Postman environment with variables:

  - `baseUrl = http://localhost:9000`
  - `token` (after login)

- Use `Authorization: Bearer {{token}}` header for protected endpoints.

I recommend creating a small Postman collection with the routes above to speed up testing.

---

## Data shapes (examples)

**Create User** (POST `/api/users`)

```json
{
  "email": "owner@example.com",
  "password": "StrongPassword123!",
  "name": "Portfolio Owner",
  "role": "OWNER"
}
```

**Create Post** (POST `/api/posts`)

If you store tags as `Json` (recommended cross-db):

```json
{
  "slug": "my-first-blog-post",
  "title": "My First Blog Post",
  "content": "<p>Post content here</p>",
  "excerpt": "Short excerpt",
  "tags": ["NextJS", "Prisma", "Portfolio"],
  "published": true,
  "authorId": 1
}
```

---

## Security & Production Notes

- Use HttpOnly cookies for JWTs in production to avoid XSS-based token theft.
- Use strong password hashing (bcrypt with cost >= 10).
- Validate & sanitize incoming data (`zod`, `joi`, or similar).
- Add rate limiting on auth endpoints and CORS origin restrictions.
- Replace local DB with a managed Postgres (e.g., AWS RDS, Supabase) in prod.

---

## Troubleshooting checklist

- `TypeError: argument handler is required` — ensure every `router.get/post/put/delete` has a proper handler function and your imports match named/default exports.
- `Unknown argument tags` — ensure Prisma schema field type matches your DB. Use `Json` for arrays if needed or use a related `Tag` model.
- `P2002` — handle unique constraint (use `findUnique`, `upsert`, or skip creating duplicates).

---

## Contributing

PRs are welcome. Keep changes small and well-documented. Add migration files when you change Prisma schema.

---

## License

MIT
