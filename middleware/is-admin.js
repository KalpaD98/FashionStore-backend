const errorThrower = require('../commons/errorHandlers/throwError')
const UserRole = require('../commons/enums/UserRoleEnum')

const isHigherRole = (req, res, next) => {
    const isAdmin = req.userRole === UserRole.Admin;
    try {
        if (!isAdmin) {
            errorThrower('unauthorized request', 401)
        } else {
            next()
        }
    } catch (e) {
        next(e)
    }
}

module.exports = isHigherRole
