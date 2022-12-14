const { Schema, model } = require("mongoose")

const projectsSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: [30, 'Title name cant exceed 30 characters'],
            default: 'Insert project title'
        },
        toDo: {
            type: [String],
            default: 'Insert task'
        },
        inProcess: {
            type: [String],
        },
        done: {
            type: [String],
        },
        user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ProjectModel = model("Project", projectsSchema)

module.exports = ProjectModel
