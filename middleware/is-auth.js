const jwt = require('jsonwebtoken');
const throwError = require('../commons/errorHandlers/throwError')

const authHandler = (req, res, next) => {

    const authHeader = req.get('Authorization')

    if (!authHeader) {
        throwError('Not Authenticated', 401)
    }

    const token = authHeader.split(' ')[1];
    let decodedToken

    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (e) {
        e.statusCode = 500;
        throw e
    }

    if (!decodedToken) {
        throwError('Not authenticated', 401)
    }

    req.userId = decodedToken.userId
    req.userRole = decodedToken.userRole
    req.userEmail = decodedToken.userEmail
    next()
}


module.exports = authHandler
