const jwt = require("./jwt.js");



function authUser(req, res, next) {
    if (!req.user) {
        return res.status(401).json({errors: [{msg: "Client not "}]})
    }

    req.user = user;
    next();
};


function addUserToReq(req, res, next) {
    const token = jwt.parseHeaderToken(req);
    if (!token) {
        return next();
    }

    const user = jwt.verifyToken(token);
    req.user = user;
    next();
};



module.exports = {
    authUser,
    addUserToReq
};