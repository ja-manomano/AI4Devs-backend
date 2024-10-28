import express from 'express';
import { getCandidatesForPosition } from '../presentation/controllers/positionController';

const router = express.Router();

router.get('/:id/candidates', getCandidatesForPosition);

export default router;