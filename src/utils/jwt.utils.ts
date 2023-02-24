import { createSigner, createVerifier } from "fast-jwt";
import "dotenv/config";

const jwt_secret = process.env.JWT_SECRET;

interface IJWTPayload {
    /* Token expiry time provided in miliseconds */
    expiresIn: number | undefined,
    /** Payload to embed in the token  */ 
    payload: any
}

/**
 * This fn signs a jwt token with the provided data and expiry time
 * @param {number} params.expiresIn Token expiry time provided in miliseconds
 * @param {string} params.payload Payload to embed in the token
 * @returns 
 */
export const jwtSigner = (params: IJWTPayload) => {
    const sign = createSigner({ key: jwt_secret , expiresIn: params.expiresIn });
    return sign(params.payload);
}


/**
 * This fn verify and decode any provided JWT token
 * @param token JWT
 * @returns
 */
export const jwtVerifier = (token: string) => {
    console.log("inside verifier", token)
    try {
        const verify = createVerifier({ key: jwt_secret });
        const decoded = verify(token);
        return decoded;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}