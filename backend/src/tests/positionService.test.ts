import { getCandidatesForPositionService } from '../application/services/positionService';
import { Application } from '../domain/models/Application';

jest.mock('../domain/models/Application', () => ({
  Application: {
    findByPositionId: jest.fn(),
  },
}));

describe('getCandidatesForPositionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if no applications are found', async () => {
    (Application.findByPositionId as jest.Mock).mockResolvedValue([]);

    const result = await getCandidatesForPositionService(1);

    expect(result).toBeNull();
  });

  it('should throw an error if an application has no candidate', async () => {
    const applications = [
      {
        id: 1,
        candidate: null,
        interviews: [],
        currentInterviewStep: 'Step 1',
      },
    ];
    (Application.findByPositionId as jest.Mock).mockResolvedValue(applications);

    await expect(getCandidatesForPositionService(1)).rejects.toThrow('Candidate not found for application ID 1');
  });

  it('should return candidates with their full name, current interview step, and average score', async () => {
    const applications = [
      {
        id: 1,
        candidate: { firstName: 'John', lastName: 'Doe' },
        interviews: [{ score: 4 }, { score: 5 }],
        currentInterviewStep: 'Step 1',
      },
      {
        id: 2,
        candidate: { firstName: 'Jane', lastName: 'Smith' },
        interviews: [{ score: 3 }, { score: 4 }],
        currentInterviewStep: 'Step 2',
      },
    ];
    (Application.findByPositionId as jest.Mock).mockResolvedValue(applications);

    const result = await getCandidatesForPositionService(1);

    expect(result).toEqual([
      {
        fullName: 'John Doe',
        currentInterviewStep: 'Step 1',
        averageScore: 4.5,
      },
      {
        fullName: 'Jane Smith',
        currentInterviewStep: 'Step 2',
        averageScore: 3.5,
      },
    ]);
  });

  it('should handle applications with no interviews gracefully', async () => {
    const applications = [
      {
        id: 1,
        candidate: { firstName: 'John', lastName: 'Doe' },
        interviews: [],
        currentInterviewStep: 'Step 1',
      },
    ];
    (Application.findByPositionId as jest.Mock).mockResolvedValue(applications);

    const result = await getCandidatesForPositionService(1);

    expect(result).toEqual([
      {
        fullName: 'John Doe',
        currentInterviewStep: 'Step 1',
        averageScore: 0,
      },
    ]);
  });
});