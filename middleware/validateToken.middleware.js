const jwt = require('jsonwebtoken')

const { deleteBearer } = require('../utils/string.util')

const validateToken = (req, res, next) => {
    const { authorization } = req.headers

    if (authorization) {
        const token = deleteBearer(authorization)
        const verifyJwt = (token) => {
            return jwt.verify(token, process.env.TOKEN_SECRET)
        }
        const { sub, email } = verifyJwt(token)

        req.user = { _id: sub, email }
    } else {
        res.sendStatus(401)
        return
    }

    next()
}

module.exports = validateToken
