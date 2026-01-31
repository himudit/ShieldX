import { ProjectStatus } from "../../../enums/enum";

export interface ProjectResponseDto {
    id: string;
    ownerId: string;
    name: string;
    description?: string | null;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
}
