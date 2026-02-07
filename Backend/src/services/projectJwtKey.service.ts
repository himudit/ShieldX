import crypto from 'crypto';
import { encrypt } from '../utils/crypto';
import { JwtAlgorithm } from '../enums/jwt-algorithm.enum';

/**
 * Prepare JWT key pair (NO DB CALLS)
 */
export const prepareJwtKey = () => {
    // Generate RSA key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });

    const kid = crypto.randomBytes(16).toString('hex');
    const privateKeyEncrypted = encrypt(privateKey);

    return {
        kid,
        publicKey,
        privateKeyEncrypted,
        algorithm: JwtAlgorithm.RS256,
    };
};
