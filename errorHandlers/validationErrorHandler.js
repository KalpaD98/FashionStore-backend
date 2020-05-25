const { validationResult } = require('express-validator');



function validationErrorHandler(req) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array()
        return  error;
    }
}



module.exports = validationErrorHandler
