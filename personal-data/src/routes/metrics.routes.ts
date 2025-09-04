import { Router } from 'express';
import { getMetrics, getHealth } from '../middlewares/metrics.middleware';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json(getHealth());
});

// Prometheus metrics endpoint
router.get('/metrics', (req, res) => {
  try {
    res.set('Content-Type', 'text/plain');
    res.end(getMetrics());
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate metrics' });
  }
});

export default router;
