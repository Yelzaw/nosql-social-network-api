const connection = require('../config/connection');
const { User, Thought} =require('../models');
const {getRandomName, getRandomThoughts} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async()=> {
    console.log('connected');

    await User.deletemany({});

    await Thought.deletmany({});

    const users = [];

    for (let i = 0; i < 5; i ++) {
        const thoughts = getRandomThoughts();

        const name = getRandomName();
        const email = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

        users.push({
            name,
            email,
            thoughts,
        })
    }

    await User.collection.insertMany(users);

    await Thought.collection.insertOne({

    })

    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})