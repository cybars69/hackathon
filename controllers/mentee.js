const userSchema = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const messageSchema = require("../models/message")

const userGraph = async (req, res) => {
    const { stress_history } = req.user

    return res.json({ success: true, mesage: "Fetched stress history.", data: stress_history }).send()
}

// const fillSurvey = async (req, res) => {
//     const data = req.body

// }



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

    messageSchema.find({ $or: [{ from_id: user }, { to_id: user }] })
        .select({ _id: 0, updated_at: 0, __v: 0 })
        .then(response => {
            return res.json({ success: true, mesage: "Fetched Chat History.", data: response }).send()
        })
}

module.exports = { userGraph, chatHistory, newMessage }