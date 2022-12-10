const { Schema, model } = require("mongoose")
const { ENUM_ROLES, USER } = require('../const/user.const');
const validator = require('validator')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      maxLength: [30, ' your email cannot exceed 30 characters'],
      validate: [validator.isEmail, 'Please enter valid email address']
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: [6, 'Your password must be longer than 6 characters']
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String
      }
    },
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
