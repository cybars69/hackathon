const myLogger = (req, res, next) => {
    console.log({ path: req.path, user: req.user.user, role: req.user.role })

    next()
}

module.exports = myLogger