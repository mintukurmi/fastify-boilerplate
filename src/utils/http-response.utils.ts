export class Response {

    private statusCode: number;
    private error: string;
    private message: string;

    constructor() {
        this.statusCode = 500;
        this.error = "Internal Server Error";
        this.message = "Some error occured";
    }

    internalServerError (msg: string) {
        this.message = msg ?? "Some error occured";
        return {
            statusCode: this.statusCode,
            error: this.error,
            message: this.message
        }
    }

    notFound (msg: string) {
        this.statusCode = 404;
        this.error = "Not Found";
        this.message = msg ?? "Not Found";

        return {
            statusCode: this.statusCode,
            error: this.error,
            message: this.message
        }
    }

    conflict (msg: string) {
        this.statusCode = 409;
        this.error = "Conflict";
        this.message = msg ?? "Conflict";

        return {
            statusCode: this.statusCode,
            error: this.error,
            message: this.message
        }
    }

    badRequest (msg: string) {
        this.statusCode = 400;
        this.error = "Bad Request";
        this.message = msg ?? "Bad Request";

        return {
            statusCode: this.statusCode,
            error: this.error,
            message: this.message
        }
    }

    unAuthorized (msg: string) {
        this.statusCode = 401;
        this.error = "UnAuthorized";
        this.message = msg ?? "UnAuthorized";

        return {
            statusCode: this.statusCode,
            error: this.error,
            message: this.message
        }
    }

    forbidden (msg: string) {
        this.statusCode = 403;
        this.error = "Forbidden";
        this.message = msg ?? "Forbidden";

        return {
            statusCode: this.statusCode,
            error: this.error,
            message: this.message
        }
    }
    
    notAcceptable (msg: string) {
        this.statusCode = 406;
        this.error = "Not Acceptable";
        this.message = msg ?? "Not Acceptable";

        return {
            statusCode: this.statusCode,
            error: this.error,
            message: this.message
        }
    }

}