const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/querys.js");
const bcrypt = require("bcryptjs");


passport.use(
    new LocalStrategy(async function(username, password, done) {
        const errorMessage = "Incorrect username or password";

        try {
            const user = await db.findUniqueUser({
                where: {
                    username: username
                }
            });

            if (!user) {
                return done(null, false, {msg: errorMessage});
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return done(null, false, {msg: errorMessage});
            }

            delete user.password;
            return done(null, user);

        } catch (error) {
            return done(error);
        }
    })
);


module.exports = passport;