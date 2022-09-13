const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    role: {
        type: String,
        enum: ['Mentee', 'Mentor', 'Admin'],
        default: "Mentee"
    },
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    assigned_mentees: { type: [String], default: [] },
    assigned_mentor: { type: String },
    stress_history: { type: [String], default: [] },
})

module.exports = mongoose.model("User", userSchema)