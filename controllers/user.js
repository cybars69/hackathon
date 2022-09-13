const userSchema = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const newAccount = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    const existing = await userSchema.findOne({ email })

    if (existing)
        return res.json({ success: false, message: "Email already exists" })

    const hashedPwd = await bcrypt.hash(password || "testPassword", 10)

    const newUser = new userSchema({ first_name, last_name, email, password: hashedPwd })
    newUser.save().then(response => {
        return res.json({ success: true, message: "Successfully created account" })
    }).catch(err => {
        console.log(err)
        return res.json({ success: false, message: "Server error" })
    })
}

const login = async (req, res) => {
    const { email, password } = req.body
    const existing = await userSchema.findOne({ email })

    if (!existing)
        return res.json({ success: false, message: "Incorrect email/password" })

    const credentialsCorrect = await bcrypt.compare(password, existing.password)
    if (!credentialsCorrect) {
        return res.json({ success: false, message: "Incorrect email/password" })
    }

    const token = jwt.sign({ user: existing.email }, process.env.JWT_KEY);
    return res.json({ success: true, message: "Successfully logged In", token: token })
}









const testToken = async (req, res) => {
    const user = req.user
    console.log(user)
    return res.send("ok")
}

module.exports = { newAccount, login, testToken }