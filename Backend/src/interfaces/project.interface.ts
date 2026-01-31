/**
 * Project-related interfaces
 */

import { ProjectStatus } from "../generated/prisma";

export interface ProjectResponse {
    id: string;
    ownerId: string;
    name: string;
    description?: string | null;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProjectDto {
    name: string;
    description?: string;
}

export interface CreateProjectApiKeyDto {
    projectId: string;
    environment: ApiEnvironment;
}

export interface ProjectApiKeyResponse {
    id: string;
    projectId: string;
    apiKey: string;
    secretKey: string; // Plain secret key returned only once
    environment: ApiEnvironment;
    isActive: boolean;
    createdAt: Date;
}
