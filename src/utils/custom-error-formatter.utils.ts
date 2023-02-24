import { FastifyReply } from "fastify"

interface IError{
    statusCode: number;
    message: string;
    success: boolean
}

export const customErrorFormatter = (rep: FastifyReply, err: IError) => {
    
    if(!err.success) {

        switch (err.statusCode) {

            case 400: rep.badRequest(err.message);
                        break;

            case 401: rep.unauthorized(err.message);
                        break;

            case 403: rep.forbidden(err.message);
                        break;

            case 404: rep.notFound(err.message);
                        break;

            case 409: rep.conflict(err.message);
                        break;

            case 406: rep.notAcceptable(err.message);
                        break; 

            default:  rep.internalServerError(err.message);
        }
    }
}