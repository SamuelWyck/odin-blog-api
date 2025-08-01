const {PrismaClient} = require("../generated/prisma");
const bcrypt = require("bcryptjs");


const prisma = new PrismaClient();
const pwdHash = bcrypt.hashSync(process.argv[4], 10);


async function main() {
    console.log("creating admin...");
    await prisma.user.create({
        data: {
            email: process.argv[2],
            username: process.argv[3],
            password: pwdHash,
            isAdmin: true
        }
    });
    console.log("done");
};

main().then(function() {
    prisma.$disconnect();
});
