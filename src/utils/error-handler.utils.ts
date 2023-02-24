import { FastifyReply } from "fastify";

function DefaulErrorFormatter<T>(e: Error) {
    return {
        success: false,
        message: e.message,
        stack: e.stack
    }
}

interface DefaultErrorType {
    success: boolean;
    message: string;
    stack: string | undefined;
}


export function ErrorHandler<T,S,U = DefaultErrorType>(cb: (params: T) => Promise<S> | S, rep: FastifyReply, ErrorFormatter?: ((...args: any[]) => U)){
   
    return async function(params: T)  {
        try {
            let res = cb(params);
            if(res instanceof Promise) res = await res;
            return res;
        } catch(e) {
            const err = e as any;
            return ErrorFormatter === undefined ? DefaulErrorFormatter(err) : ErrorFormatter(rep, err);
        }
   } 
}