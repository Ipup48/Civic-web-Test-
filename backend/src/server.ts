import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Security and middleware
app.use(helmet());
app.use(
  cors({
    origin: [FRONTEND_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Mount API routes
app.use('/api', apiRouter);

// Root greeting / fallback
app.get('/', (req, res) => {
  res.json({
    name: 'Civic Hub Thailand - Dedicated Backend REST API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      cars: '/api/cars',
      carBySlug: '/api/cars/:slug',
      financeCalculate: '/api/finance/calculate',
      leads: '/api/leads',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found`,
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`🏎️ Civic Hub Thailand Backend running on port ${PORT}`);
  console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🚗 Cars API: http://localhost:${PORT}/api/cars`);
});

export default app;
