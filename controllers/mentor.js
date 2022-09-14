const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const messageSchema = require("../models/message")
const userSchema = require("../models/user")

const mentorDash = async (req, res) => {
    const { user, assigned_mentees } = req.user

    userSchema.find({ email: { $in: assigned_mentees } })
        .select({ _id: 0, role: 0, password: 0, __v: 0, assigned_mentees: 0 })
        .then(response => {
            console.log(response)
            res.json({ success: true, message: "Got all assigned mentees data", data: response })
        })
}

const newMessage = async (req, res) => {
    const { mentee } = req.params
    const { assigned_mentees } = req.user

    const { message } = req.body

    if (!assigned_mentees.includes(mentee + "@iith.ac.in"))
        return res.json({ success: false, message: "You do not have access" })

    const newMessage = new messageSchema({ from_id: "Mentor", to_id: mentee + "@iith.ac.in", message })

    newMessage.save().then(response => {
        console.log(response)
        res.send("ok")
    })
}

const chatHistory = async (req, res) => {
    const { mentee } = req.params
    const { assigned_mentees } = req.user

    const { message } = req.body

    if (!assigned_mentees.includes(mentee + "@iith.ac.in"))
        return res.json({ success: false, message: "You do not have access" })

    messageSchema.find({ $or: [{ from_id: mentee + "@iith.ac.in" }, { to_id: mentee + "@iith.ac.in" }] })
        .select({ _id: 0, updated_at: 0, __v: 0 })
        .then(response => {
            return res.json({ success: true, mesage: "Fetched Chat History.", data: response }).send()
        })
}

module.exports = { mentorDash, newMessage, chatHistory }