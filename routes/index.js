module.exports = (app) => {
    app.use("/api", require("./index.routes"))
    app.use("/auth", require("./auth.routes"))
    app.use('/user', require('./user.routes'))
}
