const { isValidObjectId } = require('mongoose');
const UserModel = require('../models/User.model');
const ProjectModel = require('../models/Project.model')
const { bcryptEdit } = require('../utils/bcryptEdit');

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
            .then((foundUser) => {
                const user = foundUser
                ProjectModel
                    .find({ user: user.id })
                    .lean()
                    .then((projects) => {
                        res.status(200).json({
                            success: true,
                            results: { projects, user },
                        })
                    })
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const getProfile = (req, res, next) => {
    try {
        const id = req.user._id

        UNVALID_ID(id)

        UserModel
            .findById(id)
            .then((foundUser) => {
                const user = foundUser
                ProjectModel
                    .find({ user: { $in: [user.id] } })
                    .lean()
                    .then((projects) => {
                        res.status(200).json({
                            success: true,
                            results: { projects, user },
                        })
                    })
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const editProfile = (req, res, next) => {
    try {
        const { id } = req.params
        const { email, name, surname, password, image } = req.body

        UNVALID_ID(id)
        bcryptEdit(id, email, name, surname, password, image)
            .then(() => {
                res.sendStatus(204).json({
                    success: true,
                    message: 'User edited succesfully'
                })
            })
            .catch(next)
    }
    catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const deleteUser = (req, res, next) => {
    try {
        const { id } = req.params
        if (!isValidObjectId) {
            throw new Error('Error:Invalid mongo ID')
        }
        UserModel
            .findByIdAndDelete(id)
            .then(() => {
                res.sendStatus(204).json({
                    success: true,
                    message: 'User deleted succesfully'
                })
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }

}

const newProject = (req, res, next) => {
    try {
        const { title, toDo, inProcess, done } = req.body
        const userProfileId = req.user._id;

        UNVALID_ID(userProfileId)

        ProjectModel
            .create({ title, toDo, inProcess, done, user: userProfileId })
            .then(() => {
                res.status(201).json({
                    success: true,
                    message: 'Project created'
                })
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const getProject = (req, res, next) => {
    try {
        const { id } = req.params

        ProjectModel
            .findById(id)
            .then((project) => {
                res.status(200).json({
                    success: true,
                    project
                })
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const editProject = (req, res, next) => {
    try {
        const { id } = req.params
        const { title, toDo, inProcess, done, user } = req.body

        UNVALID_ID(id)

        ProjectModel
            .findByIdAndUpdate(id, { title, toDo, inProcess, done, user })
            .then(() => {
                res.status(204).json({
                    success: true,
                    message: 'Project edited succesfully'
                })
            })
            .catch(next);
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const deleteProject = (req, res, next) => {

    try {
        const { id } = req.params

        UNVALID_ID(id)

        ProjectModel
            .findByIdAndDelete(id)
            .then(() => {
                res.sendStatus(204).json({
                    success: true,
                    message: 'Project deleted succesfully'
                })
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }

}

module.exports = { getAllUsers, getUser, getProfile, editProfile, newProject, deleteUser, getProject, editProject, deleteProject }