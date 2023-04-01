const connection = require('../config/connection');
const { User, Thought, User } = require('../models');
const { getRandomThoughts, getRandomUser } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

 
  await User.collection.insertMany(getRandomUser(3));

 
  const user = await User.findOne();
  await Thought.collection.insertMany(getRandomThoughts(5).map(thought => ({
    text: thought.thoughtsName,
    author: user._id
  })));

  // Log out the seed data to indicate what should appear in the database
  console.table(await User.find());
  console.table(await Thought.find());
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
