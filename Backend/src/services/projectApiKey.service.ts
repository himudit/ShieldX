import crypto from 'crypto';
import { hashPassword } from '../utils/password';
import { ApiEnvironment } from '../enums/api-environment.enum';

const generateRandomString = (length: number): string => {
    return crypto.randomBytes(length).toString('hex');
};

const API_ENV_PREFIX: Record<ApiEnvironment, string> = {
    [ApiEnvironment.DEVELOPMENT]: 'dev',
    [ApiEnvironment.PRODUCTION]: 'live',
};

/**
 * Prepare API key data (NO DB CALLS)
 */
export const prepareApiKey = async (environment: ApiEnvironment) => {
    const envPrefix = API_ENV_PREFIX[environment];

    // Public API key
    const apiKey = `sx_${envPrefix}_${generateRandomString(16)}`;

    // Secret key (shown only once)
    const secretKey = `sx_sk_${generateRandomString(24)}`;

    // Hash secret key
    const secretKeyHash = await hashPassword(secretKey);

    return {
        apiKey,
        secretKey,
        secretKeyHash,
        environment,
    };
};
