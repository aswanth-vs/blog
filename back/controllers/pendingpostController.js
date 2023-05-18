const posts = require("../models/postSchema");
const pendingposts = require("../models/pendingpostSchema");
const accounts = require("../models/accountSchema");

exports.createPost = async (req, res) => {
  const {
    author,
    title,
    banner: { name, data },
    content: { text, images },
    tags: tag,
  } = req.body;
  console.log(req.body);
  try {
    const account = await accounts.findOne({ username: author });
    const checkPendingPost = await pendingposts.findOne({ title });
    const checkPost = await pendingposts.findOne({ title });
    if (account) {
      //seeing if the Post Title is already in use or not
      if (checkPendingPost || checkPost) {
        res.status(401).json("Post Title already in use, Please use a different one!");
      } else {
        const date = new Date();
        const post = new pendingposts({
          author,
          date,
          title,
          banner: {
            name,
            data,
          },
          content: {
            text,
            images,
          },
          tags: tag,
        });
        await post.save();
        res.status(200).json("Post created");
      }
    } else {
      res.status(404).json("Account not Found");
    }
  } catch (error) {
    //error
    res.status(401).json(error);
  }
};

exports.getPosts = async (req, res) => {
  try {
    const everypost = await pendingposts.find();
    res.status(200).json(everypost);
  } catch (error) {
    //error
    res.status(401).json(error);
  }
};

exports.viewPost = async (req, res) => {
  const uniqueId = req.params.id;
  try {
    const currentPost = await pendingposts.findOne({ uniqueId });
    res.status(200).json(currentPost);
  } catch (error) {
    //error
    res.status(401).json(error);
  }
};
exports.getUserPosts = async (req, res) => {
  // console.log("Heeee", localStorage.getItem("username"));
  const username = req.params.username;
  try {
    const account = await accounts.findOne({ username });
    if (account) {
      const allUserposts = await pendingposts.find({ author: username });
      res.status(200).json(allUserposts);
    } else {
      res.status(404).json("Account not Found");
    }
  } catch (error) {
    //error
    res.status(401).json(error);
  }
};

exports.deletePost = async (req, res) => {
  const id = req.params.id;
  console.log("ID ", id);

  try {
    const removedPost = await pendingposts.deleteOne({ uniqueId: id });
    if (removedPost) {
      // const allitems = await cartItems.find();
      res.status(200).json("Post Deleted");
    } else {
      res.stats(404).json("Post Not Found");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
