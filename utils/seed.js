const connection = require('../config/connection');
const { User, Thought} =require('../models');
const {getRandomName, getRandomThoughts} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async()=> {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    const users = [];
    const name = getRandomName();
    const thoughts = getRandomThoughts(1);

    for (let i = 0; i < 5; i ++) {
        

        

        const email = `${name}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

        users.push({
            name,
            email,
            thoughts,
        })
    }
    await Thought.collection.insertOne(thoughts);
    
    await User.collection.insertMany(users);



    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})