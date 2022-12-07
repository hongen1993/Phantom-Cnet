const { isValidObjectId } = require('mongoose');
const UserModel = require('../models/User.model');
const { validateEmail, validatePassword, bcryptEdit } = require('../utils/bcryptEdit');

const UNVALID_ID = (id) => {
    if (!isValidObjectId(id)) {
        throw new Error('Error:Invalid ID')
    }
}

const getAllUsers = (req, res, next) => {
    try {
        const { offset = 0, limit = 12 } = req.query
        let users
        UserModel
            .find()
            .limit(limit)
            .skip(limit * offset)
            .sort({ createdAt: -1 })
            .lean()
            .then((allUsers) => {
                users = allUsers
                return UserModel.countDocuments()
            })
            .then((countedUsers) => {
                res.status(200).json({
                    results: users,
                    page: +offset,
                    maxPage: Math.floor(countedUsers / +limit)
                }
                )
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const getUser = (req, res, next) => {
    try {
        const { id } = req.params

        UNVALID_ID(id)

        UserModel
            .findById(id)
            .then((user) => {
                res.status(200).json(user)
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const editUser = (req, res, next) => {
    try {
        const { id, email, name, password } = req.params

        UNVALID_ID(id)
        validateEmail(email, res)
        validatePassword(password, res)
        bcryptEdit(id, email, name, password, next)
            .then(() => {
                res.redirect(req.get('referer'));
            })
            .then(() => {
                res.sendStatus(204);

            })
    }
    catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

module.exports = { getAllUsers, getUser, editUser }