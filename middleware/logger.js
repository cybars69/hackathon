const myLogger = function (req, res, next) {
    console.log("Logged")
    // console.log({ user: req.user, path: req.path })
    next()
}



module.exports = myLogger