const asynchandler = require("express-async-handler");
const db = require("../db/querys.js");
const {validationResult} = require("express-validator");
const {postVal} = require("../utils/validator.js");



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
            author: {
                select: {
                    username: true
                }
            }
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
                    author: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        }
    });

    return res.json({user: req.user, post});
});


const adminNewPostPost = asynchandler(async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const authorId = req.user.id;
    const title = req.body.title.trim();
    const text = req.body.text.trim();

    await db.createPost({
        data: {
            authorId: authorId,
            title: title,
            text: text
        }
    });

    return res.status(201).json({data: "Success"});
});


const adminEditPostPut = asynchandler(async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const postId = req.params.postId;
    const authorId = req.user.id;
    const text = req.body.text.trim();
    const title = req.body.title.trim();

    await db.editPost({
        where: {
            id: postId,
            authorId: authorId
        },
        data: {
            text: text,
            title: title
        }
    });

    return res.json({data: "Success"});
});


const adminDeletePostDelete = asynchandler(async function(req, res) {
    const postId = req.params.postId;
    const authorId = req.user.id;

    await db.deletePost({
        where: {
            id: postId,
            authorId: authorId
        }
    });

    return res.json({data: "Success"});
});


const adminDeleteCommentDelete = asynchandler(async function(req, res) {
    const commentId = req.params.commentId;

    await db.deleteComment({
        where: {
            id: commentId
        }
    });

    return res.json({data: "Success"});
});



module.exports = {
    adminPostsGet,
    adminPostGet,
    adminNewPostPost: [
        postVal,
        adminNewPostPost
    ],
    adminEditPostPut: [
        postVal,
        adminEditPostPut
    ],
    adminDeletePostDelete,
    adminDeleteCommentDelete
};