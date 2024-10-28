import { getCandidatesForPositionService } from '../application/services/positionService';
import { Application } from '../domain/models/Application';

jest.mock('../domain/models/Application');

describe('getCandidatesForPositionService', () => {
  it('should return candidates with their full name, current interview step, and average score', async () => {
    const mockApplications = [
      {
        id: 1,
        positionId: 1,
        candidateId: 1,
        applicationDate: new Date(),
        currentInterviewStep: 'Phone Screen',
        notes: 'Some notes',
        interviews: [{ score: 4 }, { score: 5 }],
        candidate: { firstName: 'John', lastName: 'Doe' },
      },
    ];
    (Application.findByPositionId as jest.Mock).mockResolvedValue(mockApplications);

    const result = await getCandidatesForPositionService(1);
    expect(result).toEqual([
      {
        fullName: 'John Doe',
        currentInterviewStep: 'Phone Screen',
        averageScore: 4.5,
      },
    ]);
  });

  it('should return null if no applications are found', async () => {
    (Application.findByPositionId as jest.Mock).mockResolvedValue([]);

    const result = await getCandidatesForPositionService(1);
    expect(result).toBeNull();
  });

  it('should throw an error if candidate is not found', async () => {
    const mockApplications = [
      {
        id: 1,
        positionId: 1,
        candidateId: 1,
        applicationDate: new Date(),
        currentInterviewStep: 'Phone Screen',
        notes: 'Some notes',
        interviews: [{ score: 4 }, { score: 5 }],
        candidate: undefined,
      },
    ];
    (Application.findByPositionId as jest.Mock).mockResolvedValue(mockApplications);

    await expect(getCandidatesForPositionService(1)).rejects.toThrow('Candidate not found for application ID 1');
  });
});