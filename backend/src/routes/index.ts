import { Router } from 'express';
import carRoutes from './carRoutes.js';
import financeRoutes from './financeRoutes.js';
import leadRoutes from './leadRoutes.js';

const apiRouter = Router();

// Health Check
apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Civic Hub Thailand API',
    uptime: process.uptime(),
  });
});

apiRouter.use('/cars', carRoutes);
apiRouter.use('/finance', financeRoutes);
apiRouter.use('/leads', leadRoutes);

export default apiRouter;
