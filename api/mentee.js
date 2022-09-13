const express = require("express")
const router = express.Router()

const { userGraph, chatHistory, newMessage } = require("../controllers/mentee")

router.post("/graph", userGraph)
router.post("/chat", chatHistory)
router.post("/newMessage", newMessage)


module.exports = router