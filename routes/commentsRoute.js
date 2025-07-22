const {Router} = require("express");
const commentsController = require("../controllers/commentsController.js");
const {authUser} = require("../utils/authMiddleware.js");



const commentsRoute = Router();


commentsRoute.use(authUser);

commentsRoute.post("/new", commentsController.newCommentPost);
commentsRoute.put("/edit/:commentId", commentsController.editCommentPut);
commentsRoute.delete("/delete/:commentId", commentsController.deleteCommentDelete);



module.exports = commentsRoute;