const { verifyJwt } = require('../utils/jwt.util')
const { deleteBearer } = require('../utils/string.util')

const validateToken = (req, res, next) => {
    const { authorization } = req.headers

    if (authorization) {
        const token = deleteBearer(authorization)
        const { sub, email, role } = verifyJwt(token)

        req.user = { _id: sub, email, role, getToken: token }

    } else {
        res.sendStatus(401)
        return
    }
    next()
}

const authorizeRoles = (role) => (req, res, next) => {

    if (role !== (req.user.role)) {
        res.status(403).json({ errorMessage: 'Not allowed' })
    } else {
        next()
    }
}

module.exports = { validateToken, authorizeRoles }