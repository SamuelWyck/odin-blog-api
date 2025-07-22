const express = require("express");
require("dotenv").config();
const passport = require("./utils/passport.js");
const path = require("node:path");
const {addUserToReq} = require("./utils/authMiddleware.js");
const authRoute = require("./routes/authRoute.js");
const postsRoute = require("./routes/postsRoute.js");



app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(passport.initialize());

app.use(addUserToReq);

app.use("/auth", authRoute);
app.use("/posts", postsRoute);
app.get("/", function(req, res) {
    return res.send(`hello ${req.user}`);
});


const PORT = process.env.PORT;


app.listen(PORT, function() {console.log(`Server running on port ${PORT}!`)});