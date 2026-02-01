import { ProjectResponseDto } from '@/modules/project/dto/project-response.dto';
import { ApiKeyResponseDto } from '@/modules/project-api-key/dto/api-key-create-response.dto';
import { JwtKeyResponseDto } from '@/modules/project-jwt-key/dto/jwt-key-response.dto';

export interface ProjectMetaResponseDto {
    project: ProjectResponseDto;
    apiKey: ApiKeyResponseDto;
    jwtKey: JwtKeyResponseDto;
}
