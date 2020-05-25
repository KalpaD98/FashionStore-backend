const errorThrower = require('../commons/errorHandlers/throwError')
const UserRole = require('../commons/enums/UserRoleEnum')

const isHigherRole = (req, res, next) => {
    const role = req.userRole
    const isHigherRole = (role === UserRole.SuperAdmin || role === UserRole.Admin || role === UserRole.StoreManager)
    try {
        if (!isHigherRole) {
            errorThrower('unauthorized request', 401)
        } else {
            next()
        }
    } catch (e) {
        next(e)
    }


}


module.exports = isHigherRole
