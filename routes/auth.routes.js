const router = require("express").Router()

const { SignUpController, LoginController } = require('../controller/auth.controller');

const { isAuthenticated } = require("../middleware/jwt.middleware.js");


router.post("/signup", SignUpController)
router.post("/login", LoginController)

router.get("/verify", isAuthenticated, (req, res, next) => {
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and is made available on `req.payload`
    // console.log(`req.payload`, req.payload);

    // Send back the token payload object containing the user data
    res.status(200).json(req.payload);
});

module.exports = router;
