const jwt = require("jsonwebtoken")
const userSchema = require("../models/user")

const authUser = (req, res, next) => {
    var authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null || token === "null" || !token) {
        return res.json({ success: false, status: 40, message: "No authorization present" }).send()
    } else

        jwt.verify(token, process.env.JWT_KEY, async (err, user) => {
            if (err) {
                console.log(err)
                return res.json({ success: false, message: "Invalid Session" }).send()
            }
            if (!user) return res.json({ success: false, message: "Unauthorized" })

            if (user.iat < Date.now() / 1000 - 360000)
                //ORINGAL if (user.iat < Date.now() / 1000 - 3600)
                return res.json({ success: false, message: "Session expired" })


            const fromDb = await userSchema.findOne({ email: user.user }).select({ role: 1, assigned_mentees: 1, stress_history: 1, _id: 0 })

            req.user = { user: user.user, ...fromDb._doc }
            next()
        })
}

module.exports = authUser