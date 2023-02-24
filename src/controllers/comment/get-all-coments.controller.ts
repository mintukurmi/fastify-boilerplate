import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { getAllCommentsService } from "../../services/comments.service";
import { customErrorFormatter } from "../../utils/custom-error-formatter.utils";
import { ErrorHandler } from "../../utils/error-handler.utils";
import { NotFoundResponseSchema, ServerErrorResponseSchema, UnAuthorizedResponseSchema } from "../../schemas/error.schema";



const ResponseSchema =  Type.Strict(
    Type.Array(
        Type.Object({
            id: Type.Number(),
            post: Type.Number(),
            content: Type.String(),
            author: Type.String()
        })
    )
)


export function getAllComments( fastify: FastifyInstance) {
    
    fastify.get("/", {
        schema: {
            response: {
                "200": ResponseSchema,
                "401": UnAuthorizedResponseSchema,
                "404": NotFoundResponseSchema,
                "500": ServerErrorResponseSchema
            }
        },
    },
    async (req , rep) => {
        return ErrorHandler(getAllCommentsService, rep, customErrorFormatter)({
            fastify: fastify
        });
    })
}