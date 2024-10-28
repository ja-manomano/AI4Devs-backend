import { PrismaClient } from '@prisma/client';
import { Interview } from './Interview';
import { Candidate } from './Candidate';

const prisma = new PrismaClient();

export class Application {
    id?: number;
    positionId: number;
    candidateId: number;
    applicationDate: Date;
    currentInterviewStep: number;
    notes?: string;
    interviews: Interview[]; // Added this line
    candidate?: Candidate; // Added this line

    constructor(data: any) {
        this.id = data.id;
        this.positionId = data.positionId;
        this.candidateId = data.candidateId;
        this.applicationDate = new Date(data.applicationDate);
        this.currentInterviewStep = data.currentInterviewStep;
        this.notes = data.notes;
        this.interviews = data.interviews || []; // Added this line
        this.candidate = data.candidate; // Added this line
    }

    async save() {
        const applicationData: any = {
            positionId: this.positionId,
            candidateId: this.candidateId,
            applicationDate: this.applicationDate,
            currentInterviewStep: this.currentInterviewStep,
            notes: this.notes,
        };

        if (this.id) {
            // Update existing application
            await prisma.application.update({
                where: { id: this.id },
                data: applicationData,
            });
        } else {
            // Create new application
            const newApplication = await prisma.application.create({
                data: applicationData,
            });
            this.id = newApplication.id;
        }
    }

    static async findByPositionId(positionId: number): Promise<Application[]> {
        const applications = await prisma.application.findMany({
            where: { positionId },
            include: {
                candidate: true,
                interviews: true,
            },
        });

        return applications.map(app => new Application(app));
    }

    static async findByCandidateId(candidateId: number): Promise<Application | null> {
        const application = await prisma.application.findFirst({
            where: { candidateId },
        });

        return application ? new Application(application) : null;
    }
}