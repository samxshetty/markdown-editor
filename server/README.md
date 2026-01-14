# API Server

This is the backend for the Markdown Converter project. It is a Node.js Express application written in TypeScript.

## Prerequisites

- Node.js (v18+)
- PostgreSQL

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Configuration:
   Create a `.env` file in the root of the `server` directory (or use the root `.env` if running from there, but best practice is local).
   
   See root `.env.example` for keys.
   
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   PORT=3000
   NODE_ENV=development
   ```

## Running

- **Development**:
  ```bash
  npm run dev
  ```
  This uses `nodemon` to restart on file changes.

- **Production Build**:
  ```bash
  npm run build
  npm start
  ```

## Testing

Run unit/integration tests:

```bash
npm test
```

## API Endpoints

### POST /documents

Saves converted HTML content.

**Request Body:**
```json
{
  "html": "<h1>Converted Content</h1>"
}
```

**Response:**
```json
{
  "message": "Document saved successfully",
  "document": {
    "id": 1,
    "html_content": "<h1>Converted Content</h1>",
    "created_at": "..."
  }
}
```
