const {
    StatusCodes,
    ReasonPhrases
} = require('../utils/httpStatusCode')

// ******
// ********* THỬ DÙNG FACTORY PATTERN NEXT TIME

class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.OK, reasonStatusCode = ReasonPhrases.OK, metadata = {}
    }) {
        this.message = message ? message : reasonStatusCode
        this.statusCode = statusCode
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.statusCode).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata }) // default is OK
    }
}

class CREATED extends SuccessResponse {
    constructor({ message, metadata }) {
        super({
            message,
            statusCode: StatusCodes.CREATED, reasonStatusCode: ReasonPhrases.CREATED,
            metadata
        })
    }
}

class NoContent extends SuccessResponse {
    constructor ({ message, metadata }) {
        super({
            message, 
            statusCode: StatusCodes.NO_CONTENT,
            reasonStatusCode: ReasonPhrases.NO_CONTENT,
            metadata
        })
    }
}

module.exports = {
    OK,
    CREATED,
    NoContent
}