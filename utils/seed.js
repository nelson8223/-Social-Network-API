const connection = require('../config/connection');
const { User, Thought, Username } = require('../models');
const { getRandomThoughts, getRandomUsername } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await Username.deleteMany({});

 
  await Username.collection.insertMany(getRandomUsername(3));

 
  const username = await User.findOne();
  await Thought.collection.insertMany(getRandomThoughts(5).map(thought => ({
    text: thought.thoughtsName,
    author: username._id
  })));

  // Log out the seed data to indicate what should appear in the database
  console.table(await Username.find());
  console.table(await Thought.find());
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
