# Client - Markdown Converter

This is the frontend for the Markdown Converter project.

## Stack

- **Vite**: Build tool
- **React**: UI library
- **TypeScript**: Language
- **Tailwind CSS**: Styling
- **Marked**: Markdown parser
- **DOMPurify**: Sanitizer

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the dev server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## Testing

Run unit tests:
```bash
npm test
```

## Architecture

- `src/components/MarkdownEditor`: The core component handling input and preview.
- `src/api`: Handles communication with the backend.
- `src/App`: Layout container.
