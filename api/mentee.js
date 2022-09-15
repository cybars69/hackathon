const express = require("express")
const router = express.Router()

const { userGraph, chatHistory, newMessage, predictStress } = require("../controllers/mentee")

router.post("/graph", userGraph)
router.post("/chat", chatHistory)
router.post("/newMessage", newMessage)
router.post('/predictStress', predictStress)


module.exports = router