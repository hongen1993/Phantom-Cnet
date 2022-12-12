const { Schema, model } = require("mongoose")

const projectsSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required."],
            trim: true,
            maxLength: [30, 'Title name cant exceed 30 characters']
        },
        listA: [{
            type: String,
            default: 'To do'
        }],
        listB: [{
            type: String,
            default: 'In process'
        }],
        listC: [{
            type: String,
            default: 'Done'
        }],
        user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ProjectModel = model("Project", projectsSchema)

module.exports = ProjectModel
