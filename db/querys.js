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



module.exports = {
    findUniqueUser,
    createUser,
    findPosts,
    findUniquePost
};