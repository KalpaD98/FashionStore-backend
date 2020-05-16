const User = require('../models/user')
const bcrypt = require('bcrypt')


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password
}


exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password
    User.findOne({email: email}).then(
        result => {
            if (result) {
                return res.status(403).json({message: 'User already exist'})
            } else {
                bcrypt.hash(password, 10).then(
                    hashedPassword => {
                        const user = new User({
                            email: email,
                            password: hashedPassword
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({message: "user created successfully", user: result})
                            })
                            .catch(e => {
                                res.status(500).json({
                                    message: e + 'Server Error : failed to hash password try again later'
                                });
                            })
                    })
                    .catch(err => console.log(err))
            }
        }
    )
}
