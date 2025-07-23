const express = require("express");
const cors = require("cors");
require("dotenv").config();
const passport = require("./utils/passport.js");
const path = require("node:path");
const {addUserToReq} = require("./utils/authMiddleware.js");
const authRoute = require("./routes/authRoute.js");
const postsRoute = require("./routes/postsRoute.js");
const adminRoute = require("./routes/adminRoute.js");
const commentsRoute = require("./routes/commentsRoute.js");



app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(passport.initialize());

app.use(addUserToReq);

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);

app.use(function(req, res) {
    return res.json({errors: [{msg: "Invalid route"}]});
});

app.use(function(error, req, res, next) {
    return res.json({errors: [{msg: "Internal error"}], errorInfo: error});
});


const PORT = process.env.PORT;


app.listen(PORT, function() {console.log(`Server running on port ${PORT}!`)});