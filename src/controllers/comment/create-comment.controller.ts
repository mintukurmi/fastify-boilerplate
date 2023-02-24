import { Type, Static } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { createCommentService } from "../../services/comments.service";
import { customErrorFormatter } from "../../utils/custom-error-formatter.utils";
import { ErrorHandler } from "../../utils/error-handler.utils";
import { NotFoundResponseSchema, ServerErrorResponseSchema, UnAuthorizedResponseSchema } from "../../schemas/error.schema";


const BodySchema = Type.Strict(
    Type.Object({
        content: Type.String(),
        post: Type.Number()
    })
)

type BodyType = Static<typeof BodySchema>;

const ResponseSchema =  Type.Strict(
    Type.Object({
        id: Type.Number(),
        post: Type.Number(),
        content: Type.String(),
        author: Type.String()
    })
)



export function createComment( fastify: FastifyInstance) {
    
    fastify.post<{ Body: BodyType }>("/", {
        schema: {
            body: BodySchema,
            response: {
                "200": ResponseSchema,
                "401": UnAuthorizedResponseSchema,
                "404": NotFoundResponseSchema,
                "500": ServerErrorResponseSchema
            }
        },
    },
    async (req , rep) => {
        return ErrorHandler(createCommentService, rep, customErrorFormatter)({
            content: req.body.content,
            post: req.body.post,
            fastify: fastify
        });
    })
}