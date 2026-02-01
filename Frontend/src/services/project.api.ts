import type { ProjectResponseDto, ProjectMetaResponse } from '../modules/project/dto/project-response.dto';
import { apiClient } from './base.service';


export function createProject(data: { name: string; description?: string }) {
    return apiClient<ProjectResponseDto>('/api/projects', {
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function getProjects() {
    return apiClient<ProjectResponseDto[]>('/api/projects');
}

export function getProjectById(projectId: string) {
    return apiClient<ProjectMetaResponse>('/api/projects', {
        params: {
            projectId,
        },
    });
}