const config =  require("config");
const winston =  require("winston");
module.exports = function () {


    if(!config.get("vidly_auth_private_key")) {
        winston.error("Authorization key not found... EXITING app...");
        throw new Error("Authorization key not found... EXITING app...");
    }
}