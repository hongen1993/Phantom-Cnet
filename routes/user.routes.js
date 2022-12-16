const router = require('express').Router();
const { validateToken, authorizeRoles } = require("../middleware/validateToken.middleware");

const { ADMIN } = require('../const/user.const');

const { getAllUsers, getUser, getProfile, editProfile, deleteUser, getProject, newProject, editProject, deleteProject } = require('../controller/user.controller');

//----------------------------- GET --------------------------------//

router.get('/all', validateToken, /*authorizeRoles(ADMIN),*/ getAllUsers)

router.get('/:id', validateToken, /*authorizeRoles(ADMIN),*/ getUser)

router.get('/profile/:id', validateToken, getProfile)

router.get('/project/:id', validateToken, getProject)

//----------------------------- POST -------------------------------//

router.post('/newProject', validateToken, newProject)

//----------------------------- PUT --------------------------------//

router.put('/editProfile/:id', validateToken, editProfile)

router.put('/editProject/:id', validateToken, editProject)

//----------------------------- DELETE -----------------------------//

router.delete('/:id', validateToken, deleteUser)
router.delete('/project/:id', validateToken, deleteProject)

module.exports = router