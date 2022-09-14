const express = require("express")
const router = express.Router()
const isMentor = require("../middleware/adminAuth")

const { mentorsList, mentorData, addMentor, remMentor, assignMentor, unassignMentor, listAll } = require("../controllers/admin")

router.use(isMentor)

router.post("/mentors", mentorsList)
router.post("/mentor/add", addMentor)
router.post("/mentor/del", remMentor)
router.post("/mentor/assign", assignMentor)
router.post("/mentor/unassign", unassignMentor)
router.post("/mentor/:mentor", mentorData)
router.post("/mentees", listAll)
// router.post("/chat/new/:mentee", newMessage)
// router.post("/chat/:mentee", chatHistory)
// router.post("/newMessage", newMessage)


module.exports = router