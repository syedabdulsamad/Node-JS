const config =  require("config");
const jwt =  require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    if(!token) {
        return res.status(401).send("Unauthorized access... no auth token");
    }
    try {
        const decodedToken = jwt.verify(token, config.get("vidly_auth_private_key"));
        //console.log("Decoded token: " + decodedToken);

        //console.log("Before Request user : " + req.user);

        req.user = decodedToken;
        //console.log("After Request user : " + req.user);
        next();
    }
    catch(ex) {
        return res.status(400).send("Invalid auth token");
    }
}