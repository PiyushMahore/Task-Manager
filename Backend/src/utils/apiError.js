class apiError extends Error {
    constructor(statusCode, message = "smothing went wrong", error = [], stack) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.error = error
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { apiError }