const router = require("express").Router()

const { SignUpController, LoginController } = require('../controller/auth.controller')
const { validateToken } = require('../middleware/validateToken.middleware')
//-------------------------POST---------------------//

router.post("/signup", SignUpController)
router.post("/login", LoginController)
router.get("/verify", validateToken, (req, res, next) => {
    res.status(200).json(req.user);
});
module.exports = router