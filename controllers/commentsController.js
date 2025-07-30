const asynchandler = require("express-async-handler");
const db = require("../db/querys.js");
const {commentVal} = require("../utils/validator.js");
const {validationResult} = require("express-validator");
const pagination = require("../utils/paginationManager.js");



const newCommentPost = asynchandler(async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const text = req.body.text.trim();
    const userId = req.user.id;
    const postId = req.body.postid;

    await db.createComment({
        data: {
            text: text,
            authorId: userId,
            parentId: postId
        }
    });

    return res.status(201).json({data: "Success"});
});


const editCommentPut = asynchandler(async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const text = req.body.text.trim();
    const userId = req.user.id;
    const postId = req.body.postid;
    const commentId = req.params.commentId;

    await db.editComment({
        where: {
            id: commentId,
            authorId: userId,
            parentId: postId
        },
        data: {
            text: text,
        }
    });

    return res.json({data: "Success"});
});


const deleteCommentDelete = asynchandler(async function(req, res) {
    const commentId = req.params.commentId;
    const userId = req.user.id;

    await db.deleteComment({
        where: {
            id: commentId,
            authorId: userId
        }
    });

    return res.json({data: "Success"});
});


const getCommentsGet = asynchandler(async function(req, res) {
    const pageNumber = (req.query.pageNumber) ?
        Number(req.query.pageNumber) : 0;
    const {postId} = req.params;
    
    const comments = await db.findComments({
        take: pagination.commentTakeNumber,
        skip: pagination.calcCmtSkipNumber(pageNumber),
        where: {
            parentId: postId
        },
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
    });

    return res.json({user: req.user, comments});
});



module.exports = {
    newCommentPost: [
        commentVal,
        newCommentPost
    ],
    editCommentPut: [
        commentVal,
        editCommentPut
    ],
    deleteCommentDelete,
    getCommentsGet
};