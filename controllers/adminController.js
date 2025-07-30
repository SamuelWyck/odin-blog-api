const asynchandler = require("express-async-handler");
const db = require("../db/querys.js");
const {validationResult} = require("express-validator");
const {postVal} = require("../utils/validator.js");
const pagination = require("../utils/paginationManager.js");



const adminPostsGet = asynchandler(async function(req, res) {
    const userId = req.user.id;
    const pageNumber = (req.query.pageNumber) ?
        req.query.pageNumber : 0;

    const posts = await db.findPosts({
        skip: pagination.calcPostSkipNumber(pageNumber),
        take: pagination.postTakeNumber,
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
    const pageNumber = 0;


    const post = await db.findUniquePost({
        where: {
            id: postId,
            authorId: userId
        },
        include: {
            author: {
                select: {
                    username: true
                }
            },
            comments: {
                take: pagination.commentTakeNumber,
                skip: pagination.calcCmtSkipNumber(pageNumber),
                include: {
                    author: {
                        select: {
                            username: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
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
    const preview = req.body.preview.trim();
    const published = (req.body.published) ? true : false;

    await db.createPost({
        data: {
            authorId: authorId,
            title: title,
            text: text,
            preview: preview,
            posted: published
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
    const preview = req.body.preview.trim();
    const published = (req.body.published) ? true : false;

    await db.editPost({
        where: {
            id: postId,
            authorId: authorId
        },
        data: {
            text: text,
            title: title,
            preview: preview,
            posted: published
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


const adminGetApiKeyGet = asynchandler(async function(req, res) {
    return res.json({
        key: process.env.EDITOR_API_KEY,
        user: req.user
    });
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
    adminDeleteCommentDelete,
    adminGetApiKeyGet
};