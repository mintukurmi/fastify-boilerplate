import { Type, Static } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { customErrorFormatter } from "../../utils/custom-error-formatter.utils";
import { ErrorHandler } from "../../utils/error-handler.utils";
import { NotFoundResponseSchema, ServerErrorResponseSchema, UnAuthorizedResponseSchema } from "../../schemas/error.schema";
import { createPostService } from "../../services/post.service";


const BodySchema = Type.Strict(
    Type.Object({
        title: Type.String(),
        description: Type.String(),
    })
)

type BodyType = Static<typeof BodySchema>;

// const ResponseSchema =  Type.Strict(
//     Type.Object({
//         _id: Type.String(),
//         name: Type.Optional(Type.Object({
//             firstname: Type.Optional(Type.String()),
//             lastname: Type.Optional(Type.String())
//         })),
//         phone: Type.String(),
//         avatar: Type.Optional(Type.String()),
//         email: Type.String({ default: "" }),
//         is_blocked: Type.Boolean({ default: false }),
//         last_access: Type.String({ default: "" })
//     })
// )



export function createUser( fastify: FastifyInstance) {
    
    fastify.post<{ Body: BodyType }>("/", {
        schema: {
            body: BodySchema,
            response: {
                // "200": ResponseSchema,
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