const asynchandler = require("express-async-handler");
const db = require("../db/querys.js");



const allPostsGet = asynchandler(async function(req, res) {
    const posts = await db.findPosts({
        where: {
            posted: true
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

    return res.json({user: req.user, posts})
});


const postGet = asynchandler(async function(req, res) {
    const postId = req.params.postId;

    const post = await db.findUniquePost({
        where: {
            id: postId
        },
        include: {
            comments: {
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
            },
            author: {
                select: {
                    username: true
                }
            }
        }
    });

    return res.json({user: req.user, post});
});



module.exports = {
    allPostsGet,
    postGet
};