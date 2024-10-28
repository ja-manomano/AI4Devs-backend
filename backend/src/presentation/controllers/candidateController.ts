import { Request, Response } from 'express';
import { addCandidate, findCandidateById } from '../../application/services/candidateService';
import { updateCandidateStageService } from '../../application/services/candidateService';

export const addCandidateController = async (req: Request, res: Response) => {
    try {
        const candidateData = req.body;
        const candidate = await addCandidate(candidateData);
        res.status(201).json({ message: 'Candidate added successfully', data: candidate });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error adding candidate', error: error.message });
        } else {
            res.status(400).json({ message: 'Error adding candidate', error: 'Unknown error' });
        }
    }
};

export const getCandidateById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const candidate = await findCandidateById(id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateCandidateStage = async (req: Request, res: Response) => {
    const candidateId = parseInt(req.params.id);
    const { currentInterviewStep } = req.body;
  
    if (isNaN(candidateId)) {
      return res.status(400).json({ error: 'Invalid candidate ID format' });
    }
  
    if (!currentInterviewStep) {
      return res.status(400).json({ error: 'currentInterviewStep is required' });
    }
  
    try {
      const updatedCandidate = await updateCandidateStageService(candidateId, currentInterviewStep);
      if (!updatedCandidate) {
        return res.status(404).json({ error: 'Candidate not found' });
      }
      res.json(updatedCandidate);
    } catch (error) {
      console.error(`Error updating candidate stage for candidate ID ${candidateId}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export { addCandidate };