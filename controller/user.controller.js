const { isValidObjectId } = require('mongoose');
const UserModel = require('../models/User.model');
const TaskcardModel = require('../models/Taskcard.model')
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
        // const { offset = 0, limit = 12 } = req.query

        UNVALID_ID(id)

        UserModel
            .findById(id)
            .then((foundUser) => {
                const user = foundUser
                TaskcardModel
                    .find({ user: user.id })
                    // .limit(limit)
                    // .skip(limit * offset)
                    // .sort({ createdAt: -1 })
                    .lean()
                    // .then((taskcardsData) => {
                    //     taskcards = taskcardsData
                    //     return TaskcardModel.countDocuments()
                    // })
                    // .then((countedTaskscards) => {
                    //     res.status(200).json({
                    //         success: true,
                    //         results: { taskcards, user },
                    //         page: +offset,
                    //         maxPage: Math.floor(countedTaskscards / +limit),
                    //     })
                    // })
                    .then((taskcards) => {
                        res.status(200).json({
                            success: true,
                            results: { taskcards, user },
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
        // const { offset = 0, limit = 12 } = req.query

        UNVALID_ID(id)

        UserModel
            .findById(id)
            .then((foundUser) => {
                const user = foundUser
                TaskcardModel
                    .find({ user: user.id })
                    // .limit(limit)
                    // .skip(limit * offset)
                    // .sort({ createdAt: -1 })
                    .lean()
                    // .then((taskcardsData) => {
                    //     taskcards = taskcardsData
                    //     return TaskcardModel.countDocuments()
                    // })
                    // .then((countedTaskscards) => {
                    //     res.status(200).json({
                    //         success: true,
                    //         results: { taskcards, user },
                    //         page: +offset,
                    //         maxPage: Math.floor(countedTaskscards / +limit),
                    //     })
                    // })
                    .then((taskcards) => {
                        res.status(200).json({
                            success: true,
                            results: { taskcards, user },
                        })
                    })
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const editUser = (req, res, next) => {
    try {
        const { id } = req.params
        const { email, name, password } = req.query

        UNVALID_ID(id)
        bcryptEdit(id, email, name, password)
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

const newTaskcard = (req, res, next) => {
    try {
        const { title, tasks, } = req.query
        const userProfileId = req.user._id;

        UNVALID_ID(userProfileId)

        TaskcardModel
            .create({ title, tasks, user: userProfileId })
            .then(() => {
                res.status(201).json({
                    success: true,
                    message: 'This route is for create task cards'
                })
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const getTaskcard = (req, res, next) => {
    try {
        const { id } = req.params

        TaskcardModel
            .findById(id)
            .then((taskcard) => {
                res.status(200).json({
                    success: true,
                    taskcard
                })
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const editTaskcard = (req, res, next) => {
    try {
        const { id } = req.params
        const { title, tasks } = req.query

        UNVALID_ID(id)

        TaskcardModel
            .findByIdAndUpdate(id, { title, tasks })
            .then(() => {
                res.status(204).json({
                    success: true,
                    message: 'Edited taskcard succesfully'
                })
            })
            .catch(next);
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }
}

const deleteTaskcard = (req, res, next) => {

    try {
        const { id } = req.params

        UNVALID_ID(id)

        TaskcardModel
            .findByIdAndDelete(id)
            .then(() => {
                res.sendStatus(204).json({
                    success: true,
                    message: 'Taskcard deleted succesfully'
                })
            })
            .catch(next)
    } catch (err) {
        res.status(400).json({ errorMessage: err.message })
    }

}

module.exports = { getAllUsers, getUser, getProfile, newTaskcard, editUser, getTaskcard, editTaskcard, deleteTaskcard }