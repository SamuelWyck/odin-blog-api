const {Router} = require("express");
const postsController = require("../controllers/postsController.js");



const postsRoute = Router();


postsRoute.get("/", postsController.allPostsGet);
postsRoute.get("/:postId", postsController.postGet);



module.exports = postsRoute;