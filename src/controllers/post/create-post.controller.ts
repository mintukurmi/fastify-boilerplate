import { Type, Static } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { createPostService } from "../../services/post.service";
import { customErrorFormatter } from "../../utils/custom-error-formatter.utils";
import { ErrorHandler } from "../../utils/error-handler.utils";
import { NotFoundResponseSchema, ServerErrorResponseSchema, UnAuthorizedResponseSchema } from "../../schemas/error.schema";


const BodySchema = Type.Strict(
    Type.Object({
        title: Type.String(),
        description: Type.String() 
    })
)

type BodyType = Static<typeof BodySchema>;

const ResponseSchema =  Type.Strict(
    Type.Object({
        title: Type.String(),
        description: Type.String(),
        likes: Type.Any(),
        _id: Type.String(),
        createdAt: Type.String(),
        updatedAt: Type.String(),
    })
)



export function createPost( fastify: FastifyInstance) {
    
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
        return ErrorHandler(createPostService, rep, customErrorFormatter)({
            title: req.body.title,
            description: req.body.description
        });
    })
}