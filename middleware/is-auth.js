const jwt = require('jsonwebtoken');
const throwError = require('../commons/errorHandlers/throwError')

const authHandler = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        if (!authHeader) {
            throwError('Not Authenticated', 401)
        }

        const token = authHeader.split(' ')[1];
        let decodedToken;
        decodedToken = jwt.verify(token, process.env.SECRET)

        if (!decodedToken) {
            throwError('Not authenticated', 401)
        }

        req.userId = decodedToken.userId
        req.userRole = decodedToken.userRole
        req.userEmail = decodedToken.userEmail
        next()
    } catch (e) {
        res.status(401).json({message: "You are not authenticated!", data: e});
    }
}


module.exports = authHandler
