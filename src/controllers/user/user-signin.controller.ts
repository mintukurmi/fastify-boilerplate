import { Type, Static } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { userSigninService } from "../../services/user.service";
import { customErrorFormatter } from "../../utils/custom-error-formatter.utils";
import { ErrorHandler } from "../../utils/error-handler.utils";
import { NotFoundResponseSchema, ServerErrorResponseSchema, UnAuthorizedResponseSchema } from "../../schemas/error.schema";


const BodySchema = Type.Strict(
    Type.Object({
        loginId: Type.String(),
        password: Type.String(),
    })
)

type BodyType = Static<typeof BodySchema>;

const ResponseSchema =  Type.Strict(
    Type.Object({
        access_token: Type.String()
    })
)



export function userSignin( fastify: FastifyInstance) {
    
    fastify.post<{ Body: BodyType }>("/signin", {
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
        return ErrorHandler(userSigninService, rep, customErrorFormatter)({
            loginId: req.body.loginId,
            password: req.body.password
    })
    
})

}