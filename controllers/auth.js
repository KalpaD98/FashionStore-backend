const User = require('../models/user')
const bcrypt = require('bcrypt')
const errorHandler = require('../services/validationErrorHandler')


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password



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
        .catch(err => console.log(err))

}
