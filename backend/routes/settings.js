import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';

const router = express.Router();

router.get('/:key', getSettings);
router.put('/:key', updateSettings);

export default router;
