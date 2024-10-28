import { Request, Response } from 'express';
import { getCandidatesForPositionService } from '../../application/services/positionService';

export const getCandidatesForPosition = async (req: Request, res: Response) => {
  const positionId = parseInt(req.params.id);
  if (isNaN(positionId)) {
    return res.status(400).json({ error: 'Invalid position ID format' });
  }

  try {
    const candidates = await getCandidatesForPositionService(positionId);
    if (!candidates) {
      return res.status(404).json({ error: 'Position not found' });
    }
    res.json(candidates);
  } catch (error) {
    console.error(`Error fetching candidates for position ID ${positionId}:`, error);

    if (error instanceof Error) {
      if (error.message.includes('Candidate not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};