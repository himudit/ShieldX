export interface ApiKeyResponseDto {
    id: string;
    apiKey: string;
    environment: string;
    isActive: boolean;
    createdAt: Date;
}
