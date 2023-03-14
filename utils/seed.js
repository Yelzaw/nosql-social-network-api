const connection = require('../config/connection');
const { User, Thought} =require('../models');
const {getRandomName} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async()=> {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    const users = [];
    const username = getRandomName();

    for (let i = 0; i < 5; i ++) {  
        const username = getRandomName();        
        const first = username.split(' ')[0];
        const last = username.split(' ')[1];
        const email = `${first}${last}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@mail.com`;

        users.push({
            username,
            email,
        })
    }
    
    await User.collection.insertMany(users);



    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})