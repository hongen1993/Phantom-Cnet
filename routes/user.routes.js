const router = require('express').Router();
const { validateToken, authorizeRoles } = require("../middleware/validateToken.middleware");

const { ADMIN } = require('../const/user.const');

const { getAllUsers, getUser, getProfile, newTaskcard, editUser, getTaskcard, editTaskcard, deleteTaskcard } = require('../controller/user.controller');

//----------------------------- GET --------------------------------//

router.get('/all',/**authorizeRoles(ADMIN)*/ getAllUsers)

router.get('/:id', /**validateToken,*/ getUser)

router.get('/profile/:id', /**validateToken,*/ getProfile)


router.get('/taskcard/:id', validateToken, getTaskcard)

//----------------------------- POST -------------------------------//

router.post('/newTaskcard', validateToken, newTaskcard)

//----------------------------- PUT --------------------------------//

router.put('/editProfile/:id', validateToken, editUser)

router.put('/editTaskcard/:id', validateToken, editTaskcard)

//----------------------------- DELETE -----------------------------//

router.delete('/:id', validateToken, deleteTaskcard)

module.exports = router