class CustomError extends Error {
    constructor(errorData = '') {
        if (typeof errorData === 'string') {
            super(errorData)
            this.message = errorData
        } else if (errorData instanceof Error) {
            super(errorData.message)
            this.message = errorData.message
            this.data = {
                message: errorData.message,
                stack: errorData.stack
            }
        } else {
            super(errorData.message)
            this.message = JSON.stringify(errorData)
            this.data = errorData
        }
        this.timestamp = new Date()
    }
}
global.CustomError = CustomError
module.exports = CustomError