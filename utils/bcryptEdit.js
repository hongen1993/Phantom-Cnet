const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserModel = require('../models/User.model')
const saltRounds = 10

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

function validateEmail(email, res) {
    if (email === "" || !emailRegex.test(email)) {
        res.status(400).json({
            errorMessage: 'Provide a valid email address.'
        })
        return
    }
}

function validatePassword(password, res) {
    if (!passwordRegex.test(password)) {
        res.status(400).json({
            errorMessage:
                "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
        })
        return
    }
}

function bcryptEdit(id, email, name, password, req, next) {
    if (password) {
        bcrypt
            .genSalt(saltRounds)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) => {
                return UserModel.findByIdAndUpdate(id, { email, name, password: hashedPassword }, { new: true })
            })
            .catch(next)
    } else {
        return UserModel.findByIdAndUpdate(id, { email, name }, { new: true })
    }
}

function catchError(error, res, next) {
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).json({ errorMessage: error.message })
    } else if (error.code === 11000) {
        res.status(500).json({ errorMessage: 'Provided email already taken' })
    } else {
        next(error)
    }
}

module.exports = { validateEmail, validatePassword, bcryptEdit, catchError }
