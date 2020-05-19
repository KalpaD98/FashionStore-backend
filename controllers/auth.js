const User = require('../models/user')
const bcrypt = require('bcrypt')
const errorHandler = require('../services/validationErrorHandler')


exports.login = async (req, res, next) => {
    errorHandler(req)
    const email = req.body.email;
    const password = req.body.password

    try {
        const user = await User.findOne({email: email})
        if (!user) {
            const error = new Error('A user with this email couldn\'t be found')
            error.statusCode = 401;
            throw error
        }

        const passwordMatched = await bcrypt.compare(password,user.password)

        if(!passwordMatched){
            const error = new Error('Invalid Password')
            error.statusCode = 401;
            throw error
        }


    } catch (e) {
        next(e)
    }


}

exports.signup = (req, res, next) => {
    errorHandler(req)
    const email = req.body.email;
    const password = req.body.password
    const name = req.body.name // needs to e added on front end
    bcrypt.hash(password, 10).then(
        hashedPassword => {
            const user = new User({
                email: email,
                name: name,
                password: hashedPassword
            });
            user.save()
                .then(result => {
                    res.status(201).json({message: "user created successfully", user: result})
                })
                .catch(e => {
                    res.status(500).json({
                        message: 'Server Error : failed to hash password try again later\n\n' + e
                    });
                })
        })
        .catch(err => next(err))

}
