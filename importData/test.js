const fs = require('fs');
const input = fs.readFileSync('./restaurants.json');
const objs = JSON.parse(input);

console.log(objs.length);
