const { Schema, model } = require("mongoose")
const { ENUM_ROLES, USER } = require('../const/user.const');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    taskCard: [{
      title: {
        type: String,
        required: true
      },
      tasks: {
        type: String,
      }
    }],
    role: {
      type: String,
      enum: ENUM_ROLES,
      trim: true,
      default: USER
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const UserModel = model("User", userSchema)

module.exports = UserModel
