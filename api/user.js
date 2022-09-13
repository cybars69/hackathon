const express = require("express")
const router = express.Router()
const authUser = require("../middleware/jwtAuth.js")

const { newAccount, login, testToken } = require("../controllers/user")

router.post("/signup", newAccount)
router.post("/login", login)





router.post("/testToken", authUser, testToken)

module.exports = router