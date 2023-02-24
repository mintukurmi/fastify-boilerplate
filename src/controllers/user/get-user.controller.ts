import { Type, Static } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { getUserByIdService } from "../../services/user.service";
import { customErrorFormatter } from "../../utils/custom-error-formatter.utils";
import { ErrorHandler } from "../../utils/error-handler.utils";
import { NotFoundResponseSchema, ServerErrorResponseSchema, UnAuthorizedResponseSchema } from "../../schemas/error.schema";


const ParamsSchema = Type.Strict(
    Type.Object({
        userId: Type.String()
    })
)

type ParamsType = Static<typeof ParamsSchema>;

const ResponseSchema =  Type.Strict(
    Type.Object({
        _id: Type.String(),
        name: Type.Optional(Type.Object({
            firstname: Type.Optional(Type.String()),
            lastname: Type.Optional(Type.String())
        })),
        phone: Type.String(),
        avatar: Type.Optional(Type.String()),
        email: Type.String({ default: "" }),
        is_blocked: Type.Boolean({ default: false }),
        last_access: Type.String({ default: "" })
    })
)



export function getUserById( fastify: FastifyInstance) {
    
    fastify.get<{ Params: ParamsType }>("/:userId", {
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
        return ErrorHandler(getUserByIdService, rep, customErrorFormatter)({
            userId: req.params.userId
        });
    })
}