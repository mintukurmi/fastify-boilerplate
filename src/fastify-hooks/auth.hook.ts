import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import { jwtVerifier } from '../utils/jwt.utils';
import { User } from "../models/User.model";
import { tokenTypes } from '../utils/constants.utils';

export interface IRequestUser { 
    _id: string;
    phone: string;
    email: string;
    name: {
        firstname: string;
        lastname: string;
    }
}

declare module 'fastify' {
    interface FastifyRequest {
        user: IRequestUser
    }
} 

export function AuthHook(fastify: FastifyInstance, throwUnauthorized = true) {
        
    return async function(request: FastifyRequest, reply: FastifyReply, ) {


            const token = request.headers?.authorization?.split(' ')[1] ?? 'token';            
            const decoded = jwtVerifier(token);

            /**  checks if token provided is access_token or refesh_token, 
            /*   And, allow access only through access token  */
            if(decoded?.type !== tokenTypes.access_token) {
                return reply.unauthorized("Invalid access token");
            }

            if(decoded) {
                const user = await User.findById(decoded._id).lean();

                if(!user) 
                    return reply.unauthorized("Token invalid or expired");

                request.user = user;
            }
            else if(throwUnauthorized) {
                return reply.unauthorized("Token invalid or expired");
            }
            
        }

  }