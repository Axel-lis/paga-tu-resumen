import { Router } from 'express';
import { verificarResumen } from '../controllers/step1Controller.js';

const router = Router();

router.post('/', verificarResumen);

export default router;
