"server-only"

import { jwtVerify } from "jose";

const TOKEN_KEY = process.env.TOKEN_KEY;

export async function verifyJwt(token) {
    try {
        if (!TOKEN_KEY) {
            throw new Error("TOKEN_KEY is not defined in environment variables.");
        }

        const secret = new TextEncoder().encode(TOKEN_KEY);
        const { payload } = await jwtVerify(token, secret);
        return { valid: true, payload };
    } catch (error) {
        if (error.code === 'ERR_JWT_EXPIRED') {
            return { valid: false, error: 'TokenExpired' };
        }
        else if (error.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
            return { valid: false, error: 'TokenInvalidSignature' };
        }
        else {
            return { valid: false, error: 'TokenInvalid' };
        }
    }
}
