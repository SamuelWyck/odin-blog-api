const asynchandler = require("express-async-handler");
const db = require("../db/querys.js");



const newCommentPost = asynchandler(async function(req, res) {

});


const editCommentPut = asynchandler(async function(req, res) {

});


const deleteCommentDelete = asynchandler(async function(req, res) {

});



module.exports = {
    newCommentPost,
    editCommentPut,
    deleteCommentDelete
};