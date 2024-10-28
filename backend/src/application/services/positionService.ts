import { Application } from '../../domain/models/Application';

export const getCandidatesForPositionService = async (positionId: number) => {
  const applications = await Application.findByPositionId(positionId);

  if (applications.length === 0) {
    return null;
  }

  return applications.map(application => {
    if (!application.candidate) {
      throw new Error(`Candidate not found for application ID ${application.id}`);
    }

    const averageScore =
      application.interviews.reduce((acc, interview) => acc + (interview.score || 0), 0) /
      application.interviews.length;

    return {
      fullName: `${application.candidate.firstName} ${application.candidate.lastName}`,
      currentInterviewStep: application.currentInterviewStep,
      averageScore: averageScore || 0,
    };
  });
};