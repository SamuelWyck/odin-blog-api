const jwt = require("jsonwebtoken");



function generateToken(user) {
    const token = jwt.sign(
        user, 
        process.env.TOKEN_SECRET,
    );
    return token;
};


function verifyToken(token) {
    const user = jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        function(error, user) {
            if (error) {
                return null;
            }
            return user;
        }
    );

    delete user.iat;
    return user;
};


function parseHeaderToken(req) {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return null;
    }

    const tokenIndex = 1;
    const token = bearerHeader.split(" ")[tokenIndex];
    if (!token) {
        return null;
    }

    return token;
};


module.exports = {
    generateToken,
    verifyToken,
    parseHeaderToken
};