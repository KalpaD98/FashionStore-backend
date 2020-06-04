const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const errorHandler = require('../commons/errorHandlers/validationErrorHandler')
const jwt = require('jsonwebtoken')
const throwError = require('../commons/errorHandlers/throwError');

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key:
            process.env.SENDGRID_KEYgit
        }
    })
);


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
                userId: user._id.toString(),
                userRole: user.role,
                userEmail: user.email
            },
            process.env.SECRET,
            {expiresIn: '1h'}
        )

        await res.status(200).json({
            token: token,
            expiresIn: '3600',
            userId: user._id,
            userRole: user.role,
            userEmail: user.email
        })


    } catch (e) {
        next(e)
    }


}

exports.signup = async (req, res, next) => {
    errorHandler(req)
    const email = req.body.email;
    const password = req.body.password
    const username = req.body.username // needs to e added on front end

    const token = crypto.randomBytes(32).toString('hex');

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        if (!hashedPassword) {
            throwError('Error hashing password', 500);
        }
        const user = new User({
            email: email,
            username: username,
            password: hashedPassword,
            verificationToken: token
        });

        const createdUser = await user.save()

        if (createdUser) {
            await res.status(201).json({message: "user created successfully", user: createdUser})
        } else {
            throwError('user signup failed', 409);
        }

    } catch (e) {
        next(e)
    }

}

exports.postResetPasswordEmail = async (req, res, next) => {
    errorHandler(req)
    const email = req.body.email
    try {
        const user = await User.findOne({email})

        if (!user) {
            throwError('No account with that email found', 404)
        }

        const tokenBuffer = crypto.randomBytes(32);
        const token = tokenBuffer.toString('hex');
        user.passwordResetToken = token;
        user.passwordResetTokenExpDate = Date.now() + 3600000;

        await user.save();

        await transporter.sendMail({
            to: email,
            from: 'kalpafernando1998@gmail.com',
            subject: 'Password Reset',
            html: `
            <p>${user.username} You have requested a password reset</p>
            <p>Click  <a href="http://localhost:4200/password-reset/${token}">here</a> to set a new password.</p>`
        });

        await res.status(200).json({message: 'Password change request approved check your email'});

    } catch (e) {
        next(e)
    }
}

exports.postResetPassword = async (req, res, next) => {
    const password = req.body.password
    const passwordResetToken = req.body.resetToken

    try {
        const user = await User.findOne({passwordResetToken})

        if (!user) {
            throwError('User with given token not found', 404)
        }

        if (user) {
            if (user.passwordResetTokenExpDate < Date.now()) {
                throwError('reset token has expired resend reset request', 401)
                user.ResetTokenExpDateresetToken = undefined;
                user.passwordResetTokenExpDate = undefined;
            }
            user.password = bcrypt.hashSync(password, 10)
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpDate = undefined;
            await user.save();
            await res.status(200).json({message: 'password changed successfully'})
        } else {
            throwError('user with given reset token not found unauthorized request', 404)
        }
    } catch (e) {
        next(e)
    }

}
