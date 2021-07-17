const router = require('express').Router();
const{
    createUser,
    getAllUsers,
    getUserId,
    addFriend,
    removeFriend,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');
//get all users
router.route('/').get(getAllUsers).post(createUser);
//add user / delete user
router.route('/:id').get(getUserId).put(updateUser).delete(deleteUser);
//friend add / remove
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;