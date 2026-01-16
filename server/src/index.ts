import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './test-env-loading'; // Test env loading immediately
import documentRoutes from './routes/documentRoutes';

const envFile =
  process.env.NODE_ENV === "docker"
    ? ".env.docker"
    : ".env.local";

dotenv.config({ path: envFile });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
