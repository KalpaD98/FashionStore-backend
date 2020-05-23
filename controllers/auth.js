const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const errorHandler = require('../services/validationErrorHandler')
const jwt = require('jsonwebtoken')
const throwError = require('../services/throwError')


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

        const passwordMatched = await bcrypt.compare(password, user.password)

        if (!passwordMatched) {
            const error = new Error('Invalid Password')
            error.statusCode = 401;
            throw error
        }

        const token = jwt.sign({
                email: user.email,
                userId: user._id.toString()
            },
            process.env.SECRET,
            {expiresIn: '1h'}
        )

        res.status(200).json({token: token, expiresIn: '3600', userId: user._id})


    } catch (e) {
        next(e)
    }


}

exports.signup = async (req, res, next) => {
    errorHandler(req)
    const email = req.body.email;
    const password = req.body.password
    const username = req.body.username // needs to e added on front end

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        if (!hashedPassword) {
            throwError('Error hashing password', 500);
        }
        const user = new User({
            email: email,
            username: username,
            password: hashedPassword
        });

        const createdUser = await user.save()

        if (createdUser) {
            res.status(201).json({message: "user created successfully", user: createdUser})
        } else {
            throwError('user signup failed', 409);
        }

    } catch (e) {
        next(e)
    }

}
