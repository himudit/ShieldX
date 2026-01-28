export interface JwtKeyResponseDto {
    id: string;
    kid: string;
    publicKey: string;
    algorithm: string;
    isActive: boolean;
    createdAt: Date;
}
