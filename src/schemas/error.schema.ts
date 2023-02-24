import { Type } from "@sinclair/typebox"


export const ForbiddenResponseSchema = Type.Strict(
    Type.Object({
        "statusCode": Type.Number({ default: 403 }),
        "error": Type.String({ default: "Forbidden" }),
        "message": Type.String()
    })
)

export const ServerErrorResponseSchema = Type.Strict(
    Type.Object({
        "statusCode": Type.Number({ default: 500 }),
        "error": Type.String({ default: "Internal Server Error" }),
        "message": Type.String()
    })
)

export const BadRequestResponseSchema =Type.Strict(
    Type.Object({
        "statusCode": Type.Number({ default: 400 }),
        "error": Type.String({ default: "Bad request" }),
        "message": Type.String()
    })
)

export const UnAuthorizedResponseSchema = Type.Strict(
    Type.Object({
        "statusCode": Type.Number({ default: 401 }),
        "error": Type.String({ default: "Unauthorized" }),
        "message": Type.String()
    })
)

export const NotFoundResponseSchema =  Type.Strict(
    Type.Object({
        "statusCode": Type.Number({ default: 404 }),
        "error": Type.String({ default: "Not found" }),
        "message": Type.String()
    })
)

export const ConflictResponseSchema =Type.Strict(
    Type.Object({
        "statusCode": Type.Number({ default: 409 }),
        "error": Type.String({ default: "Conflict" }),
        "message": Type.String()
    })
)