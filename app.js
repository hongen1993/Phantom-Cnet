require("dotenv").config()

require("./db")

const express = require("express")

const app = express()


require("./config")(app)

require('./routes/index.js')(app)

module.exports = app
