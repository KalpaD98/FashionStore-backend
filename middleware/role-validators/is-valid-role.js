const errorThrower = require('../../commons/errorHandlers/throwError');
const UserRole = require('../../commons/enums/UserRoleEnum');

const validateRole = (role) => {
    return (req, res, next) => {
        const isRequiredRole = req.userRole === role;
        try {
            if (!isRequiredRole) {
                errorThrower('unauthorized request', 401);
            } else {
                next();
            }
        } catch (e) {
            next(e);
        }
    }
}

exports.isRoleSuperAdmin = validateRole(UserRole.SuperAdmin);
exports.isRoleAdmin = validateRole(UserRole.Admin);
exports.isRoleStoreManager = validateRole(UserRole.StoreManager);
exports.isRoleUser = validateRole(UserRole.User);
