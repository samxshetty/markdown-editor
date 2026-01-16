import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import documentRoutes from './routes/documentRoutes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/documents', documentRoutes);

//Change status code to 404 for test to fail
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
