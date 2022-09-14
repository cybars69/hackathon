module.exports = (req, res, next) => {
    const { role } = req.user
    if (role !== "Admin")
        return res.json({ success: false, message: "You do not have access" })

    next()
}