const {Router} = require("express");
const adminController = require("../controllers/adminController.js");
const {isAdmin, authUser} = require("../utils/authMiddleware.js");



const adminRoute = Router();


adminRoute.use(authUser);
adminRoute.use(isAdmin);

adminRoute.get("/posts", adminController.adminPostsGet);
adminRoute.get("/posts/:postId", adminController.adminPostGet);
adminRoute.post("/posts/new", adminController.adminNewPostPost);
adminRoute.put("/posts/edit/:postId", adminController.adminEditPostPut);
adminRoute.delete("/posts/delete/:postId", adminController.adminDeletePostDelete);
adminRoute.delete("/comments/delete/:commentId", adminController.adminDeleteCommentDelete);
adminRoute.get("/apikey", adminController.adminGetApiKeyGet);



module.exports = adminRoute;