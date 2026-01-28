export interface ApiKeyCreateResponseDto {
    id: string;
    apiKey: string;
    secretKey: string; // ⚠️ shown only once
    environment: string;
    isActive: boolean;
    createdAt: Date;
}
