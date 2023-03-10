const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        thoughts: {thoughtSchema},
        friends: {userSchema},
    }
)

userSchema
    .virtual('friendCount')
    .get(function(){
        return this.friends.length ;
    })
    .set(function(result){
        this.set({result});
    })

const User = model('user', userSchema);

module.exports = User;