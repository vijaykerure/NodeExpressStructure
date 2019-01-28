const JWT = require('jsonwebtoken');
const config = require('../config').get(process.env.NODE_ENV);
module.exports = {
    signToken: user => {
        return JWT.sign({
            iss: "NodeExpressStruc",
            sub: user.id,
            iat: new Date().getTime(), // Current Time
            exp: new Date().setTime(new Date().getTime() + 1) // Current Time + 1 day ahead
        }, config.JWT_SECRET);
    }
}