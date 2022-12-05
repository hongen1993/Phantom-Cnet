const router = require('express').Router();
const validateToken = require("../middleware/validateToken.middleware");

// const rolesValidation = require('../middleware/roles.middleware');
// const { ADMIN } = require('../const/user.const');

const { getAllUsers, getUser, editUser } = require('../controller/user.controller');

//----------------------------- GET---------------------------------//

router.get('/all', getAllUsers)

router.get('/profile', validateToken, getUser)

//----------------------------- PUT---------------------------------//

router.put('/edit-profile/:id', validateToken, editUser)

module.exports = router