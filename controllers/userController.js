const {User} = require('../models');
const userController = {
    getAllUsers(req, res){
        User.find({})
        .populate({
            path: 'comment',
            select: '-__v',
        })
        .select('-__v')
        .sort({_id: -1})
        .then((dbSocialUsers) => res.json(dbSocialUsers))
        .catch((err) =>{
            console.log(err); res.status(400).json(err);
        });
    },

    getUserId({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'comment',
            select: '-__v',
        })
        .select('-__v')
        .then((dbSocialUsers)=>{
            if(!dbSocialUsers){
                res.status(404).json({ message: 'There was 0 users found with this ID.'});
                return;
            }
            res.json(dbSocialUsers);
        })
        .catch((err) =>{
            console.log(err);
            res.status(400).json(err);
        });
    },
    createUser({body}, res){
        User.create(body)
        .then((dbSocialUsers)=> res.json(dbSocialUsers))
        .catch((err)=> res.status(400).json(err));
    },
    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
        .then((dbSocialUsers)=> {
            if(!dbSocialUsers){
                res.status(404).json({message: 'There was 0 users found with this ID.'});
                return;
            }
            res.json(dbSocialUsers);
        }) .catch((err)=>res.status(400).json(err));
    },
    updateUser({params, body}, res){
        user.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then((dbSocialUsers)=>{
            res.status(404).json({message: 'There was 0 users found with this ID.'});
            return;

        })
        .catch((err)=>res.status(400).json(err));
    },
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.id},
            {$addToSet: {friends: params.friendId}},
            {new: true}
        ) .then ((dbSocialUsers)=> res.json(dbSocialUsers))
          .catch((err)=> res.status(400).json(err));
    },
    removeFriend({params},res){
        User.findOneAndUpdate(
        {_id: params.id},
        {$pull: {friends: params.friendId}},
        {new: true}
        ) .then ((dbSocialUsers)=>{
            if(!dbSocialUsers){
                res.status(404).json({message: 'There was 0 users found with this ID'});
                return;
            } res.json(dbSocialUsers);
        }) .catch((err)=> res.status(400).json(err));
    },
};

module.exports = userController;