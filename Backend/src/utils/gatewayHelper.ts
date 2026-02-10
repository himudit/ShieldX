import { prisma } from '../config/primsa';

export const validateApiKey = async (apiKey: string, userId: string): Promise<string | null> => {
    try {
        const apiKeyRecord = await prisma.projectApiKey.findFirst({
            where: {
                apiKey: apiKey,
                isActive: true,
                project: {
                    ownerId: userId,
                },
            },
            select: {
                projectId: true,
            },
        });

        if (!apiKeyRecord) {
            return null;
        }

        return apiKeyRecord.projectId;
    } catch (error) {
        console.error('Error validating API key:', error);
        return null;
    }
};
