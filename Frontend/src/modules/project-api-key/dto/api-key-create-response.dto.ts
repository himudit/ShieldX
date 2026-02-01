export interface ApiKeyCreateResponseDto {
    id: string;
    apiKey: string;
    secretKey: string; // shown ONCE
    environment: string;
    isActive: boolean;
    createdAt: Date;
}
