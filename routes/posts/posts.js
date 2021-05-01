"use strict";

const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});
const Posts = mongoose.model("post", postSchema);
module.exports = Posts;
module.exports = async (fastify, options) => {
  // FETCH POSTS
  fastify.get("/allposts", async (req, res) => {
    const posts = await Posts.find();
    res.code(200).send({ status: true, data: posts });
  });

  // WRITE POST
  fastify.post("/write", async (req, res) => {
    const { title, author, body } = req.body;
    const newPost = new Posts({
      title,
      author,
      body,
    });
    const post = await newPost.save();
    res.code(200).send(post);
  });
};
