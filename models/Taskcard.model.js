const { Schema, model } = require("mongoose")

const taskcardSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required."],
            trim: true,
            maxLength: [30, 'Title name cant exceed 30 characters']
        },
        tasks: {
            type: String,
            default: 'Insert project task'
        },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const TaskcardModel = model("Taskcard", taskcardSchema)

module.exports = TaskcardModel
