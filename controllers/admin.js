const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const userSchema = require("../models/user")

const listAll = (req, res) => {
    userSchema.find({ role: "Mentee" })
        .select({ _id: 0, password: 0, stress_history: 0, assigned_mentees: 0, __v: 0 })
        .then(response => {
            return res.json({ success: true, message: "Got all unassigned mentees data", data: response })
            // return res.json({ success: true, message: "Got all unassigned mentees data", data: response.filter(mentee => !!!mentee.assigned_mentor) })
        })
        .catch(er => {
            console.log(er)
            return res.json({ success: false, message: "Server error" })
        })
}

const mentorsList = async (req, res) => {
    userSchema.find({ role: "Mentor" })
        .select({ _id: 0, role: 0, password: 0, __v: 0, assigned_mentees: 0, stress_history: 0 })
        .then(response => {
            res.json({ success: true, message: "Got all mentors data", data: response })
        })
}

const mentorData = async (req, res) => {
    const { mentor } = req.params
    userSchema.findOne({ email: mentor + "@iith.ac.in" })
        .select({ _id: 0, role: 0, password: 0, __v: 0, stress_history: 0 })
        .then(response => {
            if (!response)
                return res.json({ success: false, message: "User does not exist" })
            const { assigned_mentees } = response
            userSchema.find({ email: { $in: assigned_mentees } })
                .select({ _id: 0, role: 0, password: 0, __v: 0, assigned_mentees: 0 })
                .then(response2 => {
                    return res.json({ success: true, message: "Got all assigned mentees data", data: response2 })
                })
        })
}

const addMentor = async (req, res) => {
    const { mentor } = req.body
    if (!mentor)
        return res.json({ success: false, message: "Select a user" })

    userSchema.findOneAndUpdate({ email: mentor + "@iith.ac.in" }, { role: "Mentor" })
        .then(response => {
            if (!response)
                return res.json({ success: false, message: "User does not exist" })
            return res.json({ success: true, message: `Given mentor role to ${mentor}` }).send()
        })
}

const remMentor = async (req, res) => {
    const { mentor } = req.body
    if (!mentor)
        return res.json({ success: false, message: "Select a mentor" })

    userSchema.findOneAndUpdate({ email: mentor + "@iith.ac.in" }, { role: "Mentee" })
        .then(response => {
            if (!response)
                return res.json({ success: false, message: "User does not exist" })
            return res.json({ success: true, message: `Removed mentor role from ${mentor}` }).send()
        })
}

const assignMentor = async (req, res) => {
    var { mentee, mentor } = req.body
    if (!mentor || !mentee)
        return res.json({ success: false, message: "Please enter mentor and mentee details" })

    const menteeAssigned = await userSchema.findOne({ email: mentee + "@iith.ac.in" })
    if (menteeAssigned && menteeAssigned.assigned_mentor)
        return res.json({ success: false, message: "Mentee already has a mentor assigned" })

    const isMentor = !!await userSchema.findOne({ email: mentor, role: "Mentor" })
    if (!isMentor)
        return res.json({ success: false, message: "The user is not a mentor" })

    await userSchema.updateOne({ email: mentee + "@iith.ac.in" }, { assigned_mentor: mentor })
    await userSchema.updateOne({ email: mentor }, { $push: { assigned_mentees: mentee + "@iith.ac.in" } })
    return res.json({ success: true, message: `Assigned ${mentee}@iith.ac.in to ${mentor}` })
}

const unassignMentor = async (req, res) => {
    var { mentee } = req.body
    if (!mentee)
        return res.json({ success: false, message: "Please enter mentee details" })

    const menteeData = await userSchema.findOne({ email: mentee + "@iith.ac.in" })

    await userSchema.updateOne({ email: mentee + "@iith.ac.in" }, { assigned_mentor: null })

    userSchema.updateMany({}, { $pull: { assigned_mentees: mentee + "@iith.ac.in" } }).then(response => {
        console.log(response)
        return res.json({ success: true, message: `Unassigned ${mentee}@iith.ac.in from assigned coordinator.` })
    })
}

module.exports = { mentorsList, mentorData, addMentor, remMentor, assignMentor, unassignMentor, listAll }