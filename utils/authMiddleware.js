const jwt = require("./jwt.js");



function authUser(req, res, next) {
    if (!req.user) {
        return res.status(401).json({errors: [{msg: "Client not authenticated"}]})
    }

    return next();
};


function isAdmin(req, res, next) {
    if (!req.user.isAdmin) {
        return res.status(401).json({errors: {msg: "Client is not admin"}});
    }

    return next();
};


function addUserToReq(req, res, next) {
    const token = jwt.parseHeaderToken(req);
    if (!token) {
        req.user = null;
        return next();
    }

    const user = jwt.verifyToken(token);
    req.user = user;
    next();
};



module.exports = {
    authUser,
    addUserToReq,
    isAdmin
};