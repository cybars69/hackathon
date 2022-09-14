const express = require("express")
const router = express.Router()

const { mentorDash, newMessage, chatHistory } = require("../controllers/mentor")

router.post("/dash", mentorDash)
// router.post("/graph", userGraph)
router.post("/chat/new/:mentee", newMessage)
router.post("/chat/:mentee", chatHistory)
// router.post("/newMessage", newMessage)


module.exports = router