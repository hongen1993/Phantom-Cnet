const { Schema, model } = require("mongoose")

const taskcardSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            unique: true,
            lowercase: true,
            trim: true,
        },
        tasks: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);
const TaskModel = model("Taskcard", taskcardSchema)

module.exports = TaskModel
