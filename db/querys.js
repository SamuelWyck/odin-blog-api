const {PrismaClient} = require("../generated/prisma");



const prisma = new PrismaClient();


async function findUniqueUser(options) {
    const user = await prisma.user.findUnique(options);
    return user;
};

async function createUser(options) {
    await prisma.user.create(options);
};

async function findPosts(options) {
    const posts = await prisma.post.findMany(options);
    return posts;
};

async function findUniquePost(options) {
    const post = await prisma.post.findUnique(options);
    return post;
};

async function createComment(options) {
    await prisma.comment.create(options);
};

async function editComment(options) {
    await prisma.comment.update(options);
};

async function deleteComment(options) {
    await prisma.comment.delete(options);
};

async function createPost(options) {
    await prisma.post.create(options);
};

async function editPost(options) {
    await prisma.post.update(options);
};

async function deletePost(options) {
    await prisma.post.delete(options);
};



module.exports = {
    findUniqueUser,
    createUser,
    findPosts,
    findUniquePost,
    createComment,
    editComment,
    deleteComment,
    createPost,
    editPost,
    deletePost
};