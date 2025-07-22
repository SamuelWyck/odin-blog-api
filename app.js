const express = require("express");
require("dotenv").config();



app = express();


app.get("/", function(req, res) {
    return res.send(`hello ${req.user}`);
});


const PORT = process.env.PORT;


app.listen(PORT, function() {console.log(`Server running on port ${PORT}!`)});