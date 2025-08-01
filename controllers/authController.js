const asynchandler = require("express-async-handler");
const {validationResult} = require("express-validator");
const {signupVal} = require("../utils/validator.js");
const bcrypt = require("bcryptjs");
const db = require("../db/querys.js");
const passport = require("../utils/passport.js");
const jwt = require("../utils/jwt.js");



const signUpPost = asynchandler(async function(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        });
    }

    const email = req.body.email.trim();
    const username = req.body.username.trim();
    const pwdHash = await bcrypt.hash(req.body.password, 10);


    try {
        await db.createUser({
            data: {
                email: email,
                username: username,
                password: pwdHash,
                isAdmin: false
            }
        });
    } catch (error) {
        return res.json({errors: [{msg: "Internal Error"}]})
    }

    next();
});


const loginPost = asynchandler(async function(req, res) {
    const authFunction = passport.authenticate(
        "local", 
        function(error, user, msg) {
            if (error) {
                return res.status(500).json({errors: [{msg: "Internal Error"}]});
            }
            if (msg) {
                return res.status(401).json({errors: [msg]});
            }

            req.login(user, {session: false}, function(error) {
                if (error) {
                    return res.send(error);
                }
                const token = jwt.generateToken(user);
                return res.json({user, token});
            });
        }
    );

    authFunction(req, res);
});



module.exports = {
    signUpPost: [
        signupVal,
        signUpPost,
        loginPost
    ],
    loginPost
};