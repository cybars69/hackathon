const userSchema = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const messageSchema = require("../models/message")

const userGraph = async (req, res) => {
    const { stress_history } = req.user

    return res.json({ success: true, mesage: "Fetched stress history.", data: stress_history }).send()
}

const newMessage = async (req, res) => {
    const { user, assigned_mentor } = req.user
    const { message } = req.body

    const newMessage = new messageSchema({ from_id: user, to_id: "Mentor", message })
    newMessage.save().then(response => {
        console.log(response)
        res.send("ok")
    })
}

const chatHistory = async (req, res) => {
    const { user } = req.user
    console.log(user)

    messageSchema.find({ $or: [{ from_id: user }, { to_id: user }] }).then(response => {
        console.log(response)

        res.send("okay")
    })
    // message.find({ $and: [{ $or: [{ title: regex }, { description: regex }] }] })
}

module.exports = { userGraph, chatHistory, newMessage }