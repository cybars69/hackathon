require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
const authUser = require("./middleware/jwtAuth.js")
// const logger = require("./middleware/logger")
const app = express()

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to db'))

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())
app.use(cors());
// app.use(logger());

app.use("/api/user", require("./api/user"))
app.use("/api/mentee", authUser, require("./api/mentee"))
app.use("/api/mentor", authUser, require("./api/mentor"))
app.use("/api/admin", authUser, require("./api/admin"))

app.use("*", (req, res) => res.status(404).json({ success: false, message: "Wrong place my friend" }).send())

const PORT = process.env.port || 4000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))