const { Schema, model } = require('mongoose');
let userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            require: true,

        },
        email: {
            type: String,
            unique: true,
            require: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Use a valid E-mail address.",
            ]
        },

        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            },],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },]
        },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

let User = model('User', userSchema);
module.exports = User;
