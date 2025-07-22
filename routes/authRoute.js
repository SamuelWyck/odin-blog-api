const {Router} = require("express");
const authController = require("../controllers/authController.js");



const authRoute = Router();


authRoute.post("/signip", authController.signUpPost);
authRoute.post("/login", authController.loginPost);



module.exports = authRoute;