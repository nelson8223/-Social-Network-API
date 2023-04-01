const usernames = [
  'nelson8223@gmail.com',
  'kellykelly9494@hotmail.com',
  'hotboy@gmail.com'
];

// Get a random username
const getRandomUsername = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Function to generate random thoughts that we can add to username object.
const getRandomThoughts = (int) => {
  const appDescriptions = [
    'Thought 1',
    'Thought 2',
    'Thought 3'
  ];
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtsName: getRandomArrItem(appDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomThoughts, getRandomUser };
