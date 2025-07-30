const {Router} = require("express");
const commentsController = require("../controllers/commentsController.js");
const {authUser} = require("../utils/authMiddleware.js");



const commentsRoute = Router();


commentsRoute.post("/new", authUser, commentsController.newCommentPost);
commentsRoute.put("/edit/:commentId", authUser, commentsController.editCommentPut);
commentsRoute.delete("/delete/:commentId", authUser, commentsController.deleteCommentDelete);
commentsRoute.get("/:postId", commentsController.getCommentsGet);



module.exports = commentsRoute;