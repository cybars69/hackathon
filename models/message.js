const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    from_id: String,
    to_id: String,
    message: String,
}, {
    timestamps: {
        createdAt: 'timestamp',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model("message", messageSchema)