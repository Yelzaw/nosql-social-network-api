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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
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