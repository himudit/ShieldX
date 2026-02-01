import { prisma } from '../config/primsa';
import { CreateProjectDto, ProjectResponseDto, ApiKeyCreateResponseDto, JwtKeyResponseDto, CreateProjectResponseDto } from '../interfaces/project.interface';
import * as projectApiKeyService from './projectApiKey.service';
import * as projectJwtKeyService from './projectJwtKey.service';
import { ApiEnvironment } from '../enums/api-environment.enum';
import { env } from '../config/env';
import { ProjectStatus } from '@prisma/client';

export const createProject = async (
  userId: string,
  data: CreateProjectDto
): Promise<any> => {
  const apiKeyPrepared = await projectApiKeyService.prepareApiKey(
    env.NODE_ENV as ApiEnvironment
  );

  const jwtKeyPrepared = projectJwtKeyService.prepareJwtKey();

  const result = await prisma.$transaction(async (tx) => {
    const projectModel = await tx.project.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: userId,
      },
    });

    const projectDto: ProjectResponseDto = {
      id: projectModel.id,
      ownerId: projectModel.ownerId,
      name: projectModel.name,
      description: projectModel.description,
      status: projectModel.status,
      createdAt: projectModel.createdAt,
      updatedAt: projectModel.updatedAt,
    };


    const apiKeyModel = await tx.projectApiKey.create({
      data: {
        projectId: projectModel.id,
        apiKey: apiKeyPrepared.apiKey,
        secretKeyHash: apiKeyPrepared.secretKeyHash,
        environment: apiKeyPrepared.environment,
      },
    });

    const apiKeyDto: ApiKeyCreateResponseDto = {
      id: apiKeyModel.id,
      apiKey: apiKeyModel.apiKey,
      secretKey: apiKeyPrepared.secretKey,
      environment: apiKeyModel.environment,
      isActive: apiKeyModel.isActive,
      createdAt: apiKeyModel.createdAt,
    };

    const jwtKeyModel = await tx.projectJwtKey.create({
      data: {
        projectId: projectModel.id,
        kid: jwtKeyPrepared.kid,
        publicKey: jwtKeyPrepared.publicKey,
        privateKeyEncrypted: jwtKeyPrepared.privateKeyEncrypted,
        algorithm: jwtKeyPrepared.algorithm,
      },
    });

    const jwtKeyDto: JwtKeyResponseDto = {
      id: jwtKeyModel.id,
      kid: jwtKeyModel.kid,
      publicKey: jwtKeyModel.publicKey,
      algorithm: jwtKeyModel.algorithm,
      isActive: jwtKeyModel.isActive,
      createdAt: jwtKeyModel.createdAt
    };

    const result: CreateProjectResponseDto = {
      project: projectDto,
      apiKey: apiKeyDto,
      jwtKey: jwtKeyDto,
    }
    return result;
  });

  return result;
};

export const getProjects = async (userId: string): Promise<ProjectResponseDto[]> => {
  const projectsModel = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
      ownerId: true,
      name: true,
      description: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const projectsDto: ProjectResponseDto[] = projectsModel.map((project) => ({
    id: project.id,
    ownerId: project.ownerId,
    name: project.name,
    description: project.description,
    status: project.status,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }));

  return projectsDto;
};