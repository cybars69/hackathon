const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    user: String,
    data: String
}, {
    timestamps: true
})

module.exports = mongoose.model("message", messageSchema)