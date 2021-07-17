const { User, Comment } = require("../models");

const commentController = {
  getComments(req, res) {
    Comment.find({})
      .select("-__v")
      .then((dbSocialComments) => res.json(dbSocialComments))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  getCommentId({ params }, res) {
    Comment.findOne({ _id: params.id })
      .then((dbSocialComments) => {
        if (!dbSocialComments) {
          res.status(404).json({ message: "There was 0 comments with this ID." });
          return;
        }
        res.json(dbSocialComments);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createComment({ body }, res) {
    console.log(body);
    Comment.create(body)
      .then((CommentData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { Comments: CommentData._id } },
          { new: true }
        );
      })
      .then((dbSocialUsers) => {
        if (!dbSocialUsers) {
          res
            .status(404)
            .json({ message: "There was 0 comments with this ID." });
          return;
        }
        res.json(dbSocialUsers);
      })
      .catch((err) => res.json(err));
  },

  //update Comment by id
  updateComment({ params, body }, res) {
    Comment.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbSocialComments) => {
        if (!dbSocialComments) {
          res
            .status(404)
            .json({ message: "There was 0 comments with this ID." });
          return;
        }
        res.json(dbSocialComments);
      })
      .catch((err) => res.status(400).json(err));
  },

  // deleteComment
  deleteComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.id })
      .then((dbSocialComments) => {
        if (!dbSocialComments) {
          res
            .status(404)
            .json({ message: "There was 0 comments with this ID." });
          return;
        }
        res.json(dbSocialComments);
      })
      .catch((err) => res.status(400).json(err));
  },

  // add a Reaction
  reactionAdd({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((dbSocialComments) => {
        if (!dbSocialComments) {
          res.status(404).json({ message: "There was 0 comments with this ID." });
          return;
        }
        res.json(dbSocialComments);
      }).catch((err) => res.json(err));
  },

  reactionDelete({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbSocialComments) => res.json(dbSocialComments))
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;