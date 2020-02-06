const config =  require("config");
const jwt =  require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    if(!token) {
        return res.status(401).send("Unauthorized access... no auth token");
    }
    try {
        const decodedToken = jwt.verify(token, config.get("vidly_auth_private_key"));
        next();
    }
    catch(ex) {
        return res.status(400).send("Invalid auth token");
    }
}