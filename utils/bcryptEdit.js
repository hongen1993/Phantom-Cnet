const bcrypt = require('bcrypt')
const UserModel = require('../models/User.model')
const saltRounds = 10

function bcryptEdit(id, name, surname, email, image, password) {
    if (password) {
        bcrypt
            .genSalt(saltRounds)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) => {
                return UserModel.findByIdAndUpdate(id, { name, surname, email, image, password: hashedPassword }, { new: true })
            })
            .catch((err) => console.log(err))
    }
    else {
        return UserModel.findByIdAndUpdate(id, { name, surname, email, image }, { new: true })
    }
}

module.exports = { bcryptEdit }
