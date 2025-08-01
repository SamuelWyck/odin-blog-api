const {Router} = require("express");
const authController = require("../controllers/authController.js");



const authRoute = Router();


authRoute.post("/signup", authController.signUpPost);
authRoute.post("/login", authController.loginPost);
authRoute.get("/valid", authController.validateUserGet);



module.exports = authRoute;