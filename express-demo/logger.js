function log(req, res, next) {
    console.log("Logging the request");
    next();
}

module.exports = log;