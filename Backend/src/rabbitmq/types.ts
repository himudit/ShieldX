export interface ApiLogEvent {
    projectId: string;
    providerId: string;

    endpoint: string;      // req.originalUrl
    requestType: string;   // GET, POST, etc
    statusCode: number;

    message: string | null;
    error: boolean;

    duration: number;      // useful for analytics (not stored currently)
    ip: string | null;
    userAgent: string | null;

    createdAt: string;     // ISO string
}
