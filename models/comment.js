const tod = require('../utils/tod');
const {Schema, model, Types} = require('mongoose');
let reactionsSchema = new Schema(
    {
        username: {
            type: String,
            required: true,

        },
        todCreated:{ 
            type: Date,
            default: Date.now,
            get: (timeCreated) => tod(timeCreated),
        },
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reaction: {
            type: String,
            required: true,
        }
    },
    { toJON: {
        getters: true,
    }}
);
let commentSchema = new Schema (
    {
        commentT: {
            type: String,
            required: true,
            maxlength: 200
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeCreated) => tod(timeCreated),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionsSchema],
    },
    {toJSON:{
        virtuals: true,
        getters: true,
    },
    id: false,}
);

const Comment = model('Comment', commentSchema);
commentSchema.virtual('totalReactions').get(function(){
    return this.reactions.length;
});

module.exports = Comment;