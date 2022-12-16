const UserModel = require("../models/User.model")
const bcrypt = require("bcrypt")
const { signJwt } = require('../utils/jwt.util');
const SALT = 10;

const MESSAGE_ERROR_EMAIL = 'User already exists.'
const MESSAGE_ERROR_PROVIDE = 'Provide email, password and name'
const MESSAGE_ERROR_LOGIN = 'Incorrect email or password';

const SignUpController = (req, res, next) => {
    const { email, name, surname, password, image } = req.body

    UserModel
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                throw new Error(MESSAGE_ERROR_EMAIL);
            }
            const saltBcrypt = bcrypt.genSaltSync(SALT);
            const hashBcrypt = bcrypt.hashSync(password, saltBcrypt);
            return UserModel.create({ email, password: hashBcrypt, name, surname, image });
        })
        .then(() => {
            res.sendStatus(201)
        })
        .catch((err) => {
            if (err.message === MESSAGE_ERROR_EMAIL) {
                res.status(400).json({ errorMessage: err.message });
            }
            next(err);
        });

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
                res.status(200).json({ token: signJwt(foundUser._id.toString(), foundUser.email, foundUser.role) });
            } else {
                res.status(400).json(MESSAGE_ERROR_LOGIN);
            }
        })
        .catch(next);
}

module.exports = {
    SignUpController,
    LoginController
}