const {PrismaClient} = require("../generated/prisma");
const bcrypt = require("bcryptjs");


const prisma = new PrismaClient();
const pwdHash = bcrypt.hashSync(process.argv[5], 10);


async function main() {
    console.log("creating admin...");
    await prisma.user.create({
        data: {
            firstname: process.argv[2],
            lastname: process.argv[3],
            username: process.argv[4],
            password: pwdHash,
            isAdmin: true
        }
    });
    console.log("done");
};

main().then(function() {
    prisma.$disconnect();
});
