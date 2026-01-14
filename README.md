Markdown to HTML Converter Project

This is a full-stack learning project consisting of a React client and a Node.js/Express server.

## Project Structure

- `client/`: React + Vite + Tailwind CSS frontend.
- `server/`: Node.js + Express + TypeScript + PostgreSQL backend.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL Database

## Getting Started

### 1. Database Setup

Ensure you have a PostgreSQL database running. Create a database (e.g., `markdown_db`).

### 2. Environment Configuration

Copy `.env.example` to `server/.env` and update the values:

```bash
cp .env.example server/.env
# Edit server/.env with your DB credentials
```

### 3. Install Dependencies

You need to install dependencies for both client and server.

```bash
# In root
cd server && npm install
cd ../client && npm install
```

### 4. Run the Project

**Server:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:3000`.

**Client:**
```bash
cd client
npm run dev
```
Client runs on `http://localhost:5173`.

## Testing

### Client Tests

To run client-side tests, navigate to the `client/` directory and execute:

```bash
npm test
```

Client tests use `vitest`.

### Server Tests

To run server-side tests, navigate to the `server/` directory and execute:

```bash
npm test
```

Server tests use `jest`.

## Features

- **Real-time Preview**: Type markdown and see HTML instantly.
- **Persistence**: Save your converted HTML to a PostgreSQL database.

## Architecture Notes

- **Monorepo Style**: Clear separation of concerns.
- **Strict TypeScript**: Used throughout for type safety.
- **Prisma ORM**: Uses Prisma ORM.
