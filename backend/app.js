import express from 'express';
import cors from 'cors';
import step1Router from './routes/step1.js';

const app = express();

const corsOptions = {
  origin: 'https://pagaturesumen.pampeana.com.ar',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.set('trust proxy', 1);

app.use(express.json());

app.use('/api/step1', step1Router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
  });
});

export default app;
