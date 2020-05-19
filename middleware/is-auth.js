const jwt = require('jsonwebtoken');
const errorThrower = require('../services/errorThrower')

const authHandler = (req, res, next) => {

    const authHeader = req.get('Authorization')

    if(!authHeader){
    }
}


module.exports = authHandler
