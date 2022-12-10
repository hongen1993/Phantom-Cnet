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

const authorizeRoles = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        res.status(403).json({ errorMessage: 'Not allowed' })
    }
    next()
}

module.exports = { validateToken, authorizeRoles }