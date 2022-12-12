const router = require('express').Router();
const { validateToken, authorizeRoles } = require("../middleware/validateToken.middleware");

const { ADMIN } = require('../const/user.const');

const { getAllUsers, getUser, getProfile, editUser, deleteUser, getProject, newProject, editProject, deleteProject } = require('../controller/user.controller');

//----------------------------- GET --------------------------------//

router.get('/all',/**authorizeRoles(ADMIN)*/ getAllUsers)

router.get('/:id', /**validateToken,*/ getUser)

router.get('/profile/:id', /**validateToken,*/ getProfile)

router.get('/project/:id', validateToken, getProject)

//----------------------------- POST -------------------------------//

router.post('/newProject', /*validateToken,*/ newProject)

//----------------------------- PUT --------------------------------//

router.put('/editProfile/:id', validateToken, editUser)

router.put('/editProject/:id', validateToken, editProject)

//----------------------------- DELETE -----------------------------//

router.delete('/:id', /*validateToken,*/ deleteUser)
router.delete('/project/:id', /*validateToken,*/ deleteProject)

module.exports = router