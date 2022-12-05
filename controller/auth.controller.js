const UserModel = require("../models/User.model")
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require('jsonwebtoken');

const MESSAGE_ERROR_EMAIL = 'User already exists.'
const MESSAGE_ERROR_PROVIDE = 'Provide email, password and name'


const SignUpController = (req, res, next) => {
    const { email, name, password } = req.body

    if (email === "" || name === "" || password === "") {
        res.status(400).json({ message: MESSAGE_ERROR_PROVIDE })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." })
        return
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({
            message:
                "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
        });
        return;
    }

    UserModel.findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: MESSAGE_ERROR_EMAIL })
                return
            }
            const saltBcrypt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, saltBcrypt)
            return UserModel.create({ email, password: hashedPassword, name })
        })
        .then((createdUser) => {
            const { email, name, _id } = createdUser

            const user = { email, name, _id }
            res.status(201).json({ user: user })
        })
        .catch((err) => next(err))
}

const LoginController = (req, res, next) => {
    const { email, password } = req.body

    if (email === "" || password === "") {
        res.status(400).json({ message: MESSAGE_ERROR_PROVIDE })
        return;
    }

    UserModel.findOne({ email })
        .then((foundUser) => {
            if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
                const { _id, email, name } = foundUser
                const payload = { _id, email, name }

                const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: "7d",
                });

                res.status(200).json({ authToken: authToken })
            } else {
                res.status(401).json({ message: "Unable to authenticate the user" })
            }
        })
        .catch((err) => next(err))
}

module.exports = {
    SignUpController,
    LoginController
}
