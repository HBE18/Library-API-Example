import express from "express";

const actionRouter = express.Router({mergeParams:true});

actionRouter
.route("/borrow/:bookId")
.post();

actionRouter
.route("/return/:bookId")
.post();

export default actionRouter;