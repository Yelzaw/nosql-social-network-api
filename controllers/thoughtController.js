const { Thought, User } = require('../models');

module.exports = {
    //Get All Thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts)=> res.json(thoughts))
            .catch((err)=> res.status(500).json(err));
    },
    //Get single Thought by ID
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
            .then((thought)=>
                !thought
                    ? res.status(404).json({message: 'No thought with that ID'})
                    : res.json(thought)
            )
            .catch((err)=> res.status(500).json(err));
    },
    //Create Thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought)=> {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$addToSet: {thoughts: thought._id}},
                    {new:true}
                );
            })
            .then((user)=>
            !user
                ? res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                })
                : res.json('Created the thought 🎉')
            )
            .catch((err)=>{
                console.log(err);
                res.status(500).json(err);
            });
    },
    //Delete Thought by ID
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thought)=>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!'})
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId},
                    { $pull: { thoughts: req.params.thoughtId}},
                    { new: true}
                )
        )
        .then((user)=>
            !user
                ? res.status(404).json({ message: 'Thought deleted but no user with this id!'})
                : res.json({ message: 'Thought successfully deleted!'})
        )
        .catch((err)=> res.status(500).json(err));
    },
    //Updaet Thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $set: req.body},
            { runValidators:true, new: true}
        )
            .then((thought)=>
                !thought   
                    ? res.status(404).json({ message: 'No thought with this id!'})
                    : res.json(thought)
            )
            .catch((err)=> {
                console.log(err);
                res.status(505).json(err);
            });
    },
}