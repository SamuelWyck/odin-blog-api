const {body} = require("express-validator");
const db = require("../db/querys.js");



async function isUniqueUsername(username) {
    const user = await db.findUniqueUser({
        where: {
            username: username
        }
    });

    if (user) {
        throw new Error();
    }

    return true;
};


function passwordsMatch(confirmPwd, {req}) {
    return confirmPwd === req.body.password;
};



const signupVal = [
    body("username").trim()
        .notEmpty().withMessage("Username must not be empty")
        .matches(/^[^\s]+$/).withMessage("Username must not contain spaces")
        .matches(/[^\d]/).withMessage("Username must contain at least one letter")
        .custom(isUniqueUsername).withMessage("Username is not unique"),
    body("firstname").trim()
        .notEmpty().withMessage("First name must not be empty"),
    body("lastname").trim()
        .notEmpty().withMessage("Last name must not be empty"),
    body("confirm")
        .notEmpty().withMessage("Password must not be empty")
        .custom(passwordsMatch).withMessage("Passwords do not match")
];


const commentVal = [
    body("text").trim()
        .notEmpty().withMessage("Comment must not be empty")
        .isLength({max: 10000}).withMessage("Comment must be less than 10000 characters")
];


const postVal = [
    body("title").trim()
        .notEmpty().withMessage("Title must not be empty")
        .isLength({max: 200}).withMessage("Title cannot be longer than 200 characters"),
    body("text").trim()
        .notEmpty().withMessage("Post cannot be empty"),
    body("preview").trim()
        .notEmpty().withMessage("Preview cannot be empty")
        .isLength({max: 100}).withMessage("Preview cannot be longer than 100 characters")
];



module.exports = {
    signupVal,
    commentVal,
    postVal
};