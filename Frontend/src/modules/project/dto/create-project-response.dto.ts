import { ProjectResponseDto } from './project-response.dto';
import { ApiKeyCreateResponseDto } from '@/modules/project-api-key/dto/api-key-create-response.dto';
import { JwtKeyResponseDto } from '@/modules/project-jwt-key/dto/jwt-key-response.dto';

export interface CreateProjectResponseDto {
    project: ProjectResponseDto;
    apiKey: ApiKeyCreateResponseDto;
    jwtKey: JwtKeyResponseDto;
}
