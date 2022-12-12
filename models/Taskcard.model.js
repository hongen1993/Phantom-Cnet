const { Schema, model } = require("mongoose")

const taskcardSchema = new Schema(
    {
        task: {
            type: String,
            default: 'Insert task'
        },
        list: { type: Schema.Types.ObjectId, ref: 'Project' },
    }
)

const TaskcardModel = model('Taskcard', taskcardSchema)

module.exports = TaskcardModel
