const router = require('express').Router();
const commentRoute = require('./comment-route')
const userRoute = require('./user-route');

router.use('/comments', commentRoute);
router.use('/user', userRoute);

module.exports = router;

