const TaskModel = require('../models/Taskcard.model')

const newTaskcard = (req, res, next) => {

    const { title, tasks } = req.query
    console.log('hello', { title, tasks });

    TaskModel
        .create({ title, tasks })
        .then(() => {
            res.status(201).json({
                success: true,
                message: 'This route is for create task cards'
            })
        })
        .catch(next);

}

const getTaskcards = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'This route will get all taskCards in database'
    })
}
module.exports = { newTaskcard, getTaskcards }