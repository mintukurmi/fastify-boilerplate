import { Type, Static } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { getPostByIdService } from "../../services/post.service";
import { customErrorFormatter } from "../../utils/custom-error-formatter.utils";
import { ErrorHandler } from "../../utils/error-handler.utils";
import { NotFoundResponseSchema, ServerErrorResponseSchema, UnAuthorizedResponseSchema } from "../../schemas/error.schema";


const ParamsSchema = Type.Strict(
    Type.Object({
        postId: Type.String() 
    })
)

type ParamsType = Static<typeof ParamsSchema>;

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



export function getPostById(fastify: FastifyInstance) {
    
    fastify.get<{ Params: ParamsType}>("/:postId", {
        schema: {
            params: ParamsSchema,
            response: {
                "200": ResponseSchema,
                "401": UnAuthorizedResponseSchema,
                "404": NotFoundResponseSchema,
                "500": ServerErrorResponseSchema
            }
        },
    },
    async (req , rep) => {
        return ErrorHandler(getPostByIdService, rep, customErrorFormatter)({
            postId: req.params.postId
        });
    })
}