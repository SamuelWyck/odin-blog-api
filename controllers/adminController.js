const asynchandler = require("express-async-handler");
const db = require("../db/querys.js");



const adminPostsGet = asynchandler(async function(req, res) {
    const userId = req.user.id;

    const posts = await db.findPosts({
        where: {
            authorId: userId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: true
        }
    });

    return res.json({user: req.user, posts});
});



const adminPostGet = asynchandler(async function(req, res) {
    const userId = req.user.id;
    const postId = req.params.postId;


    const post = await db.findUniquePost({
        where: {
            id: postId,
            authorId: userId
        },
        include: {
            author: true,
            comments: {
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    author: true
                }
            }
        }
    });

    return res.json({user: req.user, post});
});


const adminEditPostPut = asynchandler(async function(req, res) {
    
});


const adminDeletePostDelete = asynchandler(async function(req, res) {

});


const adminNewPostPost = asynchandler(async function(req, res) {

});


const adminDeleteCommentDelete = asynchandler(async function(req, res) {

});



module.exports = {
    adminPostsGet,
    adminPostGet,
    adminEditPostPut,
    adminNewPostPost,
    adminDeletePostDelete,
    adminDeleteCommentDelete
};