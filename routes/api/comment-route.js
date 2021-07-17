const router = require('express').Router();
const {
    createComment,
    updateComment,
    deleteComment,
    getCommentId,
    getComments,
    reactionAdd,
    reactionDelete,
} = require("../../controllers/commentController");
//find all comments and create 1
router.route('/').get(getComments).post(createComment);
//find 1 comment and update or delete it.
router.route('/:id').get(getCommentId).put(updateComment).delete(deleteComment);
//add / remove reactions.
router.route('/:commentId/reactions').post(reactionAdd).delete(reactionDelete);

module.exports = router;